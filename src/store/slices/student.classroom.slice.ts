import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { ClassroomSchema } from "../../schema/classroom.schema";
import handleError from "../../utils/error.handler";


export interface StudentClassroomStateInterface {
    classroom: ClassroomSchema | null;
}

export const initialState: StudentClassroomStateInterface = {
    classroom: null
}

export const fetchClassroomDetailsForStudentThunk = createAsyncThunk<ClassroomSchema, () => Promise<ClassroomSchema>, { rejectValue: string }>(
    'student/fetchClassrooms', async (getClassrooms, thunkAPI) => {
        try {
           
            const response = await getClassrooms();
           
            return response
        } catch (error) {
           
            return thunkAPI.rejectWithValue('failed to fetch clasrooms')
        }
    })

export const studentClassroomSlice = createSlice({
    name: "studentClassroom",
    initialState,
    reducers: {
        saveStudentClassroom: (state, action: PayloadAction<ClassroomSchema>) => {
            state.classroom = action.payload
        },
        removeStudentClassroom: (state) => {
            state.classroom = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchClassroomDetailsForStudentThunk.pending, (state, action) => {

            })
            .addCase(fetchClassroomDetailsForStudentThunk.fulfilled, (state, action) => {
                state.classroom = action.payload
            })
            .addCase(fetchClassroomDetailsForStudentThunk.rejected, (state, action) => {

            })

    }
})


export const {
    saveStudentClassroom,
    removeStudentClassroom,
} = studentClassroomSlice.actions;

export default studentClassroomSlice.reducer;
