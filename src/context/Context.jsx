import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: "",
    nome: "",
  });
  const [activeRoute, setActiveRoute] = useState("dashboard");
  const [page, setPages] = useState(1);
  const [pageFilter, setPageFilter] = useState("todas");
  const [orderState, setOrderState] = useState({
    field: "dataEncerramento",
    direction: "desc",
  });

  useEffect(() => {
    console.log(orderState);
  }, [orderState]);
  useEffect(() => {
    console.log(pageFilter);
  }, [pageFilter]);
  const logUser = (userData) => setUser(userData);
  return (
    <UserContext.Provider
      value={{
        user,
        logUser,
        activeRoute,
        setActiveRoute,
        page,
        setPages,
        pageFilter,
        setPageFilter,
        orderState,
        setOrderState,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
