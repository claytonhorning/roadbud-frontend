import { SET_LOGGED_IN, GET_PLANNED_EVENTS } from './actions'

const initialState = {
    username: '',
    password: '',
    plannedEventsRecieved: [],
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PLANNED_EVENTS:
            return { ...state, plannedEventsRecieved: action.payload }
        default:
            return state
    }
}
