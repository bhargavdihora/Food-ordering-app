import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import CheckoutForm from "./CheckoutForm";
const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const ctxobj = useContext(CartContext);
  const totalAmount = `₹${ctxobj.totalAmount.toFixed(2)}`;
  const hasItems = ctxobj.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    ctxobj.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    ctxobj.addItem(item);
  };

  const orderHandler = (event) => {
    setIsCheckout(true);
  };

  const confirmHandler = (data) => {
    fetch("https://food-ordering-app-fcbf9-default-rtdb.firebaseio.com/cart.json", {
      method: "POST",
      body: JSON.stringify({
        userData: data,
        orderedItems: ctxobj.items,
      }),
    }).then(ctxobj.items.length = 0);

  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctxobj.items.map((itemObject) => (
        <CartItem
          key={itemObject.id}
          name={itemObject.name}
          amount={itemObject.amount}
          price={itemObject.price}
          onRemove={cartItemRemoveHandler.bind(null, itemObject.id)}
          onAdd={cartItemAddHandler.bind(null, itemObject)}
        />
      ))}
    </ul>
  );
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <CheckoutForm onConfirm={confirmHandler} onCancel={props.onClose} />
      )}
      <div className={classes.actions}>
        {!isCheckout && (
          <button className={classes["button--alt"]} onClick={props.onClose}>
            Close
          </button>
        )}
        {hasItems && !isCheckout && (
          <button className={classes.button} onClick={orderHandler}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
