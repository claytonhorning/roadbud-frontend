import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    FlatList,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from '../../components/Icon'
import { COLORS, TYPOGRAPHY, SHADOWS } from '../../styles'
import { useDispatch, useSelector } from 'react-redux'
import { formatDate } from '../../utils'
import { useGetPlannedEventsQuery } from '../../services/cdotApi'

export default function PlannedEvents() {
    const { data, error, isLoading } = useGetPlannedEventsQuery()
    let plannedEvents = {}
    let sortedPlannedEvents = {}
    let numEvents = null

    if (data) {
        numEvents = data?.features?.length
        plannedEvents = data?.features?.map((event) => ({
            name: event.properties.name,
            description: event.properties.travelerInformationMessage,
            startDate: formatDate(event.properties.schedule[0].startTime),
            endDate: formatDate(event.properties.schedule[0].endTime),
        }))

        //Sorted by newest start dates first
        sortedPlannedEvents = plannedEvents?.sort((a, b) => {
            return new Date(b.startDate) - new Date(a.startDate)
        })
    } else if (error) {
        console.log(error)
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
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
                        Search:
                    </Text>
                    <TextInput
                        autoCorrect={false}
                        placeholder="Glenwood Springs, CO"
                    />
                </View>
                <Text style={{ opacity: 0.5, marginVertical: 5 }}>
                    {numEvents} Events
                </Text>
                <FlatList
                    data={sortedPlannedEvents}
                    renderItem={({ item }) => (
                        <View key={item.id} style={styles.plannedEvent}>
                            <View style={styles.plannedEventContent}>
                                <Text style={styles.plannedEventHeader}>
                                    {item.name}
                                </Text>

                                <View
                                    style={{
                                        flexDirection: 'row',
                                        marginTop: 5,
                                    }}
                                >
                                    <Text
                                        style={{
                                            marginRight: 10,
                                        }}
                                    >
                                        Start:{' '}
                                        <Text style={TYPOGRAPHY.primaryText}>
                                            {item.startDate}
                                        </Text>
                                    </Text>
                                    <Text>
                                        End:{' '}
                                        <Text style={styles.blueText}>
                                            {item.endDate}
                                        </Text>
                                    </Text>
                                </View>
                                <Text style={styles.plannedEventDescription}>
                                    {item.description}
                                </Text>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    content: {
        flex: 1,
        marginTop: 20,
        marginHorizontal: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        height: 55,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    plannedEventsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    plannedEvent: {
        width: '100%',
        backgroundColor: COLORS.white,
        marginVertical: 12,
        borderRadius: 5,
        ...SHADOWS.shadowProp,
    },
    plannedEventContent: {
        padding: 20,
    },
    videoNameText: {
        ...TYPOGRAPHY.detailsWhite,
        margin: 8,
    },
    plannedEventHeader: {
        ...TYPOGRAPHY.subheader,
    },
    blueText: {
        color: COLORS.secondary,
        fontWeight: '500',
    },
    plannedEventDescription: {
        ...TYPOGRAPHY.paragraph,
        marginTop: 10,
    },
})
