import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = 'https://0b2e-24-9-207-248.ngrok.io'

export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
                headers.set(
                    'Content-Type',
                    'multipart/form-data; charset="UTF-8"; boundary=MyBoundary'
                )
            }
            return headers
        },
    }),
    endpoints: (build) => ({
        createPost: build.mutation({
            query: (post) => ({
                url: '/post',
                method: 'POST',
                body: post,
            }),
        }),
    }),
})

export const { useCreatePostMutation } = postsApi
