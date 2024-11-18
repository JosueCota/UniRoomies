import { apiSlice } from "./apiSlice";
import { ROOMMATES_URL } from "../utils/constants";

//Get all roommates 
//Get all roommates based on location/price
//Each of these searches will return 10 - (pagination will be used)

//Data sent in is location and price if any
export const roommatesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getRoommates: builder.query({
            query: ({location, budget, offset}) => {
                const params = "/";
                
                if (location) params+=`${location}`;
                if (budget) params+=`/${location}`;
                
                return ({
                    url: `${ROOMMATES_URL}/${offset}${params}`,
                    method: "GET",
                })
            }
        }),
        getRoommate: builder.query({
            query: (id) => ({
                url: `${ROOMMATES_URL}/roommate/${id}`,
                method: "GET",
            })
        }),
    })
})

export const { useGetRoommatesQuery, useGetRoommateQuery } = roommatesApiSlice