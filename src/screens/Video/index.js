import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Video() {
    return (
        <View style={styles.container}>
            <Text>hello</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
})
