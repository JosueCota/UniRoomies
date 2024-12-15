import {createApi} from "@reduxjs/toolkit/query/react"
import api from "../utils/axiosApiInterceptor"

//Declares Api Slice for rtk api calls
const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await api({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
        withCredentials: true
      })
      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }

//Proxy takes care of baseUrl
const baseQuery = axiosBaseQuery({
    baseUrl: `${import.meta.env.MODE==="production" ? import.meta.env.VITE_BACKEND_URL: ""}`,
})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ["User", "User_Detail", "Room", "Messages", "Chats"],
    endpoints(build) {
        return {
          query: build.query({ query: () => ({ url: '/query', method: 'get' }) }),
          mutation: build.mutation({
            query: () => ({ url: '/mutation', method: 'post' }),
          }),
        }
      },
    })