import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';  // Importa el CSS
import App from './App.js';

ReactDOM.render(
  <React.StrictMode>
    <App />  {/* Renderiza el componente */}
  </React.StrictMode>,
  document.getElementById('root')  // Renderiza en 'index.html'
);