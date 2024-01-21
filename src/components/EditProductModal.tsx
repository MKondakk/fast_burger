import { useCallback, useState, useEffect } from "react";
import { BaseModal, BaseModalProps } from "./BaseModal";
import { Product } from "./ProductItem";
import { QuantityButton } from "./QuantityButton";
import "../styles/main_page.css";

export interface EditProductModalProps
  extends Pick<BaseModalProps, "onClose" | "visible"> {
  product: Product;
  onSave: (modifications: Record<string, boolean>, quantity: number) => void;
}

const EditProductModal = (props: EditProductModalProps): JSX.Element => {
  const { product, visible, onClose, onSave } = props;

  const [modifications, setModifications] = useState<string[]>([]);

  const [selectedModifications, setSelectedModifications] = useState<
    Record<string, boolean>
  >({});
  const [quantity, setQuantity] = useState(1);

  const fetchModifications = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/modifications/${product.type}`
      );
      const data = await response.json();
      setModifications(data.modifications || []);
    } catch (error) {
      console.error("Error fetching modifications:", error);
    }
  }, [product.type]);

  useEffect(() => {
    if (visible) {
      fetchModifications();
    }
  }, [fetchModifications, visible]);

  const handleSave = useCallback(() => {
    onSave(selectedModifications, quantity);
  }, [onSave, quantity, selectedModifications]);

  const handleCheckboxChange = useCallback((modification: string) => {
    setSelectedModifications((prevSelected) => ({
      ...prevSelected,
      [modification]: !prevSelected[modification],
    }));
  }, []);

  const handleQuantityChange = useCallback((value: number) => {
    setQuantity(value);
  }, []);

  return (
    <BaseModal
      title={`Customize  ${product.name}`}
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
                    style={{ accentColor: "#fbca06"}}
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
          <QuantityButton onChange={handleQuantityChange} />
        </div>
      </>
    </BaseModal>
  );
};

export { EditProductModal };
