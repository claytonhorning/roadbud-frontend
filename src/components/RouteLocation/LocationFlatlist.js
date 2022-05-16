import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'
import React from 'react'
import LocationInfo from './LocationInfo'
import RouteEvent from './RouteEvent/RouteEvent'

export default function index({
    location,
    nextLocation,
    navigation,
    children,
    numEvents,
}) {
    return (
        <View>
            <LocationInfo numEvents={numEvents} location={location} />
            <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
            >
                {children}
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
