import AsyncStorage from '@react-native-async-storage/async-storage'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { authApi } from '../services/authApi'

API_URL = 'https://b0c9-2601-280-8100-14d0-4517-f1dd-42cf-a4f.ngrok.io'

const initialState = {
    user: null,
    token: null,
    loading: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser: (state, action) => {
            AsyncStorage.removeItem('token')
            state.token = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadUser.pending, (state, action) => {
            state.loading = true
        }),
            builder.addCase(loadUser.fulfilled, (state, { payload }) => {
                state.loading = false
                state.token = payload
                state.user = jwtDecode(payload)
            }),
            builder.addCase(loadUser.rejected, (state, action) => {
                state.loading = false
            }),
            builder.addMatcher(
                authApi.endpoints.signUpUser.matchFulfilled,
                (state, { payload }) => {
                    AsyncStorage.setItem('token', payload.token)
                    state.token = payload.token
                    state.user = jwtDecode(payload.token)
                }
            ),
            builder.addMatcher(
                authApi.endpoints.loginUser.matchFulfilled,
                (state, { payload }) => {
                    AsyncStorage.setItem('token', payload.token)
                    state.token = payload.token
                    state.user = jwtDecode(payload.token)
                }
            )
    },
})

export const loadUser = createAsyncThunk('loadUser', async (thunkAPI) => {
    const token = await AsyncStorage.getItem('token')
    console.log(token)
    return token
})

export const { logoutUser } = authSlice.actions

export default authSlice
