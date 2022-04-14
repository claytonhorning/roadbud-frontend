import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Geolocation from 'react-native-geolocation-service'

const initialState = {
    loading: false,
    location: null,
}

export const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLocation.pending, (state, action) => {
            state.loading = true
        }),
            builder.addCase(getLocation.fulfilled, (state, { payload }) => {
                state.loading = false
                console.log(payload)
                state.location = payload.location
            }),
            builder.addCase(getLocation.rejected, (state, action) => {
                state.loading = true
            })
    },
})

export const getLocation = createAsyncThunk('getLocation', async (thunkAPI) => {
    let location = {}
    const auth = await Geolocation.requestAuthorization('whenInUse')

    if (auth === 'granted') {
        Geolocation.getCurrentPosition((position) => {
            const location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            }
            console.log(location)
        }),
            (error) => {
                console.log(error.message)
            }
    }
    return location
})
