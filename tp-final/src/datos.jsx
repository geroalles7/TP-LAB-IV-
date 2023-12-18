import { Outlet, NavLink } from 'react-router-dom'
//import 'bootstrap/dist/css/bootstrap.css'

export default function Datos() {
    return (
        <>

            <ul class="navbar-nav">
                <li class="nav-item">
                    <div class="d-grid gap-1 mt-1">
                        <button type="button" class="btn btn-secondary"><NavLink to='laptops' className="nav-link">Laptops</NavLink></button>
                        <button type="button" class="btn btn-secondary"><NavLink to='discos' className="nav-link">Discos</NavLink></button>
                    
                    </div>
                </li>
                
            </ul>
            
            <div class="row bg-body-secondary position-relative mb-0">
                <div class="p-md-1 ">
                    <img src="https://smababa.com/_next/static/media/banner-gaming-web1.1280db36.jpg" width="1930" height="350"  ></img>
                </div>
            
            </div>
            

            <hr />



            <Outlet /*este outlet dentro de datos hace q se me despliegue otra lista dentro del navbar*/ />

        </>
    )
}