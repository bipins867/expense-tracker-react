import { createSlice } from "@reduxjs/toolkit"


const initialState={
    data:[]
}

const expenseSlice=createSlice({
    name:'expense',
    initialState:initialState,
    reducers:{
        setExpense(state,action){
            state.data=action.payload;
        },
        addExpense(state,action){
            state.data.push(action.payload)
        }
    }
})

export default expenseSlice;