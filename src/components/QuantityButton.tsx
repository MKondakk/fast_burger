import React, { useState } from "react";
import "../styles/buttons.css";

export interface QuantityButtonProps {
  onChange: (value: number) => void;
}

const QuantityButton = (props: QuantityButtonProps): JSX.Element => {
  const [value, setValue] = useState(1);

  const handleIncrease = () => {
    const newValue = value + 1;
    setValue(newValue);
    props.onChange(newValue);
  };

  const handleDecrease = () => {
    if (value > 1) {
      const newValue = value - 1;
      setValue(newValue);
      props.onChange(newValue);
    }
  };

  return (
    <div>
      <button
        className="small-button"
        onClick={handleDecrease}
      >
        -
      </button>
      <span>{value}</span>
      <button
        className="small-button"
        onClick={handleIncrease}
      >
        +
      </button>
    </div>
  );
};

export { QuantityButton };
