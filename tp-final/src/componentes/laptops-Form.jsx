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
    marca: "",
    modelo: "",
    ram: null,
    id_disco: null,
    placa: "",
    precio: null,
  };
  const [laptop, setLaptop] = useState(estadoInicial);
  const [discos, setDiscos] = useState([]);

  const [showModal, setShowModal] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
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
    }, 10);
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
    // Ocultar la ventana modal de éxito
    setShowSuccessModal(false);

    // Validaciones
    if (
      !laptop.marca ||
      !laptop.modelo ||
      !laptop.ram ||
      isNaN(laptop.ram) ||
      !laptop.id_disco ||
      isNaN(laptop.id_disco) ||
      !laptop.precio ||
      isNaN(laptop.precio)
    ) {
      // Si algún campo requerido está vacío o los campos numéricos no son válidos, muestra una alerta
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    // Mostrar modal de confirmación
    setConfirmMessage(
      `¿Estás seguro de que deseas ${
        laptop.id === -1 ? "agregar" : "editar"
      } esta laptop?`
    );

    setShowConfirmModal(true);
  }

  function handleConfirmAction() {
    // Realizar la acción confirmada
    if (laptop.id === -1) {
      // Agregar laptop
      agregarLaptop(laptop)
        .then(() => {
          // Mostrar modal de éxito

          setShowSuccessModal(true);
          setTimeout(() => {
            navigate(-1);
          }, 3000);
        })
        .catch((ex) => {
          console.error(ex);
          setError(ex.message);
          setShowModalError(true);
        });
    } else {
      // Editar laptop
      edit_laptop(laptop)
        .then(() => {
          // Mostrar modal de éxito
          setShowSuccessModal(true);
          setTimeout(() => {
            navigate(-1);
          }, 3000);
        })
        .catch((error) => {
          console.error(error);
          setError(error.message);
          setShowModalError(true);
        });
    }

    // Ocultar modal de confirmación
    setShowConfirmModal(false);
  }

  function cancelarCambios() {
    navigate(-1);
  }

  function handleClose() {
    setShowModal(false);
    setShowModalError(false);
    navigate(-1);
  }

  function handleCancelarConfirm() {
    setShowConfirmModal(false);
  }

  function handleCerrarSuccess() {
    setShowSuccessModal(false);
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
      <>
        <Modal show={showConfirmModal} onHide={handleCancelarConfirm}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Acción</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{confirmMessage}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelarConfirm}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleConfirmAction}>
              Confirmar
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showSuccessModal} onHide={handleCerrarSuccess}>
          <Modal.Header closeButton>
            <Modal.Title>Cambios Guardados</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Los cambios han sido guardados correctamente.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCerrarSuccess}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>

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
                  placeholder="Apple"
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
                  placeholder="Mac Book Pro"
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
                  placeholder="16"
                  id="ram"
                  value={laptop.ram}
                  onChange={handleEditChange}
                ></input>
              </div>
              <div className="mb-3">
                <Form>
                  <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label>Selecciona una opción de disco:</Form.Label>
                    <Form.Select
                      custom
                      onChange={handleEditChange}
                      id="id_disco"
                    >
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
                  placeholder="RTX 1060"
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
                  placeholder="500000"
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
            <button
              className="btn btn-secondary ms-1"
              onClick={cancelarCambios}
            >
              Cancelar
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
}
