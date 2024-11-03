import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    roommateDetails : null
}

const roommateSlice = createSlice({
    name: "search",
    initialState: initialState,
    reducers: {
        setRoommateDetails: (state, action) => {
            state.roommateDetails = action.payload;
            localStorage.setItem("roommateDetails", JSON.stringify(action.payload));
        },
        //When user logs out, reset state
        deleteRoommateDetails: (state, action) => {
            state.roommateDetails = null;
            localStorage.removeItem("roommateDetails");
        },
    }
})

export const { setRoommateDetails, deleteRoommateDetails } = searchSlice.actions;
export default searchSlice.reducer;