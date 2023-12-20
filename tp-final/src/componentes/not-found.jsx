import '../style.css'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Error404 = () => {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <h1 className="display-4 text-white" id='h1-error'>404</h1>
            <p className="lead text-white " id='p-error'>Página no encontrada</p>
            <p className='text-white' id='p-error'>Lo sentimos, la página que estás buscando no existe.</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Error404;