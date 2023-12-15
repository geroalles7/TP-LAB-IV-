import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLaptop } from "./laptop-Service";

export default function LaptopsInfo() {
  const [laptop, setLaptop] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getLaptop(parseInt(id, 10))
      .then((respuesta) => {
        if (respuesta.status === 200) {
          setLaptop(respuesta.data);
        } else {
          alert(respuesta.statusText);
        }
      })
      .catch((reason) => setError(reason.message));
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!laptop) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div className="h1">{laptop.modelo}</div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Ram</th>
            <th>Tipo del Disco</th>
            <th>Marca del Disco</th>
            <th>Modelo del Disco</th>
            <th>Tamaño del Disco</th>
            <th>Placa</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{laptop.id}</td>
            <td>{laptop.marca}</td>
            <td>{laptop.modelo}</td>
            <td>{laptop.ram}</td>
            <td>{laptop.tipoDisco}</td>
            <td>{laptop.marcaDisco}</td>
            <td>{laptop.modeloDisco}</td>
            <td>{laptop.tamanoDisco}</td>
            <td>{laptop.placa}</td>
            <td>{laptop.precio}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
