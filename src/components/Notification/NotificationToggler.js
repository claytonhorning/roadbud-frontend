import { StyleSheet, Text, View, Switch } from 'react-native'
import React, { useState } from 'react'
import { SHADOWS } from '../../styles'

export default function NotificationToggler({
    cdotNotifications,
    roadbudNotifications,
    routeName,
}) {
    const [isEnabled, setIsEnabled] = useState(false)
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState)
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.routeName}>{routeName}</Text>
                <View style={styles.chipsContainer}>
                    {cdotNotifications && (
                        <View style={styles.chip}>
                            <Text style={{ color: '#fff', fontWeight: '600' }}>
                                CDOT
                            </Text>
                        </View>
                    )}
                    {roadbudNotifications && (
                        <View style={styles.chip}>
                            <Text style={{ color: '#fff', fontWeight: '600' }}>
                                Roadbud
                            </Text>
                        </View>
                    )}
                </View>
            </View>
            <Switch
                trackColor={{ false: '#767577', true: '#047FE8' }}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        height: 110,
        backgroundColor: '#fff',
        borderRadius: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        ...SHADOWS.shadowProp,
    },
    routeName: {
        fontSize: 16,
        fontWeight: '500',
    },
    chipsContainer: {
        flexDirection: 'row',
    },
    chip: {
        backgroundColor: '#000',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 3,
        borderRadius: 20,
        marginRight: 10,
        marginTop: 12,
    },
})
