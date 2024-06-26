import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
//import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import AbmLaptops from './componentes/laptops-Abm.jsx'
import LaptopsForm from './componentes/laptops-Form.jsx'
import About from './about.jsx'
import Datos from './datos.jsx'
import Home from './home.jsx'
import LaptopsInfo from './componentes/laptop-info.jsx'
import AbmDiscos from './componentes/discos-Abm.jsx'
import NotFound from './componentes/not-found.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(  //configuro las rutas de mi app
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index={true} element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='datos' element={<Datos />}>
          <Route path='laptops' element={<AbmLaptops />} />
          <Route path='laptops/agregar' element={<LaptopsForm />} />
          <Route path='laptops/:id' element={<LaptopsForm />} />
          <Route path='laptops/ver/:id' element={<LaptopsInfo />} />
          <Route path='discos' element={<AbmDiscos />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>

)
