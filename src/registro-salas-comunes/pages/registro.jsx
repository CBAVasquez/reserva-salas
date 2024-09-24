import React, { useState } from 'react';
import axios from 'axios';

const Registro = () => {
  const [userData, setUserData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    depto: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación simple de campos vacíos
    if (!userData.nombre || !userData.correo || !userData.telefono || !userData.depto) {
      setError('Por favor, complete todos los campos.');
      return;
    }
  
    // Convertir depto a número antes de enviar
    const datosAEnviar = {
      ...userData,
      depto: parseInt(userData.depto, 10) // Convertir depto a un número entero
    };
  
    axios.post('http://localhost:3000/usuario/create', datosAEnviar)
      .then((response) => {
        setSuccess('Registro exitoso.');
        setError('');
      })
      .catch((error) => {
        console.error('Error al registrar el usuario:', error);
        setError('Hubo un problema al registrar el usuario.');
        setSuccess('');
      });
  };
  

  return (
    <div className="form-container">
      <h1>Registro de Usuario</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre completo:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={userData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="correo">Correo electrónico:</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={userData.correo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            value={userData.telefono}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="depto">Número de departamento:</label>
          <input
            type="text"
            id="depto"
            name="depto"
            value={userData.depto}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">Registrarse</button>
      </form>
    </div>
  );
};

export default Registro;
