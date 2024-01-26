import React, { ReactNode, useCallback } from "react";
import "../styles/modal.css";
import "../styles/buttons.css";
import { Expression } from "./expression";

export interface BaseModalProps {
  title: string;
  children: ReactNode | ReactNode[];
  onClose: () => void;
  onSave?: () => void;
  visible: boolean;
  disableSave?: boolean;
}

const BaseModal = (props: BaseModalProps): JSX.Element => {
  const { title, children, onClose, onSave, visible, disableSave } = props;

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleSave = useCallback(() => {
    onSave?.();
  }, [onSave]);

  const modalClass = `modal ${visible ? "visible" : ""}`;

  return (
    <div className={modalClass} id="modal">
      <h2>{title}</h2>
      <div className="content">{children}</div>
      <div className="actions">
        <button className="small-button yellow-button" onClick={handleClose}>
          Close
        </button>
        <Expression condition={!!onSave}>
          <button
            className="small-button yellow-button"
            onClick={handleSave}
            disabled={disableSave}
          >
            Save
          </button>
        </Expression>
      </div>
    </div>
  );
};

export { BaseModal };
