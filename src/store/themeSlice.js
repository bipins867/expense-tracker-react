import { createSlice } from "@reduxjs/toolkit";
// themes.js
export const lightTheme = {
  body: "#ffffff",
  text: "#000000",
};

export const darkTheme = {
  body: "#333333",
  text: "#ffffff",
};

const initialState = { body: "#ffffff", text: "#000000" };
const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    setDarkTheme(state) {
      state.body = "#333333";
      state.text = "#ffffff";
    },
    setLightTheme(state){
        state.text = "#333333";
        state.body = "#ffffff";
    }
  },
});
export default themeSlice;
