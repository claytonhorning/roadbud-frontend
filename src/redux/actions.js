export const SET_LOGGED_IN = 'SET_LOGGED_IN'
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

export const setLoggedIn = (username, password) => (dispatch) => {
    dispatch({
        type: SET_LOGGED_IN,
        payload: (username, password),
    })
}
