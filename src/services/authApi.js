import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DB_HOST } from '@env'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: DB_HOST,
        prepareHeaders: (headers, { getState, endpoint }) => {
            const token = getState().auth.token

            if (endpoint === 'getUserData') {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers
        },
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
        getUserData: build.query({
            query: () => ({
                url: '/auth/me',
            }),
        }),
    }),
})

export const {
    useSignUpUserMutation,
    useLoginUserMutation,
    useGetUserDataQuery,
} = authApi
