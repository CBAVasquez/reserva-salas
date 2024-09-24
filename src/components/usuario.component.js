import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsuarioComponent = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({ nombre: '', email: '' });

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:3001/usuarios');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const crearUsuario = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/usuarios', nuevoUsuario);
      setNuevoUsuario({ nombre: '', email: '' });
      obtenerUsuarios();
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };

  return (
    <div>
      <h2>Gestión de Usuarios</h2>

      {/* Formulario para crear nuevo usuario */}
      <form onSubmit={crearUsuario}>
        <input
          type="text"
          value={nuevoUsuario.nombre}
          onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })}
          placeholder="Nombre del usuario"
          required
        />
        <input
          type="email"
          value={nuevoUsuario.email}
          onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })}
          placeholder="Email del usuario"
          required
        />
        <button type="submit">Crear Usuario</button>
      </form>

      {/* Lista de usuarios */}
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            {usuario.nombre} - Email: {usuario.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsuarioComponent;