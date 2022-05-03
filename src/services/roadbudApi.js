import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DB_HOST } from '@env'

export const roadbudApi = createApi({
    reducerPath: 'roadbudApi',
    baseQuery: fetchBaseQuery({
        baseUrl: DB_HOST,
        prepareHeaders: (headers, { getState, endpoint }) => {
            const token = getState().auth.token
            //Add endpoints which shouldnt have the auth header
            if (token !== null) {
                headers.set('Authorization', `Bearer ${token}`)
                if (endpoint === 'createPost') {
                    headers.set(
                        'Content-Type',
                        'multipart/form-data; charset="UTF-8"; boundary=---'
                    )
                }
            }
            return headers
        },
    }),
    tagTypes: ['Event', 'Post', 'User', 'Directions'],
    endpoints: (build) => ({
        // AUTH ENDPOINTS
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
            query: () => '/auth/me',
            providesTags: ['User'],
        }),
        updateUserDataSettings: build.mutation({
            query: (settings) => ({
                url: '/auth/me',
                method: 'PATCH',
                body: settings,
            }),
            invalidatesTags: ['User'],
        }),

        // EVENT ENDPOINTS
        getEvents: build.query({
            query: () => '/event',
            providesTags: ['Event'],
        }),
        getEvent: build.query({
            query: (id) => `/event/${id}`,
            providesTags: ['Event'],
        }),
        createEvent: build.mutation({
            query: (event) => ({
                url: '/event',
                method: 'POST',
                body: event,
            }),
            invalidatesTags: ['Event', 'User'],
        }),
        updateEvent: build.mutation({
            query: (id, ...rest) => ({
                url: `/event/${id}`,
                method: 'PATCH',
                body: rest,
            }),
            invalidatesTags: ['Event', 'User'],
        }),
        deleteEvent: build.mutation({
            query: (id) => ({
                url: `/event/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Event', 'User'],
        }),

        //POST ENDPOINTS
        createPost: build.mutation({
            query: (post) => ({
                url: '/post',
                method: 'POST',
                body: post,
            }),
            invalidatesTags: ['Event', 'User'],
        }),

        //DIRECTIONS ENDPOINTS
        getDirections: build.query({
            query: (route) => `/directions/${route.to}&${route.from}`,
        }),
    }),
})

export const {
    useSignUpUserMutation,
    useLoginUserMutation,
    useGetUserDataQuery,
    useCreateEventMutation,
    useGetEventQuery,
    useGetEventsQuery,
    useCreatePostMutation,
    useUpdateUserDataSettingsMutation,
    useUpdateEventMutation,
    useDeleteEventMutation,
    useGetDirectionsQuery,
    useLazyGetDirectionsQuery,
} = roadbudApi
