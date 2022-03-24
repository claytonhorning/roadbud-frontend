import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Button = ({ title, onPress = () => {} }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={{
                height: 55,
                width: '100%',
                backgroundColor: 'black',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 8,
            }}
        >
            <Text
                style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 18,
                }}
            >
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default Button
