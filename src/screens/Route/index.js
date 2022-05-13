import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TextInput,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import RouteInput from '../../components/Inputs/RouteInput'
import { TYPOGRAPHY, COLORS } from '../../styles'
import LocationFlatlist from '../../components/RouteLocation/LocationFlatlist'
import { useLazyGetDirectionsQuery } from '../../services/roadbudApi'
import GoogleMapsSearchInput from '../../components/GoogleMapsSearchInput'
import RouteEvent from '../../components/RouteLocation/RouteEvent/RouteEvent'
import { formatDateWithTime } from '../../utils'

export default function RouteScreen({ route, navigation }) {
    const toFieldRef = useRef(null)
    const fromFieldRef = useRef(null)
    const { to, from, events, toText, fromText } = useSelector(
        (state) => state.directions
    )
    const [locations, setLocations] = useState()

    useEffect(() => {
        if (events) {
            let locs = []
            events.map((event) => {
                if (!locs.includes(event.nearByCity?.name)) {
                    locs.push(event.nearByCity?.name)
                }
                setLocations(locs)
            })
        }
    }, [events])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={TYPOGRAPHY.detailsLargeLight}>
                        {fromText} to {toText}
                    </Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.eventCounter}>
                        {events?.length} Events
                    </Text>

                    {locations !== (null || undefined) &&
                        locations.map((location, index) => {
                            let locationEvents = []

                            events.filter((e) => {
                                if (e.nearByCity?.name === location) {
                                    locationEvents.push(e)
                                }
                            })
                            return (
                                <View>
                                    <LocationFlatlist
                                        location={String(location)}
                                        numEvents={locationEvents.length}
                                        navigation={navigation}
                                        nextLocation={
                                            locations.length == index + 1
                                                ? false
                                                : true
                                        }
                                    >
                                        {locationEvents.map((event) => (
                                            <RouteEvent
                                                navigation={navigation}
                                                key={event._id}
                                                eventName={event.name}
                                                numPosts={event.posts.length}
                                                timeCreated={formatDateWithTime(
                                                    event.createdAt
                                                )}
                                                dateCreated={event.date}
                                                isCDOT={event.isCDOT}
                                                eventId={event._id}
                                                userCreated={
                                                    event.isCDOT
                                                        ? 'CDOT'
                                                        : event.createdBy
                                                              ?.fullName
                                                }
                                            />
                                        ))}
                                    </LocationFlatlist>
                                </View>
                            )
                        })}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    content: {
        marginLeft: 20,
    },
    eventCounter: {
        ...TYPOGRAPHY.primaryText,
        marginVertical: 10,
    },
    locationContainer: {
        paddingBottom: 10,
    },
})
