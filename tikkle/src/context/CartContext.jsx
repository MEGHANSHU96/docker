import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.find(
        (i) => i.id === action.item.id && i.selectedSize === action.item.selectedSize
      );
      if (existing) {
        return state.map((i) =>
          i.id === action.item.id && i.selectedSize === action.item.selectedSize
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }
      return [...state, { ...action.item, qty: 1 }];
    }
    case "REMOVE_ITEM":
      return state.filter(
        (i) => !(i.id === action.id && i.selectedSize === action.selectedSize)
      );
    case "UPDATE_QTY":
      return state.map((i) =>
        i.id === action.id && i.selectedSize === action.selectedSize
          ? { ...i, qty: action.qty }
          : i
      );
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addItem = (item) => dispatch({ type: "ADD_ITEM", item });
  const removeItem = (id, selectedSize) => dispatch({ type: "REMOVE_ITEM", id, selectedSize });
  const updateQty = (id, selectedSize, qty) => dispatch({ type: "UPDATE_QTY", id, selectedSize, qty });
  const clearCart = () => dispatch({ type: "CLEAR" });

  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQty, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
