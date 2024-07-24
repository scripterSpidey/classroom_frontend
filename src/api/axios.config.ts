import axios from 'axios';
    
const axiosreq = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials:true
});

export default axiosreq;