import React, { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../store/cart-context";

const MealItem = (props) => {
  const price = `₹${props.price.toFixed(2)}`;
  // console.log(props.name);
  const ctxobj = useContext(CartContext);
  const addToCartHandler = (amount) => {
    ctxobj.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
    console.log("addItem executed");
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
