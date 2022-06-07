import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Dimensions,
    Image,
    Keyboard,
    Pressable,
} from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Logo from 'assets/img/logo/dark.png'
import Input from '../../components/Inputs/Input'
import SocialButtons from '../../components/Buttons/SocialButtons'
import Button from '../../components/Buttons/Button'
import { useDispatch } from 'react-redux'
import { useLoginUserMutation } from '../../services/roadbudApi'
import { COLORS } from '../../styles'

const { height, width } = Dimensions.get('window')

export default function Login({ navigation }) {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    })

    const [errors, setErrors] = useState({})

    const [signInUser, result] = useLoginUserMutation()

    const loginUser = async () => {
        let user = {
            email: inputs.email,
            password: inputs.password,
        }

        signInUser(user).then((res) => {
            if (res.error !== null) {
                handleError(res.error.data.error, 'login')
            }
        })
    }
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
            console.log('everything valid')
            loginUser()
        }
    }

    const handleOnchange = (text, input) => {
        setInputs((prevState) => ({ ...prevState, [input]: text }))
    }
    const handleError = (error, input) => {
        setErrors((prevState) => ({ ...prevState, [input]: error }))
    }
    console.log(errors)
    return (
        <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
            <KeyboardAwareScrollView style={styles.container}>
                <Image style={styles.logo} source={Logo} />
                <Text style={styles.header}>Login</Text>
                <Input
                    onChangeText={(text) => handleOnchange(text, 'email')}
                    onFocus={() => handleError(null, 'email')}
                    iconName="mail"
                    label="Email"
                    placeholder="Enter your email address"
                    error={errors.email}
                />
                <Input
                    onChangeText={(text) => handleOnchange(text, 'password')}
                    onFocus={() => handleError(null, 'password')}
                    iconName="lock"
                    label="Password"
                    placeholder="Enter your password"
                    error={errors.password}
                />
                <Button title="Login" onPress={validate} />
                {errors.login && (
                    <Text
                        style={{
                            color: COLORS.warning,
                            textAlign: 'center',
                            marginBottom: 3,
                        }}
                    >
                        {errors.login}
                    </Text>
                )}

                <View style={styles.signupTextRow}>
                    <Text style={styles.signupText}>
                        Don't have an account?{' '}
                    </Text>
                    <Pressable
                        onPress={() => navigation.navigate('SignUpScreen')}
                    >
                        <Text style={styles.signupTextFlare}>Sign Up</Text>
                    </Pressable>
                </View>

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
        marginBottom: 30,
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
    signupTextRow: {
        flex: 1,
        alignItems: 'flex-end',
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'center',
    },
    signupText: {
        fontSize: 16,
        color: '#000',
    },
    signupTextFlare: {
        fontSize: 16,
        color: '#FF7A01',
    },
})
