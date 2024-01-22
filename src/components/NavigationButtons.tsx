import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { OrderContext } from "../context/OrderContext";
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

const CartButton: React.FC = () => {
  const { order } = useContext(OrderContext)!;
  
  return (
    <Link to="/cart">
      <button className="img-button">
        <img
          src={
            order.length > 0
              ? "images/cart_full.png"
              : "images/cart_empty.png"
          }
          alt="Cart"
        />
      </button>
    </Link>
  );
};
export { OrderButton, LoginButton, CartButton };
