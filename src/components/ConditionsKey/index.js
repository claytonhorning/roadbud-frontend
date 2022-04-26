import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CONDITION_COLORS } from '../../utils/setPolylineColor'

export default function ConditionsKey() {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.dryCircle} />
                <Text style={{ color: CONDITION_COLORS.DRY }}>Dry</Text>
            </View>
            <View style={styles.row}>
                <View style={styles.wetCircle} />
                <Text style={{ color: CONDITION_COLORS.WET }}>Wet</Text>
            </View>
            <View style={styles.row}>
                <View style={styles.windCircle} />
                <Text style={{ color: CONDITION_COLORS.WINDY }}>Windy</Text>
            </View>
            <View style={styles.row}>
                <View style={styles.slushyCircle} />
                <Text style={{ color: CONDITION_COLORS.SLUSHY }}>Slushy</Text>
            </View>
            <View style={styles.row}>
                <View style={styles.snowyCircle} />
                <Text style={{ color: CONDITION_COLORS.SNOWY }}>Snowy</Text>
            </View>
            <View style={styles.row}>
                <View style={styles.icyCircle} />
                <Text style={{ color: CONDITION_COLORS.ICY }}>Icy</Text>
            </View>
            <View style={styles.row}>
                <View style={styles.adverseCircle} />
                <Text style={{ color: CONDITION_COLORS.ADVERSE }}>Adverse</Text>
            </View>
            <View style={styles.row}>
                <View style={styles.noDataCircle} />
                <Text style={{ color: 'black' }}>No data</Text>
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
        backgroundColor: CONDITION_COLORS.DRY,
    },
    wetCircle: {
        ...circle,
        backgroundColor: CONDITION_COLORS.WET,
    },
    windCircle: {
        ...circle,
        backgroundColor: CONDITION_COLORS.WINDY,
    },
    slushyCircle: {
        ...circle,
        backgroundColor: CONDITION_COLORS.SLUSHY,
    },
    snowyCircle: {
        ...circle,
        backgroundColor: CONDITION_COLORS.SNOWY,
    },
    icyCircle: {
        ...circle,
        backgroundColor: CONDITION_COLORS.ICY,
    },
    adverseCircle: {
        ...circle,
        backgroundColor: CONDITION_COLORS.ADVERSE,
    },
    noDataCircle: {
        ...circle,
        backgroundColor: 'black',
    },
})
