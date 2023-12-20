import axios from "axios";  //para realizar solicitudes a un servidor y recibir respuestas 

export function getLaptops() {
    return axios.get("http://localhost:8000/laptops");
}

export function get_Discos() {
    return axios.get("http://localhost:8000/discos");
}

let cont = 0;
export function agregarLaptop(nuevaLaptop) {
    cont = cont + 1;
    return axios.post("http://localhost:8000/laptops/", { ...nuevaLaptop, id: cont });
}

export function borrar(id) {
    cont = cont - 1;
    return axios.delete(`http://localhost:8000/laptops/${id}`);
}

export function getLaptop(id) {
    return axios.get(`http://localhost:8000/laptops/${id}`);
}

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

export function obtener_disco(id_disco) {
    return axios.get(`http://localhost:8000/discos/${id_disco}`);
}