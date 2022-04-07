import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import BottomNavbar from './navigation/BottomNavbar/BottomNavbar'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { Store } from './redux/store'
import { loadUser } from './redux/actions'
import AuthStack from './navigation/AuthNavigation'

export default function ReduxProvider() {
    return (
        <Provider store={Store}>
            <App />
        </Provider>
    )
}

const App = () => {
    const { token } = useSelector((state) => state.userReducer)
    dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadUser())
    }, [])

    return (
        <NavigationContainer>
            {token == null ? <AuthStack /> : <BottomNavbar />}
        </NavigationContainer>
    )
}
