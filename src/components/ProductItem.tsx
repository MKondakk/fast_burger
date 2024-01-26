import React, { useCallback, useContext, useMemo, useState } from "react";
import { CustomiseProductModal } from "./CustomiseProductModal";
import { ProductEditForm } from "./ProductEditForm";
import { OrderContext, IOrderItem } from "../context/OrderContext";
import { Role, UserContext } from "../context/UserContext";
import "../styles/buttons.css";
import { Expression } from "./expression";

export interface Product {
  _id: string;
  name: string;
  type: string;
  price: number;
  photo: string;
}

interface ProductItemProps {
  product: Product;
  onProductUpdate: () => void;
}
const ProductItem: React.FC<ProductItemProps> = ({ product, onProductUpdate }) => {
  const { addToOrder } = useContext(OrderContext)!;
  const userCtx = useContext(UserContext);

  const [isCustomising, setIsCustomising] = useState(false);
  const [isEditing, setEditing] = useState(false);

  const addButtonDisable = useMemo(() => !userCtx!.user, [userCtx]);
  const isAdmin = useMemo(() => userCtx!.user?.role === Role.Admin, [userCtx]);

  const handleAddButtonClick = useCallback(() => {
    setIsCustomising(true);
  }, []);

  const handleProductEdit = useCallback(() => {
    setEditing(true);
  }, []);

  const handleCustomiseClose = useCallback(() => {
    setIsCustomising(false);
  }, []);

  const handleCustomiseSave = useCallback(
    (orderItem: IOrderItem) => {
      addToOrder(orderItem);

      handleCustomiseClose();
    },
    [addToOrder, handleCustomiseClose]
  );

  const AddButton = useMemo(() => (
    <button
      className="small-button yellow-button"
      onClick={handleAddButtonClick}
      disabled={addButtonDisable}
    >
      Add
    </button>
  ), [addButtonDisable, handleAddButtonClick])

  const EditButton = useMemo(() => (
    <button
      className="small-button yellow-button"
      onClick={handleProductEdit}
    >
      Edit
    </button>
  ), [handleProductEdit])

  const handleEditSubmit = useCallback(async (values: { name: string; price: number; type: string; }) => {
    try {
      const response = await fetch(`http://localhost:5000/products/${product._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        console.error("Failed to update product");
      }

      onProductUpdate();
    } catch (error) {
      console.error("Error during product update:", error);
    }
    finally {
      setEditing(false);
    }
  }, [onProductUpdate, product._id]);


  // const DeleteButton = useMemo(() => (
  //   <button
  //     className="small-button yellow-button"
  //     onClick={handleDelete}
  //   >
  //     Edit
  //   </button>
  // ), [handleDelete])

  return (
    <div className="product-item">
      <img
        src={product.photo}
        alt={product.name}
        style={{ height: "150px", width: "auto" }}
      />
      <Expression condition={!isEditing} >
        <div>
          <p>{product.name}</p>
          <p>{product.type}</p>
          <p>${product.price.toFixed(2)}</p>
        </div>
      </Expression>

      <Expression condition={isEditing} >
        <ProductEditForm initialValues={{
          name: product.name,
          price: product.price,
          type: product.type,
        }} onSubmit={handleEditSubmit} onCancel={() => setEditing(false)} />
      </Expression>

      <CustomiseProductModal
        orderItem={{ modifications: {}, product, quantity: 1 }}
        onSave={handleCustomiseSave}
        onClose={handleCustomiseClose}
        visible={isCustomising}
      />

      <Expression condition={!isEditing && isAdmin} >
        {EditButton}
      </Expression>

      <Expression condition={!isEditing && !isAdmin} >
        {AddButton}
      </Expression>
    </div>
  );
};

export { ProductItem };
