import React, { useContext } from "react";
import { OrderContext } from "../context/OrderContext";
import { OrderList } from "../components/OrderList";
import "../styles/cart-page.css";
import "../styles/App.css";

const CartPage = () => {
  const { order, removeFromOrder, updateOrder, chosenPlace } =
    useContext(OrderContext)!;

  return (
    <div className="main-page cart-page">
      <div className="order-container">
        <OrderList
          order={order}
          onRemove={removeFromOrder}
          onUpdate={updateOrder}
        />
        <div className="chosen-place-container">
          <h2>Chosen Place:</h2>
          <p>{chosenPlace}</p>
        </div>
      </div>
    </div>
  );
};

export { CartPage };
