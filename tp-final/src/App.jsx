
import { Outlet, NavLink, Link } from "react-router-dom"
//import 'bootstrap/dist/css/bootstrap.css'
import './style.css'



function App() {


  return (
    <>
      <body className='mi-body' >
        <header>
          <div className='logo'>
            <NavLink to="/" id="nav-link"><img src="https://www.shutterstock.com/image-vector/game-joystick-shape-letter-m-600nw-1872804460.jpg" /></NavLink>
            <NavLink to="/" id="nav-link"><h2>LAPTOPS GAMERS</h2></NavLink>
          </div>
          <nav>
            <NavLink to='datos' id="nav-link">Datos</NavLink>
            <NavLink to='about' id="nav-link">Acerca de</NavLink>
          </nav>

        </header>
        <Outlet />
        <footer className='pie-pagina'>
          <div className='grupo-1'>
            <div className='box'>
              <figure>
                <NavLink to="/" id="nav-link"><img src="https://www.shutterstock.com/image-vector/game-joystick-shape-letter-m-600nw-1872804460.jpg" id='imag' /></NavLink>
              </figure>
            </div>
            <div className='box'>
              <h2>SOBRE NOSOTROS</h2>
              <p>Somos un grupo de trabajo listos para programar</p>
            </div>
            <div className='box'>
              <h2>SIGUENOS</h2>
              <div className='redes-sociales'>
                <a href="#" className='facebook'><img src="https://i.pinimg.com/550x/26/44/71/2644715e522b51c640dc1d31db1cee4c.jpg" width={"60px"} /></a>
                <a href="#" className='instagram'><img src="https://estaticos-cdn.prensaiberica.es/clip/8817bf72-3547-4725-b0a8-a7f7fa99ccb7_source-aspect-ratio_default_0.jpg" width={"120px"} /></a>
                <a href="#"></a>
                <a href="#" className='twitter'><img src="https://i.pinimg.com/736x/5b/73/45/5b73459960abeab3bd7be40fdc2fd6c3.jpg" width={"55px"} /></a>
                <a href="#" className='youtube'> <img src="https://i.pinimg.com/564x/bd/ba/41/bdba4124abd920ffddc70c6f815cd0c2.jpg" width={"65px"} /></a>
              </div>
            </div>
          </div>
          <div className='grupo-2'>
            <small>&copy; 2023  <b>LAPTOPS GAMERS</b> - Todos los derechos reservados.</small>
          </div>
        </footer>
      </body>
      
    </>
  )
}

export default App
