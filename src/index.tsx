import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./styles/App.css";
import { OrderProvider } from "./context/OrderContext";
import { UserProvider } from "./context/UserContext";

const container = document.getElementById("app");
const root = ReactDOM.createRoot(container as HTMLElement);

root.render(
  <React.StrictMode>
    <UserProvider>
      <OrderProvider>
        <div id="background" />
        <div className="container">
          <App />
        </div>
      </OrderProvider>
    </UserProvider>
  </React.StrictMode>
);
