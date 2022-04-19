import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import BottomNavbar from './navigation/BottomNavbar/BottomNavbar'
import { Provider, useDispatch, useSelector } from 'react-redux'
import store from './store'
import AuthStack from './navigation/AuthNavigation'
import { loadUser } from './store/authSlice'
import LoadingScreen from './screens/Loading'
import { StatusBar } from 'react-native'

export default function ReduxProvider() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}
const App = () => {
    const { token, loading } = useSelector((state) => state.auth)
    dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadUser())
    }, [])

    if (loading) {
        return <LoadingScreen />
    }
    return (
        <NavigationContainer>
            <StatusBar barStyle="dark-content" />
            {token == null ? <AuthStack /> : <BottomNavbar />}
        </NavigationContainer>
    )
}
