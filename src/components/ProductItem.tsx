import React, { useCallback, useContext, useState } from "react";
import { EditProductModal } from "./EditProductModal";
import "../styles/buttons.css";
import { OrderContext, OrderItem } from "../context/OrderContext";

export interface Product {
  _id: string;
  name: string;
  type: string;
  price: number;
  photo: string;
}

interface ProductItemProps {
  product: Product;
}
const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const { addToOrder, order } = useContext(OrderContext)!;

  const [isEditing, setIsEditing] = useState(false);

  const handleAddButtonClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleEditClose = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleEditSave = useCallback(
    (modifications: Record<string, boolean>, quantity: number) => {
      const newProduct: OrderItem = {
        product,
        modifications,
        quantity,
      };

      addToOrder(newProduct);

      handleEditClose();
    },
    [addToOrder, handleEditClose, product]
  );

  return (
    <div className="product-item">
      <img
        src={product.photo}
        alt={product.name}
        style={{ height: "150px", width: "auto" }}
      />
      <div>
        <p>{product.name}</p>
        <p>{product.type}</p>
        <p>${product.price.toFixed(2)}</p>
      </div>

      <EditProductModal
        product={product}
        onSave={handleEditSave}
        onClose={handleEditClose}
        visible={isEditing}
      />
      <button
        className="small-button yellow-button"
        onClick={handleAddButtonClick}
      >
        Add
      </button>
    </div>
  );
};

export { ProductItem };
