import axios from "axios";

export function getLaptops(){
    return axios.get("http://localhost:8000/laptops");  // Ajusta la URL y puerto de tu servidor FastAPI
}

let cont=0;
export function agregarLaptop(nuevaLaptop){
    //let nueva = laptops.reduce((max, actual)=>actual.id > max ? actual.id : max, 0)+1;
    cont=cont+1;
    return axios.post("http://localhost:8000/laptops/", {...nuevaLaptop, id:cont});  // Ajusta la URL y puerto de tu servidor FastAPI
}

export function borrar(id){
    cont=cont-1;
    return axios.delete(`http://localhost:8000/laptops/${id}`);  // Ajusta la URL y puerto de tu servidor FastAPI
}

export function getLaptop(id){
    return axios.get(`http://localhost:8000/laptops/${id}`);  // Ajusta la URL y puerto de tu servidor FastAPI
}

export function editar(id, laptop){
    return axios.put(`http://localhost:8000/laptops/${id}`, laptop);  // Ajusta la URL y puerto de tu servidor FastAPI
}

export function obtener_disco(id_disco){
    return axios.get(`http://localhost:8000/discos/${id_disco}`);
}