import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PostScreen from '../../screens/Post'
import ReportEventScreen from '../../screens/Post/ReportEventScreen'
import PostToEventScreen from '../../screens/Post/PostToEventScreen'
import ViewCreatedEvent from '../../screens/Event'

const PostStack = createNativeStackNavigator()

export default function PostScreenNavigator() {
    return (
        <PostStack.Navigator>
            <PostStack.Screen
                options={{ headerShown: false }}
                name="PostScreen"
                component={PostScreen}
            />
            <PostStack.Screen
                options={{
                    headerBackTitle: 'Back to add post',
                    headerTitle: '',
                }}
                name="ReportEventScreen"
                component={ReportEventScreen}
            />
            <PostStack.Screen
                options={{
                    headerBackTitle: 'Back to add post',
                    headerTitle: '',
                }}
                name="PostToEventScreen"
                component={PostToEventScreen}
            />
            <PostStack.Screen
                options={{
                    headerBackTitle: 'Back to add post',
                    headerTitle: '',
                }}
                name="ViewCreatedEvent"
                component={ViewCreatedEvent}
            />
        </PostStack.Navigator>
    )
}
