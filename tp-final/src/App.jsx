import { Outlet, NavLink, Link } from "react-router-dom";

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <img
            src="src/assets/icon-laptop.png"
            alt="logo"
            className="navbar-brand-logo me-3"
          />
          <NavLink to="/" className="navbar-brand h1">
            LaptopLand
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="laptops" className="nav-link active">
                  Laptops
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/*}
      <nav className="navbar navbar-expand-lg navbar-dark bg-success border-bottom border-body">
        <div className="container-fluid align-items-center p-4">
          <img
            src="src/assets/icon-laptop.png"
            alt="logo"
            className="navbar-brand-logo me-3"
          />
          <NavLink to="/" className="navbar-brand h1">
            LaptopLand
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink to="laptops" className="nav-link">
                  Productos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="about" className="nav-link">
                  Acerca de
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  */}
      <Outlet />

      <footer className="fixed-bottom w-100 p-3 bg-light">
        <div className="container d-flex align-items-center justify-content-between">
          <Link to="/" className="fs-5 text-decoration-none">
            Volver al inicio
          </Link>
          <div className="fs-5">@Copyright 2023</div>
        </div>
      </footer>
    </>
  );
}

export default App;
