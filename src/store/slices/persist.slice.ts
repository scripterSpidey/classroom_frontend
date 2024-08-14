import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type StudentPersistDatasType ={
    classroom_id:string | null
}

type TeacherPersistDatasType={
    classroom_id:string | null
}

export interface PersistedDatasInterface{
    studentDatas:null|StudentPersistDatasType,
    teacherDatas:null | TeacherPersistDatasType
}


const initialState : PersistedDatasInterface = {
    studentDatas:null,
    teacherDatas:null
}

export const PersistedDatasSlice = createSlice({
    name: "persistedDatas",
    initialState,
    reducers:{
        saveStudentEquipedClassroom:(state,action:PayloadAction<{classroom_id:string}>)=>{
           state.studentDatas = action.payload;
        },
        deleteStudentEquipedClassroom:(state)=>{
            if(state.studentDatas){
                state.studentDatas.classroom_id = null;
            }
        },
        deleteAllPersistedDatasOfStudent:(state)=>{
            state.studentDatas = null
        },
        saveTeacherEquipedClassroom:(state,action:PayloadAction<{classroom_id:string}>)=>{
            state.teacherDatas = action.payload;
        },
        deleteTeacherEquipedClassroom:(state)=>{
            if(state.teacherDatas){
                state.teacherDatas.classroom_id = null;
            }
        },
        deleteAllPersistedDatasOfTeacher:(state)=>{
            state.teacherDatas = null
        },

    }
})

export default PersistedDatasSlice.reducer;

export const{
    saveStudentEquipedClassroom,
    deleteStudentEquipedClassroom,
    deleteAllPersistedDatasOfStudent,
    saveTeacherEquipedClassroom,
    deleteTeacherEquipedClassroom,
    deleteAllPersistedDatasOfTeacher
} = PersistedDatasSlice.actions