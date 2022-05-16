import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'
import { TYPOGRAPHY, SHADOWS } from '../../styles'

export default function Post({ description, imageURI, time, date, user }) {
    console.log(typeof imageURI)
    console.log(imageURI)
    if (imageURI.includes('w_500')) {
        console.log('landscape')
    } else if (imageURI.includes('w_400')) {
        console.log('portrait')
    }
    return (
        <View style={styles.container}>
            <View style={styles.descriptionContainer}>
                <View>
                    <Text style={TYPOGRAPHY.detailsLight}>
                        {`${time},`} {date}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={TYPOGRAPHY.detailsLight}>{user}</Text>
                    <IconMaterial
                        style={{ fontSize: 25, marginLeft: 5 }}
                        name="dots-horizontal"
                    />
                </View>
            </View>
            <Text style={styles.header}>{description}</Text>
            {imageURI.includes('w_500') && (
                <View style={{ height: 263, width: '100%' }}>
                    <Image style={styles.image} source={{ uri: imageURI }} />
                </View>
            )}
            {imageURI.includes('w_400') && (
                <View style={{ height: 524, width: '100%' }}>
                    <Image style={styles.image} source={{ uri: imageURI }} />
                </View>
            )}
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
        ...SHADOWS.shadowProp,
    },
    descriptionContainer: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    header: {
        paddingHorizontal: 15,
        marginTop: 5,
        marginBottom: 10,
        fontSize: 16,
    },
    image: {
        width: '100%',
        height: '100%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
})
