import { apiSlice } from "./apiSlice";
import { USERS_URL, AUTH_URL } from "../../utils/constants";

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

    })
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useResendLinkMutation, useVerifyEmailMutation} = usersApiSlice;