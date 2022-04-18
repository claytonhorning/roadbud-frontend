import AsyncStorage from '@react-native-async-storage/async-storage'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { authApi } from '../services/authApi'

const initialState = {
    user: null,
    token: null,
    loading: false,
}

export const authSlice = createSlice({
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
                try {
                    state.user = jwtDecode(payload)
                } catch {
                    console.log('couldnt')
                }
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
                    console.log('here')
                    AsyncStorage.setItem('token', payload.token)
                    state.token = payload.token
                    state.user = jwtDecode(payload.token)
                }
            )
    },
})

export const loadUser = createAsyncThunk('loadUser', async (thunkAPI) => {
    const token = await AsyncStorage.getItem('token')
    return token
})

export const { logoutUser } = authSlice.actions
