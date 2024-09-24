// import React, { useEffect, useState } from "react";
// import "../styles/admin.css"; // Archivo CSS donde estarán los estilos
// import axios from "axios";

// const VistaAdmin = () => {
//   const [lugar, setLugar] = useState("");
//   const [descripcion, setDescripcion] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [dataReserva, setDataReserva] = useState([]);

//   const obtenerReservas = async () => {
//     try {
//       const { data } = await axios.get("http://localhost:3000/reserva/all");
//       setDataReserva(data); 
//       console.log(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     obtenerReservas();
//   }, []);

//   const usuarioTienePermiso = () => {
//     return true; 
//   };

//   const manejarSubmit = (e) => {
//     e.preventDefault();

//     if (!usuarioTienePermiso()) {
//       setError("No tienes permisos para añadir lugares.");
//       return;
//     }

//     if (lugar && descripcion) {
//       console.log("Añadir lugar:", lugar, descripcion);
//       setError("");
//       setSuccess("Lugar añadido correctamente.");
//       setLugar("");
//       setDescripcion("");
//     } else {
//       setError("Todos los campos son obligatorios.");
//     }
//   };

//    // Función para aceptar reserva
//    const aceptarReserva = async (id_reserva) => {
//     try {
//       await axios.patch(`http://localhost:3000/reserva/${id_reserva}/estado`, {
//         estado: "Aceptado", 
//       });
//       setSuccess(`Reserva ${id_reserva} aceptada.`); // Mensaje de éxito
//       obtenerReservas(); // Actualiza la lista de reservas
//     } catch (error) {
//       console.log(error);
//       setError("Error al aceptar la reserva."); // Manejo de error
//     }
//   };

//   return (
//     <div className="admin-container">
//       <h1>Vista Admin</h1>
//       {error && <p className="error-message">{error}</p>}
//       {success && <p className="success-message">{success}</p>}
//       <form onSubmit={manejarSubmit} className="admin-form">
//         <div className="form-group">
//           <label htmlFor="lugar">Añade lugar:</label>
//           <input
//             type="text"
//             id="lugar"
//             name="lugar"
//             value={lugar}
//             onChange={(e) => setLugar(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="descripcion">Descripción:</label>
//           <textarea
//             id="descripcion"
//             name="descripcion"
//             value={descripcion}
//             onChange={(e) => setDescripcion(e.target.value)}
//             rows="4"
//             required
//           />
//         </div>
//         <button type="submit" className="submit-button">
//           Añadir Lugar
//         </button>
//       </form>
//       <div>
//         {dataReserva.length > 0 ? (
//           dataReserva.map((reserva) => (
//             <div key={reserva.id_reserva}> 
//               <h1>{reserva.descrip_evento}</h1>
//               <h1>{reserva.estado}</h1>
//               <button onClick={() => aceptarReserva(reserva.id_reserva)}>Aceptar reserva</button> {/* Llama a aceptarReserva */}
//             </div>
//           ))
//         ) : (
//           <p>Cargando reservas...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VistaAdmin;

import React, { useEffect, useState } from "react";
import "../styles/admin.css"; // Archivo CSS donde estarán los estilos
import axios from "axios";

const VistaAdmin = () => {
  const [lugar, setLugar] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dataReserva, setDataReserva] = useState([]);

  const obtenerReservas = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/reserva/all");
      setDataReserva(data); 
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerReservas();
  }, []);

  const usuarioTienePermiso = () => {
    return true; 
  };

  const manejarSubmit = (e) => {
    e.preventDefault();

    if (!usuarioTienePermiso()) {
      setError("No tienes permisos para añadir lugares.");
      return;
    }

    if (lugar && descripcion) {
      console.log("Añadir lugar:", lugar, descripcion);
      setError("");
      setSuccess("Lugar añadido correctamente.");
      setLugar("");
      setDescripcion("");
    } else {
      setError("Todos los campos son obligatorios.");
    }
  };

   // Función para aceptar reserva
   const aceptarReserva = async (id_reserva) => {
    try {
      await axios.patch(`http://localhost:3000/reserva/${id_reserva}/estado`, {
        estado: "Aceptado", 
      });
      setSuccess(`Reserva ${id_reserva} aceptada.`); // Mensaje de éxito
      obtenerReservas(); // Actualiza la lista de reservas
    } catch (error) {
      console.log(error);
      setError("Error al aceptar la reserva."); // Manejo de error
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
        <button type="submit" className="submit-button">
          Añadir Lugar
        </button>
      </form>

      <h2>Reservas</h2>
      {dataReserva.length > 0 ? (
        <table className="reserva-table">
          <thead>
            <tr>
              <th>Espacio</th>
              <th>Fecha</th>
              <th>Hora Inicio</th>
              <th>Hora Fin</th>
              <th>Descripción</th>
              <th>Número de Gente</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {dataReserva.map((reserva) => (
              <tr key={reserva.id_reserva}>
                <td>{reserva.espacio}</td>
                <td>{new Date(reserva.fecha_reserva).toLocaleDateString()}</td>
                <td>{reserva.tiempo_ini}</td>
                <td>{reserva.tiempo_fin}</td>
                <td>{reserva.descrip_evento}</td>
                <td>{reserva.num_gente}</td>
                <td>{reserva.estado}</td>
                <td>
                  <button onClick={() => aceptarReserva(reserva.id_reserva)}>
                    Aceptar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Cargando reservas...</p>
      )}
    </div>
  );
};

export default VistaAdmin;

