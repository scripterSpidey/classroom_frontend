import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/user";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState{
    user: User | null;
}

const initialState: AuthState = {
    user: null
}

export const teacherAuthSlice = createSlice({
    name:"teacherAuth",
    initialState,
    reducers:{
        addTeacher:(state,action: PayloadAction<User|null>)=>{
            state.user = action.payload
        },
        removeTeacher:(state)=>{
            state.user = null;
        }
    }
});

export const {addTeacher,removeTeacher} = teacherAuthSlice.actions;

export default teacherAuthSlice.reducer