import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { ClassroomMaterialType, ClassroomMessage, ClassroomSchema } from "../../schema/classroom.schema";
import handleError from "../../utils/error.handler";
import { PrivateChatSchema } from "../../schema/private.chats.schema";


export interface StudentClassroomStateInterface {
    classroom: ClassroomSchema | null;
    privateChats:PrivateChatSchema[]
}

export const initialState: StudentClassroomStateInterface = {
    classroom: {
        _id: '',
        name: '',
        subject: '',
        class_teacher_name: '',
        class_teacher_id: '',
        students: [],
        classroom_messages: [],
        strength: 0,
        joining_requests: [],
        banned: false,
        classroom_id: '',
        createdAt: '',
        materials: [],
    },
    privateChats: []
}

export const fetchClassroomDetailsForStudentThunk = createAsyncThunk<ClassroomSchema, () => Promise<ClassroomSchema>, { rejectValue: string }>(
    'student/fetchClassrooms', async (getClassrooms, thunkAPI) => {
        try {

            const response = await getClassrooms();
         
            return response
        } catch (error) {
            handleError(error)
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
        },
        saveMessagesInStudentClassroom: (state, action: PayloadAction<{ messages: ClassroomMessage[], }>) => {
            if (state.classroom?.classroom_messages) {
                state.classroom.classroom_messages = action.payload.messages
            }
        },
        sendMessageFromStudent: (state, action: PayloadAction<{ message: ClassroomMessage }>) => {
            if (state.classroom) {
                state.classroom.classroom_messages.push(action.payload.message)
            }
        },
        receiveMessageTostudent: (state, action: PayloadAction<{ message: ClassroomMessage }>) => {
            
            if (state.classroom) {
                if(!state.classroom.classroom_messages){
                    state.classroom.classroom_messages = []
                }
                state.classroom.classroom_messages.push(action.payload.message)
            }
        },
        saveAllPrivateChatsForStudent:(state,action:PayloadAction<{messages:PrivateChatSchema[]}>)=>{
            state.privateChats = action.payload.messages;
        },
        receivePrivateChatForStudent:(state,action:PayloadAction<{message:PrivateChatSchema}>)=>{
            state.privateChats.push(action.payload.message)
        },
        saveAllMaterialsForStudent:(state,action:PayloadAction<ClassroomMaterialType[]>)=>{
            if(state.classroom){
                state.classroom.materials= action.payload;
            }
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
    saveMessagesInStudentClassroom,
    sendMessageFromStudent,
    receiveMessageTostudent,
    saveAllPrivateChatsForStudent,
    receivePrivateChatForStudent,
    saveAllMaterialsForStudent
} = studentClassroomSlice.actions;

export default studentClassroomSlice.reducer;
