import { createSlice,createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"

import { ClassroomSchema } from "../../schema/classroom.schema";
import { StudentSchema } from "../../schema/student.schema";


export interface TeacherClassroomStateInterface{
    classroom: null | ClassroomSchema
}



const initialState: TeacherClassroomStateInterface = {
    classroom: null
}
export interface ManageRequestPayload{
    index:number
}

export const fetchClassroomDetailsForTeacherThunk = createAsyncThunk<ClassroomSchema, () => Promise<ClassroomSchema>, { rejectValue: string }>(
    'teacher/fetchClasssroom',async (getClassroom,thunkAPI)=>{
        try {
            const response = await getClassroom();

            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue('failed to fetch classroom details for teacher')
        }
    }
)

export const teacherClassroomSlice = createSlice({
    name: "teacherClassroom",
    initialState,
    reducers: {
        saveClassroom: (state, action: PayloadAction<ClassroomSchema>) => {
            state.classroom = action.payload;
        },
        removeClassroom: (state) => {
            state.classroom = null;
        },
        acceptRequests: (state, action:PayloadAction<ManageRequestPayload>) => {
            
            const request:StudentSchema|undefined  = state.classroom?.joining_requests.splice(action.payload.index, 1)[0];
            
            if(request){
                state.classroom?.students.push(request);
            }
        },
        rejectRequests: (state, action:PayloadAction<ManageRequestPayload>) => {
            state.classroom?.joining_requests.splice(action.payload.index,1)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchClassroomDetailsForTeacherThunk.pending, (state, action) => {

            })
            .addCase(fetchClassroomDetailsForTeacherThunk.fulfilled, (state, action) => {
                state.classroom = action.payload
            })
            .addCase(fetchClassroomDetailsForTeacherThunk.rejected, (state, action) => {
                console.error('thunk fetching of teacherClassroom failed')
            })

    }
})


export const {
    saveClassroom,
    removeClassroom,
    acceptRequests,
    rejectRequests } = teacherClassroomSlice.actions;
 
export default teacherClassroomSlice.reducer;

