import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ComingSoon({ children }) {
    return (
        <>
            <Text style={styles.text}>Coming Soon...</Text>
            <View style={styles.container}>{children}</View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        opacity: 0.1,
    },
    text: {
        position: 'absolute',
        alignSelf: 'center',
        marginTop: '50%',
        zIndex: 100,
        fontSize: 40,
        fontFamily: 'Montserrat',
        fontWeight: '600',
        transform: [{ rotate: '-25deg' }],
    },
})
