import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get_laptop } from "./laptop-Service";

export default function LaptopsInfo() {
  const [laptop, setLaptop] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  //prueba para la imagen aleatoria
  const timestamp = new Date().getTime();
  const imageUrl = `https://source.unsplash.com/500x500/?laptop&t=${timestamp}`;

  useEffect(() => {
    get_laptop(parseInt(id, 10))
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
    <div className="container">
      <div className="h1 text-center">
        <i>{laptop.marca}</i>. Modelo: <u>{laptop.modelo}</u>
      </div>
      <div className="row">
        <div className="col">
          <table className="table table-striped table-hover table-bordered">
            <tbody>
              <tr>
                <th>ID</th>
                <td>{laptop.id}</td>
              </tr>
              <tr>
                <th>Marca</th>
                <td>{laptop.marca}</td>
              </tr>
              <tr>
                <th>Modelo</th>
                <td>{laptop.modelo}</td>
              </tr>
              <tr>
                <th>Ram</th>
                <td>{laptop.ram}</td>
              </tr>
              <tr>
                <th>Tipo de disco</th>
                <td>{laptop.tipoDisco}</td>
              </tr>
              <tr>
                <th>Marca del disco</th>
                <td>{laptop.marcaDisco}</td>
              </tr>
              <tr>
                <th>Modelo del Disco</th>
                <td>{laptop.modeloDisco}</td>
              </tr>
              <tr>
                <th>Tamaño del Disco</th>
                <td>{laptop.tamanoDisco}</td>
              </tr>
              <tr>
                <th>Placa</th>
                <td>{laptop.placa}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col">
          <img src={imageUrl} alt="Laptop" />
        </div>
      </div>
    </div>
  );
}
/* Otra variante de otro sitio
<img
  src="https://picsum.photos/500/500/?random&category=technology"
  alt="Laptop"
/>
*/
