import { createContext, useState, useEffect } from 'react';


export const UserContext = createContext();


const UserProvider = ({ children }) => {
  // El estado inicial debe ser 'false' (usuario no logueado)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null); 
  const [token, setToken] = useState(null);

  // Método Login
  const login = async (email, password) => { 
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setUserEmail(data.email);
        setIsLoggedIn(true);
        alert("Login exitoso");
        return true; // Retornamos éxito
      } else {
        alert(data.error || "Error en autenticación");
        return false; // Retornamos fallo
      }
    } catch (error) {
      console.error("Error en login:", error);
      return false;
    }
  };

  // Método Register
  const register = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setUserEmail(data.email);
        setIsLoggedIn(true);
        alert("Registro exitoso");
        return true;
      } else {
        alert(data.error || "Error en registro");
        return false;
      }
    } catch (error) {
      console.error("Error en register:", error);
      return false;
    }
  };

  const logout = () => {
    setIsLoggedIn(false); // Método para cerrar sesión
    setUserEmail(null); // Limpiamos el email al cerrar sesión
    setToken(null); // Eliminamos el token
    console.log("Logout ejecutado. Token eliminado.");
  };

  // Método para obtener perfil 
  const getProfile = async () => {
    if (!token) return;
    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if(response.ok) {
        setUserEmail(data.email);
      }
    } catch (error) {
      console.error("Error obteniendo perfil:", error);
    }
  };

  return (
    
    <UserContext.Provider value={{ isLoggedIn, userEmail, token, login, register, logout, getProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;