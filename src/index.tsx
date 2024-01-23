import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./styles/App.css";
import { OrderProvider } from "./context/OrderContext";

const container = document.getElementById("app");
const root = ReactDOM.createRoot(container as HTMLElement);

root.render(
  <React.StrictMode>
    <OrderProvider>
      <div id="background" />
      <div className="container">
        <App />
      </div>
    </OrderProvider>
  </React.StrictMode>
);
