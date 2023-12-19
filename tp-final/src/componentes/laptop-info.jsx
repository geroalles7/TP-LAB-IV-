import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLaptop, obtener_disco } from "./laptop-Service";


export default function LaptopsInfo() {
  const [laptop, setLaptop] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  
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
      <div className="h1 text-white text-center">{laptop.marca+" "+laptop.modelo}</div>
      <table className=" table table-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Ram(Gb)</th>
            <th>Tipo del Disco</th>
            <th>Marca del Disco</th>
            <th>Tamaño del Disco(Gb)</th>
            <th>Placa</th>
            <th>Precio ($)</th>
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
}