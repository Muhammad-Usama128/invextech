import { createSlice } from "@reduxjs/toolkit";

// ✅ SSR safe loader
const loadLiked = () => {
  if (typeof window === "undefined") return []; // server → skip
  try {
    const isLogin = localStorage.getItem("login");
    if (!isLogin) return [];
    
    const data = localStorage.getItem("liked");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const initialState = {
  liked: loadLiked(),
};

const likedSlice = createSlice({
  name: "liked",
  initialState,
  reducers: {
    handleLike: (state, action) => {
      const id = action.payload;

      if (state.liked.includes(id)) {
        state.liked = state.liked.filter((i) => i !== id);
      } else {
        state.liked.push(id);
      }

      // ✅ SSR safe save
      if (typeof window !== "undefined") {
        localStorage.setItem("liked", JSON.stringify(state.liked));
      }
    },

    clearLiked: (state) => {
      state.liked = [];
    },
    restoreLiked: (state) => {
      if (typeof window !== "undefined") {
        const data = localStorage.getItem("liked");
        state.liked = data ? JSON.parse(data) : [];
      }
    },
  },
});

export const { handleLike, clearLiked, restoreLiked } = likedSlice.actions;
export default likedSlice.reducer;
