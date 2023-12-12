from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()


#Configuración de CORS para permitir solicitudes desde el frontend en desarrollo
origins = ["http://localhost:5173"]  # Ajusta según la URL de tu frontend React
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
   allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def read_root():
    return {"Hello": "World"}

class Laptop(BaseModel):
    id: int
    marca: str
    modelo: str
    ram: int
    tipo_disco: str
    marca_disco: str
    modelo_disco: str
    tamaño_disco: int
    placa: str
    precio: int

laptops = [
    {"id": 1, "marca": "apple", "modelo": "Falcon", "ram": 16, "tipo_disco": "ssd", "marca_disco": "kingston", "modelo_disco": "454gfdg", "tamaño_disco": 250, "placa": "rtx 3050", "precio": 100000},
    {"id": 2, "marca": "apple", "modelo": "Falcon", "ram": 16, "tipo_disco": "ssd", "marca_disco": "kingston", "modelo_disco": "454gfdg", "tamaño_disco": 250, "placa": "rtx 3050", "precio": 100000},
    # Agrega más laptops según sea necesario
]



@app.get("/laptops", response_model=list[Laptop])
def get_laptops():
    return laptops

@app.get("/laptops/{laptop_id}", response_model=Laptop)
def get_laptop(laptop_id: int):
    laptop = next((item for item in laptops if item["id"] == laptop_id), None)
    if laptop:
        return laptop
    raise HTTPException(status_code=404, detail="Laptop not found")

@app.post("/create", response_model=Laptop)
def create_laptop(laptop: Laptop):
    new_laptop = {"id": len(laptops) + 1, **laptop.dict()}
    laptops.append(new_laptop)
    return new_laptop

@app.put("/update/{laptop_id}", response_model=Laptop)
def update_laptop(laptop_id: int, updated_laptop: Laptop):
    index = next((index for index, item in enumerate(laptops) if item["id"] == laptop_id), None)
    if index is not None:
        laptops[index] = {"id": laptop_id, **updated_laptop.dict()}
        return laptops[index]
    raise HTTPException(status_code=404, detail="Laptop not found")

@app.delete("/delete/{laptop_id}", response_model=dict)
def delete_laptop(laptop_id: int):
    global laptops
    laptops = [item for item in laptops if item["id"] != laptop_id]
    return {"message": "Laptop deleted successfully"}



