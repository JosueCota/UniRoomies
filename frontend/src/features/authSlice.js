import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")): null
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        //When user logs in
        setCredentials: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        //When user logs out, reset state and local storage
        clearCredentials: (state, action) => {
            state.user = null;
            localStorage.removeItem("user");
        }
    }
})

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;