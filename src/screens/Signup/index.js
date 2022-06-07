import React from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    Image,
    View,
    SafeAreaView,
    Dimensions,
    Button,
    Pressable,
} from 'react-native'
import Car from 'assets/img/car.svg'
import Logo from 'assets/img/logo/dark.png'
import SocialButtons from '../../components/Buttons/SocialButtons'
import { COLORS } from '../../styles'

const { height, width } = Dimensions.get('window')

export default function SignUpOptions({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                <View>
                    <Image source={Logo} style={styles.logo} />
                    <Text style={styles.header}>
                        Colorado's most helpful resource for road conditions.
                    </Text>
                    <SocialButtons navigation={navigation} />
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <Car style={styles.car} width={300} height={250} />
                <View style={styles.loginTextRow}>
                    <Text style={styles.loginText}>
                        Already have an account?{' '}
                    </Text>
                    <Pressable
                        onPress={() => navigation.navigate('LoginScreen')}
                    >
                        <Text style={styles.loginTextFlare}>Login</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    topContainer: {
        paddingTop: 20,
        flex: 2,
        alignItems: 'center',
        zIndex: 1,
        marginHorizontal: 15,
    },
    header: {
        fontSize: 22,
        fontWeight: '500',
        color: '#000',
        marginBottom: 20,
        opacity: 0.7,
    },
    logo: {
        resizeMode: 'contain',
        height: 50,
        width: 230,
        marginVertical: 15,
    },
    bottomContainer: {
        flex: 1,
        alignItems: 'center',
    },
    loginTextRow: {
        flex: 1,
        alignItems: 'flex-end',
        flexDirection: 'row',
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
        right: width / -4,
        bottom: height * 0.1,
        opacity: 0.8,
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
