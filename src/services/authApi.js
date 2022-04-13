import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DB_HOST } from '@env'

API_URL = 'http://localhost:3000'

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
