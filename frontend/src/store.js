import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {}
    
});

export const RootState = store.getState();
export const AppDispatch = store.dispatch();