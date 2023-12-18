
import { Outlet, NavLink, Link } from "react-router-dom"
//import 'bootstrap/dist/css/bootstrap.css'



function App() {


  return (
    <>
      <nav className="navbar-expand-lg">
        <div className="container-fluid bg-dark fs-4">
          <NavLink to="/" className="navbar-brand fs-1 text-white " >LAPTOPS GAMERS</NavLink>
          
          
          <img src=" https://w7.pngwing.com/pngs/876/785/png-transparent-%E5%8D%8E%E7%A1%95-laptop-logo-asus-zenfone-3-zoom-ze553kl-laptop-electronics-text-computer-thumbnail.png" width="300" height="150" ></img>
          <img src="https://w7.pngwing.com/pngs/57/627/png-transparent-asus-rog-1-hd-logo-thumbnail.png" width="300" height="150" ></img>
          <img src="https://elchapuzasinformatico.com/wp-content/uploads/2015/07/Logo-Aorus.png" width="300" height="150" ></img>
          <img src="https://images.samsung.com/is/image/samsung/assets/global/about-us/brand/logo/360_197_1.png?$FB_TYPE_B_PNG$" width="300" height="150" ></img>
          <img src="https://w7.pngwing.com/pngs/720/1000/png-transparent-laptop-lenovo-legion-y520-tom-clancy-s-rainbow-six-siege-lenovo-legion-y720-detroit-become-human.png" width="300" height="150" ></img>
          
          
          <div class="collapse navbar-collapse " id="navbarNav">
          <ul className="navbar-nav">
            <div class="m-1">
              <li><NavLink to='datos' className="nav-link text-white mr-2">Datos</NavLink></li>
            </div>
            <div class="m-1">
              <li className="nav-item"><NavLink to='about' className="nav-link text-white">Acerca de</NavLink></li>
            </div>

             
          </ul>
          </div>
        </div>
      </nav>


     

      <Outlet />
    </>
  )
}

export default App
/*<nav className="navbar navbar-expand-lg" >
        <div className="container-fluid p-3 mb-2 bg-info text-dark">
          <NavLink to="/" className="navbar-brand">Compra gamer</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav">

              <li class="nav-item"><NavLink to='datos' className="nav-link">Datos</NavLink></li>
              <li className="nav-item"><NavLink to='about' className="nav-link">Acerca de</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>
*/