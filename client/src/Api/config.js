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

// Response interceptor to handle token expiry
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 (Unauthorized) and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const refreshResponse = await axios.post(
          "http://localhost:3000/api/auth/refresh-token",
          {},
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (refreshResponse.data.success && refreshResponse.data.token) {
          const newToken = refreshResponse.data.token;
          const expiryTime = new Date().getTime() + (30 * 24 * 60 * 60 * 1000); // 30 days
          
          localStorage.setItem("token", newToken);
          localStorage.setItem("tokenExpiry", expiryTime.toString());

          // Update the authorization header and retry the original request
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, clear tokens and redirect to login
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiry");
        // You can dispatch a logout action here or redirect to login
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
