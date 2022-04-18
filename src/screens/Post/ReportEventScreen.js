import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Keyboard,
    Pressable,
    ActivityIndicator,
    Image,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Input from '../../components/Inputs/Input'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TYPOGRAPHY } from '../../styles'
import { useCreateEventMutation } from '../../services/roadbudApi'
import { useCreatePostMutation } from '../../services/roadbudApi'
import { getLocation } from '../../store/locationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker'

export default function ReportEventScreen({ navigation }) {
    const [inputs, setInputs] = useState({
        eventName: '',
        eventLocation: '',
        postDescription: '',
    })
    const [photo, setPhoto] = useState()
    const [isLoadingModal, setIsLoadingModal] = useState(false)

    const dispatch = useDispatch()
    const { location } = useSelector((state) => state.location)

    useEffect(() => {
        dispatch(getLocation())
    }, [])

    const [errors, setErrors] = useState({})

    const validate = () => {
        Keyboard.dismiss()
        let isValid = true
        if (!inputs.eventName) {
            handleError('Please add event name', 'eventName')
            isValid = false
        } else if (inputs.eventName.length < 5) {
            handleError('Minimum 5 characters', 'eventName')
            isValid = false
        }
        if (!inputs.postDescription) {
            handleError('Please add a description', 'postDescription')
            isValid = false
        } else if (inputs.postDescription.length < 10) {
            handleError('Minimum 10 characters', 'postDescription')
            isValid = false
        }

        if (isValid) {
            handleCreateEvent()
            setInputs({
                eventName: '',
                eventLocation: '',
                postDescription: '',
            })
        }
    }

    const handleOnChange = (text, input) => {
        setInputs((prevState) => ({ ...prevState, [input]: text }))
    }
    const handleError = (error, input) => {
        setErrors((prevState) => ({ ...prevState, [input]: error }))
    }

    const handleChoosePhoto = () => {
        launchImageLibrary(
            {
                options: {
                    maxHeight: 200,
                    maxWidth: 200,
                    selectionLimit: 1,
                    mediaType: 'photo',
                    includeBase64: false,
                },
            },
            (response) => {
                if (response) {
                    setPhoto(response)
                }
            }
        )
    }

    const handleTakePhoto = () => {
        const options = { mediaType: 'photo' }
        launchCamera({ noData: true }, (response) => {
            if (response) {
                console.log(response)
                setPhoto(response)
            }
        })
    }

    const [createEvent, eventResult] = useCreateEventMutation()
    const [createPost, postResult] = useCreatePostMutation()

    const handleCreateEvent = async () => {
        let event = {
            name: inputs.eventName,
            location: {
                longitude: location.longitude,
                latitude: location.latitude,
            },
        }
        await createEvent(event).then(async (res) => {
            setIsLoadingModal(true)

            const handleCreatePost = async () => {
                const postFormData = new FormData()
                postFormData.append('description', inputs.postDescription)
                postFormData.append('event', res?.data?._id)

                if (photo) {
                    postFormData.append('file', {
                        uri: photo.assets[0].uri,
                        type: photo.assets[0].type,
                        name: photo.assets[0].fileName,
                    })
                }

                await createPost(postFormData)
            }
            await handleCreatePost()
            navigation.navigate('ViewCreatedEvent', {
                eventId: res?.data?._id,
            })
            setIsLoadingModal(false)
            setPhoto(null)
        })
    }

    if (isLoadingModal) {
        return (
            <View style={styles.overlay}>
                <Text style={{ color: '#000', marginBottom: 10 }}>
                    Creating the event
                </Text>
                <ActivityIndicator size="large" color="#000" />
            </View>
        )
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
                    value={inputs.eventName}
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
                    value={inputs.postDescription}
                    onChangeText={(text) => {
                        handleOnChange(text, 'postDescription')
                    }}
                    onFocus={() => handleError(null, 'postDescription')}
                    error={errors.postDescription}
                />

                {photo == null ? (
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
                            <Pressable onPress={handleTakePhoto}>
                                <Text style={{ color: '#047FE8' }}>
                                    Take a picture or video
                                </Text>
                            </Pressable>
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
                            <Pressable onPress={handleChoosePhoto}>
                                <Text style={{ color: '#047FE8' }}>
                                    Select from camera roll
                                </Text>
                            </Pressable>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View>
                        <Image
                            style={styles.uploadedImage}
                            source={{
                                uri: photo.assets[0].uri,
                            }}
                        />
                    </View>
                )}

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
    overlay: {
        flex: 1,
        backgroundColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
    },
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
    uploadedImage: {
        minWidth: 50,
        minHeight: 200,
    },
})
