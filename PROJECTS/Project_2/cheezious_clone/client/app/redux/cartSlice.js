import { createSlice } from "@reduxjs/toolkit";

const getInitialCartState = () => {
  if (typeof window !== "undefined") {
    const isLogin = localStorage.getItem("login");
    if (!isLogin) {
      return [];
    }
    const cart = localStorage.getItem("cart");
    if (cart) {
      try {
        return JSON.parse(cart);
      } catch (e) {
        return [];
      }
    } else {
      localStorage.setItem("cart", JSON.stringify([]));
      return [];
    }
  }
  return [];
};

const saveCartToLocalStorage = (items) => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("login")) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }
};

const initialState = {
  items: getInitialCartState(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existing = state.items.find(
        (i) => i.name === item.name && i.option === item.option,
      );

      if (existing) {
        // 🔥 if already exists → increase quantity
        existing.qty += 1;
      } else {
        // 🆕 new item
        state.items.push({ ...item, qty: 1 });
      }
      saveCartToLocalStorage(state.items);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToLocalStorage(state.items);
    },

    decreaseQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);

      if (item) {
        item.qty -= 1;

        // remove if qty becomes 0
        if (item.qty <= 0) {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
        saveCartToLocalStorage(state.items);
      }
    },

    clearCart: (state) => {
      state.items = [];
      saveCartToLocalStorage(state.items);
    },

    updateCart: (state, action) => {
      state.items = action.payload;
      saveCartToLocalStorage(state.items);
    },
  },
});

export const { addToCart, removeFromCart, decreaseQty, clearCart, updateCart } =
  cartSlice.actions;

export default cartSlice.reducer;
