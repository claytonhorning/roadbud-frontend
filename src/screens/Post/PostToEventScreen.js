import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native'
import React from 'react'
import Input from '../../components/Inputs/Input'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function PostToEventScreen() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.header}>Post to an Event</Text>
                <Input
                    style={{ marginBottom: 0 }}
                    label="Event Title"
                    placeholder="Landslide in Glenwood Canyon"
                />
                <View style={styles.nearYouContainer}>
                    <Text style={{ opacity: 0.5 }}>Near You: </Text>
                    <TouchableOpacity>
                        <Text style={styles.suggestionText}>
                            Landslide in Glenwood...
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.suggestionText}>
                            Landslide in Glenwood...
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.suggestionText}>
                            Landslide in Glenwood...
                        </Text>
                    </TouchableOpacity>
                </View>

                <Input
                    placeholder="Type description here..."
                    label="Description"
                    multiline={true}
                    largeInput={true}
                />
                <View style={styles.addPhotoContainer}>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 15,
                        }}
                    >
                        <Icon
                            name="camera"
                            style={{
                                fontSize: 25,
                                color: '#FF7A01',
                                marginRight: 10,
                            }}
                        />
                        <Text style={{ color: '#047FE8' }}>
                            Take a picture or video
                        </Text>
                    </TouchableOpacity>
                    <View>
                        <View style={styles.seperator} />
                        <Text style={styles.orText}>OR</Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Icon
                            name="picture-o"
                            style={{
                                fontSize: 25,
                                color: '#FF7A01',
                                marginRight: 10,
                            }}
                        />
                        <Text style={{ color: '#047FE8' }}>
                            Select from camera roll
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.postButton}>
                    <Text
                        style={{
                            fontSize: 18,
                            color: '#fff',
                            fontWeight: '600',
                        }}
                    >
                        Post
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        margin: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 15,
    },
    seperator: {
        position: 'absolute',
        top: 11,
        alignSelf: 'center',
        width: '50%',
        borderWidth: 2,
        borderColor: '#ccc',
        borderStyle: 'dotted',
    },
    orText: {
        color: '#ccc',
        fontSize: 22,
        alignSelf: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    postButton: {
        height: 55,
        backgroundColor: '#FD7A22',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginVertical: 30,
    },
    nearYouContainer: {
        flexDirection: 'row',
        marginTop: -12,
        marginBottom: 12,
        flexWrap: 1,
    },
    suggestionText: {
        color: '#047FE8',
        marginRight: 8,
    },
})
