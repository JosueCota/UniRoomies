import { apiSlice } from "./apiSlice";
import { AUTH_URL, USERS_URL } from "../utils/constants";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/createUser`,
                method: "POST",
                data
            }),
        }),
        resendLink: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/resendLink`,
                method: "POST",
                data
            })
        }),
        verifyEmail : builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/register`,
                method: "POST",
                data
            })
        }),
        login: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/login`,
                method: "POST",
                data
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${AUTH_URL}/logout`,
                method: "POST", 
            })
        }),
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
    })
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useResendLinkMutation, useVerifyEmailMutation, useUpdateUserNameMutation, useUpdateUserPasswordMutation, useActivateUserMutation, useDeleteUserMutation} = usersApiSlice;