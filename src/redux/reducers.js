import { SET_USER_NAME, SET_USER_AGE, SET_LOGGED_IN } from './actions'

const initialState = {
    name: '',
    age: 0,
    username: '',
    password: '',
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_NAME:
            return { ...state, name: action.payload }
        case SET_USER_AGE:
            return { ...state, age: action.payload }
        default:
            return state
    }
}

export function authentication(state = initialState, action) {
    switch (action.type) {
        case SET_LOGGED_IN:
            return { ...state, username, password: action.payload }
        default:
            return state
    }
}
