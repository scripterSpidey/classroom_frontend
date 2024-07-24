import { configureStore,combineReducers  } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import  studentAuthSlice  from "./slices/student.auth.slice";
import registerSlice from "./slices/register.slice";

const rootReducer =combineReducers({
    studentAuth: studentAuthSlice,
    userRegistry: registerSlice
})


const persistConfig = {
    key: 'root',
    storage,
    // Optionally, you can blacklist or whitelist specific reducers
    // whitelist: ['studentAuth'] // only studentAuth will be persisted
    // blacklist: ['someReducer'] // someReducer will not be persisted
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