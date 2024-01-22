import React, { createContext, useState, ReactNode } from "react";
import { Product } from "../components/ProductItem";

export interface OrderItem {
  product: Product;
  modifications: Record<string, boolean>;
  quantity: number;
}
export type PlaceType = "eatIn" | "takeAway" | null;
interface IOrderContext {
  order: OrderItem[];
  chosenPlace: PlaceType;
  setPlace: (value: PlaceType) => void;
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
  const [chosenPlace, setChosenPlace] = useState<PlaceType>(null);
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
  const setPlace = (value: PlaceType) =>{
    setChosenPlace(value);
  }
  const clearOrder = () => {
    setOrder([]);
  };

  return (
    <OrderContext.Provider
      value={{ order, chosenPlace, setPlace, addToOrder, removeFromOrder, clearOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export { OrderContext };
