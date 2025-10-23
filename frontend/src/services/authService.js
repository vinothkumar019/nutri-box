import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'

});

// Signup
export const signup = (payload) => API.post('/auth/signup', payload).then(r => r.data);

// Login
export const login = (payload) => API.post('/auth/login', payload).then(r => r.data);
