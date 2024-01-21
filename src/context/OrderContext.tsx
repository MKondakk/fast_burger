import React, { createContext, useState, ReactNode } from "react";
import { Product } from "../components/ProductItem";

export interface OrderItem {
  product: Product;
  modifications: Record<string, boolean>;
  quantity: number;
}

interface IOrderContext {
  order: OrderItem[];
  addToOrder: (product: OrderItem) => void;
  removeFromOrder: (index: number) => void;
  clearOrder: () => void;
}

const OrderContext = createContext<IOrderContext | null>(null);

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [order, setOrder] = useState<OrderItem[]>([]);

  const addToOrder = (product: OrderItem) => {
    setOrder((prevOrder) => [...prevOrder, product]);
  };

  const removeFromOrder = (index: number) => {
    setOrder((prevOrder) => {
      const newOrder = [...prevOrder];
      newOrder.splice(index, 1);
      return newOrder;
    });
  };

  const clearOrder = () => {
    setOrder([]);
  };

  return (
    <OrderContext.Provider
      value={{ order, addToOrder, removeFromOrder, clearOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export { OrderContext };
