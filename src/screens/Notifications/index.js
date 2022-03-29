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

const NotificationsScreen = () => {
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <SafeAreaView style={styles.container}>
            <AddNotificationModal visible={modalVisible} />
            <ScrollView style={styles.content}>
                <View style={styles.topContainer}>
                    <Text style={styles.header}>Notifications</Text>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.editButton}>
                            <Text style={{ color: '#fff', fontWeight: '600' }}>
                                Edit
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setModalVisible(!modalVisible)}
                            style={styles.addButton}
                        >
                            <Text style={{ color: '#fff', fontWeight: '600' }}>
                                Add
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <NotificationToggler
                    cdotNotifications={true}
                    roadbudNotifications={true}
                    routeName="Glenwood to Denver"
                />
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
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    header: {
        fontSize: 22,
        fontWeight: '600',
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
        backgroundColor: '#047FE8',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    addButton: {
        backgroundColor: '#FD7A22',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
})

export default NotificationsScreen
