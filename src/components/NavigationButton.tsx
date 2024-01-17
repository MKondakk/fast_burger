import React from "react";
import { Link } from "react-router-dom";
import "../styles/welcome_page.css";

const NavigationButton = () => {
  return (
    <div className="button-container">
      <Link to="/place-order">
        <button>Place Order</button>
      </Link>
      <Link to="/login">
        <button id="login_button">Log In</button>
      </Link>
    </div>
  );
};

export { NavigationButton };
