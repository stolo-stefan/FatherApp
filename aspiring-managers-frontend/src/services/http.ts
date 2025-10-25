import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const baseURL =
  import.meta.env.PROD
    ? (import.meta.env.VITE_API_URL as string) // e.g. "https://api.aspiringmanagers.ro/api"
    : (import.meta.env.VITE_API_URL_TEST as string);

export const http = axios.create({
  baseURL,
  withCredentials: false,
});

http.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

http.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err?.response?.status === 401) {
      // Auto-logout on unauthorized
      useAuthStore.getState().logout();
      // optional: window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);