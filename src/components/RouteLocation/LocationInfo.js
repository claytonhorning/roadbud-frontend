import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'
import React, { useState } from 'react'
import { COLORS, TYPOGRAPHY } from '../../styles'
import Icon from '../../components/Icon'
import BottomSheet from '../BottomSheet'
import Video from '../Video'

export default function LocationInfo({ location, numEvents }) {
    const [openModal, setopenModal] = useState(false)

    const onOpen = () => {
        setopenModal(true)
    }

    const onDismiss = () => {
        setopenModal(false)
    }

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={TYPOGRAPHY.subheader}>{location}</Text>

                <TouchableOpacity
                    style={{ flexDirection: 'row' }}
                    onPress={onOpen}
                >
                    {openModal && (
                        <BottomSheet onDismiss={onDismiss}>
                            <Video location={location} />
                        </BottomSheet>
                    )}
                    <Icon name="video-camera" style={styles.iconStyle} />
                    <Text style={styles.descriptionText}>Video</Text>
                </TouchableOpacity>

                <Icon name="cloudy" style={styles.iconStyle} />
                <Text style={styles.descriptionText}>Weather</Text>
            </View>
            <Text style={{ opacity: 0.5 }}>{numEvents} Events</Text>
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
