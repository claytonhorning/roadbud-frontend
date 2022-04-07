import {
    GET_PLANNED_EVENTS,
    SIGN_UP,
    SIGN_OUT,
    SIGN_IN,
    LOAD_USER,
} from './actions'
import jwtDecode from 'jwt-decode'
import AsyncStorage from '@react-native-async-storage/async-storage'

const initialState = {
    token: null,
    fullName: '',
    email: '',
    password: '',
    _id: '',
    plannedEventsRecieved: [],
}

let user = {}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PLANNED_EVENTS:
            return { ...state, plannedEventsRecieved: action.payload }
        case SIGN_UP:
            user = jwtDecode(action.token)
            return {
                ...state,
                token: action.token,
                fullName: user.fullName,
                email: user.email,
                password: user.password,
                _id: user._id,
            }
        case SIGN_IN:
            user = jwtDecode(action.token)
            return {
                ...state,
                token: action.token,
                fullName: user.fullName,
                email: user.email,
                password: user.password,
                _id: user._id,
            }
        case SIGN_OUT:
            AsyncStorage.removeItem('token')
            return {
                token: null,
                fullName: null,
                email: null,
                password: null,
                _id: null,
            }
        case LOAD_USER:
            user = jwtDecode(action.token)
            return {
                ...state,
                token: action.token,
                fullName: user.fullName,
                email: user.email,
                password: user.password,
                _id: user._id,
            }
        default:
            return state
    }
}
