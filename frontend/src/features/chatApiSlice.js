import { apiSlice } from "./apiSlice";
import { CHATS_URL } from "../utils/constants";

//Responsible for api calls on chat route
export const chatApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createChat: builder.mutation({
            query: (data) => ({
                url: `${CHATS_URL}`,
                method: "POST",
                data
            }),
            invalidatesTags: ["Chats", "Messages"]
        }),
        getChats: builder.query({
            query: () => ({
                url: `${CHATS_URL}`,
                method: "GET",
            }),
            providesTags: ["Chats"]
        }),
        getMessages: builder.query({
            query: ({chatId}) => ({
                url: `${CHATS_URL}/messages/${chatId}`,
                method: "GET",
            }),
            providesTags: ["Messages"]
        }),
        changeHideChat: builder.mutation({
            query: ({chatId}) => ({
                url: `${CHATS_URL}/hideChat/${chatId}`,
                method: "POST",
            }),
            invalidatesTags: ["Chats", "Messages"]
        }),
    })
})

export const { useChangeHideChatMutation, useCreateChatMutation, useGetChatsQuery, useGetMessagesQuery } = chatApiSlice