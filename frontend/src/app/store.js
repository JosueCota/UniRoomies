import { configureStore } from "@reduxjs/toolkit";
import authReducer  from "../features/authSlice";
import searchReducer from "../features/searchesSlice"
import { apiSlice } from "../features/apiSlice";
const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        search: searchReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});

export default store