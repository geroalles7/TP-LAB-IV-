import axios from "axios";

export function getLaptops(){
    return axios.get("http://localhost:8000/laptops");  // Ajusta la URL y puerto de tu servidor FastAPI
}

export function get_Discos(){
    return axios.get("http://localhost:8000/discos");  // Ajusta la URL y puerto de tu servidor FastAPI
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

/*export function editar(laptop){
    return axios.put(`http://localhost:8000/laptops/${laptop.id}`, laptop);  // Ajusta la URL y puerto de tu servidor FastAPI
}*/
export function editar(laptop) {
    console.log("Datos a enviar para editar:", laptop);
    try {
        const response = axios.put(`http://localhost:8000/laptops/${parseInt(laptop.id)}`, laptop);
        console.log("Respuesta del servidor al editar:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al editar la laptop:", error);
        throw error;
    }
  }
  /*export async function editar(laptop) {
    console.log("Datos a enviar para editar:", laptop);
    try {
        const response = await axios.put(`http://localhost:8000/laptops/${laptop.id}`, laptop, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("Respuesta del servidor al editar:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al editar la laptop:", error);
        throw error;
    }
}*/



export function obtener_disco(id_disco){
    return axios.get(`http://localhost:8000/discos/${id_disco}`);
}