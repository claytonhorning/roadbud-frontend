import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    TouchableWithoutFeedback,
    Pressable,
} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'
import Post from '../../components/Post/Post'
import { COLORS, TYPOGRAPHY } from '../../styles'
import { useGetEventQuery } from '../../services/roadbudApi'
import { formatDateWithTime } from '../../utils/index'
import { ModalContext } from '../../utils/modalContext'
import { UpdateEventFromComponent } from '../ActionSheets/UpdateEvent'
import AvatarLetters from '../AvatarLetters'

//TODO: Add bottom padding??? make images the right size and conditional rendering for posts without image

export default function Event({ eventId, navigation }) {
    const {
        data: eventData,
        error: eventError,
        isLoading: eventLoading,
        isSuccess: eventSuccess,
    } = useGetEventQuery(eventId)

    const [update, isUpdateOpen] = useState(false)
    const { openModal, setOpenModal } = useContext(ModalContext)

    const handleAddPost = () => {
        navigation.navigate('PostToEventScreen', {
            eventId,
            name: eventData.name,
        })
        setOpenModal(false)
    }

    useEffect(() => {
        isUpdateOpen(false)
    }, [update])

    if (eventError || eventData == null) {
        return null
    }

    return (
        <View style={styles.container}>
            {eventLoading && <Text>Event is loading</Text>}
            {eventSuccess && (
                <ScrollView style={styles.content}>
                    <View style={styles.descriptionContainer}>
                        <Text style={TYPOGRAPHY.detailsLargeLight}>
                            {formatDateWithTime(eventData.startsAt)}
                        </Text>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}
                        >
                            {!eventData.isCDOT && (
                                <AvatarLetters
                                    size={22}
                                    name={eventData.createdBy?.fullName}
                                />
                            )}

                            <Text style={TYPOGRAPHY.detailsLargeLight}>
                                {eventData.isCDOT == true
                                    ? 'CDOT'
                                    : eventData?.createdBy?.fullName}
                            </Text>
                        </View>
                    </View>

                    <Text style={styles.header}>{eventData.name}</Text>
                    <View style={styles.optionsContainer}>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                onPress={handleAddPost}
                                style={[
                                    styles.addPostButton,
                                    styles.shadowProp,
                                ]}
                            >
                                <Icon
                                    name="plus"
                                    style={{
                                        color: '#fff',
                                        marginRight: 8,
                                    }}
                                />
                                <Text
                                    style={{
                                        color: '#fff',
                                        fontWeight: '600',
                                    }}
                                >
                                    Add Post
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.followButton, styles.shadowProp]}
                            >
                                <Icon
                                    name="bell"
                                    style={{
                                        color: '#fff',
                                        marginRight: 8,
                                    }}
                                />
                                <Text
                                    style={{
                                        color: '#fff',
                                        fontWeight: '600',
                                    }}
                                >
                                    Follow
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.otherInfoContainer}>
                            <Text style={TYPOGRAPHY.detailsLargeLight}>
                                {eventData.posts?.length} {''}
                                {eventData.posts?.length == 1
                                    ? 'Post'
                                    : 'Posts'}
                            </Text>
                            <TouchableOpacity
                                onPress={() => isUpdateOpen(true)}
                            >
                                <IconMaterial
                                    name="dots-horizontal"
                                    style={{
                                        fontSize: 35,
                                        marginLeft: 5,
                                    }}
                                />
                            </TouchableOpacity>
                            {update && (
                                <UpdateEventFromComponent
                                    navigation={navigation}
                                    createdByUserId={
                                        !eventData.isCDOT &&
                                        eventData.createdBy?._id
                                    }
                                    eventId={eventData._id}
                                />
                            )}
                        </View>
                    </View>
                    {eventData &&
                        eventData.posts
                            ?.slice(0)
                            .reverse()
                            .map((post) => (
                                <Post
                                    key={post._id}
                                    description={post.description}
                                    imageURI={post.imageUrl}
                                    time={formatDateWithTime(post.createdAt)}
                                    user={
                                        post.createdBy
                                            ? post.createdBy.fullName
                                            : 'CDOT'
                                    }
                                />
                            ))}

                    <View style={{ paddingTop: 50 }} />
                </ScrollView>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    descriptionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    header: {
        marginVertical: 10,
        fontSize: 22,
        fontWeight: '700',
    },
    optionsContainer: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center',
    },
    buttonsContainer: {
        flex: 2,
        flexGrow: 1,
        flexDirection: 'row',
    },
    addPostButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: COLORS.primary,
        height: 35,
        width: 115,
    },
    followButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: COLORS.secondary,
        height: 35,
        width: 100,
        marginHorizontal: 10,
    },
    otherInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
})
