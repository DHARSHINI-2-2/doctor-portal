import axios from 'axios';

const api = axios.create({
    baseURL: 'https://doctor-portal-backend-r1g8.onrender.com/api', 
});

// Automatically attach the JWT token to every request if it exists
api.interceptors.request.use((config) => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;