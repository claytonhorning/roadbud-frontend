import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView,
    Image,
    Dimensions,
    Keyboard,
} from 'react-native'
import React, { useState } from 'react'
import Input from 'components/Inputs/Input'
import Logo from 'assets/img/logo/dark.png'
import Button from '../../components/Buttons/Button'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const { height, width } = Dimensions.get('window')

export default function SignUpWithEmail({navigation}) {
    const [inputs, setInputs] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const validate = () => {
        Keyboard.dismiss()
        let isValid = true

        if (!inputs.email) {
            handleError('Please input email', 'email')
            isValid = false
        } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
            handleError('Please input a valid email', 'email')
            isValid = false
        }

        if (!inputs.fullName) {
            handleError('Please input full name', 'fullName')
            isValid = false
        } else if (inputs.fullName.length < 5) {
            handleError('Minimum 5 characters', 'fullName')
            isValid = false
        }

        if (!inputs.password) {
            handleError('Please input password', 'password')
            isValid = false
        } else if (inputs.password.length < 8) {
            handleError('Min password length of 8', 'password')
            isValid = false
        }

        if (!inputs.confirmPassword) {
            handleError('Please confirm your password', 'confirmPassword')
            isValid = false
        } else if (inputs.password !== inputs.confirmPassword) {
            handleError('Your passwords need to match', 'confirmPassword')
            isValid = false
        }

        if (isValid) {
            register()
        }
    }

    const register = () => {
        setLoading(true)
        setTimeout(() => {
            try {
                setLoading(false)
                AsyncStorage.setItem('userData', JSON.stringify(inputs))
                navigation.navigate('LoginScreen')
            } catch (error) {
                Alert.alert('Error', 'Something went wrong')
            }
        }, 3000)
    }

    const handleOnchange = (text, input) => {
        setInputs((prevState) => ({ ...prevState, [input]: text }))
    }
    const handleError = (error, input) => {
        setErrors((prevState) => ({ ...prevState, [input]: error }))
    }
    return (
        <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
            <KeyboardAwareScrollView style={styles.container}>
                <Image style={styles.logo} source={Logo} />
                <Text style={styles.header}>Sign up with email</Text>
                <View style={{ marginVertical: 20 }}>
                    <Input
                        onChangeText={(text) =>
                            handleOnchange(text, 'fullName')
                        }
                        onFocus={() => handleError(null, 'fullName')}
                        iconName="account-outline"
                        label="Full Name"
                        placeholder="Enter your full name"
                        error={errors.fullName}
                    />
                    <Input
                        onChangeText={(text) => handleOnchange(text, 'email')}
                        onFocus={() => handleError(null, 'email')}
                        iconName="email-outline"
                        label="Email"
                        placeholder="Enter your email address"
                        error={errors.email}
                    />
                    <Input
                        onChangeText={(text) =>
                            handleOnchange(text, 'password')
                        }
                        onFocus={() => handleError(null, 'password')}
                        iconName="lock-outline"
                        label="Password"
                        placeholder="Enter your password"
                        error={errors.password}
                    />
                    <Input
                        onChangeText={(text) =>
                            handleOnchange(text, 'confirmPassword')
                        }
                        onFocus={() => handleError(null, 'confirmPassword')}
                        iconName="lock-outline"
                        label="Confirm Password"
                        placeholder="Confirm your password"
                        error={errors.confirmPassword}
                        password
                    />
                    <Button title="Sign Up" onPress={validate} />
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        marginHorizontal: 20,
    },
    logo: {
        resizeMode: 'contain',
        height: height * 0.05,
        width: width * 0.5,
        marginVertical: 10,
    },
    header: {
        fontSize: 22,
        fontWeight: '500',
        color: '#000',
        opacity: 0.4,
        marginBottom: 15,
    },
})
