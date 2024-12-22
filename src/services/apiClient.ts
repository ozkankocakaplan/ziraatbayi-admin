// src/services/apiClient.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://195.85.207.129:6868",
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
