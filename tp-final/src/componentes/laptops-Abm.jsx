import { useNavigate, Link } from "react-router-dom";
import { getLaptops, borrar } from "./laptop-Service";
import { useEffect, useState } from "react";
import { HttpStatusCode } from "axios";

export default function AbmLaptops() {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); //para ir con un boton a otra pagina

  useEffect(() => {
    refreshData();
  }, []);

  function refreshData() {
    getLaptops()
      .then((resp) => {
        if (resp.status === HttpStatusCode.Ok) setDatos(resp.data);
        else setError(resp);
      })
      .catch((reason) => setError(reason));
  }

  async function borrarLaptop(id) {
    await borrar(parseInt(id, 10));
    //navigate(location.pathname); //navega a la ruta actual para redibujar la tabla
    refreshData();
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
                    <Link to={`/ver/${t.id}`}>{t.id}</Link>
                  </th>
                  <td>{t.marca}</td>
                  <td>{t.modelo}</td>

                  <td>
                    <button
                      className="btn btn-success ms-1"
                      onClick={() => verInfo(t.id)}
                    >
                      Ver
                    </button>
                    <button
                      className="btn btn-warning ms-1"
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
