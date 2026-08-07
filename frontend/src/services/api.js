import axios from 'axios';

// Instance Axios terpusat mengarah ke Backend Express
const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export default API;