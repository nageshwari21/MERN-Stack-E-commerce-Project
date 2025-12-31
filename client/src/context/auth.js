import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    if (auth?.token) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${auth.token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [auth?.token]);

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) setAuth(JSON.parse(data));
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider };
