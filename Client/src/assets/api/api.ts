import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Update this if your backend URL is different
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
