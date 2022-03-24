import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import RouteScreen from '../../screens/Route'
import MapScreen from '../../screens/Map'
import AccountScreen from '../../screens/Account'
import NotificationsScreen from '../../screens/Notifications'
import PostScreen from '../../screens/Post'
import Icon from 'react-native-vector-icons/FontAwesome5'

const Tab = createBottomTabNavigator()

export default function BottomNavbar() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: { backgroundColor: '#000' },
            }}
        >
            <Tab.Screen
                name="Route"
                component={RouteScreen}
                options={{
                    headerShown: false,
                    tabBarActiveTintColor: '#fff',
                    tabBarIcon: ({ color }) => (
                        <Icon color={color} name="route" size={25} />
                    ),
                }}
            />
            <Tab.Screen
                name="Map"
                component={MapScreen}
                options={{
                    headerShown: false,
                    tabBarActiveTintColor: '#fff',
                    tabBarIcon: ({ color }) => (
                        <Icon color={color} name="map-pin" size={25} />
                    ),
                }}
            />
            <Tab.Screen
                name="Post"
                component={PostScreen}
                options={{
                    headerShown: false,
                    tabBarActiveTintColor: '#fff',
                    tabBarIcon: ({ color }) => (
                        <Icon color={color} name="plus-circle" size={25} />
                    ),
                }}
            />
            <Tab.Screen
                name="Notifications"
                component={NotificationsScreen}
                options={{
                    headerShown: false,
                    tabBarActiveTintColor: '#fff',
                    tabBarIcon: ({ color }) => (
                        <Icon color={color} name="concierge-bell" size={25} />
                    ),
                }}
            />
            <Tab.Screen
                name="Account"
                component={AccountScreen}
                options={{
                    headerShown: false,
                    tabBarActiveTintColor: '#fff',
                    tabBarIcon: ({ color }) => (
                        <Icon color={color} name="user-alt" size={25} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}
