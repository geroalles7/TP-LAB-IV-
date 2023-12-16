import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get_laptop } from "./laptop-Service";
import { HttpStatusCode } from "axios";

export default function LaptopsInfo() {
  const [laptop, setLaptop] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  //para la imagen aleatoria
  const timestamp = new Date().getTime();
  const imageUrl = `https://source.unsplash.com/500x500/?laptop&t=${timestamp}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respuesta = await get_laptop(parseInt(id, 10));

        if (respuesta.status === HttpStatusCode.Ok) setLaptop(respuesta.data);
        else setError(`Error: ${respuesta.statusText}`);
      } catch (error) {
        console.error("Error en la solicitud:", error.message);
        setError(`Error: ${error.message}`);
      }
    };
    fetchData();
  }, [id]);

  if (error) return <div className="h1 text-center">{error}</div>;
  if (!laptop) return <div>Cargando...</div>;

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="h1 text-center">
            <i>{laptop.marca}</i>. Modelo: <u>{laptop.modelo}</u>
          </div>
          <hr />
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
                <td>{laptop.ram} GB</td>
              </tr>
              <tr>
                <th>Tipo de Disco</th>
                <td>{laptop.disco_tipo}</td>
              </tr>
              <tr>
                <th>Marca del disco</th>
                <td>{laptop.disco_marca}</td>
              </tr>
              <tr>
                <th>Tamaño del Disco</th>
                <td>{laptop.disco_tamaño} GB</td>
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
const imageUrl = `https://picsum.photos/320/240/?random&t=${timestamp}`;
<img src={imageUrl} alt="Laptop" />
*/
//Antiguo useEffect() sin asincronia:
/*
get_laptop(parseInt(id, 10))
  .then((respuesta) => {
    if (respuesta.status === 200) {
      setLaptop(respuesta.data);
    } else {
      alert(respuesta.statusText);
    }
  })
  .catch((reason) => setError(reason.message));
*/
