import React, { useContext } from "react";
import { OrderContext } from "../context/OrderContext";
import { OrderList } from "../components/OrderList";
import "../styles/cart-page.css";
import "../styles/App.css";

const CartPage = () => {
  const { order, removeFromOrder, updateOrder } = useContext(OrderContext)!;

  return (
    <div className="main-page cart-page">
      <OrderList
        order={order}
        onRemove={removeFromOrder}
        onUpdate={updateOrder}
      />
    </div>
  );
};

export { CartPage };
