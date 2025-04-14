import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { windowWidth } from '../Utillity/utils'
import { moderateScale } from 'react-native-size-matters'
import Color from '../Assets/Utilities/Color'
import CustomImage from './CustomImage'
import CustomText from './CustomText'
import { Backdrop, Icon } from 'native-base'
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory'
import navigationService from '../navigationService'
import axios from 'axios'

const TripCards = ({ item, style, name, width, height, onPress, rating, image, trip_description, country, trip_name }) => {
    console.log("🚀 ~ TripCards ~ item:", item)
    const [isfav, setIsFav] = useState(false)
    const [countryCode, setCountryCode] = useState()

    useEffect(() => {
        getCountryCodeFromName()
        console.log('hereeeeeeeeeeeeeeeeeeeeeee')
    }, [])

    const getCountryCodeFromName = async () => {
        const url = `https://restcountries.com/v3.1/name/${item?.country}?fullText=true`;

        console.log("🚀 ~ getCountryCodeFromName ~ url:", url);
        try {
            let response = await axios.get(url);
            let data = response.data;

            if (data.length > 0) {
                let countryCode = data[0].cca2;
                console.log('Country Code:', countryCode);
                setCountryCode(countryCode);
                return countryCode;
            }
        } catch (error) {
            console.error('Error fetching country code:', error);
        }
    };


    return (
        <>
            <View style={[styles.card_view, style || {
                // width: width ? width : windowWidth * 0.44,
                // height: height ? height : windowWidth * 0.3,
            }]}>
                <View style={[styles.image_view, {
                    width: width ? width : windowWidth * 0.44,
                    height: height ? height : windowWidth * 0.3,
                }]}>
                    <CustomImage onPress={onPress ? onPress : () => navigationService.navigate('CitiesTrips', { data: item, countryCode: countryCode, image: item?.cities[0]?.places[0]?.image })} source={image ? { uri: image } : item?.cities[0]?.places[0]?.image ? { uri: item?.cities[0]?.places[0]?.image } : require('../Assets/Images/no_image.jpg')} style={styles.image} />
                </View>
                <Icon name={isfav === true ? 'favorite' : 'favorite-border'} onPress={() => setIsFav(true)} as={MaterialIcons} size={moderateScale(20, 0.6)} color={Color.yellow} style={{
                    position: 'absolute',
                    right: 10,
                    top: 10
                }} />
                <View style={[styles.text_view, {
                    width: windowWidth * 0.3,
                    justifyContent: 'space-between',
                    marginTop: moderateScale(6, 0.6),
                    width: '95%'
                }]}>
                    <Icon name='location-pin' as={MaterialIcons} size={moderateScale(14, 0.6)} color={Color.yellow} />
                    <CustomText isBold style={[styles.rating_text, {
                        width: '80%'
                    }]}>{name ? name : item?.country}</CustomText>
                    <View style={{
                        width: moderateScale(20, 0.6),
                        height: moderateScale(20, 0.6),
                    }}>
                        <CustomImage style={{
                            width: '100%',
                            height: '100%'
                        }} source={{ uri: `https://flagsapi.com/${countryCode || country}/flat/64.png` }} />
                    </View>
                </View>
                <View style={styles.text_view}>
                    <CustomText isBold style={styles.heading}>{trip_name ? trip_name : item?.trip_name}</CustomText>
                    <View style={styles.text_view}>
                        <Icon as={AntDesign} name={'star'} size={moderateScale(14, 0.6)} color={Color.yellow} />
                        <CustomText style={styles.rating_text}>{item?.rating ? item?.rating : 0}</CustomText>
                    </View>
                </View>
                <CustomText numberOfLines={2} style={styles.text}>{trip_description ? trip_description : item?.trip_description === null ? 'No Description' : item?.trip_description}</CustomText>
            </View>

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
        fontSize: moderateScale(14, 0.6),
        marginLeft: moderateScale(5, 0.6),
        textTransform: 'capitalize'
    },
    text_view: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
    },
    rating_text: {
        fontSize: moderateScale(12, 0.6),
        marginLeft: moderateScale(5, 0.6),
        marginRight: moderateScale(5, 0.6)
    },
    text: {
        marginLeft: moderateScale(5, 0.6),
        width: '95%',
        fontSize: moderateScale(11, 0.6),
        color: Color.darkGray
    }
})