import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLaptop, obtener_disco } from "./laptop-Service";


export default function LaptopsInfo() {
  const [laptop, setLaptop] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  //const navigate = useNavigate();

  /*useEffect(() => {
    getLaptop(parseInt(id, 10))
      .then((respuesta) => {
        if (respuesta.status === 200) {
          console.log(respuesta.data);
          //setLaptop(respuesta.data);
          setLaptop(prevLaptop => {
            return {...prevLaptop, ...respuesta.data};
          });
          console.log("Estado actualizado:", laptop);
        } else {
          alert(respuesta.statusText);
        }
      })
      .catch((reason) => setError(reason.message));
  }, [id]);*/
  /*useEffect(() => {
    const fetchData = async () => {
      try {
        const respuesta = await getLaptop(parseInt(id, 10));
        
        console.log("Respuesta del servicio:", respuesta.data);

        if (respuesta.status === 200) {
          setLaptop(respuesta.data);
          
        } else {
          setError(`Error: ${respuesta.statusText}`);
        }
        const respuesta_disco=await obtener_disco(laptop.id_disco)
        if (respuesta_disco.status === 200) {
          setDisco(respuesta_disco.data);
          
        } 

      } catch (error) {
        console.error("Error en la solicitud:", error.message);
        setError(`Error: ${error.message}`);
      }
    };

    fetchData();
  }, [id]);
  
  console.log("Estado laptop:", laptop); // Agrega esta línea*/
  useEffect(() => {
    const fetchData = async () => {
      try {
        const respuesta = await getLaptop(parseInt(id, 10));
  
        console.log("Respuesta del servicio:", respuesta.data);
        
  
        if (respuesta.status === 200) {
          setLaptop(respuesta.data);
          
          
      
        } else {
          setError(`Error: ${respuesta.statusText}`);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error.message);
        setError(`Error: ${error.message}`);
      }
    };
  
    fetchData();
  }, [id]);
  
  console.log("Estado laptop:", laptop);
  
  
  
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!laptop) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div className="h1">{laptop.marca+" "+laptop.modelo}</div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Ram</th>
            <th>Tipo del Disco</th>
            <th>Marca del Disco</th>
            <th>Tamaño del Disco</th>
            <th>Placa</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <td>{laptop.id ?? "N/A"}</td>
          <td>{laptop.marca ?? "N/A"}</td>
          <td>{laptop.modelo ?? "N/A"}</td>
          <td>{laptop.ram ?? "N/A"}</td>
          <td>{laptop.disco_tipo ?? "N/A"}</td>
          <td>{laptop.disco_marca ?? "N/A"}</td>
          <td>{laptop.disco_tamaño ?? "N/A"}</td>
          <td>{laptop.placa ?? "N/A"}</td>
          <td>{laptop.precio ?? "N/A"}</td>
            
          </tr>
        </tbody>
      </table>
    </>
  );
}/*<td>{laptop.id}</td>
            <td>{laptop.marca}</td>
            <td>{laptop.modelo}</td>
            <td>{laptop.ram}</td>
            <td>{laptop.tipoDisco}</td>
            <td>{laptop.marcaDisco}</td>
            <td>{laptop.modeloDisco}</td>
            <td>{laptop.tamanoDisco}</td>
            <td>{laptop.placa}</td>
            <td>{laptop.precio}</td>*/
