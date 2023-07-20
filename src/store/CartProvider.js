import CartContext from "./cart-context";
import { useReducer } from "react";

const CartProvider = (props) => {
  const initialCartState = {
    items: [],
    totalAmount: 0,
  };
  const CartReducer = (state, action) => {
    if (action.type === "ADD") {
      const updatedTotalAmount =
        state.totalAmount + action.val.amount * action.val.price;

      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.val.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.val.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.val);
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
    if (action.type === "REMOVE") {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount - existingCartItem.price;
      let updatedItems;

      if (existingCartItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.id);
      } else {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }

    return initialCartState;
  };

  const [cartState, dispatchCartAction] = useReducer(
    CartReducer,
    initialCartState
  );

  const addItemHandler = (item) => {
    dispatchCartAction({ type: "ADD", val: item });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
