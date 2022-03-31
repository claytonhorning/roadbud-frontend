import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLORS, TYPOGRAPHY } from '../../styles'
import Icon from '../../components/Icon'

export default function LocationInfo({ location, numEvents }) {
    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={TYPOGRAPHY.subheader}>{location}</Text>

                <Icon name="video-camera" style={styles.iconStyle} />
                <Text style={styles.descriptionText}>Video</Text>
                <Icon name="cloudy" style={styles.iconStyle} />
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
        fontFamily: 'IBMPlexSans-Regular',
        marginLeft: 5,
        fontSize: 14,
        color: COLORS.secondary,
    },
    iconStyle: {
        fontSize: 20,
        color: COLORS.secondary,
        marginLeft: 15,
    },
})
