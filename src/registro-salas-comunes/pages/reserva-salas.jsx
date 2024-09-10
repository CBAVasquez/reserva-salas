import React, { useState } from 'react';
import '../styles/reserva.css'; // Estilos separados

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

  console.log()
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState('');

  const timeBlocks = [
    { start: '09:00', end: '12:00' },
    { start: '12:00', end: '15:00' },
    { start: '15:00', end: '18:00' },
    { start: '18:00', end: '21:00' }
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

    setConfirmation('Reserva realizada con éxito');
    setError('');
    setFormData({
      space_id: '',
      reservation_date: '',
      start_time: '',
      event_description: '',
      num_people: 1,
    });
  };

  return (
    <div className="form-container">
      <h1>Reserva de Espacios Comunes</h1>
      {confirmation && <p className="confirmation-message">{confirmation}</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="space_id">Espacio:</label>
          <select id="space_id" name="space_id" value={formData.space_id} onChange={handleChange} required>
            <option value="">Selecciona un espacio...</option>
            {spaces.map((space) => (
              <option key={space.space_id} value={space.space_id}>
                {space.space_name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="reservation_date">Fecha:</label>
          <input type="date" id="reservation_date" name="reservation_date" value={formData.reservation_date} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="start_time">Bloque de tiempo:</label>
          <select id="start_time" name="start_time" value={formData.start_time} onChange={handleChange} required>
            <option value="">Selecciona un bloque...</option>
            {timeBlocks.map((block, index) => (
              <option key={index} value={block.start}>
                {block.start} - {block.end}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="event_description">Descripción del evento:</label>
          <textarea className='descripcion' placeholder='Cumpleaños, navidades, etc' id="event_description" name="event_description" value={formData.event_description} onChange={handleChange} rows="3"></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="num_people">Número de personas:</label>
          <input type="number" id="num_people" name="num_people" value={formData.num_people} onChange={handleChange} min="1" max="100" required />
        </div>

        <button type="submit" className="submit-button">Reservar</button>
      </form>
    </div>
  );
};

export default Reserva;
