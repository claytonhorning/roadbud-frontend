import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import React from 'react'
import Input from '../../components/Inputs/Input'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function ReportEventScreen() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.header}>Report New Event</Text>
                <Input
                    label="Event Title"
                    placeholder="Landslide in Glenwood Canyon"
                />
                <Input
                    label="Location"
                    defaultValue="My current location"
                    rightButton={'Find on map'}
                />
                <Text style={styles.header}>Post to the New Event</Text>
                <Text style={{ opacity: 0.5, marginBottom: 15 }}>
                    Events need at least one post to describe what's currently
                    happening.
                </Text>
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
        marginTop: 20,
        marginHorizontal: 20,
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
})
