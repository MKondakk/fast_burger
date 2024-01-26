import { IOrderItem } from "../context/OrderContext";

export const calculateItemPrice = (orderItem: IOrderItem): number => {
  const { product, quantity } = orderItem;
  return product.price * quantity;
};

export const calculateTotalPrice = (order: IOrderItem[]): number => {
  return order.reduce(
    (total, orderItem) => total + calculateItemPrice(orderItem),
    0
  );
};