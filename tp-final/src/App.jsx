
import { Outlet, NavLink, Link} from "react-router-dom"

function App() {
 

  return (
    <>
       <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <NavLink to="/" className="navbar-brand">Compra gamer</NavLink>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              
              <li class="nav-item"><NavLink to='datos' className="nav-link">Datos</NavLink></li>
              <li class="nav-item"><NavLink to='about' className="nav-link">Acerca de</NavLink></li>
            </ul>
          </div>
        </div>
      </nav> 
      
      <Outlet />
      
      <footer className="fixed-bottom w-100 mt-5 p-3 bg-light">
          <div className="d-flex align-items-center justify-content-between">
            <Link to='/' className='fs-5'>Volver al inicio</Link>
            <div className="fs-5">@Copyright 2023</div>
          </div>
      </footer>
    </>
  )
}

export default App
