import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import AbmLaptops from "./componentes/laptops-Abm.jsx";
import LaptopsForm from "./componentes/laptops-Form.jsx";
import About from "./about.jsx";
import Home from "./home.jsx";
import LaptopsInfo from "./componentes/laptop-info.jsx";
import NotFound from "./notFound";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index={true} element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="laptops" element={<AbmLaptops />} />
        <Route path="laptops/agregar" element={<LaptopsForm />} />
        <Route path="laptops/:id" element={<LaptopsForm />} />
        <Route path="laptops/ver/:id" element={<LaptopsInfo />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
