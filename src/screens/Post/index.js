import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TYPOGRAPHY, SHADOWS } from '../../styles'
const PostScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ReportEventScreen')}
                    style={styles.reportEventButton}
                >
                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 16,
                            fontWeight: '600',
                            fontFamily: 'Montserrat-Regular',
                        }}
                    >
                        Report new event
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('PostToEventScreen')}
                    style={styles.postToEventButton}
                >
                    <Text
                        style={{
                            color: '#FF7A01',
                            fontSize: 16,
                            fontWeight: '600',
                            fontFamily: 'Montserrat-Regular',
                        }}
                    >
                        Add to existing event
                    </Text>
                </TouchableOpacity>
                <View style={styles.eventNearContainer}>
                    <View style={styles.postToHeader}>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: '600',
                                marginLeft: 20,
                                fontFamily: 'Montserrat-Regular',
                            }}
                        >
                            Post to an event near you
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.specificEventContainer}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Icon
                                style={{ fontSize: 18, marginRight: 3 }}
                                name="location-pin"
                            />
                            <Text style={TYPOGRAPHY.paragraph}>3.1 mi.</Text>
                        </View>
                        <Text
                            style={{
                                color: '#047FE8',
                                fontWeight: '600',
                                marginLeft: 10,
                            }}
                        >
                            Landslide in Glenwood Canyon
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.specificEventContainer}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Icon
                                style={{ fontSize: 18, marginRight: 3 }}
                                name="location-pin"
                            />
                            <Text>3.1 mi.</Text>
                        </View>
                        <Text
                            style={{
                                color: '#047FE8',
                                fontWeight: '600',
                                marginLeft: 10,
                            }}
                        >
                            Accident on HW 82
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.specificEventContainer}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Icon
                                style={{ fontSize: 18, marginRight: 3 }}
                                name="location-pin"
                            />
                            <Text>3.1 mi.</Text>
                        </View>
                        <Text
                            style={{
                                color: '#047FE8',
                                fontWeight: '600',
                                marginLeft: 10,
                            }}
                        >
                            Snowy Conditions on HW 6
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.specificEventContainer}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Icon
                                style={{ fontSize: 18, marginRight: 3 }}
                                name="location-pin"
                            />
                            <Text>3.1 mi.</Text>
                        </View>
                        <Text
                            style={{
                                color: '#047FE8',
                                fontWeight: '600',
                                marginLeft: 10,
                            }}
                        >
                            Landslide in Glenwood Canyon
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    reportEventButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF7A01',
        height: 60,
        borderRadius: 5,
        width: '70%',
        ...SHADOWS.shadowProp,
    },
    postToEventButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#FF7A01',
        height: 60,
        borderRadius: 5,
        width: '70%',
        marginVertical: 40,
        ...SHADOWS.shadowProp,
    },
    eventNearContainer: {
        width: '95%',
        backgroundColor: '#fff',
        borderRadius: 5,
        ...SHADOWS.shadowProp,
    },
    postToHeader: {
        backgroundColor: '#F0F0F0',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        paddingVertical: 20,
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    specificEventContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#EAEAEA',
    },
})

export default PostScreen
