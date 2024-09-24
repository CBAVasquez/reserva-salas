import React, { useState } from 'react';
import axios from 'axios';


const Reserva = () => {
  const [spaces] = useState([
    { space_id: '1', space_name: 'Gimnasio' },
    { space_id: '2', space_name: 'Piscina' },
    { space_id: '3', space_name: 'Quincho' },
    { space_id: '4', space_name: 'Terraza' }
  ]);

  const [formData, setFormData] = useState({
    space_id: '',
    reservation_date: '',
    start_time: '',
    event_description: '',
    num_people: 1,
  });

  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState('');

  const timeBlocks = [
    { start: '09:00', end: '11:30' }, // Bloque de 2.5 horas
    { start: '12:00', end: '14:30' },
    { start: '15:00', end: '17:30' },
    { start: '18:00', end: '20:30' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar si se seleccionó un bloque de tiempo
    if (!formData.start_time) {
      setError('Debes seleccionar un bloque de tiempo.');
      return;
    }

    // Enviar la reservación al backend
    axios.post('http://localhost:3001/reservations', formData)
      .then((response) => {
        setConfirmation('Reserva realizada con éxito');
        setError('');
        setFormData({
          space_id: '',
          reservation_date: '',
          start_time: '',
          event_description: '',
          num_people: 1,
        });
      })
      .catch((error) => {
        console.error('Error al realizar la reserva:', error);
        setError('Hubo un problema al realizar la reserva.');
      });
  };

  return (
    <div>
      <h2>Reserva de Espacios Comunes</h2>
      {confirmation && <p style={{ color: 'green' }}>{confirmation}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Espacio:</label>
          <select name="space_id" value={formData.space_id} onChange={handleChange} required>
            <option value="">Selecciona un espacio...</option>
            {spaces.map((space) => (
              <option key={space.space_id} value={space.space_id}>{space.space_name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Fecha:</label>
          <input type="date" name="reservation_date" value={formData.reservation_date} onChange={handleChange} required />
        </div>
        <div>
          <label>Bloque de tiempo:</label>
          <select name="start_time" value={formData.start_time} onChange={handleChange} required>
            <option value="">Selecciona un bloque...</option>
            {timeBlocks.map((block, index) => (
              <option key={index} value={block.start}>{block.start} - {block.end}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Descripción del evento:</label>
          <input type="text" name="event_description" value={formData.event_description} onChange={handleChange} />
        </div>
        <div>
          <label>Número de personas:</label>
          <input type="number" name="num_people" value={formData.num_people} onChange={handleChange} min="1" />
        </div>
        <button type="submit">Reservar</button>
      </form>
    </div>
  );
};

export default Reserva;
