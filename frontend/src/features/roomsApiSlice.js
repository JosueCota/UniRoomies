import { apiSlice } from "./apiSlice";
import { ROOMS_URL } from "../utils/constants";

export const roomsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getRooms: builder.query({
            query: ({location, price, offset}) => {
                let params = "/";
                
                params += location? `${location}`: `none`;
                if (price) params+=`/${price}`;

                return ({
                    url: `${ROOMS_URL}/${offset}${params}`,
                    method: "GET",
                })
            },
            providesTags: ["Room"]
        }),
        getRoom: builder.query({
            query: ({id}) => ({
                url: `${ROOMS_URL}/room/${id}`,
                method: "GET",
            }),
            providesTags: ["Room"]
        }),
        createUpdateRoom: builder.mutation({
            query: (data) => ({
                url: `${ROOMS_URL}`,
                method: "POST",
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                data
            }),
            invalidatesTags: ["Room"]
        }),
        deleteRoom: builder.mutation({
            query: () => ({
                url: `${ROOMS_URL}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Room"]
        }),
    })
})

export const { useGetRoomQuery, useGetRoomsQuery, useDeleteRoomMutation, useCreateUpdateRoomMutation } = roomsApiSlice