from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine
import pandas as pd
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Integer, String, Sequence
from sqlalchemy.ext.declarative import declarative_base

app = FastAPI()

#conexion a BD
hostname='localhost',
database='postgres',
username='postgres',
pwd='Gero2002',
port_id='5432'






Base = declarative_base()

class Discos_rigidos(Base):
    __tablename__ = 'discos_rigidos'
    id = Column(Integer, primary_key=True)
    marca = Column(String(50))
    tipo = Column(String(50))
    tamaño = Column(Integer)

engine=create_engine("postgresql://postgres:Gero2002@localhost:5432/postgres", echo=True)
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()



# Crear una instancia del modelo con los datos a insertar
#nuevo_usuario = Usuario(nombre='Gero', apellido='Alles')

# Agregar la instancia a la sesión
#session.add(nuevo_usuario)

# Confirmar los cambios (realizar la inserción en la base de datos)
#session.commit()


#Configuración de CORS para permitir solicitudes desde el frontend en desarrollo
origins = ["http://localhost:5173"]  # Ajusta según la URL de tu frontend React
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
   allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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



@app.get("/discos", response_model=None)   #ANDA
def get_discos():

    try:
        discos = session.query(Discos_rigidos).all()
        return discos
    finally:
        session.close()


@app.get("/discos/{discos_rigidos_id}",response_model=None )   #ANDA
def obtener_disco(discos_rigidos_id: int):
    session = Session()

    try:
        disco = session.query(Discos_rigidos).filter(Discos_rigidos.id == discos_rigidos_id).first()

        if disco is None:
            raise HTTPException(status_code=404, detail="Disco no encontrado")

        return {"id": disco.id, "marca": disco.marca, "tipo": disco.tipo, "tamaño": disco.tamaño}
    finally:
        session.close()




class DiscoCrear(BaseModel):
    marca:str
    tipo: str
    tamaño: int

@app.post("/discos/")
def crear_disco(disco: DiscoCrear):
    session = Session()

    try:
        nuevo_disco = Discos_rigidos(marca=disco.marca, tipo=disco.tipo, tamaño=disco.tamaño )
        session.add(nuevo_disco)
        session.commit()

        return {"mensaje": "Disco creado exitosamente", "id": nuevo_disco.id}
    finally:
        session.close()
        


class DiscoActualizar(BaseModel):
    marca:str
    tipo: str
    tamaño: int

@app.put("/discos/{disco_id}")
def actualizar_disco(disco_id: int, datos_actualizados: DiscoActualizar):
    session = Session()

    try:
        # Buscar el usuario por su ID
        disco = session.query(Discos_rigidos).filter(Discos_rigidos.id == disco_id).first()

        # Verificar si el usuario existe
        if disco is None:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")

        # Actualizar los datos del usuario
        disco.marca=datos_actualizados.marca
        disco.tipo=datos_actualizados.tipo
        disco.tamaño=datos_actualizados.tamaño
      

        # Confirmar los cambios en la base de datos
        session.commit()

        return {"mensaje": "Disco actualizado exitosamente"}
    finally:
        session.close()




@app.delete("/discos/{disco_id}") #ANDA
def borrar_disco(disco_id: int):
    session = Session()

    try:
        # Buscar el usuario por su ID
        disco = session.query(Discos_rigidos).filter(Discos_rigidos.id == disco_id).first()

        # Verificar si el usuario existe
        if disco is None:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")

        # Borrar el usuario de la base de datos
        session.delete(disco)
        session.commit()

        return {"mensaje": "Disco borrado exitosamente"}
    finally:
        session.close()




