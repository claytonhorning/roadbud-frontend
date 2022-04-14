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
                state.location = payload
                state.loading = false
            }),
            builder.addCase(getLocation.rejected, (state, action) => {
                state.loading = false
            })
    },
})

const setLocation = async (auth) =>
    new Promise((resolve, reject) => {
        if (auth === 'granted') {
            Geolocation.getCurrentPosition(
                (position) => {
                    location = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    }

                    resolve(location)
                },
                (error) => {
                    console.log('Error here' + error.message)
                }
            )
        }
    })

export const getLocation = createAsyncThunk('getLocation', async (thunkAPI) => {
    const auth = await Geolocation.requestAuthorization('whenInUse')

    const result = await setLocation(auth)
    return result
})
