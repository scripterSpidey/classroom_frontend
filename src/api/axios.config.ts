import axios from 'axios';
import { BASE_URL } from '../constants/env';
    
const axiosreq = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials:true
});

export default axiosreq;