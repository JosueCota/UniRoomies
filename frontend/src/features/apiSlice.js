import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

//Proxy takes care of baseUrl
const baseQuery = fetchBaseQuery({ baseUrl: "" })

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ["User", "User_Detail", "Room"],
    endpoints: (builder) => ({})
})