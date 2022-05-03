import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ChipsContainer() {
    const [cdotToggled, setCdotToggled] = useState(true)
    const [roadbudToggled, setRoadbudToggled] = useState(true)
    const [videoToggled, setVideoToggled] = useState(true)
    return (
        <View style={styles.chipsContainer}>
            <TouchableOpacity
                onPress={() => setCdotToggled(!cdotToggled)}
                style={cdotToggled ? styles.filledChip : styles.unfilledChip}
            >
                <Text
                    style={{
                        color: cdotToggled ? '#fff' : '#000',
                    }}
                >
                    CDOT
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setRoadbudToggled(!roadbudToggled)}
                style={roadbudToggled ? styles.filledChip : styles.unfilledChip}
            >
                <Text
                    style={{
                        color: roadbudToggled ? '#fff' : '#000',
                    }}
                >
                    Roadbud
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setVideoToggled(!videoToggled)}
                style={videoToggled ? styles.filledChip : styles.unfilledChip}
            >
                <Text
                    style={{
                        color: videoToggled ? '#fff' : '#000',
                    }}
                >
                    Video
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    chipsContainer: {
        flex: 1,
        marginTop: 10,
        alignSelf: 'flex-start',
        flexDirection: 'row',
    },
    filledChip: {
        backgroundColor: '#000',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 3,
        borderRadius: 20,
        marginRight: 10,
    },
    unfilledChip: {
        backgroundColor: '#fff',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 3,
        borderRadius: 20,
        marginRight: 10,
    },
})
