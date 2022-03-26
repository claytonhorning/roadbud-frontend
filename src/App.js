import React from 'react'
import RouteScreen from './screens/Route'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import BottomNavbar from './components/BottomNavbar/BottomNavbar'
import EventScreen from './components/Event'

export default function App() {
    return (
        <NavigationContainer>
            {/* One navigation for when users aren't logged in */}

            <BottomNavbar />
            {/* Allow access to bottom navbar when users are logged in */}
        </NavigationContainer>
    )
}
