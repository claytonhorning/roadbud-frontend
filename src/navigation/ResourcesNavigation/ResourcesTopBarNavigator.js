import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import ListViewNavigator from '../RouteScreenNavigation/ListViewNavigator'
import VideoScreen from '../../screens/Video'
import SafeAreaView from 'react-native-safe-area-view'
import PlannedEventsScreen from '../../screens/PlannedEvents'

const ResourcesTopBar = createMaterialTopTabNavigator()

export default function RouteTopBarNavigator() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ResourcesTopBar.Navigator>
                {/* <ResourcesTopBar.Screen
                    name="Live Videos"
                    component={VideoScreen}
                /> */}
                <ResourcesTopBar.Screen
                    name="Planned Events"
                    component={PlannedEventsScreen}
                />
            </ResourcesTopBar.Navigator>
        </SafeAreaView>
    )
}
