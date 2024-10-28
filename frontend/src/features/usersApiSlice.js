import { apiSlice } from "./apiSlice";
import { AUTH_URL, USERS_URL } from "../utils/constants";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/createUser`,
                method: "POST",
                body: data
            }),
        }),
        resendLink: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/resendLink`,
                method: "POST",
                body: data
            })
        }),
        verifyEmail : builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/register`,
                method: "POST",
                body: data
            })
        }),
        login: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/login`,
                method: "POST",
                body: data
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
                body: data
            }),
        }),
        updateUserPassword: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/password`,
                method: "PUT",
                body: data
            }),
        }),
    })
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useResendLinkMutation, useVerifyEmailMutation, useUpdateUserNameMutation, useUpdateUserPasswordMutation} = usersApiSlice;