import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { COLORS, TYPOGRAPHY } from '../../styles'
import Icon from '../Icon'
import { GOOGLE_MAPS_KEY } from '@env'

export default function GoogleMapsSearchInput({
    onPress,
    onChangeText,
    direction = 'To',
    placeholder,
    fieldRef,
}) {
    let isCurrentLocationText = false

    if (fieldRef?.current?.getAddressText() === 'Current Location') {
        isCurrentLocationText = true
    } else {
        isCurrentLocationText = false
    }

    return (
        <GooglePlacesAutocomplete
            placeholder={placeholder}
            onPress={onPress}
            query={{
                key: GOOGLE_MAPS_KEY,
                language: 'en',
            }}
            onChangeText={onChangeText}
            currentLocation={direction == 'From' ? true : false}
            ref={fieldRef}
            styles={{
                container: {
                    paddingBottom: 5,
                },
                textInput: {
                    height: 48,
                    color: isCurrentLocationText
                        ? COLORS.secondary
                        : COLORS.black,
                    fontSize: 16,
                    borderBottomLeftRadius: 0,
                    borderTopLeftRadius: 0,
                },
            }}
            renderLeftButton={() => (
                <View style={styles.leftContainer}>
                    <Icon
                        style={{
                            marginLeft: 15,
                            marginRight: 10,
                            fontSize: 16,
                            color: COLORS.mediumGray,
                        }}
                        name="search"
                    />
                    <Text style={styles.directionText}>{direction}:</Text>
                </View>
            )}
        />
    )
}

const styles = StyleSheet.create({
    leftContainer: {
        height: '100%',
        backgroundColor: '#fff',
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    directionText: {
        ...TYPOGRAPHY.detailsLight,
        fontSize: 16,
    },
})
