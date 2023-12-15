import { useLocation, useNavigate} from "react-router-dom";
import {getLaptops, borrar} from "./laptop-Service";
import { useEffect, useState } from "react";
//import { Link } from "react-router-dom";





export default function AbmLaptops() {
    const [datos, setDatos] =useState([]);
    const[error, setError]= useState(null);
    const navigate=useNavigate(); //para ir con un boton a otra pagina
    const location=useLocation();
    
    
    useEffect(()=>{
       refrescarDatos();
        //setDatos(getAutos()); //esto es sin el servidor
    },[]); //se ejecuta una sola vez al principio

    function refrescarDatos(){
        getLaptops()
        .then((respuesta)=>{  //respuesta es la que traigo del servidor db.json
            if(respuesta.status===200)
            {
                setDatos(respuesta.data);
            }
            else{
                alert(respuesta.statusText);
            }
        })
        .catch(reason=>setError(reason.messagge));   //aca trato el error
    }
   
    async function borrarLaptop(id){
        await borrar(parseInt(id,10));
        //navigate(location.pathname); //navega a la ruta actual para redibujar la tabla 
        refrescarDatos();
    }
    
    function editarLaptop(id){
        navigate(`${id}`);
       

    }
    function verInfo(id){
        navigate(`ver/${id}`);

    }

    
    return (
        <>
            <h1>Laptops</h1>
            {error ? <h1>Error: {error}</h1> : null /*aca trato el error*/ /*<th>Ram</th><th>Tipo del Disco</th><th>Marca del Disco</th><th>Modelo del Disco</th><th>Tamaño del Disco</th><th>Placa</th><th>Precio</th>*/} 
            <div className="container">
                <table className="table">
                    <thead> 
                        <tr> 
                           <th>ID</th><th>Marca</th><th>Modelo</th><th>Precio</th>
                        </tr>
                    </thead>
                    <tbody>

                        {datos.map((t) => (   //por cada elemento crea una linea en la lista. Esto va en el id de abajo 
                            <tr key={t.id}>
                                <td>{t.id} </td> 
                                <td>{t.marca}</td>
                                <td>{t.modelo}</td>
                                <td>{t.precio}</td>
                                
                                
                                <td>
                                    <button className="btn btn-warning" onClick={()=> editarLaptop(t.id)}>Editar</button>
                                    <button className="btn btn-danger ms-1" onClick={()=>borrarLaptop(t.id)}>Borrar</button>
                                    <button className="btn btn-secondary ms-1" onClick={()=>verInfo(t.id)}>Ver</button>
                                </td>
                            </tr>
                           /*<td>{t.ram}</td>
                                <td>{t.tipo_disco}</td>
                                <td>{t.marca_disco}</td>
                                <td>{t.modelo_disco}</td>
                                <td>{t.tamaño_disco}</td>
                                <td>{t.placa}</td>*/
                        ))}
                    </tbody>
                </table>
                <div>
                   <button className="btn btn-primary" onClick={()=>navigate("agregar")}>Agregar</button>
                </div>
            </div>
        </>
    )

}


//dibujo la tabla que traigo desde autos-service
