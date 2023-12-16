import { useLocation, useNavigate, Link } from "react-router-dom";
import { getLaptops, borrar } from "./laptop-Service";
import { useEffect, useState } from "react";
import { HttpStatusCode } from "axios";

export default function AbmLaptops() {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); //para ir con un boton a otra pagina
  const location = useLocation();

  useEffect(() => {
    refrescarDatos();
    //setDatos(getAutos()); //esto es sin el servidor
  }, []); //se ejecuta una sola vez al principio

  function refrescarDatos() {
    getLaptops()
      .then((respuesta) => {
        //respuesta es la que traigo del servidor db.json
        if (respuesta.status === 200) {
          setDatos(respuesta.data);
        } else {
          alert(respuesta.statusText);
        }
      })
      .catch((reason) => setError(reason.messagge)); //aca trato el error
  }

  async function borrarLaptop(id) {
    await borrar(parseInt(id, 10));
    //navigate(location.pathname); //navega a la ruta actual para redibujar la tabla
    refrescarDatos();
  }

  function editarLaptop(id) {
    navigate(`${id}`);
  }
  function verInfo(id) {
    navigate(`ver/${id}`);
  }

  if (error !== null)
    return <h2 className="text-center">Error: {error.message}</h2>;
  else
    return datos.length <= 0 ? (
      <div className="container text-center h2">
        No hay registros de laptops
      </div>
    ) : (
      <>
        <div className="container">
          <h1>Laptops</h1>
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((t) => (
                <tr key={t.id}>
                  <th>
                    <Link to={`${t.id}`}>{t.id}</Link>
                  </th>
                  <td>{t.marca}</td>
                  <td>{t.modelo}</td>

                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => editarLaptop(t.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger ms-1"
                      onClick={() => borrarLaptop(t.id)}
                    >
                      Borrar
                    </button>
                    <button
                      className="btn btn-secondary ms-1"
                      onClick={() => verInfo(t.id)}
                    >
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button
              className="btn btn-primary"
              onClick={() => navigate("agregar")}
            >
              Agregar
            </button>
          </div>
        </div>
      </>
    );
}
