import AsyncStorage from '@react-native-async-storage/async-storage'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { authApi } from '../services/authApi'

API_URL = 'https://b0c9-2601-280-8100-14d0-4517-f1dd-42cf-a4f.ngrok.io'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
    },
    reducers: {
        loadUser: (state, action) => {
            state.token = action.payload
            if (state.token !== null) {
                state.user = jwtDecode(action.payload)
            }
        },
        logoutUser: (state, action) => {
            AsyncStorage.removeItem('token')
            state.token = null
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.signUpUser.matchFulfilled,
            (state, { payload }) => {
                AsyncStorage.setItem('token', payload.token)
                state.token = payload.token
            }
        ),
            builder.addMatcher(
                authApi.endpoints.loginUser.matchFulfilled,
                (state, { payload }) => {
                    AsyncStorage.setItem('token', payload.token)
                    state.token = payload.token
                }
            )
    },
})

export const loadUser = () => {
    return async (dispatch) => {
        let token = await AsyncStorage.getItem('token')
        dispatch(authSlice.actions.loadUser(token))
    }
}

export const { logoutUser } = authSlice.actions

export default authSlice
