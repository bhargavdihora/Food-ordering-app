import { useRef, useState } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";
import classes from "./MealItemForm.module.css";
const MealItemForm = (props) => {
  const amountInputRef = useRef();
  const [amountIsValid, setAmountIsValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().lenght === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    } else {
      props.onAddToCart(enteredAmountNumber);
    }
    console.log(amountIsValid);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        id="amount"
        label="Amount"
        type="number"
        min="1"
        max="5"
        step="1"
        default="1"
      />
      <Button type="submit">+ Add</Button>
      {!amountIsValid && (
        <p>Please enter a valid amount and that is 1 to 5 .</p>
      )}
    </form>
  );
};

export default MealItemForm;
