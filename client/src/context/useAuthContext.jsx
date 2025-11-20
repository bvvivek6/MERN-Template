import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(false);

  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",
    });

    // Request Interceptor → Always read latest token
    instance.interceptors.request.use((config) => {
      const freshToken = localStorage.getItem("token");
      if (freshToken) {
        config.headers.Authorization = `Bearer ${freshToken}`;
      }
      return config;
    });

    instance.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response?.status === 401) {
          logout();
        }
        return Promise.reject(err);
      }
    );

    return instance;
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });

      setToken(data.token);
      setUser(data.user);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      return { success: true };
    } catch (e) {
      return {
        success: false,
        message: e.response?.data?.message || "Login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/signup", {
        name,
        email,
        password,
      });

      setToken(data.token);
      setUser(data.user);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      return { success: true };
    } catch (e) {
      return {
        success: false,
        message: e.response?.data?.message || "Signup failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    api.defaults.headers.Authorization = null;
  };

  useEffect(() => {
    const fetchMe = async () => {
      if (!token) return;
      try {
        const { data } = await api.get("/auth/me");
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      } catch (e) {
        console.error("Failed to fetch user profile:", e);
        logout();
      }
    };

    fetchMe();
  }, [token, api]);

  return (
    <AuthContext.Provider
      value={{ user, token, login, signup, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
