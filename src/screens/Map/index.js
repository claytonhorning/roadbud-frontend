import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Button,
} from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import MapView, { Marker, Polyline } from 'react-native-maps'
import Icon from '../../components/Icon'
import { COLORS, TYPOGRAPHY } from '../../styles'
import { useDispatch, useSelector } from 'react-redux'
import { getLocation } from '../../store/locationSlice'
import { useGetEventsQuery } from '../../services/roadbudApi'
import BottomSheet from '../../components/BottomSheet'
import Event from '../../components/Event'
import { ModalContext } from '../../utils/modalContext'
import { useGetRoadConditionsQuery } from '../../services/cdotApi'
import { setPolylineColor } from '../../utils/setPolylineColor'
import ConditionsKey from '../../components/ConditionsKey'
import { formatUnixTimeString } from '../../utils'
import BottomSheetTest from '../../components/BottomSheetTest'
import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'

const MapScreen = ({ navigation }) => {
    const [cdotToggled, setCdotToggled] = useState(true)
    const [roadbudToggled, setRoadbudToggled] = useState(true)
    const [videoToggled, setVideoToggled] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const [eventPressed, setEventPressed] = useState('')
    const [conditions, setConditions] = useState(false)
    const [roadDetails, setRoadDetails] = useState({})
    const mapRef = useRef(null)

    const onDismiss = () => {
        setOpenModal(false)
    }

    const { location, loading } = useSelector((state) => state.location)
    dispatch = useDispatch()

    const {
        data: eventsData,
        error: eventsError,
        isLoading: eventsLoading,
    } = useGetEventsQuery()

    const {
        data: roadConditionsData,
        error: roadConditionsError,
        isLoading,
    } = useGetRoadConditionsQuery()

    const goToLocation = () => {
        mapRef.current.animateToRegion(location)
    }

    const handleEventPressed = (eventId) => {
        setOpenModal(true)
        setEventPressed(eventId)
    }

    const handleConditionsPressed = () => {
        setConditions(!conditions)
    }

    const handleRoadLinePressed = (
        primaryLat,
        primaryLon,
        secondaryLat,
        secondaryLon,
        name,
        nameId,
        startTime
    ) => {
        let roadLineMarkers = [
            {
                latitude: primaryLat,
                longitude: primaryLon,
            },
            {
                latitude: secondaryLat,
                longitude: secondaryLon,
            },
        ]

        mapRef.current.fitToCoordinates(roadLineMarkers, {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        })

        setRoadDetails({ name, nameId, startTime })
    }

    useEffect(() => {
        dispatch(getLocation())
    }, [])

    console.log('is modal open' + openModal)

    return (
        <View style={{ flex: 1 }}>
            {location && (
                <MapView
                    ref={mapRef}
                    style={styles.container}
                    showsCompass={false}
                    initialRegion={{
                        ...location,
                        latitudeDelta: 0.2,
                        longitudeDelta: 0.2,
                    }}
                    loadingEnabled={true}
                >
                    {eventsData &&
                        !conditions &&
                        eventsData.map((event) => (
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
                            let name = roadConditionsObj?.properties?.name
                            let nameId = roadConditionsObj?.properties?.nameId

                            let mostRecentCondition =
                                roadConditionsObj?.properties?.currentConditions
                                    .length - 2
                            let startTime =
                                roadConditionsObj?.properties
                                    ?.currentConditions[mostRecentCondition]
                                    ?.startTime

                            let roadConditionsCoordsArray = []
                            let condition =
                                roadConditionsObj?.properties
                                    ?.currentConditions[mostRecentCondition]
                                    ?.conditionId

                            let primaryLon =
                                roadConditionsObj?.properties?.primaryLongitude
                            let primaryLat =
                                roadConditionsObj?.properties?.primaryLatitude
                            let secondaryLon =
                                roadConditionsObj?.properties
                                    ?.secondaryLongitude
                            let secondaryLat =
                                roadConditionsObj?.properties?.secondaryLatitude

                            const polylineColor = setPolylineColor(condition) // Find the right key to set the polyline color

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
                                    key={roadConditionsObj?.properties?.id}
                                    coordinates={roadConditionsCoordsArray}
                                    strokeColor={polylineColor}
                                    strokeWidth={3}
                                    onPress={() =>
                                        handleRoadLinePressed(
                                            primaryLat,
                                            primaryLon,
                                            secondaryLat,
                                            secondaryLon,
                                            name,
                                            nameId,
                                            startTime
                                        )
                                    }
                                />
                            )
                        })}
                </MapView>
            )}

            <View style={styles.topContainer}>
                {!conditions ? (
                    <>
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
                                placeholderTextColor={COLORS.lightGray}
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
                                <Text
                                    style={{
                                        color: cdotToggled ? '#fff' : '#000',
                                    }}
                                >
                                    CDOT
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    setRoadbudToggled(!roadbudToggled)
                                }
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
                    </>
                ) : (
                    <View style={styles.roadDescriptionContainer}>
                        <Text style={TYPOGRAPHY.subheader}>
                            {roadDetails.nameId !== undefined
                                ? roadDetails.nameId
                                : 'Tap the road to see more info'}
                        </Text>
                        {roadDetails.name !== undefined && (
                            <Text
                                style={[
                                    TYPOGRAPHY.paragraph,
                                    { marginVertical: 10 },
                                ]}
                            >
                                {roadDetails.name}
                            </Text>
                        )}

                        {roadDetails.startTime !== undefined && (
                            <Text style={TYPOGRAPHY.secondaryText}>
                                Last updated:{' '}
                                {formatUnixTimeString(roadDetails.startTime)}
                            </Text>
                        )}
                    </View>
                )}
            </View>

            <View style={styles.bottomButtonsContainer}>
                <TouchableOpacity onPress={handleConditionsPressed}>
                    <View style={styles.iconWrapper}>
                        <Icon style={styles.iconButton} name="water-drop" />
                    </View>
                </TouchableOpacity>
                <Text style={styles.iconButtonText}>Conditions</Text>
                <TouchableOpacity onPress={goToLocation}>
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
            {conditions && <ConditionsKey />}
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
    roadDescriptionContainer: {
        backgroundColor: COLORS.white,
        padding: 15,
        marginTop: 20,
        borderRadius: 5,
    },
    sheetContainer: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
})

export default MapScreen
