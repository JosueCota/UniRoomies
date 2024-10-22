import { createSlice } from "@reduxjs/toolkit"

export default loginSlice = createSlice({
    name: "login",
    initialState: {},
    reducers: {
        updateLogin: (state, action) => {
            //Expecting object with password and email, actual verification and logic is done on login page 
            return state = action.payload.user
        },
    }
});