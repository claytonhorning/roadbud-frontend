import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import BottomNavbar from './navigation/BottomNavbar/BottomNavbar'

export default function App() {
    return (
        <NavigationContainer>
            {/* One navigation for when users aren't logged in */}

            <BottomNavbar />
            {/* Allow access to bottom navbar when users are logged in */}
        </NavigationContainer>
    )
}
