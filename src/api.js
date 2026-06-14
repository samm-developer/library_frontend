import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

export const API_ORIGIN =
  import.meta.env.VITE_API_ORIGIN ||
  (API_BASE.startsWith("http") ? API_BASE.replace(/\/api\/?$/, "") : "");

  
export const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fileUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return API_ORIGIN ? `${API_ORIGIN}${path}` : path;
};
