import React from "react";
import { BlikForm } from "./BlikForm";
import { BaseModal, BaseModalProps } from "./BaseModal";
import { Expression } from "./expression";

interface PaymentModalProps extends Omit<BaseModalProps, "children"> {
  onSubmit: (code: string) => void;
  orderId: string | null;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  title,
  onClose,
  visible,
  onSubmit,
  orderId,
}) => {
  return (
    <BaseModal title={title} onClose={onClose} visible={visible}>
      <Expression condition={!orderId}>
        <BlikForm onSubmit={onSubmit} />
      </Expression>

      <Expression condition={!!orderId}>Congrats, {orderId}.</Expression>
    </BaseModal>
  );
};

export default PaymentModal;
