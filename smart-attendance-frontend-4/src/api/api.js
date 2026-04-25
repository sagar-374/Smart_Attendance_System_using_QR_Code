import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8085",
  // timeout: 10000, // // OPTIONAL: prevent infinite wait
});

// 🔥 INTERCEPTOR (runs before EVERY request)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      // ✅ ALWAYS attach JWT token
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ✅ Ensure JSON content-type (important for Spring Boot)
    config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
