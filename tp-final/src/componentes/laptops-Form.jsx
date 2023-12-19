import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  agregarLaptop,
  get_laptop,
  edit_laptop,
  get_discos,
} from "./laptop-Service";
import { Modal, Form, Button } from "react-bootstrap";
import { HttpStatusCode } from "axios";

export default function LaptopsForm() {
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
  const [discos, setDiscos] = useState([]);

  const [showModal, setShowModal] = useState(true);
  const params = useParams();
  const [error, setError] = useState(null);
  const [showModalError, setShowModalError] = useState(false);

  useEffect(() => {
    if (params.id) {
      get_laptop(parseInt(params.id, 10))
        .then((resp) => {
          setLaptop(resp.data);
          setError(null);
        })
        .catch((reason) => setError(reason.messagge));
    }

    setTimeout(() => {
      obtener_discos();
    }, 1000);
  }, [params.id]);

  function obtener_discos() {
    get_discos()
      .then((resp) => {
        if (resp.status === HttpStatusCode.Ok) setDiscos(resp.data);
        else setError(resp.statusText);
      })
      .catch((reason) => setError(reason.messagge));
  }

  const navigate = useNavigate();

  function handleEditChange(e) {
    setLaptop({ ...laptop, [e.target.id]: e.target.value });
  }

  async function aceptarCambios() {
    if (laptop.id === -1) {
      try {
        await agregarLaptop(laptop);
        navigate(-1);
      } catch (ex) {
        console.error("Error:", ex.message); // Imprime el mensaje del error
        console.error("Nombre del error:", ex.name); // Imprime el nombre del error
        console.error("Trama de pila:", ex.stack); // Imprime la trama de pila del error
        console.error(ex);
        setError(ex.messagge);
        setShowModalError(true);
      }
    } else {
      try {
        await edit_laptop(laptop);
        navigate(-1);
      } catch (error) {
        console.error("Error:", error.message); // Imprime el mensaje del error
        console.error("Trama de pila:", error.stack); // Imprime la trama de pila del error
        console.error("Error al editar la laptop:", error.response);
        console.error(error);
        setError(error);
        setShowModalError(true);
      }
    }
    //if (error === null) navigate(-1);
  }

  function cancelarCambios() {
    navigate(-1);
  }

  function handleClose() {
    setShowModal(false);
    setShowModalError(false);
    navigate(-1);
  }

  if (error !== null) {
    return (
      <Modal show={showModalError} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>¡Error!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{error.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else
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
                Ram (GB)
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
              <Form>
                <Form.Group controlId="exampleForm.SelectCustom">
                  <Form.Label>Selecciona una opción de disco:</Form.Label>
                  <Form.Select custom onChange={handleEditChange} id="id_disco">
                    <option value={laptop.id_disco}> </option>
                    {discos.map((disco) => {
                      const optionText = `Capacidad: ${disco.tamanio} GB, Marca: ${disco.marca}, Tipo: ${disco.tipo}`;
                      const isActual = disco.id === laptop.id_disco;

                      return (
                        <option key={disco.id} value={disco.id}>
                          {isActual ? `${optionText} (actual)` : optionText}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
              </Form>
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

/* backup input id_disco 
<input
                className="form-control"
                type="number"
                id="id_disco"
                value={laptop.id_disco}
                onChange={handleEditChange}
              ></input>
*/
