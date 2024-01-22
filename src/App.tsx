// App.tsx

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WelcomePage } from "./pages/WelcomePage";
import { MenuPage } from "./pages/MenuPage";
import { LoginPage } from "./pages/LoginPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<LoginPage />} />
        <Route path="/" element={<WelcomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export { App };
