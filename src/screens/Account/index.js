import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Image,
    ScrollView,
    Switch,
    TouchableOpacity,
} from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from '../../redux/actions'

const AccountScreen = () => {
    const { token, fullName, email } = useSelector((state) => state.userReducer)

    const [errors, setErrors] = useState({})
    const handleError = (error, input) => {
        setErrors((prevState) => ({ ...prevState, [input]: error }))
    }

    const [isEnabled, setIsEnabled] = useState(false)
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState)

    dispatch = useDispatch()

    const handleLogout = () => {
        try {
            dispatch(signOut())
        } catch (error) {
            handleError(error, 'logout')
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.content}>
                <View style={styles.topContainer}>
                    <Image
                        style={styles.avatar}
                        source={{
                            uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3087&q=80',
                        }}
                    />
                    <View>
                        <Text style={styles.header}>{fullName}</Text>
                        <Text style={styles.subheader}>{email}</Text>
                    </View>
                </View>
                <Text
                    style={{ fontSize: 16, fontWeight: '600', marginLeft: 20 }}
                >
                    My Contributions
                </Text>
                <ScrollView
                    style={{ paddingLeft: 20, paddingVertical: 10 }}
                    horizontal={true}
                >
                    <View style={[styles.post, styles.shadowProp]}>
                        <Text>
                            HWY 82 traffic backed up. Not going to clear up for
                            a while.
                        </Text>
                    </View>
                    <View style={[styles.post, styles.shadowProp]}>
                        <Text>
                            HWY 82 traffic backed up. Not going to clear up for
                            a while.
                        </Text>
                    </View>
                </ScrollView>
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
                <View style={{ marginLeft: 20 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 15,
                        }}
                    >
                        <Switch
                            trackColor={{ false: '#767577', true: '#047FE8' }}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
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
                            trackColor={{ false: '#767577', true: '#047FE8' }}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
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
                            trackColor={{ false: '#767577', true: '#047FE8' }}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                        <Text style={{ marginLeft: 10 }}>Email marketing</Text>
                    </View>
                </View>
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
                <TouchableOpacity style={styles.deleteButton}>
                    <Text
                        style={{
                            fontSize: 18,
                            color: '#fff',
                            fontWeight: '600',
                        }}
                    >
                        Delete account
                    </Text>
                </TouchableOpacity>
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
    post: {
        height: 120,
        width: 200,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 5,
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
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
