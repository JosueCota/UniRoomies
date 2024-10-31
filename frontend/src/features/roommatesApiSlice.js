import { apiSlice } from "./apiSlice";
import { ROOMMATES_URL } from "../utils/constants";

//Get all roommates 
//Get all roommates based on location/price
//Each of these searches will return 10 - (pagination will be used)

export const roommatesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getRoommates: builder.query({
            query: (data) => ({
                url: ROOMMATES_URL,
                method: "GET",
                body: data
            })
        })
    })
})

export const { useGetRoommatesQuery } = roommatesApiSlice