import { useLocation, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { get_Discos } from "./laptop-Service";
//import { Link } from "react-router-dom";


export default function AbmDiscos() {
    const [datos, setDatos] =useState([]);
    const[error, setError]= useState(null);
    const navigate=useNavigate(); //para ir con un boton a otra pagina
    const location=useLocation();
    
    
    useEffect(()=>{
        refrescarDatos();
         //setDatos(getAutos()); //esto es sin el servidor
     },[]); //se ejecuta una sola vez al principio
 

    function refrescarDatos(){
        get_Discos()
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
   
    /*async function borrarLaptop(id){
        await borrar(parseInt(id,10));
        //navigate(location.pathname); //navega a la ruta actual para redibujar la tabla 
        refrescarDatos();
    }
    
    function editarLaptop(id){
        navigate(`${id}`);
       

    }*/
    function verInfo(id){
        navigate(`ver/${id}`);

    }

    
    return (
        <>
            <h1>Discos</h1>
            {error ? <h1>Error: {error}</h1> : null /*aca trato el error*/ /*<th>Ram</th><th>Tipo del Disco</th><th>Marca del Disco</th><th>Modelo del Disco</th><th>Tamaño del Disco</th><th>Placa</th><th>Precio</th>*/} 
            <div className="container">
                <table class="table table-dark">
                    <thead> 
                        <tr> 
                           <th>ID</th><th>Marca</th><th>Tipo</th><th>Tamaño</th>
                        </tr>
                    </thead>
                    <tbody>

                        {datos.map((t) => (   //por cada elemento crea una linea en la lista. Esto va en el id de abajo 
                            <tr key={t.id}>
                                <td>{t.id} </td> 
                                <td>{t.marca}</td>
                                <td>{t.tipo}</td>
                                <td>{t.tamaño}</td>
                                
                                
                               
                            </tr>
                           
                        ))}
                    </tbody>
                </table>
                
            </div>
        </>
    )

}


//dibujo la tabla que traigo desde autos-service
