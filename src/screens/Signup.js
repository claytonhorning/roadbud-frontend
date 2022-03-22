import React from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    Image,
    View,
    SafeAreaView,
    Dimensions,
} from 'react-native'
import Car from '../assets/img/car.svg'
import Logo from '../assets/img/logo/dark.png'

const { height, width } = Dimensions.get('window')

export default function Signup() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                <View>
                    <Image source={Logo} style={styles.logo} />
                    <Text style={styles.header}>
                        Colorado's most helpful resource for road conditions.
                    </Text>
                    <TouchableOpacity
                        style={[styles.signupOption, styles.shadowProp]}
                    >
                        <Image
                            style={styles.optionLogo}
                            source={require('../assets/img/logo/google-logo.png')}
                        />
                        <Text style={styles.signupOptionText}>
                            Sign up with Google
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.signupFB, styles.shadowProp]}
                    >
                        <Image
                            style={styles.optionLogo}
                            source={require('../assets/img/logo/fb-logo-white.png')}
                        />
                        <Text style={styles.signupTextLight}>
                            Sign up with Facebook
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.signupEmail, styles.shadowProp]}
                    >
                        <Text style={styles.signupTextLight}>
                            Sign up with Email
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <Car style={styles.car} width={300} height={250} />
                <View style={styles.loginTextRow}>
                    <Text style={styles.loginText}>
                        Already have an account?
                        <Text style={styles.loginTextFlare}> Login</Text>
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {
        flex: 2,
        alignItems: 'center',
        marginHorizontal: 10,
        zIndex: 1,
    },
    header: {
        fontSize: 22,
        fontWeight: '500',
        color: '#000',
        marginBottom: 20,
        opacity: 0.7,
    },
    signupOption: {
        paddingHorizontal: 25,
        marginVertical: 15,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
        height: 60,
        borderRadius: 10,
    },
    signupFB: {
        paddingHorizontal: 25,
        marginVertical: 15,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#1877F2',
        height: 60,
        borderRadius: 10,
    },
    signupEmail: {
        paddingHorizontal: 25,
        marginVertical: 15,
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
    logo: {
        resizeMode: 'contain',
        height: 50,
        width: 230,
        marginVertical: 15,
    },
    bottomContainer: {
        flex: 1,
        marginHorizontal: 10,
        zIndex: 0,
    },
    loginTextRow: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 10,
    },
    loginText: {
        fontSize: 16,
        color: '#000',
    },
    loginTextFlare: {
        fontSize: 16,
        color: '#FF7A01',
    },
    car: {
        position: 'absolute',
        right: -100,
        bottom: height * 0.1,
        opacity: 0.7,
        zIndex: 0,
    },
    optionLogo: {
        height: 34,
        width: 34,
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
})
