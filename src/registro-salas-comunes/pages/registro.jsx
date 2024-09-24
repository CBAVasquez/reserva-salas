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
      [e.target.name]: e.target.value, // Cambiado a e.target.name
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación simple de campos vacíos
    if (!userData.nombre || !userData.correo || !userData.telefono || !userData.depto) {
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
    <div>
      <h2>Registro de Usuario</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" name="nombre" value={userData.nombre} onChange={handleChange} required />
        </div>
        <div>
          <label>Correo electrónico:</label>
          <input type="email" name="correo" value={userData.correo} onChange={handleChange} required />
        </div>
        <div>
          <label>Teléfono:</label>
          <input type="tel" name="telefono" value={userData.telefono} onChange={handleChange} required />
        </div>
        <div>
          <label>Número de departamento:</label>
          <input type="text" name="depto" value={userData.depto} onChange={handleChange} required />
        </div>
        <button type="submit">Continuar</button>
      </form>
    </div>
  );
};

export default Registro;
