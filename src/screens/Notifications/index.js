import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import React, { useState } from 'react'
import NotificationToggler from '../../components/Notification/NotificationToggler'
import AddNotificationModal from '../../components/Notification/AddNotificationModal'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLORS, TYPOGRAPHY } from '../../styles'
import ComingSoon from '../../components/ComingSoon'

const NotificationsScreen = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const [editToggled, setEditToggled] = useState(false)

    return (
        <ComingSoon>
            <SafeAreaView style={styles.container}>
                <AddNotificationModal
                    visible={modalVisible}
                    onClosePress={() => setModalVisible(!modalVisible)}
                />
                <ScrollView style={styles.content}>
                    <View style={styles.topContainer}>
                        <Text style={TYPOGRAPHY.header}>Notifications</Text>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                onPress={() => setEditToggled(!editToggled)}
                                style={styles.editButton}
                            >
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setModalVisible(!modalVisible)}
                                style={styles.addButton}
                            >
                                <Text style={styles.buttonText}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* Map through notifications */}
                    <View style={{ flexDirection: 'row' }}>
                        <NotificationToggler
                            cdotNotifications={true}
                            roadbudNotifications={true}
                            routeName="Glenwood to Denver"
                        />
                        {editToggled && (
                            <View
                                style={{
                                    flexDirection: 'column',
                                    justifyContent: 'space-around',
                                }}
                            >
                                <TouchableOpacity>
                                    <Icon
                                        style={{
                                            marginLeft: 25,
                                            fontSize: 25,
                                            color: '#3d3d3d',
                                        }}
                                        name="note-edit"
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Icon
                                        style={{
                                            marginLeft: 25,
                                            fontSize: 25,
                                            color: '#F50000',
                                        }}
                                        name="delete"
                                    />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ComingSoon>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        justifyContent: 'space-between',
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    editButton: {
        backgroundColor: COLORS.secondary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    addButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: COLORS.white,
        fontWeight: '600',
        fontFamily: 'Montserrat-Regular',
    },
})

export default NotificationsScreen
