import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { agregarLaptop, get_laptop, edit_laptop } from "./laptop-Service";

export default function LaptopsForm() {
  const params = useParams();
  const estadoInicial = {
    id: -1,
    marca: "apple",
    modelo: "Falcon",
    ram: 16,
    id_disco: 1,
    placa: "rtx 3050",
    precio: 100000,
  };
  const [laptop, setLaptop] = useState(estadoInicial);
  const [error, setError] = useState();

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
    //para que se muestre cuando escribo en los input text
    setLaptop({ ...laptop, [e.target.id]: e.target.value });
  }

  async function aceptarCambios() {
    //se fija si edita o si agrega algo nuevo
    if (laptop.id === -1) {
      try {
        await agregarLaptop(laptop); //await es para que espere
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

    navigate(-1); //vuelvo a donde esta la lista
  }

  function cancelarCambios() {
    navigate(-1);
  }

  if (error !== null)
    return <h2 className="text-center">Error: {error.message}</h2>;
  else
    return (
      <>
        <div className="container">
          <h2>Datos del Laptop</h2>
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
      //los botones de aceptar y cancelar estan pero me los tapa el footer
      /*<div className="mb-3">
        <label className="form-label" htmlFor="tipo_disco">Tipo de Disco</label>
        <input className="form-control" type="text" id="tipo_disco" value={laptop.disco}
            onChange={handleEditChange} ></input>
    </div>
    <div className="mb-3">
        <label className="form-label" htmlFor="marca_disco">Marca del Disco</label>
        <input className="form-control" type="text" id="marca_disco" value={laptop.disco}
            onChange={handleEditChange} ></input>
    </div>
    <div className="mb-3">
        <label className="form-label" htmlFor="modelo_disco">Modelo del Disco</label>
        <input className="form-control" type="text" id="modelo_disco" value={laptop.disco}
            onChange={handleEditChange} ></input>
    </div>
    <div className="mb-3">
        <label className="form-label" htmlFor="tam_disco">Tamaño del Disco (Gb)</label>
        <input className="form-control" type="number" id="tam_disco" value={laptop.disco}
            onChange={handleEditChange} ></input>
    </div>*/
    );
}
