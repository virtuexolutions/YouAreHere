import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { windowWidth } from '../Utillity/utils'
import { moderateScale } from 'react-native-size-matters'
import Color from '../Assets/Utilities/Color'
import CustomImage from './CustomImage'
import CustomText from './CustomText'
import { Icon } from 'native-base'
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory'
import navigationService from '../navigationService'

const TripCards = ({ item, style }) => {
    console.log("🚀 ~ TripCards ~ item:", item)
    const [isfav, setIsFav] = useState(false)
    return (
        <>
            {item?.trips?.map((data) => {
                console.log("🚀 ~ {item?.trips?.map ~ data:", data?.places[0]?.image)
                return (
                    <View style={[styles.card_view, style]}>
                        <View style={styles.image_view}>
                            <CustomImage onPress={() => navigationService.navigate('ExploreDetails', { data: item })} source={data?.places[0]?.image ? { uri: data?.places[0]?.image } : require('../Assets/Images/no_image.jpg')} style={styles.image} />
                        </View>
                        <Icon name={isfav === true ? 'favorite' : 'favorite-border'} onPress={() => setIsFav(true)} as={MaterialIcons} size={moderateScale(20, 0.6)} color={Color.yellow} style={{
                            position: 'absolute',
                            right: 10,
                            top: 10
                        }} />
                        <View style={[styles.text_view, {
                            marginTop: moderateScale(8, 0.6)
                        }]}>
                            <CustomText isBold style={styles.heading}>{data?.name}</CustomText>
                            <View style={styles.text_view}>
                                <Icon name='star' as={AntDesign} size={moderateScale(14, 0.6)} color={Color.yellow} />
                                <CustomText style={styles.rating_text}>{data?.places[0]?.rating === null ? 0 : data?.places[0]?.rating}</CustomText>
                            </View>
                        </View>
                        <View style={[styles.text_view, {
                            width: windowWidth * 0.3,
                            justifyContent: 'flex-start',
                            marginTop: moderateScale(6, 0.6)
                        }]}>
                            <Icon name='location-pin' as={MaterialIcons} size={moderateScale(14, 0.6)} color={Color.yellow} />
                            <CustomText isBold style={styles.heading}>{item?.name}</CustomText>
                        </View>
                    </View>
                )
            })
            }
        </>
    )
}

export default TripCards

const styles = StyleSheet.create({
    card_view: {
        width: windowWidth * 0.44,
        height: windowWidth * 0.43,
        backgroundColor: Color.white,
        borderRadius: moderateScale(10, 0.6),
        marginTop: moderateScale(10, 0.6)
    },
    image_view: {
        width: windowWidth * 0.44,
        height: windowWidth * 0.3,
        backgroundColor: 'red',
        borderTopEndRadius: moderateScale(10, 0.6),
        borderTopLeftRadius: moderateScale(10, 0.6)
    },
    image: {
        width: '100%',
        height: '100%',
        borderTopRightRadius: moderateScale(10, 0.6),
        borderTopLeftRadius: moderateScale(10, 0.6)
    },
    heading: {
        fontSize: moderateScale(11, 0.6),
        marginLeft: moderateScale(5, 0.6)
    },
    text_view: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
    },
    rating_text: {
        fontSize: moderateScale(11, 0.6),
        marginLeft: moderateScale(5, 0.6),
        marginRight: moderateScale(5, 0.6)
    }
})