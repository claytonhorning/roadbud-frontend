import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin'
import { GOOGLE_IOS_CLIENT_ID } from '@env'
import { useDispatch } from 'react-redux'
import {
    useLoginUserMutation,
    useSignUpUserMutation,
} from '../../services/roadbudApi'
import { TYPOGRAPHY } from '../../styles'

export default function SocialButtons({ login = false, navigation }) {
    const [errors, setErrors] = useState([])

    dispatch = useDispatch()
    const [signUpUser, signUpResult] = useSignUpUserMutation()
    const [loginUser, loginResult] = useLoginUserMutation()

    return (
        <>
            <TouchableOpacity
                onPress={() => {
                    GoogleSignin.configure({
                        iosClientId: GOOGLE_IOS_CLIENT_ID,
                    })
                    GoogleSignin.hasPlayServices()
                        .then((hasPlayService) => {
                            if (hasPlayService) {
                                GoogleSignin.signIn().then((userInfo) => {
                                    const user = {
                                        fullName: userInfo.user.name,
                                        email: userInfo.user.email,
                                        // photoUrl: userInfo.user.photo,
                                    }

                                    signUpUser(user).then((response) => {
                                        //Need to login user if they have an account
                                    })
                                })
                            }
                        })
                        .catch((e) => {
                            console.log('ERROR IS: ' + JSON.stringify(e))
                        })
                }}
                style={[styles.signupOption, styles.shadowProp]}
            >
                <Image
                    style={styles.optionLogo}
                    source={require('assets/img/logo/google-logo.png')}
                />
                <Text style={styles.signupOptionText}>
                    {login ? 'Log in' : 'Sign up'} with Google
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.signupFB, styles.shadowProp]}>
                <Image
                    style={styles.optionLogo}
                    source={require('assets/img/logo/fb-logo-white.png')}
                />
                <Text style={styles.signupTextLight}>
                    {login ? 'Log in' : 'Sign up'} with Facebook
                </Text>
            </TouchableOpacity>
            {login ? null : (
                <TouchableOpacity
                    style={[styles.signupEmail, styles.shadowProp]}
                    onPress={() => navigation.navigate('SignUpWithEmailScreen')}
                >
                    <Icon
                        name="email"
                        style={{ color: '#fff', fontSize: 34 }}
                    />
                    <Text style={styles.signupTextLight}>
                        {login ? 'Log in' : 'Sign up'} with Email
                    </Text>
                </TouchableOpacity>
            )}
            {errors.map((error) => (
                <Text style={styles.errorText}>{error}</Text>
            ))}
        </>
    )
}

const styles = StyleSheet.create({
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    signupOption: {
        paddingHorizontal: 25,
        marginVertical: 10,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
        height: 60,
        borderRadius: 10,
    },
    signupFB: {
        paddingHorizontal: 25,
        marginVertical: 10,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#1877F2',
        height: 60,
        borderRadius: 10,
    },
    signupEmail: {
        paddingHorizontal: 25,
        marginVertical: 10,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#000',
        height: 60,
        borderRadius: 10,
    },
    signupOptionText: {
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 15,
    },
    signupTextLight: {
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 15,
        color: '#fff',
    },
    optionLogo: {
        height: 34,
        width: 34,
    },
    errorText: {
        ...TYPOGRAPHY.errorText,
        textAlign: 'center',
    },
})
