import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("cityhub_user"))
  );

  useEffect(() => {
    if (user) {
      localStorage.setItem("cityhub_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("cityhub_user");
    }
  }, [user]);

  const login = (username) => {
    setUser({ name: username });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}