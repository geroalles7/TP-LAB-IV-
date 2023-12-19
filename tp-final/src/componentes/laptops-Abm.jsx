import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; //Outlet
import { getLaptops, borrar } from "./laptop-Service";
import { HttpStatusCode } from "axios";
import { Modal, Button, Form } from "react-bootstrap";

export default function AbmLaptops() {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);
  const [borrarId, setBorrarId] = useState(null);
  const navigate = useNavigate(); //para ir con un boton a otra pagina

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLaptops, setFilteredLaptops] = useState([]);

  useEffect(() => {
    refreshData();
  }, []);

  function refreshData() {
    getLaptops()
      .then((resp) => {
        if (resp.status === HttpStatusCode.Ok) {
          setDatos(resp.data);
          setFilteredLaptops(resp.data);
        } else setError(resp);
      })
      .catch((reason) => setError(reason));
  }

  useEffect(() => {
    // Filtras las laptops por marca o modelo cuando searchTerm cambia
    const filtered = datos.filter(
      (laptop) =>
        laptop.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
        laptop.modelo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLaptops(filtered);
  }, [searchTerm, datos]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes realizar la búsqueda utilizando searchTerm en tu API
    // Actualiza la función de tu API con la lógica específica de búsqueda
    // Puedes enviar searchTerm a tu API y devolver los resultados filtrados
    // tanto por marca como por modelo
    // getLaptopsByMarcaYModelo(searchTerm).then((data) => {
    //   setFilteredLaptops(data);
    // });
  };

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
  if (!datos)
    return <div className="h2 text-black-50 text-center">Cargando...</div>;

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="m-2">Laptops</h1>
          </div>
          <div className="col text-end ">
            <Form onSubmit={handleSearchSubmit} className="d-flex m-2">
              <Form.Control
                type="text"
                placeholder="Buscar por marca..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <Button type="submit" variant="secondary" className="m-2">
                Buscar
              </Button>
              <button
                className="btn btn-primary btn-lg m-2"
                style={{ width: "150px" }}
                onClick={() => navigate("agregar")}
              >
                Agregar
              </button>
            </Form>
          </div>
        </div>

        {!datos ? (
          <div className="h2 text-black-50 text-center">Cargando...</div>
        ) : (
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
                    ${" "}
                    {t.precio.toLocaleString("es-AR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
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
            {/* Muestra la lista de laptops filtradas */}
            {filteredLaptops.map((laptop) => (
              <div key={laptop.id}>
                <p>Marca: {laptop.marca}</p>
                <p>Modelo: {laptop.modelo}</p>
                {/* Agrega el resto de la información de la laptop aquí */}
              </div>
            ))}
          </table>
        )}
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
