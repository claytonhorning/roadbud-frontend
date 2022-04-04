import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { userReducer, authentication } from './reducers'

const rootReducer = combineReducers({ userReducer, authentication })

export const Store = createStore(rootReducer, applyMiddleware(thunk))
