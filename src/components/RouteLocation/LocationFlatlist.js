import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'
import React from 'react'
import LocationInfo from './LocationInfo'
import RouteEvent from '../RouteLocation/RouteEvent'

const eventData = [
    {
        id: 1,
        name: 'Herd of Elk on the Road in the Canyon',
        posts: 2,
        date: '3/18',
        time: '8:15 AM',
        user: 'David B.',
        cdot: false,
    },

    {
        id: 2,
        name: 'Icy Road Conditions in Glenwood on HWY 82',
        posts: 2,
        date: '3/17',
        time: '1:34 PM',
        user: 'CDOT',
        cdot: true,
    },
    {
        id: 3,
        name: 'Landslide in Glenwood Springs Canyon',
        posts: 2,
        date: '3/17',
        time: '11:14 AM',
        user: 'John S.',
        cdot: false,
    },
]

export default function index({ location, nextLocation, numEvents }) {
    return (
        <View>
            <LocationInfo numEvents={numEvents} location={location} />
            <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
            >
                {eventData.map((event) => {
                    return (
                        <RouteEvent
                            eventName={event.name}
                            numPosts={event.posts}
                            timeCreated={event.time}
                            dateCreated={event.date}
                            userCreated={event.user}
                        />
                    )
                })}
            </ScrollView>
            {nextLocation && (
                <View>
                    <View style={styles.dottedLine} />
                    <View style={styles.dottedLine} />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    dottedLine: {
        borderColor: '#FF7A01',
        height: 15,
        marginLeft: 5,
        borderLeftWidth: 2,
        marginVertical: 4,
    },
})
