import React, { createContext, useState, ReactNode } from "react";
import { Product } from "../components/ProductItem";

export interface IOrderItem {
  product: Product;
  modifications: Record<string, boolean>;
  quantity: number;
}
export type PlaceType = "eat-in" | "take-away" | null;
interface IOrderContext {
  order: IOrderItem[];
  chosenPlace: PlaceType;
  totalPrice: number;
  setTotalPrice: (value: number) => void;
  setPlace: (value: PlaceType) => void;
  addToOrder: (product: IOrderItem) => void;
  updateOrder: (index: number, updatedOrderItem: IOrderItem) => void;
  removeFromOrder: (index: number) => void;
  clearOrder: () => void;
}

const OrderContext = createContext<IOrderContext | null>(null);

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [order, setOrder] = useState<IOrderItem[]>([]);
  const [chosenPlace, setChosenPlace] = useState<PlaceType>(null);
  const [totalPrice, setPrice] = useState(0);

  const addToOrder = (product: IOrderItem) => {
    setOrder((prevOrder) => {
      const existingIndex = prevOrder.findIndex(
        (item) =>
          item.product._id === product.product._id &&
          JSON.stringify(item.modifications) ===
            JSON.stringify(product.modifications),
      );
      if (existingIndex !== -1) {
        const updatedOrder = [...prevOrder];
        updatedOrder[existingIndex].quantity += product.quantity;
        return updatedOrder;
      } else {
        return [...prevOrder, product];
      }
    });
  };

  const updateOrder = (index: number, updatedOrderItem: IOrderItem) => {
    setOrder((prevOrder) => {
      const updatedOrder = [...prevOrder];

      updatedOrder[index] = updatedOrderItem;

      return updatedOrder;
    });
  };

  const removeFromOrder = (index: number) => {
    setOrder((prevOrder) => {
      const newOrder = [...prevOrder];
      newOrder.splice(index, 1);
      return newOrder;
    });
  };
  const setPlace = (value: PlaceType) => {
    setChosenPlace(value);
  };

  const setTotalPrice = (value: number) => {
    setPrice(value);
  };
  const clearOrder = () => {
    setOrder([]);
    setChosenPlace(null);
  };

  return (
    <OrderContext.Provider
      value={{
        order,
        chosenPlace,
        totalPrice,
        setTotalPrice,
        setPlace,
        addToOrder,
        removeFromOrder,
        updateOrder,
        clearOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export { OrderContext };
