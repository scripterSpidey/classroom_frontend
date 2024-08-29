import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type StudentPersistDatasType ={
    classroom_id:string | null
}

export enum QuestionPaperEnum{
    ADD = 'addQuestion',
    UPLOAD = 'uploadQuestion',
    BANK = 'chooseQuestion'
}

export enum QuestionTypeEnum{
    MCQ = 'mcq',
    TOF = 'trueOrFalse',
    DESCRIPTIVE = 'descriptive',
    FILL_BLANKS = 'fillBlanks',
}

export type Question={
    question:string,
    type:QuestionTypeEnum,
    mark:string,
    options:string[],
    answer?:string
}

export type CreateExamBasicDetailsType =  {
    title:string,
    instructions:string,
    duration:number,
    startTime:Date | string,
    lastTimeToStart:Date | string,
    questionPaperType?:QuestionPaperEnum,
    questions:Question[]
}


type TeacherPersistDatasType={
    classroom_id:string | null,
}

export interface PersistedDatasInterface{
    studentDatas:StudentPersistDatasType|null,
    teacherDatas: TeacherPersistDatasType|null,
    createExam:CreateExamBasicDetailsType|null
}


const initialState : PersistedDatasInterface = {
    studentDatas: {
        classroom_id: null
    },
    teacherDatas: {
        classroom_id: null,
    },
    createExam: null
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
            if(state.teacherDatas){
                state.teacherDatas.classroom_id = action.payload.classroom_id;
            }
            
        },
        deleteTeacherEquipedClassroom:(state)=>{
            if(state.teacherDatas){
                state.teacherDatas.classroom_id = null;
            }
        },
        deleteAllPersistedDatasOfTeacher:(state)=>{
            state.teacherDatas = null
        },
        saveCreateExamBasicDetails:(state,action:PayloadAction<CreateExamBasicDetailsType>)=>{
            state.createExam = action.payload;
        },
        saveQuestionPaperType:(state,action:PayloadAction<QuestionPaperEnum>)=>{
            if(state.createExam){
                state.createExam.questionPaperType=action.payload
            }
        },
        saveQuestion:(state,action:PayloadAction<Question>)=>{
            if(state.createExam){
                state.createExam.questions.push(action.payload)
            }
        },
        clearExamDetails:(state)=>{
            console.log('clearing data');
            state.createExam = null;
        }
    }
})

export default PersistedDatasSlice.reducer;

export const{
    saveStudentEquipedClassroom,
    deleteStudentEquipedClassroom,
    deleteAllPersistedDatasOfStudent,
    saveTeacherEquipedClassroom,
    deleteTeacherEquipedClassroom,
    deleteAllPersistedDatasOfTeacher,
    saveCreateExamBasicDetails,
    saveQuestionPaperType,
    saveQuestion,
    clearExamDetails
} = PersistedDatasSlice.actions