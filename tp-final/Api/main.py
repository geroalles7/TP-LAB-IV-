from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Integer, String, Sequence
from sqlalchemy.ext.declarative import declarative_base

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

#conexion a BD
hostname='localhost',
database='postgres',
username='postgres',
pwd='admin88',
port_id='5432'

Base = declarative_base()

class Discos_rigidos(Base):
    __tablename__ = 'discos_rigidos'
    id = Column(Integer, primary_key=True)
    marca = Column(String(50))
    tipo = Column(String(50))
    tamaño = Column(Integer)


class Laptops(Base):
    __tablename__ = 'laptops'
    id = Column(Integer, primary_key=True)
    marca = Column(String(50))
    modelo = Column(String(50))
    ram = Column(Integer)
    placa=Column(String(50))
    id_disco=Column(Integer)
    precio=Column(Integer)


class Laptop(BaseModel):
    id:int
    marca:str
    modelo:str
    ram :int
    placa:str
    id_disco: int
    precio:int


engine=create_engine("postgresql://postgres:admin88@localhost:5432/postgres",echo=True)
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()

# Crear una instancia del modelo con los datos a insertar
#nuevo_usuario = Usuario(nombre='Gero', apellido='Alles')

# Agregar la instancia a la sesión
#session.add(nuevo_usuario)

# Confirmar los cambios (realizar la inserción en la base de datos)
#session.commit()



@app.get("/discos", response_model=None)   #ANDA
def get_discos():

    try:
        discos = session.query(Discos_rigidos).all()
        return discos
    finally:
        session.close()

@app.get("/discos/{id_disco}",response_model=None )   #ANDA
def obtener_disco(id_disco: int):
    session = Session()

    try:
        disco = session.query(Discos_rigidos).filter(Discos_rigidos.id == id_disco).first()

        if disco is None:
            raise HTTPException(status_code=404, detail="Disco no encontrado")

        return {"id": disco.id, "marca": disco.marca, "tipo": disco.tipo, "tamanio": disco.tamanio}
    finally:
        session.close()


@app.get("/laptops", response_model=None)   #ANDA
def get_laptops():

    try:
        laptops = session.query(Laptops).all()
        return laptops
    finally:
        session.close()


@app.get("/laptops/{laptops_id}",response_model=None )   #ANDA
def obtener_laptop(laptops_id: int):
    session = Session()

    try:
        laptop = session.query(Laptops).filter(Laptops.id == laptops_id).first()
        disco = session.query(Discos_rigidos).filter(Discos_rigidos.id == laptop.id_disco).first()

        if laptop is None:
            raise HTTPException(status_code=404, detail="Laptop no encontrado")

        return {
            "id": laptop.id, 
            "marca": laptop.marca, 
            "modelo": laptop.modelo, 
            "ram": laptop.ram, 
            "disco_id": laptop.id_disco,
            "disco_marca": disco.marca,
            "disco_tipo": disco.tipo,
            "disco_tamaño":disco.tamaño, 
            "placa": laptop.placa, 
            "precio": laptop.precio
        }
    finally:
        session.close()

@app.post("/laptops/")
def crear_laptop(laptop:Laptop):
    session = Session()

    try:
        
        nuevo_laptop = Laptops(marca=laptop.marca, modelo=laptop.modelo, ram=laptop.ram,placa=laptop.placa,id_disco=laptop.id_disco, precio=laptop.precio)
        discos = session.query(Discos_rigidos).count()
       
       
        if(nuevo_laptop.id_disco <= discos):
            session.add(nuevo_laptop)
            session.commit()
            return {"mensaje": "Disco valido y Laptop creado exitosamente"}
            
        else:
            raise HTTPException(status_code=404, detail="Disco no encontrado y laptop no creada")
    
    finally:
        session.close()


@app.put("/laptops/{laptop_id}")
def actualizar_laptop(laptop_id:int, datos_actualizados: Laptop):
    print("Datos recibidos en el servidor:", datos_actualizados.dict())
    session = Session()

    try:
        # Buscar la laptop por su ID
        laptop = session.query(Laptops).filter(Laptops.id == laptop_id).first()

        # Verificar si la laptop existe
        if laptop is None:
            raise HTTPException(status_code=404, detail="Laptop no encontrado")
        
        # Actualizar los datos del usuario
        laptop.marca=datos_actualizados.marca
        laptop.modelo=datos_actualizados.modelo
        laptop.ram=datos_actualizados.ram
        laptop.placa=datos_actualizados.placa
        laptop.id_disco=datos_actualizados.id_disco
        laptop.precio=datos_actualizados.precio
       

        # Confirmar los cambios en la base de datos
        session.commit()

        return {"mensaje": "Laptop actualizado exitosamente", "Laptop": laptop.marca}
    finally:
        session.close()


@app.delete("/laptops/{laptop_id}") #ANDA
def borrar_laptop(laptop_id: int):
    session = Session()

    try:
        # Buscar el usuario por su ID
        laptop = session.query(Laptops).filter(Laptops.id == laptop_id).first()

        # Verificar si el usuario existe
        if laptop is None:
            raise HTTPException(status_code=404, detail="Laptop no encontrado")

        # Borrar el usuario de la base de datos
        session.delete(laptop)
        session.commit()

        return {"mensaje": "Laptop borrado exitosamente"}
    finally:
        session.close()


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)