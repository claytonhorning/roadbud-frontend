import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Platform,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native'
import React, { useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import Icon from '../../components/Icon'
import { COLORS } from '../../styles'

const eventData = [
    {
        id: 1,
        name: 'Landslide in Glenwood Springs Canyon',
        latitude: 39.4780483,
        longitude: -107.27061,
        eventCount: 3,
        isCDOT: false,
    },
    {
        id: 2,
        name: 'Road work on HWY 82 in Glenwood',
        latitude: 39.580483,
        longitude: -107.27061,
        eventCount: 3,
        isCDOT: false,
    },
    {
        id: 3,
        name: 'Crash in Glenwood Canyon no Estimated time of re-opening',
        latitude: 39.5940023,
        longitude: -107.1745141,
        eventCount: 3,
        isCDOT: false,
    },
]

//TODO: Setup my location redux, clickable event markers, toggle event types under input

const MapScreen = () => {
    const [cdotToggled, setCdotToggled] = useState(true)
    const [roadbudToggled, setRoadbudToggled] = useState(true)
    const [videoToggled, setVideoToggled] = useState(true)

    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={styles.container}
                initialRegion={{
                    latitude: 39.530717,
                    longitude: -107.308161,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                showsCompass={false}
            >
                {eventData.map((event) => (
                    <Marker
                        key={event.id}
                        coordinate={{
                            longitude: event.longitude,
                            latitude: event.latitude,
                        }}
                        title={event.name}
                        image={{
                            uri: `cdot-marker`,
                        }}
                        style={{ height: 50, width: 50 }}
                    >
                        <View style={styles.postCountCircle}>
                            <Text style={styles.postCountCircleText}>2</Text>
                        </View>
                    </Marker>
                ))}
            </MapView>
            <View style={styles.topContainer}>
                <View style={styles.inputContainer}>
                    <Icon
                        name="search"
                        style={{
                            fontSize: 18,
                            marginRight: 10,
                            color: '#4B4B4B',
                        }}
                    />
                    <Text
                        style={{
                            marginRight: 5,
                            fontWeight: '500',
                            opacity: 0.5,
                        }}
                    >
                        To:
                    </Text>
                    <TextInput
                        autoCorrect={false}
                        placeholder="Glenwood Springs, CO"
                    />
                </View>
                <View style={styles.chipsContainer}>
                    <TouchableOpacity
                        onPress={() => setCdotToggled(!cdotToggled)}
                        style={
                            cdotToggled
                                ? styles.filledChip
                                : styles.unfilledChip
                        }
                    >
                        <Text style={{ color: cdotToggled ? '#fff' : '#000' }}>
                            CDOT
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setRoadbudToggled(!roadbudToggled)}
                        style={
                            roadbudToggled
                                ? styles.filledChip
                                : styles.unfilledChip
                        }
                    >
                        <Text
                            style={{
                                color: roadbudToggled ? '#fff' : '#000',
                            }}
                        >
                            Roadbud
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setVideoToggled(!videoToggled)}
                        style={
                            videoToggled
                                ? styles.filledChip
                                : styles.unfilledChip
                        }
                    >
                        <Text
                            style={{
                                color: videoToggled ? '#fff' : '#000',
                            }}
                        >
                            Video
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.bottomButtonsContainer}>
                <View style={styles.iconWrapper}>
                    <Icon style={styles.iconButton} name="water-drop" />
                </View>
                <Text style={styles.iconButtonText}>Conditions</Text>
                <View style={styles.iconWrapper}>
                    <Icon style={styles.iconButton} name="locator" />
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
    topContainer: {
        position: 'absolute',
        alignSelf: 'center',
        width: '90%',
        marginHorizontal: 20,
        flexDirection: 'column',
    },
    inputContainer: {
        flexDirection: 'row',
        height: 55,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    bottomButtonsContainer: {
        position: 'absolute',
        bottom: 30,
        right: 20,
    },
    iconWrapper: {
        marginTop: 12,
        flex: 1,
        alignSelf: 'center',
        height: 60,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        borderRadius: 30,
    },
    iconButton: {
        color: '#fff',
        fontSize: 20,
    },
    iconButtonText: {
        marginTop: 4,
        fontSize: 12,
        fontWeight: '600',
        fontFamily: 'IBMPlexSans-Regular',
        textAlign: 'center',
    },
    locationInput: {
        height: 50,
    },
    chipsContainer: {
        flex: 1,
        marginTop: 10,
        alignSelf: 'flex-start',
        flexDirection: 'row',
    },
    filledChip: {
        backgroundColor: '#000',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 3,
        borderRadius: 20,
        marginRight: 10,
    },
    unfilledChip: {
        backgroundColor: '#fff',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 3,
        borderRadius: 20,
        marginRight: 10,
    },
    postCountCircle: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        right: 0,
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: COLORS.secondary,
    },
    postCountCircleText: {
        color: COLORS.white,
        fontWeight: '500',
    },
})

export default MapScreen
