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
import SocialButtons from '../../components/SocialButtons'

const { height, width } = Dimensions.get('window')

export default function SignUpOptions() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                <View>
                    <Image source={Logo} style={styles.logo} />
                    <Text style={styles.header}>
                        Colorado's most helpful resource for road conditions.
                    </Text>
                    <SocialButtons />
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
