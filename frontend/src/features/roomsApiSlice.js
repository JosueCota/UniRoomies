import { apiSlice } from "./apiSlice";
import { ROOMS_URL } from "../utils/constants";

export const roommatesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getRooms: builder.query({
            query: ({location, budget, offset}) => {
                let params = "/";
                
                params += location? `${location}`: `none`;
                if (budget) params+=`/${budget}`;

                return ({
                    url: `${ROOMS_URL}/${offset}${params}`,
                    method: "GET",
                })
            },
        }),
        getRoom: builder.query({
            query: ({id}) => ({
                url: `${ROOMS_URL}/roommate/${id}`,
                method: "GET",
            })
        }),
        createUpdateRoom: builder.query({
            query: ({id}) => ({
                url: `${ROOMS_URL}/roommate/${id}`,
                method: "GET",
            })
        }),
        deleteRoom: builder.query({
            query: ({id}) => ({
                url: `${ROOMS_URL}/roommate/${id}`,
                method: "DELETE",
            })
        }),
    })
})

export const { useGetRoomQuery, useGetRoomsQuery, useDeleteRoomQuery, useCreateUpdateRoomQuery } = roommatesApiSlice