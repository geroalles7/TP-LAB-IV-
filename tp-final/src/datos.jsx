import { Outlet, NavLink } from "react-router-dom";

export default function Datos() {
  return (
    <>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink to="laptops" className="nav-link">
            Laptops
          </NavLink>
        </li>
      </ul>

      <hr />

      <Outlet /*este outlet dentro de datos hace q se me despliegue otra lista dentro del navbar*/
      />
    </>
  );
}
