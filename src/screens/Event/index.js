import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import React, { useEffect } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'
import Post from '../../components/Post/Post'
import { COLORS, TYPOGRAPHY } from '../../styles'
import { useGetEventQuery } from '../../services/eventsApi'
import { formatDateWithTime } from '../../utils/index'

//TODO: Add bottom padding??? make images the right size and conditional rendering for posts without image

export default function EventScreen({ route }) {
    const { eventId } = route.params
    const { data, error, isLoading, isSuccess } = useGetEventQuery(eventId)

    return (
        <SafeAreaView style={styles.container}>
            {isLoading && <Text>Event is loading</Text>}
            {isSuccess && (
                <ScrollView style={styles.content}>
                    <View style={styles.descriptionContainer}>
                        <Text style={TYPOGRAPHY.detailsLargeLight}>
                            {formatDateWithTime(data.startsAt)}
                        </Text>
                        <Text style={TYPOGRAPHY.detailsLargeLight}>
                            John Smith
                        </Text>
                    </View>
                    <Text style={styles.header}>{data.name}</Text>
                    <View style={styles.optionsContainer}>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
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
                                    style={{ color: '#fff', fontWeight: '600' }}
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
                                    style={{ color: '#fff', fontWeight: '600' }}
                                >
                                    Follow
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.otherInfoContainer}>
                            <Text style={TYPOGRAPHY.detailsLargeLight}>
                                3 Posts
                            </Text>
                            <IconMaterial
                                name="dots-horizontal"
                                style={{ fontSize: 35, marginLeft: 5 }}
                            />
                        </View>
                    </View>
                    {/* Map through all posts for specific event */}
                    {/* {event.posts.map((post) => (
                    <Post
                        description={post.description}
                        time={post.time}
                        imageURI={post.imageURI}
                        date={post.date}
                        user={post.user}
                    />
                ))} */}
                    <View style={{ paddingTop: 50 }} />
                </ScrollView>
            )}
        </SafeAreaView>
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
