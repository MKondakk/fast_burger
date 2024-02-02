import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { WelcomePage } from "./pages/WelcomePage";
import { MenuPage } from "./pages/MenuPage";
import { LoginPage } from "./pages/LoginPage";
import { CartPage } from "./pages/Cartpage";

const App: React.FC = () => {
  return (
    <HashRouter basename="/">
      <Routes>
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/" element={<WelcomePage />} />
      </Routes>
    </HashRouter>
  );
};

export { App };
