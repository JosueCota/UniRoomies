import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../utils/constants";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateUserName: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: "PUT",
                data
            }),
        }),
        updateUserPassword: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/password`,
                method: "PUT",
                data
            }),
        }),
        deleteUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: "DELETE",
                data
            }),
        }),
        activateUser: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/activate`,
                method: "PUT",
            }),
        }),
        updateUserDetails: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/userDetails`,
                method: "POST",
                data
            })
        }),
        getUserDetails: builder.query({
            query: () => ({
                url: `${USERS_URL}/userDetails`,
                method: "GET",
            })
        })
    })
})

export const { useUpdateUserNameMutation, useUpdateUserPasswordMutation, useActivateUserMutation, useDeleteUserMutation, useUpdateUserDetailsMutation, useGetUserDetailsQuery } = usersApiSlice;