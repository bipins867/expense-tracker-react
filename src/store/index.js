import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import expenseSlice from "./expenseSlice";
import themeSlice from "./themeSlice";

const store=configureStore({
    reducer:{
        auth:authSlice.reducer,
        expense:expenseSlice.reducer,
        theme:themeSlice.reducer
    }
})

export const authAction=authSlice.actions;
export const expenseAction=expenseSlice.actions;
export const themeAction=themeSlice.actions;
export default store;