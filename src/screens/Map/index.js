import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'
import Icon from 'react-native-vector-icons/FontAwesome5'

const MapScreen = () => {
    return (
        <View>
            <MapView
                style={styles.container}
                initialRegion={{
                    latitude: 39.530717,
                    longitude: -107.308161,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
            <View style={styles.bottomButtonsContainer}>
                <View style={styles.iconWrapper}>
                    <Icon style={styles.iconButton} name="cloud-rain" />
                </View>
                <Text style={styles.iconButtonText}>Conditions</Text>
                <View style={styles.iconWrapper}>
                    <Icon style={styles.iconButton} name="location-arrow" />
                </View>
                <Text style={styles.iconButtonText}>My Location</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    bottomButtonsContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    iconWrapper: {
        height: 60,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 30,
    },
    iconButton: {
        color: '#FF7F0A',
        fontSize: 20,
    },
    iconButtonText: {
        fontSize: 12,
        fontWeight: '600',
    },
})

export default MapScreen
