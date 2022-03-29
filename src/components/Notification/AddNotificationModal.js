import {
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native'
import React from 'react'
import RouteInput from '../../components/Inputs/RouteInput'

export default function AddNotificationModal({ visible }) {
    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <ScrollView contentContainerStyle={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.content}>
                            <Text style={styles.header}>New Notification</Text>
                            <Text style={{ opacity: 0.5, marginTop: 10 }}>
                                Receive alerts when an event is posted along
                                this route.
                            </Text>
                            <RouteInput />
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: '600',
                                    marginTop: 15,
                                }}
                            >
                                Click to add or remove
                            </Text>
                            <TouchableOpacity style={styles.addButton}>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        fontWeight: '600',
                                        color: '#fff',
                                    }}
                                >
                                    Add
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, .5)',
    },
    modalContainer: {
        marginHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    content: {
        margin: 20,
    },
    header: {
        fontSize: 22,
        fontWeight: '600',
    },
    addButton: {
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#FD7A22',
        marginVertical: 10,
    },
})
