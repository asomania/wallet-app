import { createSlice } from "@reduxjs/toolkit";

export type Theme = "light" | "dark";
export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: "light",
  },
  reducers: {
    toggleTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem("theme", state.theme);
    },
    loadTheme: (state) => {
      state.theme = localStorage.getItem("theme") || "light";
    },
  },
});

export const { toggleTheme, loadTheme } = themeSlice.actions;

export default themeSlice.reducer;
