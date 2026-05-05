import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import likedReducer from "./likedSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    liked: likedReducer,
  },
});
