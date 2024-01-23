import { IOrderItem } from "../context/OrderContext";

export const calculateItemPrice = (orderItem: IOrderItem): number => {
  const { product, quantity } = orderItem;
  return product.price * quantity;
};