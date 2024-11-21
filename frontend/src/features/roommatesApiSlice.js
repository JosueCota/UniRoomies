import { apiSlice } from "./apiSlice";
import { ROOMMATES_URL } from "../utils/constants";

export const roommatesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getRoommates: builder.query({
            query: ({location, budget, offset}) => {
                let params = "/";
                
                params += location? `${location}`: `none`;
                if (budget) params+=`/${budget}`;

                return ({
                    url: `${ROOMMATES_URL}/${offset}${params}`,
                    method: "GET",
                })
            },
        }),
        getRoommate: builder.query({
            query: ({id}) => ({
                url: `${ROOMMATES_URL}/roommate/${id}`,
                method: "GET",
            })
        }),
    })
})

export const { useGetRoommatesQuery, useGetRoommateQuery } = roommatesApiSlice