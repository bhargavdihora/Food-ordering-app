import classes from "./CheckoutForm.module.css";
import { useRef, useState } from "react";

const CheckoutForm = (props) => {
  const [isFormInputValid, setIsFormInputValid] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const isInputEmpty = (value) => value.trim().length === 0;
  const is5char = (value) => value.trim().length === 6;

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const isNameValid = !isInputEmpty(enteredName);
    const isStreetValid = !isInputEmpty(enteredStreet);
    const isCityValid = !isInputEmpty(enteredCity);
    const isPostalValid = is5char(enteredPostal);

    setIsFormInputValid({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity,
    });

    const formIsValid =
      isNameValid && isStreetValid && isCityValid && isPostalValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      finalName: enteredName,
      finalStreet: enteredStreet,
      finalPostal: enteredPostal,
      finalCity: enteredCity,
    });
    props.onCancel();
    console.log("Confirm button clicked");
  };
  return (
    <form onSubmit={submitHandler}>
      <div
        className={isFormInputValid.name ? classes.control : classes.invalid}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!isFormInputValid.name && (
          <p className={classes.error}>Enter the correct name.</p>
        )}
      </div>
      <div
        className={isFormInputValid.street ? classes.control : classes.invalid}
      >
        <label htmlFor="street"> Street </label>
        <input type="text" id="street" ref={streetInputRef} />
        {!isFormInputValid.street && (
          <p className={classes.error}>Enter the correct street name.</p>
        )}
      </div>
      <div
        className={isFormInputValid.postal ? classes.control : classes.invalid}
      >
        <label htmlFor="postal"> Postal Code </label>
        <input type="number" id="postal" ref={postalInputRef} />
        {!isFormInputValid.postal && (
          <p className={classes.error}>Enter the postal code.</p>
        )}
      </div>
      <div
        className={isFormInputValid.city ? classes.control : classes.invalid}
      >
        <label htmlFor="city"> City </label>
        <input type="text" id="city" ref={cityInputRef} />
        {!isFormInputValid.city && (
          <p className={classes.error}>Enter the correct City name.</p>
        )}
      </div>
      <div className={classes.actions}>
        <button onClick={submitHandler}>Confirm</button>
        <button onClick={props.onCancel}> Cancel </button>
      </div>
    </form>
  );
};
export default CheckoutForm;
