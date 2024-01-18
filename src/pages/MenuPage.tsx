import React from "react";
import { LoginButton } from "../components/NavigationButtons";
import { ProductList } from "../components/ProductList";
import "../styles/App.css";
import "../styles/main_page.css";

const MenuPage: React.FC = () => {
  return (
    <div className="menu-page">
      <div className="main-header">
      <img src="images/logo.png" alt="logo" style={{ height: '50px', width: 'auto' }}/>
        <h1>Fast Burger</h1>
        <LoginButton />
      </div>
      <ProductList />
    </div>
  );
};

export { MenuPage };
