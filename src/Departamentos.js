// import React from "react";
// import Reserva from "./registro-salas-comunes/pages/reserva-salas";


// function Departamentos() {
//   return (
//     <div>
//       <Reserva />
//     </div>
//   );
// }

// export default Departamentos;

// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Reserva from "./registro-salas-comunes/pages/reserva-salas";
import VistaAdmin from "./registro-salas-comunes/pages/vista-admin"; // Asegúrate de que la ruta sea correcta
import Registro from "./registro-salas-comunes/pages/registro";

function Departamentos() {
  return (
    <Router>
      <div>
        {/* Navegación o menú podría ir aquí */}
        <Routes>
          <Route path="/reserva-salas" element={<Reserva />} />
          <Route path="/vista-admin" element={<VistaAdmin />} />
          <Route path="/" element={<Registro/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default Departamentos;






