import { Outlet, NavLink } from 'react-router-dom'


export default function Datos() {
    return (
        <>

            <ul class="navbar-nav">
                <li class="nav-item">
                    <div class="d-grid gap-1 mt-1"> <br />
                        <button type="button" class="btn btn-warning d-grid gap-2 col-6 mx-auto"><NavLink to='laptops' className="nav-link">Laptops</NavLink></button><br />
                        <button type="button" class="btn btn-warning d-grid gap-2 col-6 mx-auto"><NavLink to='discos' className="nav-link">Discos</NavLink></button>
                    </div>
                </li>
                
            </ul><br /> <br /> <br /> <br />
            



            <Outlet /*este outlet dentro de datos hace q se me despliegue otra pagina en la misma ventana*/ />

        </>
    )
}