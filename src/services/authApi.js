import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

API_URL = 'https://0b2e-24-9-207-248.ngrok.io'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
    }),
    endpoints: (build) => ({
        signUpUser: build.mutation({
            query: (user) => ({
                url: '/auth',
                method: 'POST',
                body: user,
            }),
        }),
        loginUser: build.mutation({
            query: (user) => ({
                url: '/auth/login',
                method: 'POST',
                body: user,
            }),
        }),
    }),
})

export const { useSignUpUserMutation, useLoginUserMutation } = authApi
