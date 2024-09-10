import React, { useState } from 'react';
import axios from 'axios';

const Registro = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    if (userData.password !== userData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
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
          <label htmlFor="username">Nombre completo:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
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
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={userData.confirmPassword}
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

