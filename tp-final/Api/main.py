from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import ForeignKey, create_engine
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy import Column, Integer, String, Sequence, Float
from sqlalchemy.ext.declarative import declarative_base

app = FastAPI()

#Configuración de CORS para permitir solicitudes desde el frontend en desarrollo
origins = [
    "http://localhost:5173",  # o la URL de tu frontend React
]

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
    id = Column(Integer(), primary_key=True)
    marca = Column(String(50), nullable=False, unique=False)
    tipo = Column(String(50), nullable=False, unique=False)
    tamanio = Column(Integer,nullable=False)


class Disco(BaseModel):
    id: int
    marca: str
    tipo: str
    tamanio: int


class Laptops(Base):
    __tablename__ = 'laptops'
    id = Column(Integer, primary_key=True)
    marca = Column(String(50), nullable=False, unique=False)
    modelo = Column(String(50), nullable=False, unique=False)
    ram = Column(Integer, nullable=False)
    placa = Column(String(50), nullable=True, unique=False)
    id_disco = Column(Integer, ForeignKey('discos_rigidos.id'))  # Agrega la relación de clave externa
    precio = Column(Float)  # Cambia el tipo de dato a Float

    # Agrega una relación para facilitar las consultas 
    disco_relacionado = relationship('Discos_rigidos', foreign_keys=[id_disco])

class Laptop(BaseModel):
    id: int
    marca: str
    modelo: str
    ram: int
    placa: str
    id_disco: int
    precio: float 


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
            "disco_tamanio":disco.tamanio, 
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


@app.put("/laptops/{laptop_id}", response_model=None)
def actualizar_laptop(laptop_editada: Laptop):
    print("Datos recibidos en el servidor:", laptop_editada.marca)
    session = Session()

    try:
        # Buscar la laptop por su ID
        laptop = session.query(Laptops).filter(Laptops.id == laptop_editada.id).update({
                Laptops.marca : laptop_editada.marca,
                Laptops.modelo : laptop_editada.modelo,
                Laptops.ram : laptop_editada.ram,
                Laptops.placa : laptop_editada.placa,
                Laptops.id_disco : laptop_editada.id_disco,
                Laptops.precio : laptop_editada.precio
            })
        
        # Verificar si la laptop existe
        if laptop is None:
            raise HTTPException(status_code=404, detail="Laptop no encontrado")
        
        session.commit()

        return {"mensaje": "Laptop actualizado exitosamente", "Laptop": laptop}
    finally:
        session.close()

@app.post("/laptops/{laptop_id}")
def actualizar_laptop_post(laptop: Laptop):
    session=Session()
    try:
        nuevo_laptop = Laptops(marca=laptop.marca, modelo=laptop.modelo, ram=laptop.ram,placa=laptop.placa,id_disco=laptop.id_disco, precio=laptop.precio)
        session.query(Laptops)

    finally:
        pass
        

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