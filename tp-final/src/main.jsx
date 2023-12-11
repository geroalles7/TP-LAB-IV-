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


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index={true} element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='datos' element={<Datos />}>
          <Route path='laptops' element={<AbmLaptops />} />
          <Route path='laptops/agregar' element={<LaptopsForm />} />
          <Route path='laptops/:id' element={<LaptopsForm />} />
        </Route>

      </Route>
    </Routes>
  </BrowserRouter>

)
