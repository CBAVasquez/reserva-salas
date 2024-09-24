import React ,{ useEffect, useState } from 'react';
import axios from 'axios';

// function App() {
//   return (
//     <div className="App">
//       <h1>Reserva de Espacios Comunes</h1>
//       <UsuarioComponent />
//       <EspaciosComponent />
//       <ReservaComponent />
//     </div>
//   );
// }

const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:1/api/endpoint')  // Cambia la URL según tu API
      .then(response => setMessage(response.data.message))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="App">
      <h1>Respuesta del Backend: {message}</h1>
    </div>
  );
}

export default App;