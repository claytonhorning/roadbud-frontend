import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import BottomNavbar from './navigation/BottomNavbar/BottomNavbar'
import { Provider } from 'react-redux'
import { Store } from './redux/store'
import AuthStack from './navigation/AuthNavigation'

export default function App() {
    const isSignedIn = 1
    return (
        <Provider store={Store}>
            <NavigationContainer>
                {isSignedIn ? <BottomNavbar /> : <AuthStack />}
            </NavigationContainer>
        </Provider>
    )
}
