import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: "",
    nome: "",
  });
   const [activeRoute, setActiveRoute] = useState("dashboard");
   const [page, setPages] = useState(1);

  // useEffect(()=>{

  // },[onUpdate])
  const logUser = (userData) => setUser(userData);
  return (
    <UserContext.Provider value={{ user, logUser, activeRoute, setActiveRoute, page, setPages }}>
        {children}
    </UserContext.Provider>
  );
};