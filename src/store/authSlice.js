import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  isPremium: false,
  isPremiumActivated: false,
};
const authSlice=createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        login(state){
            state.isLoggedIn=true
        },
        logOut(state){
            state.isLoggedIn=false
        },
        setPremiumState(state,action){
            state.isPremium=action.payload
        },
        setPremiumActiveStatus(state,action){
            state.isPremiumActivated=action.payload
        }
    }
})

export default authSlice;
