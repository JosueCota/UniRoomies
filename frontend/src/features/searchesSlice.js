import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    roommateSearch:  null,
    roomSearch: null
}

//responsible for saving searches and deleting them
const searchSlice = createSlice({
    name: "search",
    initialState: initialState,
    reducers: {
        setRoommateSearch: (state, action) => {
            state.roommateSearch = action.payload;
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