import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReservaComponent = () => {
  const [reservas, setReservas] = useState([]);
  const [nuevaReserva, setNuevaReserva] = useState({
    fecha_reserva: '',
    id_usuario: '',
    id_espacio: ''
  });
  const [reservaEditando, setReservaEditando] = useState(null);

  useEffect(() => {
    obtenerReservas();
  }, []);

  const obtenerReservas = async () => {
    try {
      const response = await axios.get('http://localhost:3001/reservas');
      setReservas(response.data);
    } catch (error) {
      console.error('Error al obtener reservas:', error);
    }
  };

  const crearReserva = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/reservas', nuevaReserva);
      setNuevaReserva({ fecha_reserva: '', id_usuario: '', id_espacio: '' });
      obtenerReservas();
    } catch (error) {
      console.error('Error al crear reserva:', error);
    }
  };

  const actualizarReserva = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/reservas/${reservaEditando.id}`, reservaEditando);
      setReservaEditando(null);
      obtenerReservas();
    } catch (error) {
      console.error('Error al actualizar reserva:', error);
    }
  };

  const cancelarReserva = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/reservas/${id}`);
      obtenerReservas();
    } catch (error) {
      console.error('Error al cancelar reserva:', error);
    }
  };

  return (
    <div>
      <h2>Gestión de Reservas</h2>

      {/* Formulario para crear nueva reserva */}
      <form onSubmit={crearReserva}>
        <input
          type="datetime-local"
          value={nuevaReserva.fecha_reserva}
          onChange={(e) => setNuevaReserva({ ...nuevaReserva, fecha_reserva: e.target.value })}
          required
        />
        <input
          type="number"
          value={nuevaReserva.id_usuario}
          onChange={(e) => setNuevaReserva({ ...nuevaReserva, id_usuario: e.target.value })}
          placeholder="ID del usuario"
          required
        />
        <input
          type="number"
          value={nuevaReserva.id_espacio}
          onChange={(e) => setNuevaReserva({ ...nuevaReserva, id_espacio: e.target.value })}
          placeholder="ID del espacio"
          required
        />
        <button type="submit">Crear Reserva</button>
      </form>

      {/* Lista de reservas */}
      <ul>
        {reservas.map((reserva) => (
          <li key={reserva.id}>
            Fecha: {new Date(reserva.fecha_reserva).toLocaleString()} -
            Usuario ID: {reserva.id_usuario} -
            Espacio ID: {reserva.id_espacio}
            <button onClick={() => setReservaEditando(reserva)}>Editar</button>
            <button onClick={() => cancelarReserva(reserva.id)}>Cancelar</button>
          </li>
        ))}
      </ul>

      {/* Formulario para editar reserva */}
      {reservaEditando && (
        <form onSubmit={actualizarReserva}>
          <input
            type="datetime-local"
            value={reservaEditando.fecha_reserva}
            onChange={(e) => setReservaEditando({ ...reservaEditando, fecha_reserva: e.target.value })}
            required
          />
          <input
            type="number"
            value={reservaEditando.id_usuario}
            onChange={(e) => setReservaEditando({ ...reservaEditando, id_usuario: e.target.value })}
            required
          />
          <input
            type="number"
            value={reservaEditando.id_espacio}
            onChange={(e) => setReservaEditando({ ...reservaEditando, id_espacio: e.target.value })}
            required
          />
          <button type="submit">Guardar Cambios</button>
          <button onClick={() => setReservaEditando(null)}>Cancelar</button>
        </form>
      )}
    </div>
  );
};

export default ReservaComponent;