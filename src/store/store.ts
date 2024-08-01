import { configureStore,combineReducers  } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import  studentAuthSlice  from "./slices/student.auth.slice";
import teacherAuthSlice from "./slices/teacher.auth.slice";
import registerSlice from "./slices/register.slice";
import teacherClassroomSlice  from "./slices/teacher.classroom.slice";
import studentClassroomSlice from "./slices/student.classroom.slice";
import { AuthState } from "./slices/teacher.auth.slice";
import { RegisterUserType } from "./slices/register.slice";
import { TeacherClassroomStateInterface } from "./slices/teacher.classroom.slice";
import { StudentClassroomStateInterface } from "./slices/student.classroom.slice";

export interface RootStateInterface{
  studentAuth: AuthState;
  userRegistry: RegisterUserType;
  teacherAuth: AuthState;
  teacherClassroom: TeacherClassroomStateInterface;
  studentClassroom: StudentClassroomStateInterface;
}

const rootReducer =combineReducers({
    studentAuth: studentAuthSlice,
    userRegistry: registerSlice,
    teacherAuth: teacherAuthSlice,
    teacherClassroom:teacherClassroomSlice,
    studentClassroom:studentClassroomSlice
})


const persistConfig = {
    key: 'root',
    storage,
    blacklist:['teacherClassroom','studentClassroom']
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
          },
        }),
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export const useAppDispatch:()=> AppDispatch=useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;