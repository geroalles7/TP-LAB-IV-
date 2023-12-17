import {Outlet, NavLink} from 'react-router-dom'

export default function Datos(){
    return (
        <>
        <ul class="navbar-nav">
              <li class="nav-item"><NavLink to='laptops' className="nav-link">Laptops</NavLink></li>
              <li class="nav-item"><NavLink to='discos' className="nav-link">Discos</NavLink></li>
             
            </ul>

            <hr />

            <Outlet /*este outlet dentro de datos hace q se me despliegue otra lista dentro del navbar*/ />
        
        </>
    )
}