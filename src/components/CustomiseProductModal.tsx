import { useCallback, useState, useEffect } from "react";
import { BaseModal, BaseModalProps } from "./BaseModal";
import { QuantityButton } from "./QuantityButton";
import "../styles/main_page.css";
import { IOrderItem } from "../context/OrderContext";

export interface CustomiseProductModalProps
  extends Pick<BaseModalProps, "onClose" | "visible"> {
  orderItem: IOrderItem;
  onSave: (orderItem: IOrderItem) => void;
}

const CustomiseProductModal = (
  props: CustomiseProductModalProps,
): JSX.Element => {
  const { orderItem, visible, onClose, onSave } = props;

  const [modifications, setModifications] = useState<string[]>([]);

  const [selectedModifications, setSelectedModifications] = useState<
    Record<string, boolean>
  >(orderItem.modifications || {});
  const [quantity, setQuantity] = useState(orderItem.quantity || 1);

  const fetchModifications = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/modifications/${orderItem.product.type}`,
      );
      const data = await response.json();
      setModifications(data.modifications || []);
    } catch (error) {
      console.error("Error fetching modifications:", error);
    }
  }, [orderItem.product.type]);

  const handleSave = useCallback(() => {
    const updatedItem: IOrderItem = {
      product: orderItem.product,
      modifications: selectedModifications,
      quantity,
    };

    onSave(updatedItem);

    setQuantity(1);
    setSelectedModifications({});
  }, [onSave, orderItem.product, quantity, selectedModifications]);

  const handleCheckboxChange = useCallback((modification: string) => {
    setSelectedModifications((prevSelected) => ({
      ...prevSelected,
      [modification]: !prevSelected[modification],
    }));
  }, []);

  useEffect(() => {
    if (visible) {
      fetchModifications();
    }

    return () => {
      // setSelectedModifications({});
      // setQuantity(1);
    };
  }, [fetchModifications, visible]);

  return (
    <BaseModal
      title={`Customize  ${orderItem.product.name}`}
      onClose={onClose}
      onSave={handleSave}
      visible={visible}
    >
      <>
        <div>
          <ul style={{ listStyleType: "none", textAlign: "left" }}>
            {modifications.map((modification, index) => (
              <li key={index}>
                <label>
                  <input
                    style={{ accentColor: "#fbca06" }}
                    type="checkbox"
                    value={modification}
                    checked={selectedModifications[modification] || false}
                    onChange={() => handleCheckboxChange(modification)}
                  />
                  {modification}
                </label>
              </li>
            ))}
          </ul>
          <QuantityButton value={quantity} onChange={setQuantity} />
        </div>
      </>
    </BaseModal>
  );
};

export { CustomiseProductModal };
