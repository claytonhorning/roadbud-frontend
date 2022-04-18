import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Pressable,
    Keyboard,
    ActivityIndicator,
} from 'react-native'
import React, { useState } from 'react'
import Input from '../../components/Inputs/Input'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useCreatePostMutation } from '../../services/roadbudApi'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker'

export default function PostToEventScreen({ route, navigation }) {
    const { eventId, name } = route.params
    const [inputs, setInputs] = useState({
        eventName: name,
        postDescription: '',
    })
    const [errors, setErrors] = useState({})
    const [isLoadingModal, setIsLoadingModal] = useState(false)
    const [photo, setPhoto] = useState()
    const [createPost, postResult] = useCreatePostMutation()

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

    const validate = () => {
        Keyboard.dismiss()
        let isValid = true
        if (!inputs.eventName) {
            handleError('Please input name', 'eventName')
            isValid = false
            //Check if event exists
        } else if (inputs.eventName.length < 5) {
            handleError('Minimum 5 characters', 'eventName')
            isValid = false
        }

        if (isValid) {
            handleCreatePost()
            setInputs({
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

    const handleCreatePost = async () => {
        setIsLoadingModal(true)

        const postFormData = new FormData()
        postFormData.append('description', inputs.postDescription)
        postFormData.append('event', eventId)
        if (photo) {
            postFormData.append('file', {
                uri: photo.assets[0].uri,
                type: photo.assets[0].type,
                name: photo.assets[0].fileName,
            })
        }

        await createPost(postFormData)
        navigation.navigate('ViewCreatedEvent', {
            eventId: eventId,
        })
        setIsLoadingModal(false)
        setPhoto(null)
    }

    if (isLoadingModal) {
        return (
            <View style={styles.overlay}>
                <Text style={{ color: '#000', marginBottom: 10 }}>
                    Creating the post
                </Text>
                <ActivityIndicator size="large" color="#000" />
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.header}>Post to an Event</Text>
                <Input
                    style={{ marginBottom: 0 }}
                    label="Event Title"
                    placeholder="Landslide in Glenwood Canyon"
                    value={inputs.eventName}
                    onChangeText={(text) => {
                        handleOnChange(text, 'eventName')
                    }}
                    error={errors.eventName}
                    onFocus={() => handleError(null, 'eventName')}
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
                    onChangeText={(text) => {
                        handleOnChange(text, 'postDescription')
                    }}
                    error={errors.postDescription}
                    onFocus={() => handleError(null, 'postDescription')}
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
                        <Pressable onPress={handleTakePhoto}>
                            <Text style={{ color: '#047FE8' }}>
                                Select from camera roll
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
