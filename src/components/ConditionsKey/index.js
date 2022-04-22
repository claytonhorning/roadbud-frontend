import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

//Need to establish colors for all conditions

const WET = 'blue'
const DRY = 'grey'
const HIGH_WIND = 'orange'
const SLUSHY = 'green'
const ADVERSE_CONDITIONS = 'yellow'

export default function ConditionsKey() {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.dryCircle} />
                <Text style={{ color: DRY }}>Dry</Text>
            </View>
            <View style={styles.row}>
                <View style={styles.wetCircle} />
                <Text style={{ color: WET }}>Wet</Text>
            </View>
            <View style={styles.row}>
                <View style={styles.windCircle} />
                <Text style={{ color: HIGH_WIND }}>High wind</Text>
            </View>
            <View style={styles.row}>
                <View style={styles.slushyCircle} />
                <Text style={{ color: SLUSHY }}>Slushy</Text>
            </View>
            <View style={styles.row}>
                <View style={styles.adverseCircle} />
                <Text style={{ color: ADVERSE_CONDITIONS }}>
                    Adverse Conditions
                </Text>
            </View>
        </View>
    )
}

const circle = {
    height: 20,
    width: 20,
    borderRadius: 10,
    marginRight: 5,
    marginVertical: 5,
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 35,
        marginLeft: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dryCircle: {
        ...circle,
        backgroundColor: DRY,
    },
    wetCircle: {
        ...circle,
        backgroundColor: WET,
    },
    windCircle: {
        ...circle,
        backgroundColor: HIGH_WIND,
    },
    slushyCircle: {
        ...circle,
        backgroundColor: SLUSHY,
    },
    adverseCircle: {
        ...circle,
        backgroundColor: ADVERSE_CONDITIONS,
    },
})
