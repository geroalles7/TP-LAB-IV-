import { useLocation, useNavigate } from "react-router-dom";
import { getLaptops, borrar } from "./laptop-Service";
import { useEffect, useState } from "react";
import '../style.css'
//import { Link } from "react-router-dom";





export default function AbmLaptops() {
    const [datos, setDatos] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); //para ir con un boton a otra pagina
    const location = useLocation();
    const [filtro, setFiltro] = useState("");
    const [todosLosDatos, setTodosLosDatos] = useState([]); // Nuevo estado



    useEffect(() => {
        refrescarDatos(); // Guardar todos los datos originales al cargar el componente

        getLaptops()
            .then((respuesta) => {
                if (respuesta.status === 200) {
                    setTodosLosDatos(respuesta.data);
                } else {

                    <div class="alert alert-danger" role="alert">
                        A simple danger alert—check it out!
                    </div>
                }
            })
            .catch((reason) => setError(reason.message));
    }, []);

    function refrescarDatos() {
        getLaptops()
            .then((respuesta) => {
                if (respuesta.status === 200) {
                    // Aplicar filtro a los datos
                    const laptopsFiltradas = respuesta.data.filter(
                        (laptop) =>
                            laptop.marca.toLowerCase().includes(filtro.toLowerCase()) ||
                            laptop.modelo.toLowerCase().includes(filtro.toLowerCase())
                    );

                    setDatos(laptopsFiltradas);

                    if (laptopsFiltradas.length === 0) {
                        alert("No se encontraron laptops o los datos ingresados son invalidos");
                    }
                } else {
                    alert(respuesta.statusText);
                }
            })
            .catch((reason) => setError(reason.message));
    }


    async function borrarLaptop(id) {
        await borrar(parseInt(id, 10));

        refrescarDatos();
    }

    function editarLaptop(id) {
        navigate(`${id}`);


    }
    function verInfo(id) {
        navigate(`ver/${id}`);

    }

    function buscar() {
        refrescarDatos();
    }

    function limpiarFiltro() {
        setFiltro("");
        setDatos(todosLosDatos); // Mostrar todos los datos al limpiar
    }
    return (
        <>

            <div id='conta'>
                <h1 className="text-white text-center">Laptops</h1><br />
                <div class="mb-1 d-grid gap-2 col-6 mx-auto">
                    <input 
                        id="place-holder"
                        className="d-grid gap-2 col-6 mx-auto"
                        type="text"
                        placeholder="Buscar marca o modelo"
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                    <button className="btn btn-primary d-grid gap-2 col-6 mx-auto" id='btn-buscar'  onClick={buscar}>
                        Buscar
                    </button>
                    <button className="btn btn-secondary d-grid gap-2 col-6 mx-auto" id='btn-limpiar' onClick={limpiarFiltro}>
                        Limpiar
                    </button>
                    <br /><br />

                </div>

            </div>



            {error ? <h1>Error: {error}</h1> : null}
            <div class="container "><br />

                <table class="table table-dark ">
                    <thead>
                        <tr>
                            <th>ID</th><th>Marca</th><th>Modelo</th><th>Precio</th><th>Acciones</th>
                        </tr>

                    </thead>
                    <tbody>

                        {datos.map((t) => (
                            <tr key={t.id}>
                                <td>{t.id} </td>
                                <td>{t.marca}</td>
                                <td>{t.modelo}</td>
                                <td>{t.precio}</td>
                                <td >
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
                <div class="align-items-center">
                    <button className="btn btn-primary d-grid gap-2 col-6 mx-auto" onClick={() => navigate("agregar")}>Agregar</button><br />
                </div>

            </div>

        </>
    )

}
