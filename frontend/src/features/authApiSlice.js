import { apiSlice } from "./apiSlice";
import { AUTH_URL } from "../utils/constants";

export const authApiSlice = apiSlice.injectEndpoints({
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
        checkAuth: builder.query({
            query: () => ({
                url: `${AUTH_URL}/checkAuth`,
                method: "GET"
            })
        })
    })
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useResendLinkMutation, useVerifyEmailMutation, useCheckAuthQuery } = authApiSlice;