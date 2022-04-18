import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RouteScreen from '../../screens/Route'
import MapScreen from '../../screens/Map'
import PostToEventScreen from '../../screens/Post/PostToEventScreen'
import ViewCreatedEvent from '../../screens/Event'

const MapStack = createNativeStackNavigator()

export default function MapScreenNavigator() {
    return (
        <MapStack.Navigator>
            <MapStack.Screen
                options={{ headerShown: false }}
                name="MapScreen"
                component={MapScreen}
            />
            <MapStack.Screen
                options={{
                    headerBackTitle: 'Back to map',
                    headerTitle: '',
                }}
                name="PostToEventScreen"
                component={PostToEventScreen}
            />
            <MapStack.Screen
                options={{
                    headerBackTitle: 'Back to map',
                    headerTitle: '',
                }}
                name="ViewCreatedEvent"
                component={ViewCreatedEvent}
            />
        </MapStack.Navigator>
    )
}

const styles = StyleSheet.create({})
