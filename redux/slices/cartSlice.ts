import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addItemsToCart: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
    },
    removeCartItem: (state, action) => {
      state.cartItems = [
        ...state.cartItems.slice(0, action.payload),
        ...state.cartItems.slice(action.payload + 1),
      ];
    },
    checkoutCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { removeCartItem, addItemsToCart, checkoutCart } =
  cartSlice.actions;

export default cartSlice.reducer;

export const selectCurrentCart = (state) => state.cart;
