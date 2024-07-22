import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RouteProvider } from "./context/RouteProvider";
import { ApiProvider } from "./context/ApiContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RouteProvider>
    <ApiProvider>
      <App />
    </ApiProvider>
  </RouteProvider>
);
