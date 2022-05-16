import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Image,
    ScrollView,
    Switch,
    TouchableOpacity,
    Pressable,
} from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../store/authSlice'
import {
    useGetUserDataQuery,
    useUpdateUserDataSettingsMutation,
} from '../../services/roadbudApi'
import { COLORS, SHADOWS, TYPOGRAPHY } from '../../styles'
import { formatDateWithTime } from '../../utils'
import { createAvatarLetters } from '../../utils'
import AvatarLetters from '../../components/AvatarLetters'

const AccountScreen = () => {
    const [errors, setErrors] = useState({})
    const handleError = (error, input) => {
        setErrors((prevState) => ({ ...prevState, [input]: error }))
    }
    const [settings, setSettings] = useState({
        hasPushNotifications: null,
        hasLocationServices: null,
        hasEmailMarketing: null,
    })
    const { user } = useSelector((state) => state.auth)

    dispatch = useDispatch()

    const handleLogout = () => {
        try {
            dispatch(logoutUser())
        } catch (error) {
            handleError(error, 'logout')
        }
    }

    const { data, isLoading, error } = useGetUserDataQuery()
    const [setUserSettings, result] = useUpdateUserDataSettingsMutation()

    useEffect(() => {
        if (data) {
            setSettings((prevState) => ({
                ...prevState,
                hasEmailMarketing: data.settings.hasEmailMarketing,
                hasLocationServices: data.settings.hasLocationServices,
                hasPushNotifications: data.settings.hasPushNotifications,
            }))
        }
    }, [data])

    const handleToggleSwitch = (settingType, value) => {
        setSettings((prevState) => ({
            ...prevState,
            [settingType]: !value,
        }))
    }

    const firstUpdate = useRef(true)
    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false
            return
        }
        setUserSettings({ settings: { ...settings } })
    }, [settings])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.content}>
                <View style={styles.topContainer}>
                    {/* <Image
                        style={styles.avatar}
                        source={{
                            uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3087&q=80',
                        }}
                    /> */}
                    <AvatarLetters />
                    <View>
                        <Pressable
                            onPress={() => {
                                setIsBottomSheetOpen(!isBottomSheetOpen)
                                console.log(isBottomSheetOpen)
                            }}
                        >
                            <Text style={styles.header}>{user.fullName}</Text>
                        </Pressable>
                        <Text style={styles.subheader}>{user.email}</Text>
                    </View>
                </View>
                {data && (
                    <>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: '600',
                                marginLeft: 20,
                            }}
                        >
                            My Contributions
                        </Text>
                        <Text
                            style={{
                                marginLeft: 20,
                                opacity: 0.5,
                                marginTop: 5,
                            }}
                        >
                            {data.events.length > 0
                                ? `${data.events.length} Events`
                                : 'No events created'}
                        </Text>
                        <ScrollView
                            style={{ paddingLeft: 20, paddingVertical: 10 }}
                            horizontal={true}
                        >
                            {data.events.map((event) => (
                                <View style={styles.event}>
                                    <Text
                                        style={{
                                            ...TYPOGRAPHY.detailsLight,
                                            marginBottom: 8,
                                        }}
                                    >
                                        {formatDateWithTime(event.createdAt)}
                                    </Text>
                                    <Text>{event.name}</Text>
                                </View>
                            ))}
                        </ScrollView>
                        <Text
                            style={{
                                marginLeft: 20,
                                opacity: 0.5,
                                marginTop: 5,
                            }}
                        >
                            {data.posts.length > 0
                                ? `${data.posts.length} Posts`
                                : 'No posts created'}
                        </Text>
                        <ScrollView
                            style={{ paddingLeft: 20, paddingVertical: 10 }}
                            horizontal={true}
                        >
                            {data.posts.map((post) => (
                                <View style={styles.post}>
                                    <View style={styles.postTextContent}>
                                        <Text
                                            style={{
                                                ...TYPOGRAPHY.detailsLight,
                                                marginBottom: 8,
                                            }}
                                        >
                                            {formatDateWithTime(post.createdAt)}
                                        </Text>
                                        <Text>{post.description}</Text>
                                    </View>

                                    {post.imageUrl !== '' ? (
                                        <Image
                                            style={styles.postImage}
                                            source={{ uri: post.imageUrl }}
                                        />
                                    ) : (
                                        <Text
                                            style={{
                                                alignSelf: 'center',
                                                justifyContent: 'center',
                                                marginTop: 50,
                                                opacity: 0.5,
                                            }}
                                        >
                                            No image
                                        </Text>
                                    )}
                                </View>
                            ))}
                        </ScrollView>
                    </>
                )}
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: '600',
                        marginLeft: 20,
                        marginTop: 10,
                    }}
                >
                    Settings
                </Text>

                {data && (
                    <View style={{ marginLeft: 20 }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 15,
                            }}
                        >
                            <Switch
                                trackColor={{
                                    false: '#767577',
                                    true: '#047FE8',
                                }}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => {
                                    handleToggleSwitch(
                                        'hasPushNotifications',
                                        settings.hasPushNotifications
                                    )
                                }}
                                value={settings.hasPushNotifications}
                            />
                            <Text style={{ marginLeft: 10 }}>
                                Push notifications
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 15,
                            }}
                        >
                            <Switch
                                trackColor={{
                                    false: '#767577',
                                    true: '#047FE8',
                                }}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => {
                                    handleToggleSwitch(
                                        'hasLocationServices',
                                        settings.hasLocationServices
                                    )
                                }}
                                value={settings.hasLocationServices}
                            />
                            <Text style={{ marginLeft: 10 }}>
                                Location services
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 15,
                            }}
                        >
                            <Switch
                                trackColor={{
                                    false: '#767577',
                                    true: '#047FE8',
                                }}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => {
                                    handleToggleSwitch(
                                        'hasEmailMarketing',
                                        settings.hasEmailMarketing
                                    )
                                }}
                                value={settings.hasEmailMarketing}
                            />
                            <Text style={{ marginLeft: 10 }}>
                                Email marketing
                            </Text>
                        </View>
                    </View>
                )}
                <TouchableOpacity
                    onPress={handleLogout}
                    style={styles.logoutButton}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            color: '#fff',
                            fontWeight: '600',
                        }}
                    >
                        Logout
                    </Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.deleteButton}>
                    <Text
                        style={{
                            fontSize: 18,
                            color: '#fff',
                            fontWeight: '600',
                        }}
                    >
                        Delete account
                    </Text>
                </TouchableOpacity> */}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    topContainer: {
        margin: 20,
        flexDirection: 'row',
        marginBottom: 20,
    },
    header: {
        fontSize: 22,
        fontWeight: '600',
    },
    subheader: {
        marginTop: 2,
        fontSize: 16,
        opacity: 0.5,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    event: {
        width: 200,
        backgroundColor: COLORS.white,
        padding: 20,
        borderRadius: 5,
        marginRight: 15,
        ...SHADOWS.shadowProp,
    },
    post: {
        height: 250,
        width: 200,
        backgroundColor: COLORS.white,
        borderRadius: 5,
        marginRight: 15,
        ...SHADOWS.shadowProp,
    },
    postTextContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    postImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    logoutButton: {
        marginTop: 40,
        backgroundColor: '#000',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        borderRadius: 5,
    },
    deleteButton: {
        marginTop: 20,
        backgroundColor: '#707070',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        borderRadius: 5,
    },
})

export default AccountScreen
