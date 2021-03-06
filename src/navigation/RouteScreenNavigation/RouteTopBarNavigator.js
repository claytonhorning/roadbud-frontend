import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import ListViewNavigator from '../RouteScreenNavigation/ListViewNavigator'
import MapViewNavigator from '../RouteScreenNavigation/MapViewNavigator'
import SafeAreaView from 'react-native-safe-area-view'

const RouteTopBar = createMaterialTopTabNavigator()

export default function RouteTopBarNavigator() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <RouteTopBar.Navigator>
                <RouteTopBar.Screen
                    name="Map View"
                    component={MapViewNavigator}
                />
                <RouteTopBar.Screen
                    name="List View"
                    component={ListViewNavigator}
                />
            </RouteTopBar.Navigator>
        </SafeAreaView>
    )
}
