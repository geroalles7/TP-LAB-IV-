
import { Outlet, NavLink, Link } from "react-router-dom"
//import 'bootstrap/dist/css/bootstrap.css'
import './style.css'



function App() {


  return (
    <>
      
      
      <nav className="navbar-expand-lg" id='miNav'>
        <div className="container-fluid bg-dark border-bottom border-body fs-4"  id='encabezado'>
        <img src="data:image/png;base64,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" width="100" height="75"></img>
          <NavLink to="/" className="navbar-brand fs-1 text-white text-center" id='link'>LAPTOPS GAMERS</NavLink>

          <ul className="navbar-nav" id='lol'>
            <div class="m-1" id='datos'>
              <li><NavLink to='datos' className="nav-link text-white mr-2">Datos</NavLink></li>
            </div>
            <div class="m-1" id='acercade'>
              <li className="nav-item"><NavLink to='about' className="nav-link text-white">Acerca de</NavLink></li>
            </div>
          </ul>
        </div>
      </nav>
      


     

      <Outlet />
    </>
  )
}

export default App
/*<nav className="navbar-expand-lg">
        <div className="container-fluid bg-dark fs-4">
          <NavLink to="/" className="navbar-brand fs-1 text-white " >LAPTOPS GAMERS</NavLink>
          
          
          <img src=" https://w7.pngwing.com/pngs/876/785/png-transparent-%E5%8D%8E%E7%A1%95-laptop-logo-asus-zenfone-3-zoom-ze553kl-laptop-electronics-text-computer-thumbnail.png"width="150" height="75"  ></img>
          <img src="https://w7.pngwing.com/pngs/57/627/png-transparent-asus-rog-1-hd-logo-thumbnail.png" width="150" height="75" ></img>
          <img src="https://elchapuzasinformatico.com/wp-content/uploads/2015/07/Logo-Aorus.png" width="150" height="75"  ></img>
          <img src="https://images.samsung.com/is/image/samsung/assets/global/about-us/brand/logo/360_197_1.png?$FB_TYPE_B_PNG$" width="150" height="75"  ></img>
          <img src="https://w7.pngwing.com/pngs/720/1000/png-transparent-laptop-lenovo-legion-y520-tom-clancy-s-rainbow-six-siege-lenovo-legion-y720-detroit-become-human.png" width="150" height="75"  ></img>
          
          
         
          
          <div class="collapse navbar-collapse " id="navbarNav">
          <ul className="navbar-nav">
            <div class="m-1" >
              <li><NavLink to='datos' className="nav-link text-white mr-2">Datos</NavLink></li>
            </div>
            <div class="m-1">
              <li className="nav-item"><NavLink to='about' className="nav-link text-white">Acerca de</NavLink></li>
            </div>

             
          </ul>
          </div>
        </div>
      </nav>*/