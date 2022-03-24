import { View, Text } from 'react-native'
import React from 'react'
import RouteScreen from './screens/Route'
import { NavigationContainer } from '@react-navigation/native'
import BottomNavbar from './components/BottomNavbar/BottomNavbar'

export default function App() {
    return (
        <NavigationContainer>
            {/* One navigation for when users aren't logged in */}

            <BottomNavbar />
            {/* Allow access to bottom navbar when users are logged in */}
        </NavigationContainer>
    )
}
