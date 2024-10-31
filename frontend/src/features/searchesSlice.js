import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    roommateSearch:  null,
    roomSearch: null
}

const searchSlice = createSlice({
    name: "search",
    initialState: initialState,
    reducers: {
        setRoommateSearch: (state, action) => {
            state.roommateSearch = action.payload;
            localStorage.setItem("roommateSearch", JSON.stringify(action.payload));
        },
        setRoomSearch: (state, action) => {
            state.roomSearch = action.payload;
        },
        //When user logs out, reset state
        deleteSearch: (state, action) => {
            state.roommateSearch = null;
            state.roomSearch = null;
        },
    }
})

export const { setRoommateSearch, setRoomSearch, deleteSearch } = searchSlice.actions;
export default searchSlice.reducer;