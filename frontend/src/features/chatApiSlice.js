import { apiSlice } from "./apiSlice";
import { CHATS_URL } from "../utils/constants";

export const chatApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createChat: builder.query({
            query: (data) => ({
                url: `${CHATS_URL}`,
                method: "POST",
                data
            }),
        }),
        getChats: builder.query({
            query: () => ({
                url: `${CHATS_URL}`,
                method: "GET",
            })
        }),
        getMessages: builder.query({
            query: ({chat_id}) => ({
                url: `${CHATS_URL}/messages`,
                method: "GET",
                data: chat_id
            })
        }),
        changeHideChat: builder.query({
            query: ({chat_id}) => ({
                url: `${CHATS_URL}/hideChat`,
                method: "POST",
                data: chat_id
            })
        }),
    })
})

export const { useChangeHideChatQuery, useCreateChatQuery, useGetChatsQuery, useGetMessagesQuery } = chatApiSlice