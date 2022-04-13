import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import BottomNavbar from './navigation/BottomNavbar/BottomNavbar'
import { Provider, useDispatch, useSelector } from 'react-redux'
import store from './store'
import AuthStack from './navigation/AuthNavigation'
import { loadUser } from './store/authSlice'

export default function ReduxProvider() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

const App = () => {
    const { token } = useSelector((state) => state.auth)

    dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadUser())
    }, [])

    console.log(token)

    return (
        <NavigationContainer>
            {token == null ? <AuthStack /> : <BottomNavbar />}
        </NavigationContainer>
    )
}
