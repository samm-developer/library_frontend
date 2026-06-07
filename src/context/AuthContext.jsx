import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .get("/auth/me")
      .then((res) => setUser(res.data.user))
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setLoading(false));
  }, []);

  const saveSession = (token, user) => {
    localStorage.setItem("token", token);
    setUser(user);
  };

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    saveSession(res.data.token, res.data.user);
    return res.data.user;
  };

  const register = async (formData) => {
    const res = await api.post("/auth/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    saveSession(res.data.token, res.data.user);
    return res.data.user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const refresh = async () => {
    const res = await api.get("/auth/me");
    setUser(res.data.user);
    return res.data.user;
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, refresh }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
