import { ActionSheetIOS } from 'react-native'
import React, { useContext, useRef, useEffect } from 'react'
import { useDeleteEventMutation } from '../../services/roadbudApi'
import { useSelector } from 'react-redux'
import { ModalContext } from '../../utils/modalContext'

export const UpdateEventFromComponent = ({
    createdByUserId,
    eventId,
    navigation,
}) => {
    const { openModal, setOpenModal } = useContext(ModalContext)
    const { _id: userId } = useSelector((state) => state.auth.user)

    const [deleteEvent, result] = useDeleteEventMutation()

    if (userId === createdByUserId) {
        //Check if user is the one that made the post

        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['Cancel', 'Delete event'],
                destructiveButtonIndex: 1,
                cancelButtonIndex: 0,
                userInterfaceStyle: 'dark',
            },
            (buttonIndex) => {
                if (buttonIndex === 0) {
                    // cancel action
                } else if (buttonIndex === 1) {
                    deleteEvent(eventId)
                    setOpenModal(false)
                    navigation.navigate('MapScreen')
                }
            }
        )
    } else {
        //If user isnt the one who made the post
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['Cancel', 'Report event'],
                destructiveButtonIndex: 1,
                cancelButtonIndex: 0,
                userInterfaceStyle: 'dark',
            },
            (buttonIndex) => {
                if (buttonIndex === 0) {
                    // cancel action
                } else if (buttonIndex === 1) {
                    //Report the event
                    return
                }
            }
        )
    }

    return null
}

export const UpdateEventFromScreen = ({ eventId, navigation }) => {
    const { _id: userId } = useSelector((state) => state.auth.user)

    const [deleteEvent, result] = useDeleteEventMutation()

    if (userId == '6258513d4974385c495c42dc') {
        //Check if user is the one that made the post

        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['Cancel', 'Delete event'],
                destructiveButtonIndex: 1,
                cancelButtonIndex: 0,
                userInterfaceStyle: 'dark',
            },
            (buttonIndex) => {
                if (buttonIndex === 0) {
                    // cancel action
                } else if (buttonIndex === 1) {
                    deleteEvent(eventId)
                    navigation.navigate('MapScreen')
                }
            }
        )
    } else {
        //If user isnt the one who made the post
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['Cancel', 'Report event'],
                destructiveButtonIndex: 1,
                cancelButtonIndex: 0,
                userInterfaceStyle: 'dark',
            },
            (buttonIndex) => {
                if (buttonIndex === 0) {
                    // cancel action
                } else if (buttonIndex === 1) {
                    //Report the event
                    return
                }
            }
        )
    }
    return null
}
