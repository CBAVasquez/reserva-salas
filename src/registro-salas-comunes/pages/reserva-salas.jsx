import React, { useState } from 'react';
import axios from 'axios'; // Importar axios
import '../styles/reserva.css'; // Estilos separados

const Reserva = () => {
  const [spaces] = useState([
    { space_id: '1', space_name: 'Gimnasio' },
    { space_id: '2', space_name: 'Piscina' },
    { space_id: '3', space_name: 'Quincho' },
    { space_id: '4', space_name: 'Terraza' }
  ]);

  const [formData, setFormData] = useState({
    id_usuario: 1, // Suponiendo que ya tienes un ID de usuario
    id_espacio: '',
    fecha_reserva: '',
    tiempo_ini: '',
    tiempo_fin: '',
    descrip_evento: '',
    num_gente: 1,
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar si se seleccionó un bloque de tiempo
    if (!formData.tiempo_ini) {
      setError('Debes seleccionar un bloque de tiempo.');
      return;
    }

    // Determinar tiempo_ini y tiempo_fin según el bloque de tiempo seleccionado
    const selectedBlock = timeBlocks.find(block => block.start === formData.tiempo_ini);
    if (selectedBlock) {
      formData.tiempo_ini = selectedBlock.start;
      formData.tiempo_fin = selectedBlock.end;
    }

    try {
      // Enviar datos al backend
      const response = await axios.post('http://localhost:3000/reserva/create', formData);
      console.log('Reserva creada:', response.data);
      setConfirmation('Reserva realizada con éxito');
      setError('');
    } catch (err) {
      console.error('Error al crear la reserva:', err);
      setError('Error al realizar la reserva. Intenta de nuevo.');
    }

    // Reiniciar el formulario
    setFormData({
      id_usuario: 1, // Volver a establecer el ID de usuario si es necesario
      id_espacio: '',
      fecha_reserva: '',
      tiempo_ini: '',
      tiempo_fin: '',
      descrip_evento: '',
      num_gente: 1,
    });
  };

  return (
    <div className="form-container">
      <h1>Reserva de Espacios Comunes</h1>
      {confirmation && <p className="confirmation-message">{confirmation}</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id_espacio">Espacio:</label>
          <select id="id_espacio" name="id_espacio" value={formData.id_espacio} onChange={handleChange} required>
            <option value="">Selecciona un espacio...</option>
            {spaces.map((space) => (
              <option key={space.space_id} value={space.space_id}>
                {space.space_name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="fecha_reserva">Fecha:</label>
          <input type="date" id="fecha_reserva" name="fecha_reserva" value={formData.fecha_reserva} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="tiempo_ini">Bloque de tiempo:</label>
          <select id="tiempo_ini" name="tiempo_ini" value={formData.tiempo_ini} onChange={handleChange} required>
            <option value="">Selecciona un bloque...</option>
            {timeBlocks.map((block, index) => (
              <option key={index} value={block.start}>
                {block.start} - {block.end}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="descrip_evento">Descripción del evento:</label>
          <textarea className='descripcion' placeholder='Cumpleaños, navidades, etc' id="descrip_evento" name="descrip_evento" value={formData.descrip_evento} onChange={handleChange} rows="3"></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="num_gente">Número de personas:</label>
          <input type="number" id="num_gente" name="num_gente" value={formData.num_gente} onChange={handleChange} min="1" max="100" required />
        </div>

        <button type="submit" className="submit-button">Reservar</button>
      </form>
    </div>
  );
};

export default Reserva;
