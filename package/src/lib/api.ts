import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  timeout: 10000,
  withCredentials: true,
});

// Request Interceptor (örn: Auth token eklemek için)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // varsa JWT token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (hata yakalamak için)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Örn: login sayfasına yönlendir
      window.location.href = "/authentication/login";
    }
    if (error.response?.status === 500) {
      console.error("Sunucu hatası:", error.response.data);
    }
    return Promise.reject(error);
  }
);
