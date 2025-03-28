import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  // withCredentials: true, <-- REMOVE THIS LINE
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; 
  }
  return config; 
});

API.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response && error.response.status === 401) {
      // localStorage.removeItem('token');
      // localStorage.removeItem('user');
      // window.location.href = '/login'; 
    }
    return Promise.reject(error); 
  }
);

export default API;
