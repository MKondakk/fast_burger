// App.tsx

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WelcomePage } from "./pages/WelcomePage";
import { OrderPage } from "./pages/OrderPage";
import { LoginPage } from "./pages/LoginPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/place-order" element={<OrderPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<WelcomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export { App };
