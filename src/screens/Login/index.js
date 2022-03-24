import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Dimensions,
    Image,
    Keyboard,
} from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Logo from 'assets/img/logo/dark.png'
import Input from '../../components/Input'
import SocialButtons from '../../components/SocialButtons'
import Button from '../../components/Button'

const { height, width } = Dimensions.get('window')

export default function Login() {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({})

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
        if (!inputs.password) {
            handleError('Please input password', 'password')
            isValid = false
        } else if (inputs.password.length < 8) {
            handleError('Min password length of 8', 'password')
            isValid = false
        }

        if (isValid) {
            register()
        }
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
                <Text style={styles.header}>Login</Text>
                <Input
                    onChangeText={(text) => handleOnchange(text, 'email')}
                    onFocus={() => handleError(null, 'email')}
                    iconName="email-outline"
                    label="Email"
                    placeholder="Enter your email address"
                    error={errors.email}
                />
                <Input
                    onChangeText={(text) => handleOnchange(text, 'password')}
                    onFocus={() => handleError(null, 'password')}
                    iconName="lock-outline"
                    label="Password"
                    placeholder="Enter your password"
                    error={errors.password}
                />
                <Button title="Login" onPress={validate} />
                <Text style={styles.signUpText}>
                    Don't have an account?{' '}
                    <Text style={styles.signUpTextFlare}>Sign Up</Text>
                </Text>
                <View>
                    <View style={styles.seperator} />
                    <Text style={styles.orText}>OR</Text>
                </View>
                <SocialButtons login={true} />
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 30,
        marginHorizontal: 20,
    },
    header: {
        fontSize: 22,
        fontWeight: '500',
        color: '#000',
        opacity: 0.4,
        marginBottom: 15,
    },
    logo: {
        resizeMode: 'contain',
        height: height * 0.05,
        width: width * 0.5,
        marginVertical: 10,
    },
    seperator: {
        position: 'absolute',
        top: 11,
        alignSelf: 'center',
        width: '50%',
        borderWidth: 2,
        borderColor: '#ccc',
        borderStyle: 'dotted',
    },
    orText: {
        color: '#ccc',
        fontSize: 22,
        alignSelf: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    signUpText: {
        alignSelf: 'center',
        marginBottom: 20,
    },
    signUpTextFlare: {
        color: '#FFA071',
        fontWeight: '600',
    },
})
