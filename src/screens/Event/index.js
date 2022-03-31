import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'
import Post from '../../components/Post/Post'
import { COLORS, TYPOGRAPHY } from '../../styles'

const eventData = [
    {
        id: 1,
        name: 'Landslide in Glenwood Springs Canyon',
        posts: 2,
        date: '3/18',
        time: '8:15 AM',
        user: 'David B.',
        cdot: false,
        posts: [
            {
                id: 1,
                description:
                    'Something happened here in the canyon. Will be cleared up soon.',
                time: '9:34 AM',
                date: '3/17',
                user: 'Jeremy B.',
                imageURI:
                    'https://images.unsplash.com/photo-1479030160180-b1860951d696?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
            },
            {
                id: 2,
                description: 'Still not cleared up yet',
                time: '12:34 pM',
                date: '3/17',
                user: 'Dick V.',
                imageURI:
                    'https://images.unsplash.com/photo-1415594445260-63e18261587e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
            },
            {
                id: 3,
                description: 'All cleared up in the canyon on I-70 West',
                time: '2:45 PM',
                date: '3/17',
                user: 'David E.',
                imageURI:
                    'https://images.unsplash.com/photo-1471958680802-1345a694ba6d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2532&q=80',
            },
        ],
    },
]

//TODO: Add bottom padding??? make images the right size and conditional rendering for posts without image

export default function EventScreen({ route }) {
    const { itemId } = route.params
    const event = eventData.find(({ id }) => id == itemId)

    // Take itemid and query database to get corresponding posts
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.content}>
                <View style={styles.descriptionContainer}>
                    <Text style={TYPOGRAPHY.detailsLargeLight}>
                        11:14 AM, March 17
                    </Text>
                    <Text style={TYPOGRAPHY.detailsLargeLight}>John Smith</Text>
                </View>
                <Text style={styles.header}>
                    Landslide in Glenwood Springs Canyon I-70
                </Text>
                <View style={styles.optionsContainer}>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            style={[styles.addPostButton, styles.shadowProp]}
                        >
                            <Icon
                                name="plus"
                                style={{
                                    color: '#fff',
                                    marginRight: 8,
                                }}
                            />
                            <Text style={{ color: '#fff', fontWeight: '600' }}>
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
                            <Text style={{ color: '#fff', fontWeight: '600' }}>
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
                {event.posts.map((post) => (
                    <Post
                        description={post.description}
                        time={post.time}
                        imageURI={post.imageURI}
                        date={post.date}
                        user={post.user}
                    />
                ))}
                <View style={{ paddingTop: 50 }} />
            </ScrollView>
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
