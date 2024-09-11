import React, { useState } from 'react';
import axios from 'axios';

const Registro = () => {
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phone: '',
    departmentNumber: '',
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
    if (!userData.fullName || !userData.email || !userData.phone || !userData.departmentNumber) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    axios.post('http://localhost:3001/register', userData)
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
          <label htmlFor="fullName">Nombre completo:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={userData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Teléfono:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="departmentNumber">Número de departamento:</label>
          <input
            type="text"
            id="departmentNumber"
            name="departmentNumber"
            value={userData.departmentNumber}
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
