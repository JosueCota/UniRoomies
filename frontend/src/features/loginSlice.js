import { createSlice } from "@reduxjs/toolkit"

const slice = {
    name: "login",
    initialState: {},
    reducers: {
        updateLogin: (state, action) => {
            //Expecting object with password and email, actual verification and logic is done on login page 
            return state = action.payload
        },
    }
}

export const loginSlice = createSlice(slice);