import {
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native'
import React, { useState } from 'react'
import RouteInput from '../../components/Inputs/RouteInput'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function AddNotificationModal({ visible, onClosePress }) {
    const [selectedChips, setSelectedChips] = useState([])
    const [unselectedChips, setUnselectedChips] = useState(['CDOT', 'Roadbud'])

    const handleChipPressed = (name) => {
        if (selectedChips.includes(name)) {
            setSelectedChips(
                selectedChips.filter((namePassed) => name !== namePassed)
            )
            setUnselectedChips([...unselectedChips, name])
        } else {
            setUnselectedChips(
                unselectedChips.filter((namePassed) => name !== namePassed)
            )
            setSelectedChips([...selectedChips, name])
        }
    }

    const AddChip = ({ name }) => (
        <TouchableOpacity
            onPress={() => handleChipPressed(name)}
            style={styles.chip}
        >
            <Text style={{ color: '#fff', fontWeight: '600' }}>{name}</Text>

            <Icon
                style={{
                    color: '#2ABC2E',
                    fontSize: 16,
                    marginLeft: 5,
                }}
                name="plus-circle"
            />
            <View style={styles.backgroundCircle} />
        </TouchableOpacity>
    )

    const DeleteChip = ({ name }) => (
        <TouchableOpacity
            onPress={() => handleChipPressed(name)}
            style={styles.chip}
        >
            <Text style={{ color: '#fff', fontWeight: '600' }}>{name}</Text>
            <Icon
                style={{ color: '#F50000', fontSize: 16, marginLeft: 5 }}
                name="minus-circle"
            />
            <View style={styles.backgroundCircle} />
        </TouchableOpacity>
    )

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.content}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Text style={styles.header}>
                                    New Notification
                                </Text>
                                <TouchableOpacity onPress={onClosePress}>
                                    <Icon
                                        style={{
                                            color: '#3d3d3d',
                                            fontSize: 25,
                                            marginLeft: 5,
                                        }}
                                        name="close"
                                    />
                                </TouchableOpacity>
                            </View>
                            <Text style={{ opacity: 0.5, marginTop: 10 }}>
                                Receive alerts when an event is posted along
                                this route.
                            </Text>
                            <RouteInput />
                            <View style={{ flexDirection: 'row' }}>
                                {selectedChips.map((chip) => (
                                    <DeleteChip key={chip} name={chip} />
                                ))}
                            </View>
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: '600',
                                    marginTop: 5,
                                }}
                            >
                                Click to add or remove
                            </Text>

                            <View style={{ flexDirection: 'row' }}>
                                {unselectedChips.map((chip) => (
                                    <AddChip key={chip} name={chip} />
                                ))}
                            </View>

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
            </View>
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
    chip: {
        backgroundColor: '#000',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 10,
        paddingVertical: 3,
        borderRadius: 20,
        marginRight: 10,
        marginVertical: 10,
    },
    backgroundCircle: {
        height: 10,
        width: 10,
        zIndex: -1,
        position: 'absolute',
        right: 12,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
})
