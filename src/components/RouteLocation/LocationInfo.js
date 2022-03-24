import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function LocationInfo({ location, numEvents }) {
    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.header}>{location}</Text>
                <Icon
                    name="video"
                    style={{ fontSize: 20, color: '#047FE8', marginLeft: 15 }}
                />
                <Text style={styles.descriptionText}>Video</Text>
                <Icon
                    name="white-balance-sunny"
                    style={{ fontSize: 20, color: '#047FE8', marginLeft: 15 }}
                />
                <Text style={styles.descriptionText}>Weather</Text>
            </View>
            <Text style={{ opacity: 0.5 }}>{numEvents} events</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    header: {
        fontSize: 18,
        fontWeight: '700',
    },
    descriptionText: {
        marginLeft: 5,
        fontSize: 14,
        color: '#047FE8',
    },
})
