import React, { useContext, useState, useMemo, useCallback } from "react";
import { OrderContext } from "../context/OrderContext";
import { OrderList } from "../components/OrderList";
import { Expression } from "../components/expression";
import { UserInfo } from "../components/UserInfo";
import { UserContext } from "../context/UserContext";
import { ChoosePlaceModal } from "../components/ChoosePlaceModal";
import PaymentModal from "../components/PaymentModal";
import "../styles/cart-page.css";
import "../styles/App.css";

const CartPage = () => {
  const { order, removeFromOrder, clearOrder, updateOrder, totalPrice, chosenPlace, setPlace } =
    useContext(OrderContext)!;
  const [paymentVisible, setPaymentVisible ] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const { user } = useContext(UserContext)!;

  const [visible, setVisible] = useState(false);

  function handleEdit() {
    setVisible(true);
  }
  const handleOrderDelete = useCallback(() => {
    clearOrder();
  }, [clearOrder]);

  const DeleteOrderButton = useMemo(() => (
    <button
      className="big-button yellow-button"
      onClick={handleOrderDelete}
    >
      Delete
    </button>
  ), [handleOrderDelete])

  const handlePayment = useCallback(() => {
   setPaymentVisible(true);
  }, []);

  const handleBuyAction = useCallback(async () => {
    try {
      ;
      if (!user) {
        console.error('User is not logged in');
        return;
      }

      const orderData = {
        userInfo: {
          name: user.name,
          email: user.email,
          telephone: user.telephone || '',
        },
        orderItems: order,
        chosenPlace,
        totalPlace: totalPrice,
        dateTime: new Date(),
      };

      const response = await fetch('http://localhost:5000/orders/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const order = await response.json();
        setOrderId(order?.id || null);
        clearOrder(); 
      } else {
        console.error('Failed to place order');
      }
    } catch (error) {
      console.error('Error handling buy action:', error);
    }
  }, [chosenPlace, clearOrder, order, totalPrice, user]);

  const BuyButton = useMemo(() => (
    <button
      className="big-button yellow-button"
      onClick={handlePayment}
    >
      Buy
    </button>
  ), [handlePayment]);

  return (
    <div className="main-page cart-page">
      <div className="order-container">
        <OrderList
          order={order}
          onRemove={removeFromOrder}
          onUpdate={updateOrder}
        />
        <Expression condition={!!order.length} >
          <div className="order-info-container">
            <h2> Chosen Place:</h2>
            <p>{chosenPlace}</p>
            <button
              className="small-button yellow-button"
              onClick={() => handleEdit()}
            >
              Edit
            </button>
            <UserInfo user={user!} />
            {DeleteOrderButton}
            {BuyButton}
          </div>
        </Expression>
      </div>
      <ChoosePlaceModal onSave={(place) => { setPlace(place); setVisible(false) }} visible={visible} onClose={() => setVisible(false)} />
      <PaymentModal orderId={orderId} title="Payment" onClose={() =>  setPaymentVisible(false) } onSubmit={handleBuyAction} visible={paymentVisible}/>
    </div >
  );
};

export { CartPage };
