import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native'
import React from 'react'
import Icon from '../../components/Icon'
import { COLORS, TYPOGRAPHY, SHADOWS } from '../../styles'

const plannedEventsData = [
    {
        id: 1,
        name: 'Curb Ramp Work-9073',
        start: '4/7/22',
        end: '6/21/22',
        description:
            'Between CO 391 (Wheat Ridge) and Exit 263: Colorado Mills Parkway (Lakewood) from Mile Point 266 to Mile Point 263. Bridge construction.',
    },
    {
        id: 2,
        name: 'Bridge Replacement I-70 over 32nd Avenue-8962',
        start: '4/7/22',
        end: '6/21/22',
        description:
            'Between County Road X and Pomeroy Street (near Burlington) from Mile Point 190 to Mile Point 188. Right lane closed due to road work. Alternating traffic.',
    },
    {
        id: 2,
        name: 'Bridge Replacement I-70 over 32nd Avenue-8962',
        start: '4/7/22',
        end: '6/21/22',
        description:
            'Between County Road X and Pomeroy Street (near Burlington) from Mile Point 190 to Mile Point 188. Right lane closed due to road work. Alternating traffic.',
    },
]

export default function PlannedEvents() {
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
                    8 Events
                </Text>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.plannedEventsContainer}
                >
                    {plannedEventsData.map((event) => (
                        <View style={styles.plannedEvent}>
                            <View style={styles.plannedEventContent}>
                                <Text style={styles.plannedEventHeader}>
                                    {event.name}
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
                                            {event.start}
                                        </Text>
                                    </Text>
                                    <Text>
                                        End:{' '}
                                        <Text style={styles.blueText}>
                                            {event.end}
                                        </Text>
                                    </Text>
                                </View>
                                <Text style={styles.plannedEventDescription}>
                                    {event.description}
                                </Text>
                            </View>
                            <Image
                                source={{
                                    height: 200,
                                    uri: 'https://i.stack.imgur.com/RdkOb.jpg',
                                }}
                                style={{
                                    borderBottomLeftRadius: 5,
                                    borderBottomRightRadius: 5,
                                }}
                            />
                        </View>
                    ))}
                </ScrollView>
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
        padding: 5,
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
