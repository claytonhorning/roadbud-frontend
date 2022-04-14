import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DB_HOST } from '@env'

export const eventsApi = createApi({
    reducerPath: 'eventsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: DB_HOST,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (build) => ({
        createEvent: build.mutation({
            query: (event) => ({
                url: '/event',
                method: 'POST',
                body: event,
            }),
        }),
        getEvent: build.query({
            query: (id) => `/event/${id}`,
        }),
        getEvents: build.query({
            query: () => '/event',
        }),
    }),
})

export const { useCreateEventMutation, useGetEventQuery, useGetEventsQuery } =
    eventsApi
