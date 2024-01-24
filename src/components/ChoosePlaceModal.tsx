import React, { useContext, useState, useCallback } from "react";
import { BaseModal, BaseModalProps } from "./BaseModal";
import { OrderContext, PlaceType } from "../context/OrderContext";
import "../styles/main_page.css";

interface ChoosePlaceModalProps
  extends Pick<BaseModalProps, "visible" | "onClose"> {
  onSave: (place: PlaceType) => void;
}

const ChoosePlaceModal: React.FC<ChoosePlaceModalProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const { chosenPlace } = useContext(OrderContext)!;

  const [chosenPlaceState, setChosenPlaceState] =
    useState<PlaceType>(chosenPlace);

  const handleOptionClick = useCallback(
    (place: "eat-in" | "take-away") => {
      setChosenPlaceState(place);
    },
    [setChosenPlaceState]
  );

  const handleSave = () => {
    onSave(chosenPlaceState);
  };
  return (
    <BaseModal
      title="Choose Place"
      onClose={onClose}
      onSave={handleSave}
      visible={visible}
      disableSave={!chosenPlaceState}
    >
      <div className="choose-place-container">
        <label
          className={`radio-label ${
            chosenPlaceState === "eat-in" ? "selected" : ""
          }`}
        >
          <input
            type="radio"
            name="placeOption"
            checked={chosenPlaceState === "eat-in"}
            onChange={() => handleOptionClick("eat-in")}
          />
          <div className="image-container">
            <img src="./images/eat-in.png" alt="Eat In" />
          </div>
          <span>Eat In</span>
        </label>
        <label
          className={`radio-label ${
            chosenPlaceState === "take-away" ? "selected" : ""
          }`}
        >
          <input
            type="radio"
            name="placeOption"
            checked={chosenPlaceState === "take-away"}
            onChange={() => handleOptionClick("take-away")}
          />
          <div className="image-container">
            <img src="./images/take-away.png" alt="Take Away" />
          </div>
          <span>Take Away</span>
        </label>
      </div>
    </BaseModal>
  );
};

export { ChoosePlaceModal };
