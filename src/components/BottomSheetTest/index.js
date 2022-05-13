import React, {
    useCallback,
    useRef,
    useMemo,
    useEffect,
    useContext,
} from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
    BottomSheet,
    BottomSheetScrollView,
} from '@gorhom/bottom-sheet'
import { ModalContext } from '../../utils/modalContext'

const BottomSheetTest = ({ children, onDismiss }) => {
    const { openModal, setOpenModal } = useContext(ModalContext)
    const bottomSheetModalRef = useRef(null)

    const snapPoints = useMemo(() => ['25%', '50%', '90%'], [])
    useEffect(() => {
        bottomSheetModalRef.current?.present()
    }, [])

    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index)
        if (index === -1) {
            setOpenModal(false)
        }
    }, [])

    // renders
    const renderBackdrop = useCallback(
        (props) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={1}
                appearsOnIndex={2}
            />
        ),
        []
    )

    return (
        <BottomSheetModalProvider>
            <View style={styles.container}>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
                    backdropComponent={renderBackdrop}
                    onChange={handleSheetChanges}
                    style={styles.bottomSheet}
                >
                    <BottomSheetScrollView>{children}</BottomSheetScrollView>
                </BottomSheetModal>
            </View>
        </BottomSheetModalProvider>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    bottomSheet: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
})

export default BottomSheetTest
