import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import { ClassroomSchema } from "../../schema/classroom.schema";
import { StudentSchema } from "../../schema/student.schema";

export interface AuthState{
    user: StudentSchema | null
}

const initialState: AuthState = {
    user: null
}

export const studentAuthSlice = createSlice({
    name:"studentAuth",
    initialState,
    reducers:{
        addStudent:(state,action: PayloadAction<StudentSchema | null>)=>{
            state.user = action.payload
        },
        removeStudent:(state)=>{
            state.user = null;
        },
        addStudentClassroom:(state,action:PayloadAction<ClassroomSchema[]>)=>{
            if(state.user) state.user.classrooms = action.payload;
        }
    }
});

export const {addStudent,removeStudent,addStudentClassroom} = studentAuthSlice.actions;

export default studentAuthSlice.reducer