import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { agregarLaptop, getLaptop, editar, get_Discos } from './laptop-Service';
import { Modal, Form } from "react-bootstrap";
import { HttpStatusCode } from "axios";


export default function LaptopsForm() {

    const params = useParams();
    const estadoInicial = { id: -1, marca: '', modelo: '', ram: null, id_disco: null, placa: '', precio: null };
    const [laptop, setLaptop] = useState(estadoInicial);
    const [error, setError] = useState()
    const [discos, setDiscos] = useState([]);


    useEffect(() => {
        if (params.id) {
            getLaptop(parseInt(params.id, 10))
                .then(resp => {
                    setLaptop(resp.data);
                    setError(null);
                })
                .catch(reason => setError(reason.messagge));

        }
        setTimeout(() => {
            obtener_discos();
        }, 1000);
    }, [params.id]);




    function obtener_discos() {
        get_Discos()
            .then((resp) => {
                if (resp.status === HttpStatusCode.Ok) setDiscos(resp.data);
                else setError(resp);
            })
            .catch((reason) => setError(reason));
    }

    const navigate = useNavigate();



    function handleEditChange(e) {      //para que se muestre cuando escribo en los input text
        setLaptop({ ...laptop, [e.target.id]: e.target.value });


    }
    function validarCamposEditar() {
        // Verificar que todos los campos estén completos
        if (laptop.marca === '' ||laptop.modelo==='' ||  laptop.ram==''|| laptop.id_disco==null || laptop.placa==='' || laptop.precio==0) {
           
            alert('Por favor, complete todos los campos.');
            return false;
        }

        // Puedes agregar más validaciones según tus necesidades
      
        return true;
    }

    function validarCamposAgregar() {
        // Verificar que todos los campos estén completos
        if (laptop.marca === '' ||laptop.modelo==='' ||  laptop.ram==null|| laptop.id_disco==null || laptop.placa==='' || laptop.precio==0) {
           
            alert('Por favor, complete todos los campos.');
            return false;
        }

        // Puedes agregar más validaciones según tus necesidades
      
        return true;
    }

    async function aceptarCambios() {

        
        if (laptop.id === -1) {
            try {
                
               
                if (!validarCamposAgregar()) { // Validar todos los campos
                    return;
                }

                if (laptop.id === -1) {
                    await agregarLaptop(laptop);
                    
                } 

                
            } catch (ex) {
                setError(ex);
            }

        }
        else {
            try {
                if (!validarCamposEditar()) {
                    return;
                }
            
                try {
                    await editar(laptop);
                } catch (ex) {
                    setError(ex);
                }
                
                
            }
            catch (ex) {
                setError(ex);
            }


        }

        navigate(-1); //vuelvo a donde esta la lista 
    }
    
    function cancelarCambios() {
        navigate(-1);
    }

    return (
        <>
            <div className='container'>

                <h2>Datos del Laptop</h2>
                <div className="mb-3">
                    <label className="form-label" htmlFor="descripcion">ID</label>
                    <input className="form-control" type="text" id="id" value={laptop.id}
                        readOnly={true} disabled />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="marca">Marca</label>
                    <input className="form-control" type="text" id="marca" value={laptop.marca}
                        onChange={handleEditChange}></input>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="modelo">Modelo</label>
                    <input className="form-control" type="text" id="modelo" value={laptop.modelo}
                        onChange={handleEditChange}  ></input>
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="ram">Ram (Gb)</label>
                    <input className="form-control" type="number" id="ram" value={laptop.ram}
                        onChange={handleEditChange} ></input>
                </div>
                <div className="mb-3">
                    <Form>
                        <Form.Group controlId="exampleForm.SelectCustom">
                            <Form.Label>Selecciona una opción de disco:</Form.Label>
                            <Form.Select custom onChange={handleEditChange} id="id_disco">
                                <option value={-1}> </option>
                                {discos.map((disco) => (
                                    <option key={disco.id} value={disco.id}>
                                        Capacidad: {disco.tamaño} GB, Marca: {disco.marca},
                                        Tipo: {disco.tipo}

                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="placa">Placa de Video</label>
                    <input className="form-control" type="text" id="placa" value={laptop.placa}
                        onChange={handleEditChange} ></input>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="precio">Precio</label>
                    <input className="form-control" type="number" id="precio" value={laptop.precio}
                        onChange={handleEditChange} ></input>
                </div>

                <div className="mb-3 text-end">
                    <button className="btn btn-primary me-1" onClick={aceptarCambios}>Aceptar</button>
                    <button className="btn btn-secondary ms-1" onClick={cancelarCambios}>Cancelar</button>
                </div>
            </div>




        </>
        

    )
}
