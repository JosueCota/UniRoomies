import { apiSlice } from "./apiSlice";
import { ROOMMATES_URL } from "../utils/constants";

export const roommatesSlice = apiSlice.injectEndpoints({
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

export const { useGetRoommatesQuery } = roommatesSlice