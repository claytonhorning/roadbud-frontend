import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../styles'
import { useSelector } from 'react-redux'

export default function AvatarLetters({ size }) {
    const { user } = useSelector((state) => state.auth)
    const [first, last] = user.fullName.split(' ')

    const avatarSize = {
        height: size,
        width: size,
        borderRadius: size / 2,
        marginRight: size / 2.5,
    }
    const letterSize = {
        fontSize: size / 2,
    }

    return (
        <View style={[styles.avatarLetters, avatarSize]}>
            <Text style={[styles.avatarChar, letterSize]}>
                {first.charAt(0)}
            </Text>
            <Text style={[styles.avatarChar, letterSize]}>
                {last.charAt(0)}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    avatarLetters: {
        backgroundColor: '#ccc',

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarChar: {
        color: COLORS.white,
        fontWeight: '500',
    },
})
