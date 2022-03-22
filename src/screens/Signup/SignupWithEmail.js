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
    Dimensions,
    Button,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import Logo from 'assets/img/logo/dark.png'

const { height, width } = Dimensions.get('window')

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

export default function SignupWithEmail() {
    const [keyboardStatus, setKeyboardStatus] = useState(false)
    const [step, setStep] = useState(1)

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardStatus('Shown')
        })
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardStatus('Hidden')
        })

        return () => {
            showSubscription.remove()
            hideSubscription.remove()
        }
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                {step == 1 ? (
                    <>
                        <View style={styles.topContainer}>
                            <Image style={styles.logo} source={Logo} />
                            <Text style={styles.header}>
                                Sign up with email.
                            </Text>
                            <View>
                                <Text style={styles.inputLabel}>Full Name</Text>
                                <CustomTextInput
                                    style={[styles.input, styles.shadowProp]}
                                    placeholder="Full Name"
                                    autoFocus={true}
                                />
                            </View>
                            <View>
                                <Text style={styles.inputLabel}>
                                    Email Address
                                </Text>
                                <CustomTextInput
                                    style={[styles.input, styles.shadowProp]}
                                    placeholder="Email Address"
                                />
                            </View>
                        </View>
                        <View style={styles.bottomContainer}>
                            <TouchableOpacity
                                style={styles.submitButton}
                                onPress={() => {
                                    setStep(2)
                                }}
                            >
                                <Text style={styles.submitText}>Next</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <>
                        <View style={styles.topContainer}>
                            <Image style={styles.logo} source={Logo} />
                            {/* <Text
                                onPress={() => setStep(1)}
                                style={styles.goBackText}
                            >
                                &lsaquo; Go back
                            </Text> */}
                            <Text style={styles.header}>Almost done</Text>
                            <View>
                                <Text style={styles.inputLabel}>Password</Text>
                                <CustomTextInput
                                    style={[styles.input, styles.shadowProp]}
                                    placeholder="Password"
                                />
                            </View>
                            <View>
                                <Text style={styles.inputLabel}>
                                    Confirm Password
                                </Text>
                                <CustomTextInput
                                    style={[styles.input, styles.shadowProp]}
                                    placeholder="Confirm Password"
                                />
                            </View>
                        </View>
                        <View style={styles.bottomContainer}>
                            <TouchableOpacity style={styles.submitButton}>
                                <Text style={styles.submitText}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
    },
    topContainer: {
        flex: 1,
    },
    logo: {
        resizeMode: 'contain',
        height: height * 0.05,
        width: width * 0.5,
        marginVertical: 15,
    },
    header: {
        fontSize: 22,
        fontWeight: '500',
        color: '#000',
        marginBottom: 20,
        opacity: 0.7,
    },
    input: {
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingLeft: 30,
        fontSize: 18,
        marginBottom: 15,
    },
    inputLabel: {
        color: '#000',
        fontSize: 16,
        marginBottom: 5,
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    submitButton: {
        backgroundColor: '#000',
        height: 60,
        borderRadius: 10,
        marginbottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    goBackText: {
        color: '#047FE8',
    },
    bottomContainer: {
        marginBottom: 10,
    },
})
