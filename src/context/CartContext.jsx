import React, { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();

const initialState = {
  items: [],
  couponCode: '',
  discountPercent: 0,
  gstRate: 0.18 // 18% GST
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        )
      };
    case 'APPLY_COUPON':
      return {
        ...state,
        couponCode: action.payload.code,
        discountPercent: action.payload.discount
      };
    case 'REMOVE_COUPON':
      return {
        ...state,
        couponCode: '',
        discountPercent: 0
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const subtotal = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discountAmount = subtotal * (state.discountPercent / 100);
  const totalAfterDiscount = subtotal - discountAmount;
  const gstAmount = totalAfterDiscount * state.gstRate;
  const grandTotal = totalAfterDiscount + gstAmount;
  const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      state,
      dispatch,
      subtotal,
      discountAmount,
      gstAmount,
      grandTotal,
      totalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
