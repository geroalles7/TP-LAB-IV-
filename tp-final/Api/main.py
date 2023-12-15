from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import Column, Integer, String, Sequence

app = FastAPI()

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


engine = create_engine("postgresql+psycopg2://postgres:admin88@localhost:5432/postgres", echo=True)
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




@app.get("/discos", response_model=None)   #ANDA
def get_discos():

    try:
        discos = session.query(Discos_rigidos).all()
        return discos
    finally:
        session.close()

@app.get("/laptops", response_model=None)   #ANDA
def get_laptops():

    try:
        laptops = session.query(Laptops).all()
        return laptops
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


@app.get("/laptops/{laptops_id}",response_model=None )   #ANDA
def obtener_laptop(laptops_id: int):
    session = Session()

    try:
        laptop = session.query(Laptops).filter(Laptops.id == laptops_id).first()

        if laptop is None:
            raise HTTPException(status_code=404, detail="Laptop no encontrado")

        return {"id": laptop.id, "marca": laptop.marca, "modelo": laptop.modelo, "Memoria Ram": laptop.ram, "Placa de video": laptop.placa, "Precio": laptop.precio}
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
        


class LaptopCrear(BaseModel):
    marca:str
    modelo:str
    ram :int
    placa:str
    id_disco: int
    precio:int

@app.post("/laptops/")
def crear_laptop(laptop:LaptopCrear):
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








class LaptopActualizar(BaseModel):
    marca:str
    modelo :str
    ram :int
    placa:str
    id_disco:int
    precio:int


@app.put("/laptops/{laptop_id}")
def actualizar_laptop(laptop_id: int, datos_actualizados: LaptopActualizar):
    session = Session()

    try:
        # Buscar el usuario por su ID
        laptop = session.query(Laptops).filter(Laptops.id == laptop_id).first()

        # Verificar si el usuario existe
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

        return {"mensaje": "Laptop actualizado exitosamente"}
    finally:
        session.close()

"""@app.put("/laptops/{laptop_id}")
def actualizar_laptop(laptop_id: int, datos_actualizados: LaptopActualizar):
    with Session() as session:
        laptop = session.query(Laptops).filter(Laptops.id == laptop_id).first()

        if laptop is None:
            raise HTTPException(status_code=404, detail="Laptop no encontrado")

        laptop.marca = datos_actualizados.marca
        laptop.modelo = datos_actualizados.modelo
        laptop.ram = datos_actualizados.ram
        laptop.placa = datos_actualizados.placa
        laptop.id_disco = datos_actualizados.id_disco
        laptop.precio = datos_actualizados.precio

        session.commit()

    return {"mensaje": "Laptop actualizado exitosamente"}"""





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