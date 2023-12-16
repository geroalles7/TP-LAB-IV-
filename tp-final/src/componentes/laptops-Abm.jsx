import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getLaptops, borrar } from "./laptop-Service";
import { HttpStatusCode } from "axios";
import { Modal, Button } from "react-bootstrap";

export default function AbmLaptops() {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);
  const [borrarId, setBorrarId] = useState(null);
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

  async function handleBorrarLaptop(id) {
    setBorrarId(id);
  }

  const handleConfirmBorrar = async () => {
    await borrar(parseInt(borrarId, 10));
    setBorrarId(null);
    refreshData();
  };

  const handleCancelarBorrar = () => {
    setBorrarId(null);
  };

  function editarLaptop(id) {
    navigate(`${id}`);
  }

  function verInfo(id) {
    navigate(`ver/${id}`);
  }

  if (error !== null) return <h2 className="text-center">Error: {error}</h2>;
  else
    return datos.length <= 0 ? (
      <div className="container text-center h2">
        No hay registros de laptops
      </div>
    ) : (
      <>
        <div className="container">
          <div className="row">
            <div className="col">
              <h1>Laptops</h1>
            </div>
            <div className="col text-end">
              <button
                className="btn btn-primary btn-lg"
                style={{ width: "150px" }}
                onClick={() => navigate("agregar")}
              >
                <b>Agregar</b>
              </button>
            </div>
          </div>

          <table className="table table-striped table-hover table-bordered">
            <thead className="text-center">
              <tr>
                <th>ID</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((t) => (
                <tr key={t.id}>
                  <th>
                    <Link to={`ver/${t.id}`}>{t.id}</Link>
                  </th>
                  <td>{t.marca}</td>
                  <td>{t.modelo}</td>
                  <td>
                    <b>$ </b> {t.precio}
                  </td>
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
                      onClick={() => handleBorrarLaptop(t.id)}
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal de confirmación */}
        <Modal show={!!borrarId} onHide={handleCancelarBorrar}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Borrado</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>¿Estás seguro de que deseas borrar esta laptop?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelarBorrar}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleConfirmBorrar}>
              Borrar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}
