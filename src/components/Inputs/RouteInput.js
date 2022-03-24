import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function RouteInput({ ...props }) {
    return (
        <View style={styles.inputContainer}>
            <View style={styles.topInputContainer}>
                <Icon
                    name="magnify"
                    style={{ fontSize: 25, marginRight: 10, color: '#4B4B4B' }}
                />
                <Text style={{ marginRight: 5 }}>From:</Text>
                <TextInput placeholder="Glenwood Springs, CO" />
            </View>
            <View style={styles.bottomInputContainer}>
                <Icon
                    name="magnify"
                    style={{ fontSize: 25, marginRight: 10, color: '#4B4B4B' }}
                />
                <Text style={{ marginRight: 5 }}>To:</Text>
                <TextInput placeholder="Denver, CO" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        marginTop: 20,
        marginRight: 20,
    },
    topInputContainer: {
        flex: 1,
        flexDirection: 'row',
        height: 55,
        alignItems: 'center',
        paddingHorizontal: 20,
        borderBottomWidth: 2,
        borderColor: '#EAEAEA',
    },
    bottomInputContainer: {
        flex: 1,
        flexDirection: 'row',
        height: 55,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
})
