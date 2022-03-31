import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { TYPOGRAPHY, COLORS, SHADOWS } from '../../../styles'

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
                style={styles.CDOTcontainer}
            >
                <View style={styles.dateTimeContainer}>
                    <Text style={TYPOGRAPHY.detailsWhite}>{timeCreated}</Text>
                    <Text style={TYPOGRAPHY.detailsWhite}>{dateCreated}</Text>
                </View>
                <View>
                    <Text style={styles.CDOTeventNameText}>{eventName}</Text>
                </View>
                <View style={styles.eventInfoContainer}>
                    <Text style={TYPOGRAPHY.detailsWhite}>CDOT</Text>
                    <View style={styles.postChipLight}>
                        <Text style={TYPOGRAPHY.detailsBlack}>
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
                    <Text style={TYPOGRAPHY.detailsBold}>{timeCreated}</Text>
                    <Text style={TYPOGRAPHY.detailsBold}>{dateCreated}</Text>
                </View>
                <View>
                    <Text style={styles.eventNameText}>{eventName}</Text>
                </View>
                <View style={styles.eventInfoContainer}>
                    <Text style={TYPOGRAPHY.detailsBold}>John B.</Text>
                    <View style={styles.postChipDark}>
                        <Text style={TYPOGRAPHY.detailsWhite}>
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
        backgroundColor: COLORS.white,
        height: 125,
        width: 240,
        marginVertical: 10,
        marginLeft: 5,
        marginRight: 15,
        padding: 10,
        ...SHADOWS.shadowProp,
    },
    CDOTcontainer: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: COLORS.tertiary,
        color: COLORS.white,
        height: 125,
        width: 240,
        marginVertical: 10,
        marginLeft: 5,
        marginRight: 15,
        padding: 10,
        ...SHADOWS.shadowProp,
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
    eventNameText: {
        fontSize: 18,
        fontWeight: '500',
    },
    CDOTeventNameText: {
        fontSize: 18,
        fontWeight: '500',
        color: COLORS.white,
    },
    postChipDark: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: COLORS.black,
        color: COLORS.white,
        height: 22,
        width: 65,
    },
    postChipLight: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: COLORS.white,
        color: COLORS.black,
        height: 22,
        width: 65,
    },
})
