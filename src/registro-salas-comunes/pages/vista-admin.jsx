import React, { useState } from 'react';
import "../styles/admin.css"; // Archivo CSS donde estarán los estilos

const VistaAdmin = () => {
  const [lugar, setLugar] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const usuarioTienePermiso = () => {
    return true; // Cambia a false para probar sin permisos
  };

  const manejarSubmit = (e) => {
    e.preventDefault();

    if (!usuarioTienePermiso()) {
      setError('No tienes permisos para añadir lugares.');
      return;
    }

    if (lugar && descripcion) {
      console.log('Añadir lugar:', lugar, descripcion);
      setError('');
      setSuccess('Lugar añadido correctamente.');
      setLugar('');
      setDescripcion('');
    } else {
      setError('Todos los campos son obligatorios.');
    }
  };

  return (
    <div className="admin-container">
      <h1>Vista Admin</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={manejarSubmit} className="admin-form">
        <div className="form-group">
          <label htmlFor="lugar">Añade lugar:</label>
          <input
            type="text"
            id="lugar"
            name="lugar"
            value={lugar}
            onChange={(e) => setLugar(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows="4"
            required
          />
        </div>
        <button type="submit" className="submit-button">Añadir Lugar</button>
      </form>
    </div>
  );
};

export default VistaAdmin;
