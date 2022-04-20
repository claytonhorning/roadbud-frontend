import {
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native'
import React, { useState, useEffect, useRef, useContext } from 'react'
import { COLORS, TYPOGRAPHY } from '../../styles'
import MapView, { Marker } from 'react-native-maps'
import { useSelector, useDispatch } from 'react-redux'
import { getLocation } from '../../store/locationSlice'
import { LocationContext } from '../../utils/locationContext'

export default function PinLocation({ visible, onClosePress }) {
    const { location, loading } = useSelector((state) => state.location)
    const [markerLocation, setMarkerLocation] = useState(location)
    const { eventLocation, setEventLocation } = useContext(LocationContext)

    dispatch = useDispatch()
    useEffect(() => {
        dispatch(getLocation())
    }, [])

    const onMapPress = (e) => {
        let marker = e.nativeEvent.coordinate
        setMarkerLocation((prevState) => ({ ...prevState, ...marker }))
    }

    const handleContinuePressed = () => {
        setEventLocation((prevState) => ({ ...prevState, ...markerLocation }))
        onClosePress()
    }

    return (
        <Modal visible={visible} animationType="fade" transparent={true}>
            <View style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <View style={styles.modalContainer}>
                        {location && (
                            <MapView
                                style={styles.mapContainer}
                                onPress={(e) => onMapPress(e)}
                                region={
                                    markerLocation
                                        ? {
                                              ...markerLocation,
                                              longitudeDelta: 0.025,
                                              latitudeDelta: 0.025,
                                          }
                                        : { ...location }
                                }
                            >
                                <Marker
                                    coordinate={{
                                        ...markerLocation,
                                    }}
                                    title="Place on the location of the event"
                                />
                            </MapView>
                        )}
                        <View style={styles.content}>
                            <TouchableOpacity
                                onPress={onClosePress}
                                style={styles.cancelButton}
                            >
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleContinuePressed}
                                style={styles.continueButton}
                            >
                                <Text style={{ color: COLORS.white }}>
                                    Continue
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, .5)',
    },
    modalContainer: {
        marginHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 5,
        height: 400,
    },
    mapContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
    },
    content: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        bottom: 0,
        height: 55,
        backgroundColor: COLORS.white,
        width: '100%',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    cancelButton: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 5,
        backgroundColor: '#EEEEEE',
    },
    continueButton: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomRightRadius: 5,

        backgroundColor: COLORS.secondary,
    },
    paragraph: {
        ...TYPOGRAPHY.paragraph,
        marginTop: 10,
    },
    section: {
        ...TYPOGRAPHY.section,
        marginTop: 5,
    },
})
