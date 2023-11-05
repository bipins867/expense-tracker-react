import { createSlice } from "@reduxjs/toolkit";

const initialState={isLoggedIn:false,isPremium:false}
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
        }
    }
})

export default authSlice;
