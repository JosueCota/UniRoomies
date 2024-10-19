import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "../features/loginSlice";

export const store = configureStore({
    reducer: {
        loginSlice
    }
    
});

export const RootState = store.getState();
export const AppDispatch = store.dispatch();