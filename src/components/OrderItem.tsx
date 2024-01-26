import React from "react";
import { IOrderItem } from "../context/OrderContext";
import { calculateItemPrice } from "../utils/calculateItemPrice";

interface OrderItemProps {
  orderItem: IOrderItem;
}

const OrderItem: React.FC<OrderItemProps> = ({ orderItem }) => {
  const { product, modifications, quantity } = orderItem;
  const itemPrice = calculateItemPrice(orderItem);

  return (
    <>
      <div className="order-item-column">
        <p>{product.name}</p>
        <p>Price: ${product.price.toFixed(2)}</p>
      </div>
      <div className="order-item-column">
        <p>Added modifications:</p>
        {Object.entries(modifications).map(
          ([modification, isSelected]) =>
            isSelected && <p key={modification}>{modification}</p>,
        )}
      </div>
      <div className="order-item-column">
        <p>Quantity: {quantity}</p>
        <p>Product total price: ${itemPrice.toFixed(2)}</p>
      </div>
    </>
  );
};

export { OrderItem };
