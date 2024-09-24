import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getReservas = () => api.get('/reservas');
export const createReserva = (reserva) => api.post('/reservas', reserva);
// Añade más funciones según sea necesario