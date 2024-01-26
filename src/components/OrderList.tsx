import React, { useState } from "react";
import { IOrderItem } from "../context/OrderContext";
import { OrderItem } from "./OrderItem";
import { calculateTotalPrice } from "../utils/calculateItemPrice";
import { CustomiseProductModal } from "./CustomiseProductModal";
import "../styles/cart-page.css";


interface OrderListProps {
  onRemove: (index: number) => void;
  onUpdate: (index: number, updatedOrderItem: IOrderItem) => void;
  order: IOrderItem[];
}

const OrderList: React.FC<OrderListProps> = ({ order, onRemove, onUpdate }) => {
  const [editVisible, setEditVisible] = useState(false);
  const [editVisibleIndex, setEditVisibleIndex] = useState<number>(0);

  const handleDelete = (index: number) => {
    onRemove(index);
  };

  const handleEdit = (index: number) => {
    setEditVisible(true);
    setEditVisibleIndex(index);
  };

  const handleCloseEdit = () => setEditVisible(false);

  const handleSaveEdit = (index: number, orderItem: IOrderItem) => {
    onUpdate(index, orderItem);
    handleCloseEdit();
  };


  return (
    <>
      <div className="order-items">
        {order.length === 0 ? (
          <p>Your order is empty.</p>
        ) : (
          <>
            <h2>Your Order:</h2>
            {order.map((orderItem, index) => (
              <div key={index} className="order-item">
                <OrderItem orderItem={orderItem} />
                <div className="order-item-actions">
                  <button
                    className="small-button yellow-button"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="small-button yellow-button"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </div>

                <CustomiseProductModal
                  orderItem={orderItem}
                  onSave={(orderItem) => handleSaveEdit(index, orderItem)}
                  onClose={handleCloseEdit}
                  visible={editVisible && editVisibleIndex === index}
                />
              </div>
            ))}
            <div id="total-price">
              <p>Total Price: ${calculateTotalPrice(order).toFixed(2)}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export { OrderList };
