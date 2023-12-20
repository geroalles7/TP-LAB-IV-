import { useLocation, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { get_Discos } from "./laptop-Service";



export default function AbmDiscos() {
    const [datos, setDatos] = useState([]);  //para actualizar el estado
    const[error, setError]= useState(null);
    const navigate=useNavigate(); //para ir con un boton a otra pagina
    const location=useLocation();
    
    
    useEffect(()=>{   // le estamos indicando a React que el componente tiene que hacer algo después de renderizarse
        refrescarDatos();
         
     },[]); 
 

    function refrescarDatos(){
        get_Discos()
        .then((respuesta)=>{  //respuesta es la que traigo de la BD
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
   
   
    

    
    return (
        <>
            <div class="container text-center">
                <h1 className="text-white">Discos</h1>
            </div>
            
            {error ? <h1>Error: {error}</h1> : null} 
            <div className="container">
                <table class="table table-dark">
                    <thead> 
                        <tr> 
                           <th>ID</th><th>Marca</th><th>Tipo</th><th>Tamaño(Gb)</th>
                        </tr>
                    </thead>
                    <tbody>

                        {datos.map((t) => (   //por cada elemento crea una linea en la lista. Esto va en el id de abajo  //dibujo la tabla que traigo desde laptops-service
                            <tr key={t.id}>   
                                <td>{t.id} </td> 
                                <td>{t.marca}</td>
                                <td>{t.tipo}</td>
                                <td>{t.tamaño}</td>
                                
                                
                               
                            </tr>
                           
                        ))}
                    </tbody>
                </table>
                
            </div><br /><br /><br /><br /><br /><br />
        </>
    )

}



