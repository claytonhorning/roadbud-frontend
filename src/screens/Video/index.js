import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import React from 'react'
import Icon from '../../components/Icon'
import { COLORS, TYPOGRAPHY } from '../../styles'

const videoData = [
    { id: 1, name: 'I-70 175.30' },
    { id: 2, name: 'I-80 175.30' },
    { id: 3, name: 'I-90 175.30' },
    { id: 4, name: 'I-200 175.30' },
]

export default function Video() {
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
                <Text style={{ opacity: 0.5, marginVertical: 5 }}>8 Feeds</Text>
                <ScrollView contentContainerStyle={styles.videoContainer}>
                    {videoData.map((video) => (
                        <TouchableOpacity style={styles.video}>
                            <Text style={styles.videoNameText}>
                                {video.name}
                            </Text>
                        </TouchableOpacity>
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
        margin: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        height: 55,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
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
