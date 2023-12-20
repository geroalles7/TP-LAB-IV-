from tkinter import messagebox
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ValidationError
from sqlalchemy import create_engine
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

Base = declarative_base()  #clase base para definir modelos de datos en tu aplicación, es de SQLAlchemy

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


engine=create_engine("postgresql://postgres:Gero2002@localhost:5432/postgres",echo=True)
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)   #session para realizar operaciones sobre la BD
session = Session()  #instancia de esa session



#Configuración de CORS para permitir solicitudes desde el frontend en desarrollo
origins = ["http://localhost:5173"]  
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/discos", response_model=None)   
def get_discos():

    try:
        discos = session.query(Discos_rigidos).all()
        return discos
    finally:
        session.close()




@app.get("/discos/{id_disco}",response_model=None )   
def obtener_disco(id_disco: int):
    session = Session()

    try:
        disco = session.query(Discos_rigidos).filter(Discos_rigidos.id == id_disco).first()

        if disco is None:
            raise HTTPException(status_code=404, detail="Disco no encontrado")

        return {"id": disco.id, "marca": disco.marca, "tipo": disco.tipo, "tamaño": disco.tamaño}
    finally:
        session.close()


@app.get("/laptops", response_model=None)   
def get_laptops():

    try:
        laptops = session.query(Laptops).all()
        return laptops
    finally:
        session.close()


@app.get("/laptops/{laptops_id}",response_model=None )  
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
        
        if(laptop.marca=='' or laptop.modelo=='' or laptop.ram==0 or laptop.placa==' ' or laptop.id_disco==0 or laptop.precio==0):
            raise HTTPException(status_code=404, detail="Faltan ingresar campos")
        else:
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
def editar_laptop(datos_actualizados: Laptop, laptop_id:int):
   
    session = Session()
    print(f"Datos recibidos en el servidor:", datos_actualizados)
    try:
        #Busco la laptop por su ID
        laptop = session.query(Laptops).filter(Laptops.id == laptop_id).first()
       

        #Verifico si la laptop existe
        if laptop is None:
            raise HTTPException(status_code=404, detail="Laptop no encontrado")
        
        #Actualizo los datos del laptop
        laptop.id=laptop_id
        laptop.marca=datos_actualizados.marca
        laptop.modelo=datos_actualizados.modelo
        laptop.ram=datos_actualizados.ram
        laptop.id_disco=datos_actualizados.id_disco
        laptop.placa=datos_actualizados.placa
        laptop.precio=datos_actualizados.precio
        
       
    
        #Confirmo los cambios en la base de datos
        session.commit()

        
        
       
    finally:
        session.close()



@app.delete("/laptops/{laptop_id}") 
def borrar_laptop(laptop_id: int):
    session = Session()

    try:
       
        laptop = session.query(Laptops).filter(Laptops.id == laptop_id).first()

       
        if laptop is None:
            raise HTTPException(status_code=404, detail="Laptop no encontrado")

        #Borro la laptop de la base de datos
        session.delete(laptop)
        session.commit()

        return {"mensaje": "Laptop borrado exitosamente"}
    finally:
        session.close()




