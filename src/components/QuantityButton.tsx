import React, { useCallback } from "react";
import "../styles/buttons.css";

export interface QuantityButtonProps {
  value: number;
  onChange: (value: number) => void;
}

const QuantityButton: React.FC<QuantityButtonProps> = ({ value, onChange }) => {
  const handleIncrease = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const handleDecrease = useCallback(() => {
    if (value > 1) {
      onChange(value - 1);
    }
  }, [onChange, value]);

  return (
    <div>
      <button className="small-button" onClick={handleDecrease}>
        -
      </button>
      <span>{value}</span>
      <button className="small-button" onClick={handleIncrease}>
        +
      </button>
    </div>
  );
};

export { QuantityButton };
