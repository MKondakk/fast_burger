import React from "react";
import { Link } from "react-router-dom";
import "../styles/buttons.css";

const OrderButton: React.FC = () => {
  return (
    <Link to="/menu">
      <button className="big-button yellow-button">Place Order</button>
    </Link>
  );
};

const LoginButton: React.FC = () => {
  return (
    <Link to="/login">
      <button className="big-button underline-button">Login</button>
    </Link>
  );
};

export { OrderButton, LoginButton };
