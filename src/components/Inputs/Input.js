import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native'
import React, { useState } from 'react'
import Icon from '../Icon'

const Input = ({
    label,
    iconName,
    error,
    password,
    rightButton,
    largeInput,
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
                    largeInput
                        ? styles.largeInputContainer
                        : styles.inputContainer,
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
                    style={{
                        fontSize: 18,
                        color: '#FF7A01',
                        marginRight: 15,
                    }}
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
                {/* {password && (
                    <Icon
                        onPress={() => setHidePassword(!hidePassword)}
                        style={{ fontSize: 22 }}
                        name={hidePassword ? 'eye' : 'eye-off'}
                    />
                )} */}
                {rightButton && (
                    <TouchableOpacity style={styles.rightButton}>
                        <Text style={{ color: '#fff', fontWeight: '600' }}>
                            {rightButton}
                        </Text>
                    </TouchableOpacity>
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
        fontSize: 18,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.5,
    },
    largeInputContainer: {
        height: 110,
        backgroundColor: '#F8F8F8',
        fontSize: 18,
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderWidth: 0.5,
        paddingTop: 10,
    },
    inputLabel: {
        color: '#000',
        fontSize: 14,
        marginBottom: 5,
    },
    rightButton: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: '#047FE8',
        paddingHorizontal: 10,
    },
})

export default Input
