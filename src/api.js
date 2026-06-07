import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
});

// Attach JWT from localStorage on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Helper to turn a stored relative path into a full URL
export const fileUrl = (p) => (p ? p : "");
