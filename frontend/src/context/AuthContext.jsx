import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

function decodeToken(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [role, setRole] = useState(() => {
    const existingToken = localStorage.getItem("token");
    return existingToken ? decodeToken(existingToken)?.role : null;
  });

  function login(newToken) {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setRole(decodeToken(newToken)?.role || null);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setRole(null);
  }

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}