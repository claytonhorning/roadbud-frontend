import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TextInput,
    KeyboardAvoidingView,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import Logo from '../assets/img/logo/dark.png'

import { createStackNavigator } from '@react-navigation/stack'

const SignupStack = () => {
    const SignupStack = createStackNavigator()
    return (
        <SignupStack.Navigator>
            <SignupStack.Screen
                name="Sign In"
                component={SignupWithEmail}
                options={{
                    headerTitle: '',
                    headerTransparent: true,
                }}
            />
            <SignupStack.Screen
                name="Sign Up 2"
                component={SignupWithEmail2}
                options={{
                    headerTitle: '',
                    headerTransparent: true,
                }}
            />
        </SignupStack.Navigator>
    )
}

import { View, Text } from 'react-native'
import React from 'react'

const SignupWithEmail = () => {
    return (
        <View>
            <Text>SignupWithEmail</Text>
        </View>
    )
}

const SignupWithEmail2 = () => {
    return (
        <View>
            <Text>SignupWithEmail</Text>
        </View>
    )
}

export const CustomTextInput = (props) => {
    const [isFocused, setIsFocused] = useState(false)
    return (
        <TextInput
            {...props}
            style={[
                props.style,
                isFocused && { borderWidth: 1, borderColor: '#047FE8' },
            ]}
            onBlur={() => setIsFocused(false)}
            onFocus={() => setIsFocused(true)}
        />
    )
}
