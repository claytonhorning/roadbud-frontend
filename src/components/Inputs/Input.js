import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Input = ({
    label,
    iconName,
    error,
    password,
    onFocus = () => {},
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false)
    const [hidePassword, setHidePassword] = useState(password)
    return (
        <View style={{ marginBottom: 20 }}>
            <Text style={styles.inputLabel}>{label}</Text>
            <View
                style={[
                    styles.inputContainer,
                    {
                        borderColor: error
                            ? 'red'
                            : isFocused
                            ? '#047FE8'
                            : 'white',
                    },
                ]}
            >
                <Icon
                    name={iconName}
                    style={{ fontSize: 22, color: '#FF7A01', marginRight: 10 }}
                />
                <TextInput
                    secureTextEntry={hidePassword}
                    autoCorrect={false}
                    style={{ color: 'black', flex: 1 }}
                    onFocus={() => {
                        onFocus()
                        setIsFocused(true)
                    }}
                    onBlur={() => {
                        setIsFocused(false)
                    }}
                    {...props}
                />
                {password && (
                    <Icon
                        onPress={() => setHidePassword(!hidePassword)}
                        style={{ fontSize: 22 }}
                        name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
                    />
                )}
            </View>
            {error && (
                <Text style={{ color: 'red', fontSize: 12, marginTop: 7 }}>
                    {error}
                </Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        height: 55,
        backgroundColor: '#F8F8F8',
        paddingHorizontal: 20,
        fontSize: 18,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.5,
    },
    inputLabel: {
        color: '#000',
        fontSize: 14,
        marginBottom: 5,
    },
})

export default Input
