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
import Car from 'assets/img/car.svg'
import Logo from 'assets/img/logo/dark.png'
import { style } from './styles'

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
                            source={require('assets/img/logo/google-logo.png')}
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
                            source={require('assets/img/logo/fb-logo-white.png')}
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

const styles = StyleSheet.create(style)
