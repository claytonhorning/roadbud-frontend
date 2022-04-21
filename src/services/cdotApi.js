import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CDOT_BASE, CDOT_API_KEY } from '@env'

export const cdotApi = createApi({
    reducerPath: 'cdotApi',
    baseQuery: fetchBaseQuery({
        baseUrl: CDOT_BASE,
    }),
    endpoints: (build) => ({
        getPlannedEvents: build.query({
            query: () => `/plannedEvents?apiKey=${CDOT_API_KEY}`,
        }),
        getRoadConditions: build.query({
            query: () => `/roadConditions?apiKey=${CDOT_API_KEY}`,
        }),
    }),
})

export const { useGetPlannedEventsQuery, useGetRoadConditionsQuery } = cdotApi
