import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    toText: null,
    fromText: null,
    to: null,
    from: null,
    polyline: [],
    events: [],
}

export const directionsSlice = createSlice({
    name: 'directions',
    initialState,
    reducers: {
        setDirections: (state, { payload }) => {
            state.to = payload.to
            state.from = payload.from
            state.events = payload.events
            state.toText = payload.toText
            state.fromText = payload.fromText
        },
    },
})

export const { setDirections } = directionsSlice.actions
