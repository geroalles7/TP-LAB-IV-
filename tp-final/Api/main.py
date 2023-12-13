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

class Usuario(Base):
    __tablename__ = 'usuarios'
    id = Column(Integer, primary_key=True)
    nombre = Column(String(50))
    apellido = Column(String(50))

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



@app.get("/laptops", response_model=None)   #ANDA
def get_laptops():

    try:
        usuarios = session.query(Usuario).all()
        return usuarios
    finally:
        session.close()


@app.get("/laptops/{usuario_id}",response_model=None )   #ANDA
def obtener_usuario(usuario_id: int):
    session = Session()

    try:
        usuario = session.query(Usuario).filter(Usuario.id == usuario_id).first()

        if usuario is None:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")

        return {"id": usuario.id, "nombre": usuario.nombre, "apellido": usuario.apellido}
    finally:
        session.close()




@app.post("/create", response_model=Laptop)
def create_laptop(laptop: Laptop):
    new_laptop = {"id": len(laptops) + 1, **laptop.dict()}
    laptops.append(new_laptop)
    return new_laptop

class UsuarioCrear(BaseModel):
    nombre: str
    apellido: str

@app.post("/usuarios/")
def crear_usuario(usuario: UsuarioCrear):
    session = Session()

    try:
        nuevo_usuario = Usuario(nombre=usuario.nombre, apellido=usuario.apellido)
        session.add(nuevo_usuario)
        session.commit()

        return {"mensaje": "Usuario creado exitosamente", "id": nuevo_usuario.id}
    finally:
        session.close()
        

@app.put("/update/{laptop_id}", response_model=Laptop)
def update_laptop(laptop_id: int, updated_laptop: Laptop):
    index = next((index for index, item in enumerate(laptops) if item["id"] == laptop_id), None)
    if index is not None:
        laptops[index] = {"id": laptop_id, **updated_laptop.dict()}
        return laptops[index]
    raise HTTPException(status_code=404, detail="Laptop not found")

class UsuarioActualizar(BaseModel):
    nombre: str
    apellido: str

@app.put("/usuarios/{usuario_id}")
def actualizar_usuario(usuario_id: int, datos_actualizados: UsuarioActualizar):
    session = Session()

    try:
        # Buscar el usuario por su ID
        usuario = session.query(Usuario).filter(Usuario.id == usuario_id).first()

        # Verificar si el usuario existe
        if usuario is None:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")

        # Actualizar los datos del usuario
        usuario.nombre = datos_actualizados.nombre
        usuario.apellido = datos_actualizados.apellido

        # Confirmar los cambios en la base de datos
        session.commit()

        return {"mensaje": "Usuario actualizado exitosamente"}
    finally:
        session.close()




@app.delete("/usuarios/{usuario_id}") #ANDA
def borrar_usuario(usuario_id: int):
    session = Session()

    try:
        # Buscar el usuario por su ID
        usuario = session.query(Usuario).filter(Usuario.id == usuario_id).first()

        # Verificar si el usuario existe
        if usuario is None:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")

        # Borrar el usuario de la base de datos
        session.delete(usuario)
        session.commit()

        return {"mensaje": "Usuario borrado exitosamente"}
    finally:
        session.close()




