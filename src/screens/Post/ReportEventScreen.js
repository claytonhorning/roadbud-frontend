import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Keyboard,
} from 'react-native'
import React, { useState } from 'react'
import Input from '../../components/Inputs/Input'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TYPOGRAPHY } from '../../styles'
import { useCreateEventMutation } from '../../services/eventsApi'
import { useCreatePostMutation } from '../../services/postsApi'

export default function ReportEventScreen({ navigation }) {
    const [inputs, setInputs] = useState({
        eventName: '',
        eventLocation: '',
        postDescription: '',
        postImageUrl: '',
    })
    const [errors, setErrors] = useState({})

    const validate = () => {
        Keyboard.dismiss()
        let isValid = true
        if (!inputs.eventName) {
            handleError('Please input name', 'eventName')
            isValid = false
        } else if (inputs.eventName.length < 5) {
            handleError('Minimum 5 characters', 'eventName')
            isValid = false
        }

        if (isValid) {
            handleCreateEvent()
        }
    }

    const handleOnChange = (text, input) => {
        setInputs((prevState) => ({ ...prevState, [input]: text }))
    }
    const handleError = (error, input) => {
        setErrors((prevState) => ({ ...prevState, [input]: error }))
    }

    const [createEvent, eventResult] = useCreateEventMutation()
    const [createPost, postResult] = useCreatePostMutation()

    const handleCreateEvent = async () => {
        let event = {
            name: inputs.eventName,
            location: inputs.eventLocation,
        }
        await createEvent(event).then((res) => {
            const handleCreatePost = async () => {
                let post = {
                    title: 'Hello world',
                    description: inputs.postDescription,
                    // eventId: res?.data?.id,
                }
                console.log(post)
                await createPost(post).then((res) => {
                    console.log(res)
                    console.log(postResult)
                })
            }
            handleCreatePost()
            navigation.navigate('ViewCreatedEvent', {
                eventId: res?.data?._id,
            })
        })
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.subheader}>Report New Event</Text>
                <Input
                    label="Event Title"
                    placeholder="Landslide in Glenwood Canyon"
                    onChangeText={(text) => {
                        handleOnChange(text, 'eventName')
                    }}
                    onFocus={() => handleError(null, 'eventName')}
                    error={errors.eventName}
                />
                <Input
                    label="Location"
                    defaultValue="My current location"
                    rightButton={'Find on map'}
                    onChangeText={(text) => {
                        handleOnChange(text, 'eventLocation')
                    }}
                    onFocus={() => handleError(null, 'eventLocation')}
                    error={errors.eventLocation}
                />
                <Text style={styles.subheader}>Post to the New Event</Text>
                <Text style={styles.paragraph}>
                    Events need at least one post to describe what's currently
                    happening.
                </Text>
                <Input
                    placeholder="Type description here..."
                    label="Description"
                    multiline={true}
                    largeInput={true}
                    onChangeText={(text) => {
                        handleOnChange(text, 'postDescription')
                    }}
                    onFocus={() => handleError(null, 'postDescription')}
                    error={errors.postDescription}
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
                <TouchableOpacity onPress={validate} style={styles.postButton}>
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
    subheader: {
        ...TYPOGRAPHY.subheader,
        marginBottom: 15,
    },
    paragraph: {
        ...TYPOGRAPHY.paragraph,
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
