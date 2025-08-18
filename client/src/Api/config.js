import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/api", // Backend base URL
  withCredentials: true, // useful for cookies/JWT
});

// Add interceptors (optional, for tokens, logging, errors)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
