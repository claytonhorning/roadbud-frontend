import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native'
import React from 'react'
import { COLORS, TYPOGRAPHY } from '../../styles'

export default function Video({ location }) {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={TYPOGRAPHY.subheader}>
                Live Video Cameras in {location}
            </Text>
            <Text style={{ opacity: 0.5, marginTop: 5 }}>8 Feeds</Text>
            <View style={styles.videoContainer}>
                <TouchableOpacity style={styles.video}>
                    <Text style={styles.videoNameText}>I-70 175.30 EB</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.video}>
                    <Text style={styles.videoNameText}>I-70 175.30 EB</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.video}>
                    <Text style={styles.videoNameText}>I-70 175.30 EB</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    videoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    video: {
        height: 120,
        width: '47%',
        backgroundColor: COLORS.black,
        marginVertical: 12,
    },
    videoNameText: {
        ...TYPOGRAPHY.detailsWhite,
        margin: 8,
    },
})
