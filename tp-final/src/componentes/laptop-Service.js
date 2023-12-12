import axios from "axios";


/*const laptops = [ 
    {id:1, marca:'apple', modelo:'Falcon', ram: 16, tipo_disco: 'ssd', marca_disco: 'kingston', modelo_disco: '454gfdg', tamaño_disco: 250, placa:'rtx 3050', precio: 100000},
    {id:2, marca:'apple', modelo:'Falcon', ram: 16, tipo_disco: 'ssd', marca_disco: 'kingston', modelo_disco: '454gfdg',tamaño_disco: 250, placa:'rtx 3050', precio: 100000},
    {id:3, marca:'apple', modelo:'Falcon', ram: 16, tipo_disco: 'ssd', marca_disco: 'kingston', modelo_disco: '454gfdg', tamaño_disco: 250, placa:'rtx 3050', precio: 100000}
];

export function getLaptops(){
    //llamar al backend para obtener la lista de autos
    return axios.get("http://localhost:3000/laptops");  //devuelve una promesa
}


export function agregarLaptop(nuevaLaptop){ //para agregar un nuevo auto con id bien hecho
    //nuevoAuto.id = autos.reduce((max, actual)=>actual.id > max ? actual.id : max, 0)+1; 
    //autos.push(nuevoAuto);
    return axios.post("http://localhost:3000/laptops", {...nuevaLaptop, id:null});
}

export function borrar(id){
    /*const ind= auto.findIndex(item=>item.id===id)
    if(ind > -1){
        autos.splice(ind, 1);
    }*/
    /*return axios.delete(`http://localhost:3000/laptops/${id}`);   
}


export function getLaptop(id){
    //return autos.find(item=>item.id===id);    //sin el server
    return axios.get(`http://localhost:3000/laptops/${id}`);   //con el server 
}

export function editar(auto){
    /*const ind= auto.findIndex(item=>item.id===auto.id)
    if(ind > -1){
        autos[ind]=auto;
    }*/
    /*return axios.put(`http://localhost:3000/laptops/${auto.id}`, auto)
}*/

export function getLaptops(){
    return axios.get("http://localhost:8000/laptops");  // Ajusta la URL y puerto de tu servidor FastAPI
}
let cont=0;
export function agregarLaptop(nuevaLaptop){
    //let nueva = laptops.reduce((max, actual)=>actual.id > max ? actual.id : max, 0)+1;
    cont=cont+1;
    return axios.post("http://localhost:8000/create", {...nuevaLaptop, id:cont});  // Ajusta la URL y puerto de tu servidor FastAPI
}

export function borrar(id){
    cont=cont-1;
    return axios.delete(`http://localhost:8000/delete/${id}`);  // Ajusta la URL y puerto de tu servidor FastAPI
}

export function getLaptop(id){
    return axios.get(`http://localhost:8000/laptops/${id}`);  // Ajusta la URL y puerto de tu servidor FastAPI
}

export function editar(laptop){
    return axios.put(`http://localhost:8000/update/${laptop.id}`, laptop);  // Ajusta la URL y puerto de tu servidor FastAPI
}