import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { agregarLaptop, get_laptop, edit_laptop } from "./laptop-Service";
import { Modal, Button } from "react-bootstrap";

export default function LaptopsForm() {
  const params = useParams();
  const estadoInicial = {
    id: -1,
    marca: "Apple",
    modelo: "Mac Book Pro",
    ram: 16,
    id_disco: 1,
    placa: "RTX 1060",
    precio: 988000,
  };
  const [laptop, setLaptop] = useState(estadoInicial);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    if (params.id) {
      get_laptop(parseInt(params.id, 10))
        .then((resp) => {
          setLaptop(resp.data);
          setError(null);
        })
        .catch((reason) => setError(reason.messagge));
    }
  }, [params.id]);

  const navigate = useNavigate();

  function handleEditChange(e) {
    setLaptop({ ...laptop, [e.target.id]: e.target.value });
  }

  async function aceptarCambios() {
    if (laptop.id === -1) {
      try {
        await agregarLaptop(laptop);
      } catch (ex) {
        setError(ex);
      }
    } else {
      try {
        await edit_laptop(laptop);
      } catch (ex) {
        setError(ex);
      }
    }

    navigate(-1);
  }

  function cancelarCambios() {
    navigate(-1);
  }

  function handleClose() {
    setShowModal(false);
    navigate(-1);
  }

  if (error !== null) return <h2 className="text-center">Error: {error}</h2>;
  else
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {laptop.id === -1 ? "Nueva laptop" : "Editar laptop"} ID:{" "}
            {laptop.id}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-3">
              <label className="form-label" htmlFor="marca">
                Marca
              </label>
              <input
                className="form-control"
                type="text"
                id="marca"
                value={laptop.marca}
                onChange={handleEditChange}
              ></input>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="modelo">
                Modelo
              </label>
              <input
                className="form-control"
                type="text"
                id="modelo"
                value={laptop.modelo}
                onChange={handleEditChange}
              ></input>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="ram">
                Ram (Gb)
              </label>
              <input
                className="form-control"
                type="number"
                id="ram"
                value={laptop.ram}
                onChange={handleEditChange}
              ></input>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="id_disco">
                Numero de Disco
              </label>
              <input
                className="form-control"
                type="number"
                id="id_disco"
                value={laptop.id_disco}
                onChange={handleEditChange}
              ></input>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="placa">
                Placa de Video
              </label>
              <input
                className="form-control"
                type="text"
                id="placa"
                value={laptop.placa}
                onChange={handleEditChange}
              ></input>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="precio">
                Precio
              </label>
              <input
                className="form-control"
                type="number"
                id="precio"
                value={laptop.precio}
                onChange={handleEditChange}
              ></input>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary me-1" onClick={aceptarCambios}>
            Aceptar
          </button>
          <button className="btn btn-secondary ms-1" onClick={cancelarCambios}>
            Cancelar
          </button>
        </Modal.Footer>
      </Modal>
    );
}

/* Vieja forma de agregar - editar
return (
      <>
        <div className="container">
          {laptop.id === -1 ? (
            <h2 className="text-center">Datos de la nueva laptop</h2>
          ) : (
            <h2 className="text-center">Datos de la laptop actualmente</h2>
          )}
          <div className="mb-3">
            <label className="form-label" htmlFor="descripcion">
              ID
            </label>
            <input
              className="form-control"
              type="text"
              id="id"
              value={laptop.id}
              readOnly={true}
              disabled
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="marca">
              Marca
            </label>
            <input
              className="form-control"
              type="text"
              id="marca"
              value={laptop.marca}
              onChange={handleEditChange}
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="modelo">
              Modelo
            </label>
            <input
              className="form-control"
              type="text"
              id="modelo"
              value={laptop.modelo}
              onChange={handleEditChange}
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="ram">
              Ram (Gb)
            </label>
            <input
              className="form-control"
              type="number"
              id="ram"
              value={laptop.ram}
              onChange={handleEditChange}
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="id_disco">
              Numero de Disco
            </label>
            <input
              className="form-control"
              type="number"
              id="id_disco"
              value={laptop.id_disco}
              onChange={handleEditChange}
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="placa">
              Placa de Video
            </label>
            <input
              className="form-control"
              type="text"
              id="placa"
              value={laptop.placa}
              onChange={handleEditChange}
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="precio">
              Precio
            </label>
            <input
              className="form-control"
              type="number"
              id="precio"
              value={laptop.precio}
              onChange={handleEditChange}
            ></input>
          </div>
          <div className="mb-3 text-end">
            <button className="btn btn-primary me-1" onClick={aceptarCambios}>
              Aceptar
            </button>
            <button
              className="btn btn-secondary ms-1"
              onClick={cancelarCambios}
            >
              Cancelar
            </button>
          </div>
        </div>
      </>
    );

*/
