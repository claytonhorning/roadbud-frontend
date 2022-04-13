import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'
import Logo from 'assets/img/logo/dark.png'

const { height, width } = Dimensions.get('window')

export default function index() {
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={Logo} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        resizeMode: 'contain',
        height: height * 0.05,
        width: width * 0.6,
        marginVertical: 10,
    },
})
