import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api'
});
// 'https://lite-notes-server-rra7.vercel.app'

// Adiciona o token aos headers de todas as requisições
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default api;