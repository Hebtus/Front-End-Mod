import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";


const root = ReactDOM.createRoot(
    document.getElementById('root')
  );

  root.render(<App/>);
  
  
//ReactDOM.render(<App/>, document.getElementById("root"))