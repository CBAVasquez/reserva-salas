import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EspaciosComponent = () => {
  const [espacios, setEspacios] = useState([]);
  const [nuevoEspacio, setNuevoEspacio] = useState({ nombre: '', capacidad: 0 });
  const [espacioEditando, setEspacioEditando] = useState(null);

  useEffect(() => {
    obtenerEspacios();
  }, []);

  const obtenerEspacios = async () => {
    try {
      const response = await axios.get('http://localhost:3001/espacios');
      setEspacios(response.data);
    } catch (error) {
      console.error('Error al obtener espacios:', error);
    }
  };

  const crearEspacio = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/espacios', nuevoEspacio);
      setNuevoEspacio({ nombre: '', capacidad: 0 });
      obtenerEspacios();
    } catch (error) {
      console.error('Error al crear espacio:', error);
    }
  };

  const actualizarEspacio = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/espacios/${espacioEditando.id}`, espacioEditando);
      setEspacioEditando(null);
      obtenerEspacios();
    } catch (error) {
      console.error('Error al actualizar espacio:', error);
    }
  };

  const eliminarEspacio = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/espacios/${id}`);
      obtenerEspacios();
    } catch (error) {
      console.error('Error al eliminar espacio:', error);
    }
  };

  return (
    <div>
      <h2>Gestión de Espacios</h2>

      {/* Formulario para crear nuevo espacio */}
      <form onSubmit={crearEspacio}>
        <input
          type="text"
          value={nuevoEspacio.nombre}
          onChange={(e) => setNuevoEspacio({ ...nuevoEspacio, nombre: e.target.value })}
          placeholder="Nombre del espacio"
          required
        />
        <input
          type="number"
          value={nuevoEspacio.capacidad}
          onChange={(e) => setNuevoEspacio({ ...nuevoEspacio, capacidad: parseInt(e.target.value) })}
          placeholder="Capacidad"
          required
        />
        <button type="submit">Crear Espacio</button>
      </form>

      {/* Lista de espacios */}
      <ul>
        {espacios.map((espacio) => (
          <li key={espacio.id}>
            {espacio.nombre} - Capacidad: {espacio.capacidad}
            <button onClick={() => setEspacioEditando(espacio)}>Editar</button>
            <button onClick={() => eliminarEspacio(espacio.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      {/* Formulario para editar espacio */}
      {espacioEditando && (
        <form onSubmit={actualizarEspacio}>
          <input
            type="text"
            value={espacioEditando.nombre}
            onChange={(e) => setEspacioEditando({ ...espacioEditando, nombre: e.target.value })}
            required
          />
          <input
            type="number"
            value={espacioEditando.capacidad}
            onChange={(e) => setEspacioEditando({ ...espacioEditando, capacidad: parseInt(e.target.value) })}
            required
          />
          <button type="submit">Guardar Cambios</button>
          <button onClick={() => setEspacioEditando(null)}>Cancelar</button>
        </form>
      )}
    </div>
  );
};

export default EspaciosComponent;