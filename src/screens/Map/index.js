import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native'
import React, { useEffect, useState, createContext, useContext } from 'react'
import MapView, { Marker, Polyline } from 'react-native-maps'
import Icon from '../../components/Icon'
import { COLORS } from '../../styles'
import { useDispatch, useSelector } from 'react-redux'
import { getLocation } from '../../store/locationSlice'
import { useGetEventsQuery } from '../../services/roadbudApi'
import BottomSheet from '../../components/BottomSheet'
import Event from '../../components/Event'
import { ModalContext } from '../../utils/modalContext'
import { useGetRoadConditionsQuery } from '../../services/cdotApi'
import { setPolylineColor } from '../../utils/setPolylineColor'

const MapScreen = ({ navigation }) => {
    const [cdotToggled, setCdotToggled] = useState(true)
    const [roadbudToggled, setRoadbudToggled] = useState(true)
    const [videoToggled, setVideoToggled] = useState(true)
    const [region, setRegion] = useState({ ...location })
    const [openModal, setOpenModal] = useState(false)
    const [eventPressed, setEventPressed] = useState('')
    const [conditions, setConditions] = useState(false)

    const onDismiss = () => {
        setOpenModal(false)
    }

    const { location, loading } = useSelector((state) => state.location)
    dispatch = useDispatch()

    const { data, error, isLoading } = useGetEventsQuery()
    const {
        data: roadConditionsData,
        error: roadConditionsError,
        isLoading: roadConditionsisLoading,
    } = useGetRoadConditionsQuery()

    const resetUserRegion = () => {
        setRegion((prevState) => ({ ...prevState, ...location }))
    }

    const handleEventPressed = (eventId) => {
        setOpenModal(true)
        setEventPressed(eventId)
    }

    const handleConditionsPressed = () => {
        setConditions(!conditions)
    }

    useEffect(() => {
        dispatch(getLocation())
    }, [])
    return (
        <View style={{ flex: 1 }}>
            {location && (
                <MapView
                    style={styles.container}
                    initialRegion={{
                        ...location,
                        latitudeDelta: 0.09,
                        longitudeDelta: 0.09,
                    }}
                    showsCompass={false}
                    region={{
                        // ...location,
                        longitude: -108.033497795996,
                        latitude: 37.6824748841698,
                        latitudeDelta: 0.09,
                        longitudeDelta: 0.09,
                    }}
                >
                    {data &&
                        data.map((event) => (
                            <Marker
                                key={event._id}
                                coordinate={{
                                    longitude: event?.location?.longitude,
                                    latitude: event?.location?.latitude,
                                }}
                                title={event.name}
                                image={
                                    event.isCDOT
                                        ? { uri: 'cdot-marker' }
                                        : {
                                              uri: 'roadbud-marker',
                                          }
                                }
                                style={{ height: 50, width: 50 }}
                                onSelect={() => handleEventPressed(event._id)}
                            >
                                <View style={styles.postCountCircle}>
                                    <Text style={styles.postCountCircleText}>
                                        {event.posts.length}
                                    </Text>
                                </View>
                            </Marker>
                        ))}

                    {roadConditionsData &&
                        conditions &&
                        roadConditionsData.features.map((roadConditionsObj) => {
                            let roadConditionsCoordsArray = []
                            const polylineColor = setPolylineColor('3 - dry') // Find the right key to set the polyline color

                            roadConditionsObj.geometry.coordinates.map(
                                (roadCoordinates) => {
                                    let roadConditionsCoords = {
                                        latitude: roadCoordinates[1],
                                        longitude: roadCoordinates[0],
                                    }
                                    roadConditionsCoordsArray.push(
                                        roadConditionsCoords
                                    )
                                }
                            )
                            return (
                                <Polyline
                                    coordinates={roadConditionsCoordsArray}
                                    strokeColor={polylineColor}
                                    strokeWidth={3}
                                />
                            )
                        })}
                </MapView>
            )}

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
                <TouchableOpacity onPress={handleConditionsPressed}>
                    <View style={styles.iconWrapper}>
                        <Icon style={styles.iconButton} name="water-drop" />
                    </View>
                </TouchableOpacity>
                <Text style={styles.iconButtonText}>Conditions</Text>
                <TouchableOpacity onPress={resetUserRegion}>
                    <View style={styles.iconWrapper}>
                        <Icon style={styles.iconButton} name="locator" />
                    </View>
                </TouchableOpacity>
                <Text style={styles.iconButtonText}>My Location</Text>
            </View>
            {openModal && (
                <ModalContext.Provider value={{ openModal, setOpenModal }}>
                    <BottomSheet onDismiss={onDismiss}>
                        <Event navigation={navigation} eventId={eventPressed} />
                    </BottomSheet>
                </ModalContext.Provider>
            )}
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
        backgroundColor: COLORS.black,
        borderRadius: 30,
    },
    iconButton: {
        color: COLORS.white,
        fontSize: 20,
    },
    iconButtonText: {
        marginTop: 4,
        fontSize: 12,
        fontWeight: '600',
        fontFamily: 'IBMPlexSans-Regular',
        textAlign: 'center',
        color: COLORS.white,
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
