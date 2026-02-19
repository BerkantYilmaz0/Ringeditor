import axios, { type InternalAxiosRequestConfig, type AxiosResponse, type AxiosError } from "axios";

export const api = axios.create({
  baseURL: "https://ringeditor-production.up.railway.app",
  timeout: 10000,
});

// Request Interceptor — Her istekte JWT token'ı Authorization header'ına ekle
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response Interceptor — 401 gelirse token'ı sil ve login'e yönlendir
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      const reqUrl = error.config?.url || "";
      // Login isteğinde 401 gelirse yönlendirme yapma, hata mesajını göster
      if (!reqUrl.includes("/login")) {
        // Token'ı temizle
        localStorage.removeItem("token");
        // Client-side redirect
        if (typeof window !== 'undefined') {
          window.location.href = "/authentication/login";
        }
      }
    }
    return Promise.reject(error);
  }
);
