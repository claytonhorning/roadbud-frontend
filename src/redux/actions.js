import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

//TYPES
export const SIGN_UP = 'SIGN_UP'
export const SIGN_OUT = 'SIGN_OUT'
export const SIGN_IN = 'SIGN_IN'
export const LOAD_USER = 'LOAD_USER'
export const GET_PLANNED_EVENTS = 'GET_PLANNED_EVENTS'

const CDOT_API_URL =
    'https://data.cotrip.org/api/v1/plannedEvents?apiKey=ZFV3ZK7-QVM4968-KB8FEE7-DB4TCMA'

export const getPlannedEvents = () => {
    try {
        return async (dispatch) => {
            const result = await fetch(CDOT_API_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res)
                .catch((err) => err)
            const json = await result.json()
            if (json) {
                dispatch({
                    type: GET_PLANNED_EVENTS,
                    payload: json,
                })
            } else {
                console.log('Unable to fetch')
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export const signUp = (user) => {
    return async (dispatch) => {
        axios
            .post(
                'https://42d9-2601-280-8100-14d0-59c4-3566-1259-539d.ngrok.io/auth',
                user
            )
            .then((token) => {
                AsyncStorage.setItem('token', token.data.token)
                dispatch({
                    type: SIGN_UP,
                    token: token.data.token,
                })
            })
            .catch((err) => {
                console.log(err.response?.data)
            })
    }
}

export const signIn = (email, password) => {
    return (dispatch) => {
        axios
            .post(
                'https://42d9-2601-280-8100-14d0-59c4-3566-1259-539d.ngrok.io/auth/login',
                { email: email, password: password }
            )
            .then((token) => {
                AsyncStorage.setItem('token', token.data.token)
                dispatch({
                    type: SIGN_IN,
                    token: token.data.token,
                })
            })
            .catch((err) => {
                console.log(err.response?.data)
            })
    }
}

export const signOut = () => {
    return (dispatch) => {
        dispatch({
            type: SIGN_OUT,
        })
    }
}

export const loadUser = () => {
    return async (dispatch) => {
        let token = await AsyncStorage.getItem('token')
        if (token !== null) {
            dispatch({
                type: LOAD_USER,
                token: token,
            })
        }
    }
}
