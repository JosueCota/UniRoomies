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
        }),
        getRoom: builder.query({
            query: ({id}) => ({
                url: `${ROOMS_URL}/room/${id}`,
                method: "GET",
            })
        }),
        createUpdateRoom: builder.query({
            query: ({data}) => ({
                url: `${ROOMS_URL}`,
                method: "POST",
                data
            })
        }),
        deleteRoom: builder.query({
            query: () => ({
                url: `${ROOMS_URL}`,
                method: "DELETE",
            })
        }),
    })
})

export const { useGetRoomQuery, useGetRoomsQuery, useDeleteRoomQuery, useCreateUpdateRoomQuery } = roomsApiSlice