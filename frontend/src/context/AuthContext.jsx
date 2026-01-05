import { createContext, useContext, useEffect, useState } from "react";
import { API_ENDPOINTS } from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [user, setUser] = useState(null);

  // Fetch user info when token exists
  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    fetch(API_ENDPOINTS.ME, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, [token]);

  const login = (accessToken) => {
    localStorage.setItem("accessToken", accessToken);
    setToken(accessToken);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
