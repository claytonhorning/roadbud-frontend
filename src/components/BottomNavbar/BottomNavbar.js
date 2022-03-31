import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import RouteScreen from '../../screens/Route'
import MapScreen from '../../screens/Map'
import AccountScreen from '../../screens/Account'
import NotificationsScreen from '../../screens/Notifications'
import PostScreen from '../../screens/Post'
import Icon from '../../components/Icon'
import RouteScreenNavigator from '../RouteScreenNavigator'
import PostScreenNavigator from '../PostScreenNavigator'

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
                component={RouteScreenNavigator}
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
                        <Icon color={color} name="map" size={25} />
                    ),
                }}
            />
            <Tab.Screen
                name="Post"
                component={PostScreenNavigator}
                options={{
                    headerShown: false,
                    tabBarActiveTintColor: '#fff',
                    tabBarIcon: ({ color }) => (
                        <Icon color={color} name="post" size={25} />
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
                        <Icon color={color} name="bell" size={25} />
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
                        <Icon color={color} name="user" size={25} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}
