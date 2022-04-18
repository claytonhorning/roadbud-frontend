import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DB_HOST } from '@env'

export const roadbudApi = createApi({
    reducerPath: 'roadbudApi',
    baseQuery: fetchBaseQuery({
        baseUrl: DB_HOST,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
                headers.set(
                    'Content-Type',
                    'multipart/form-data; charset="UTF-8"; boundary=---'
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
        getPosts: build.query({
            query: () => '/post',
        }),
    }),
})

export const { useCreatePostMutation, useGetPostsQuery } = roadbudApi
