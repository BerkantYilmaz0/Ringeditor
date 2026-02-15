import axios, { type InternalAxiosRequestConfig, type AxiosResponse, type AxiosError } from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  timeout: 10000,
  withCredentials: true,
});

// Request Interceptor (örn: Auth token eklemek için)
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token"); // varsa JWT token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response Interceptor (hata yakalamak için)
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Login isteğinde 401 gelirse yönlendirme yapma, hata mesajını göster
      const reqUrl = error.config?.url || "";
      if (!reqUrl.includes("/login")) {
        // Client-side redirect
        if (typeof window !== 'undefined') {
          window.location.href = "/authentication/login";
        }
      }
    }
    return Promise.reject(error);
  }
);
