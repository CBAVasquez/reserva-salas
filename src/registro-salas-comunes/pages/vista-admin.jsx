import React, { useState, useEffect } from 'react';
import axios from 'axios';


const VistaAdmin = () => {
  const [lugar, setLugar] = useState('');
  const [salas, setSalas] = useState([]);

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const response = await axios.get('/api/salas');
        setSalas(response.data);
      } catch (error) {
        console.error('Error al obtener las salas:', error);
      }
    };
    fetchSalas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/salas', { lugar });
      setLugar(''); // Limpiar el input después de enviar
      // Re-fetch the salas after adding a new one
      const response = await axios.get('/api/salas');
      setSalas(response.data);
    } catch (error) {
      console.error('Error al agregar el lugar:', error);
    }
  };

  return (
    <div>
      <h1>Registro de Salas Comunes</h1>
      <form onSubmit={handleSubmit}>
        <label>Añade lugar:</label>
        <input
          type="text"
          value={lugar}
          onChange={(e) => setLugar(e.target.value)}
          required
        />
        <button type="submit">Agregar</button>
      </form>
      <h2>Salas Registradas</h2>
      <ul>
        {salas.map((sala) => (
          <li key={sala.id}>{sala.lugar}</li>
        ))}
      </ul>
    </div>
  );
};

export default VistaAdmin;

