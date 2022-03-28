import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TextInput,
} from 'react-native'
import React from 'react'
import RouteInput from '../../components/Inputs/RouteInput'

import LocationFlatlist from '../../components/RouteLocation/LocationFlatlist'

const locations = [
    { id: 1, name: 'Glenwood Springs', events: 2 },
    { id: 2, name: 'Eagle', events: 4 },
    { id: 3, name: 'Silverthorne', events: 3 },
]

export default function RouteScreen({ navigation }) {
    // If there is another object in array, next location = true
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <RouteInput />
                <Text style={styles.eventCounter}>9 events</Text>

                {locations.map((place, index) => {
                    return (
                        <View key={index} style={styles.locationContainer}>
                            <LocationFlatlist
                                navigation={navigation}
                                key={place.id}
                                numEvents={place.events}
                                location={place.name}
                                nextLocation={
                                    locations.length == index + 1 ? false : true
                                }
                            />
                        </View>
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        marginLeft: 20,
    },
    eventCounter: {
        color: '#FF7A01',
        marginVertical: 10,
        fontWeight: '500',
    },
    locationContainer: {
        paddingBottom: 10,
    },
})
