// src/services/apiClient.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : process.env.REACT_APP_API_URL,
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Yetkilendirme hatası: Oturumunuz sona ermiş olabilir.");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
