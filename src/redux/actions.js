export const SET_USER_NAME = 'SET_USER_NAME'
export const SET_USER_AGE = 'SET_USER_AGE'
export const SET_LOGGED_IN = 'SET_LOGGED_IN'

export const setName = (name) => (dispatch) => {
    dispatch({
        type: SET_USER_NAME,
        payload: name,
    })
}

export const setAge = (age) => (dispatch) => {
    dispatch({
        type: SET_USER_AGE,
        payload: age,
    })
}

export const setLoggedIn = (username, password) => (dispatch) => {
    dispatch({
        type: SET_LOGGED_IN,
        payload: (username, password),
    })
}
