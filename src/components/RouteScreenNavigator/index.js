import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RouteScreen from '../../screens/Route'
import EventScreen from '../../screens/Event'

const RouteStack = createNativeStackNavigator()

export default function RouteScreenNavigator() {
    return (
        <RouteStack.Navigator>
            <RouteStack.Screen
                options={{ headerShown: false }}
                name="RouteScreen"
                component={RouteScreen}
            />
            <RouteStack.Screen
                options={{
                    headerBackTitle: 'Back to route',
                    headerTitle: '',
                }}
                name="EventScreen"
                component={EventScreen}
            />
        </RouteStack.Navigator>
    )
}

const styles = StyleSheet.create({})
