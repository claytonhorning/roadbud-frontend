import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'

export default function Post({ description, imageURI, time, date, user }) {
    return (
        <View style={[styles.container, styles.shadowProp]}>
            <View style={styles.descriptionContainer}>
                <View>
                    <Text style={styles.descriptionText}>
                        {`${time},`} {date}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.descriptionText}>{user}</Text>
                    <IconMaterial
                        style={{ fontSize: 25, marginLeft: 5 }}
                        name="dots-horizontal"
                    />
                </View>
            </View>
            <Text style={styles.header}>{description}</Text>
            <View style={{ height: 235, width: '100%' }}>
                <Image style={styles.image} source={{ uri: imageURI }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 10,
        marginTop: 30,
        borderRadius: 10,
    },
    descriptionContainer: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    descriptionText: {
        fontSize: 14,
        opacity: 0.5,
    },
    header: {
        paddingHorizontal: 15,
        marginTop: 5,
        marginBottom: 10,
        fontSize: 16,
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
})