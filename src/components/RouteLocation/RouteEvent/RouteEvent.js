import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

export default function RouteEvent({
    isCDOT = false,
    eventName,
    numPosts,
    timeCreated,
    dateCreated,
    userCreated,
    navigation,
}) {
    const CDOTEvent = () => {
        return (
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('EventScreen', {
                        itemId: 1,
                        otherParam: 'anything you want here',
                    })
                }
                style={[styles.CDOTcontainer, styles.shadowProp]}
            >
                <View style={styles.dateTimeContainer}>
                    <Text style={styles.CDOTdescriptionText}>
                        {timeCreated}
                    </Text>
                    <Text style={styles.CDOTdescriptionText}>
                        {dateCreated}
                    </Text>
                </View>
                <View>
                    <Text style={styles.CDOTeventNameText}>{eventName}</Text>
                </View>
                <View style={styles.eventInfoContainer}>
                    <Text style={styles.CDOTdescriptionText}>CDOT</Text>
                    <View style={styles.postChipLight}>
                        <Text style={{ color: '#000', fontWeight: '600' }}>
                            {numPosts} posts
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    const Event = () => {
        return (
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('EventScreen', {
                        itemId: 1,
                    })
                }
                style={[styles.container, styles.shadowProp]}
            >
                <View style={styles.dateTimeContainer}>
                    <Text style={styles.descriptionText}>{timeCreated}</Text>
                    <Text style={styles.descriptionText}>{dateCreated}</Text>
                </View>
                <View>
                    <Text style={styles.eventNameText}>{eventName}</Text>
                </View>
                <View style={styles.eventInfoContainer}>
                    <Text style={styles.descriptionText}>CDOT</Text>
                    <View style={styles.postChipDark}>
                        <Text style={{ color: '#fff', fontWeight: '700' }}>
                            {numPosts} posts
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <>
            {isCDOT ? (
                <CDOTEvent navigation={navigation} />
            ) : (
                <Event navigation={navigation} />
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: '#fff',
        height: 125,
        width: 240,
        marginVertical: 10,
        marginLeft: 5,
        marginRight: 15,
        padding: 10,
    },
    CDOTcontainer: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: '#001970',
        color: '#fff',
        height: 125,
        width: 240,
        marginVertical: 10,
        marginLeft: 5,
        marginRight: 15,
        padding: 10,
    },
    dateTimeContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    eventInfoContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    descriptionText: {
        fontSize: 14,
        opacity: 0.7,
        fontWeight: '500',
    },
    CDOTdescriptionText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#fff',
    },
    eventNameText: {
        fontSize: 18,
        fontWeight: '500',
    },
    CDOTeventNameText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#fff',
    },
    postChipDark: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#000',
        color: '#fff',
        height: 22,
        width: 65,
    },
    postChipLight: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#fff',
        color: '#000',
        height: 22,
        width: 65,
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
})
