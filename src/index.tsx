import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./styles/App.css";

const container = document.getElementById("app");
const root = ReactDOM.createRoot(container as HTMLElement);

root.render(
  <React.StrictMode>
    <div id="background">
      <App />
    </div>
  </React.StrictMode>
);
