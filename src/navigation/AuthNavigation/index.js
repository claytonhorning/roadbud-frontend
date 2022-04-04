import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../../screens/Login'
import SignUpScreen from '../../screens/Signup'
import SignUpWithEmailScreen from '../../screens/Signup/SignupWithEmail'

const AuthStack = createNativeStackNavigator()

export default function AuthNavigator() {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                options={{ headerShown: false }}
                name="SignUpScreen"
                component={SignUpScreen}
            />
            <AuthStack.Screen
                options={{ headerShown: false }}
                name="LoginScreen"
                component={LoginScreen}
            />
            <AuthStack.Screen
                options={{ headerShown: false }}
                name="SignUpWithEmailScreen"
                component={SignUpWithEmailScreen}
            />
        </AuthStack.Navigator>
    )
}
