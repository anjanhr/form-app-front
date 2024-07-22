import React, { createContext, useContext, useState, useEffect } from "react";

const RouteContext = createContext();

export const RouteProvider = ({ children }) => {
  const [route, setRoute] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setRoute(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, "", path);
    setRoute(path);
  };

  const getParams = () => {
    const parts = route.split("/").filter(Boolean);
    const params = {};
    if (parts.length > 1) {
      params.id = parts[1];
    }
    return params;
  };

  return (
    <RouteContext.Provider value={{ route, navigate, params: getParams() }}>
      {children}
    </RouteContext.Provider>
  );
};

export const useRoute = () => {
  return useContext(RouteContext);
};
