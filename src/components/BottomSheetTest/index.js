import React, { useCallback, useRef, useMemo, useEffect } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
    BottomSheet,
    BottomSheetScrollView,
} from '@gorhom/bottom-sheet'
import { SHADOWS } from '../../styles'

const BottomSheetTest = ({ children, onDismiss, isBottomSheetOpen }) => {
    // ref
    const bottomSheetModalRef = useRef(null)

    // variables
    const snapPoints = useMemo(() => ['25%', '50%', '90%'], [])

    // callbacks
    useEffect(() => {
        if (isBottomSheetOpen) {
            bottomSheetModalRef.current?.present()
        } else {
            bottomSheetModalRef.current?.dismiss()
        }
    }, [isBottomSheetOpen])

    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index)
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
