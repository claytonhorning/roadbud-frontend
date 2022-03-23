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
import { isDisabled } from 'react-native/Libraries/LogBox/Data/LogBoxData'

const { height, width } = Dimensions.get('window')

const CustomTextInput = (props) => {
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

const isValidObjField = (obj) => {
    return Object.values(obj).every((value) => value.trim())
}

const updateError = (error, stateUpdater) => {
    stateUpdater(error)
    setTimeout(() => {
        stateUpdater('')
    }, 2500)
}

const isValidEmail = (value) => {
    const regx =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    return regx.test(value)
}

export default function SignupWithEmail() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [error, setError] = useState('')
    const [isStepOneValid, setStepOneValidity] = useState(false)
    const [isStepTwoValid, setStepTwoValidity] = useState(false)

    const { fullName, email, password, confirmPassword } = formData

    const handleOnChangeText = (value, fieldName) => {
        setFormData({ ...formData, [fieldName]: value })
    }
    const isValidForm = () => {
        if (!isValidObjField(formData))
            return updateError('All fields required', setError)

        if (!fullName.trim() || fullName.length < 3)
            return updateError('Invalid Name', setError)

        if (!isValidEmail(email)) return updateError('Invalid Email', setError)

        if (!password.trim() || password.length < 8)
            return updateError(
                'Password must be more than 8 characters.',
                setError
            )

        if (password !== confirmPassword)
            return updateError('Password does not match', setError)

        return true
    }

    console.log(password, confirmPassword)

    const isValidStepOne = () => {
        if (!fullName.trim() || fullName.length < 3)
            return updateError(
                'Invalid Name',
                setError,
                setStepOneValidity(false)
            )

        if (!isValidEmail(email))
            return updateError(
                'Invalid Email',
                setError,
                setStepOneValidity(false)
            )
        setStepOneValidity(true)
        return true
    }

    const isValidStepTwo = () => {
        if (!password.trim() || password.length < 8)
            return updateError(
                'Password must be more than 8 characters.',
                setError,
                setStepTwoValidity(false)
            )

        if (password !== confirmPassword)
            return updateError(
                'Password does not match',
                setError,
                setStepTwoValidity(false)
            )

        setStepTwoValidity(true)
        return true
    }
    console.log(isStepTwoValid)

    const submitForm = () => {
        console.log('Form submitted')
    }

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
                                    value={fullName}
                                    onChangeText={(value) =>
                                        handleOnChangeText(value, 'fullName')
                                    }
                                />
                                {error ? (
                                    <Text style={styles.errorMsg}>{error}</Text>
                                ) : null}
                            </View>

                            <View>
                                <Text style={styles.inputLabel}>
                                    Email Address
                                </Text>
                                <CustomTextInput
                                    style={[styles.input, styles.shadowProp]}
                                    placeholder="Email Address"
                                    autoCapitalize="none"
                                    value={email}
                                    onChangeText={(value) =>
                                        handleOnChangeText(value, 'email')
                                    }
                                />
                            </View>
                        </View>
                        <View style={styles.bottomContainer}>
                            <TouchableOpacity
                                disabled={isStepOneValid ? false : true}
                                style={
                                    isStepOneValid
                                        ? [
                                              styles.submitButton,
                                              styles.shadowProp,
                                          ]
                                        : [
                                              styles.submitButtonDisabled,
                                              styles.shadowProp,
                                          ]
                                }
                                onPress={() => {
                                    {
                                        isValidStepOne() ? setStep(2) : null
                                    }
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
                                    autoCapitalize="none"
                                    autoFocus={true}
                                    value={password}
                                    onChangeText={(value) =>
                                        handleOnChangeText(value, 'password')
                                    }
                                />
                                {error ? (
                                    <Text style={styles.errorMsg}>{error}</Text>
                                ) : null}
                            </View>
                            <View>
                                <Text style={styles.inputLabel}>
                                    Confirm Password
                                </Text>
                                <CustomTextInput
                                    style={[styles.input, styles.shadowProp]}
                                    placeholder="Confirm Password"
                                    autoCapitalize="none"
                                    value={confirmPassword}
                                    onChangeText={(value) =>
                                        handleOnChangeText(
                                            value,
                                            'confirmPassword'
                                        )
                                    }
                                />
                            </View>
                        </View>
                        <View style={styles.bottomContainer}>
                            <TouchableOpacity
                                style={[styles.backButton, styles.shadowProp]}
                                onPress={() => {
                                    setStep(1)
                                }}
                            >
                                <Text style={styles.submitText}>Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                disabled={isStepTwoValid ? false : true}
                                style={
                                    isStepTwoValid
                                        ? [
                                              styles.submitButton,
                                              styles.shadowProp,
                                          ]
                                        : [
                                              styles.submitButtonDisabled,
                                              styles.shadowProp,
                                          ]
                                }
                            >
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
        flex: 2,
        backgroundColor: '#000',
        height: 60,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitButtonDisabled: {
        flex: 2,
        backgroundColor: '#ccc',
        height: 60,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButton: {
        flex: 1,
        backgroundColor: '#ccc',
        height: 60,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    submitText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    bottomContainer: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    errorMsg: {
        color: '#FF9494',
        marginBottom: 10,
    },
})
