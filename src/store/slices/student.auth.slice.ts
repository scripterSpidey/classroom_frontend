import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/user";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState{
    user: User | null;
}

const initialState: AuthState = {
    user: null
}

export const studentAuthSlice = createSlice({
    name:"studentAuth",
    initialState,
    reducers:{
        addStudent:(state,action: PayloadAction<User|null>)=>{
            state.user = action.payload
        },
        removeStudent:(state)=>{
            state.user = null;
        }
    }
});

export const {addStudent,removeStudent} = studentAuthSlice.actions;

export default studentAuthSlice.reducer