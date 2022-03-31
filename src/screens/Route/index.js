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
import { TYPOGRAPHY, COLORS } from '../../styles'
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
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginHorizontal: 20 }}>
                    <RouteInput />
                </View>

                <View style={styles.content}>
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
                                        locations.length == index + 1
                                            ? false
                                            : true
                                    }
                                />
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
