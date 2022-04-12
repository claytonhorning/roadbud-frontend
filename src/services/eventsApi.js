import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = 'https://0b2e-24-9-207-248.ngrok.io'

export const eventsApi = createApi({
    reducerPath: 'eventsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
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
    }),
})

export const { useCreateEventMutation, useGetEventQuery } = eventsApi
