import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Platform,
    Linking,
    ActivityIndicator,
    ToastAndroid,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CustomText from './CustomText';
import CustomImage from './CustomImage';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { Icon, Divider, Radio, Button } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import RatingComponent from './RatingComponent';
import { Get, Post } from '../Axios/AxiosInterceptorFunction';
import Modal from 'react-native-modal';
import CustomButton from './CustomButton';
import ModalReview from './ModalReview';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';
import navigationService from '../navigationService';
import Share from 'react-native-share';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const CountryCard = ({ uri, issettingOption = false, countryType, onPressSetting, name, onPress, citiesCount }) => {
    console.log("🚀 ~ CountryCard ~ countryType:", countryType)
    // const navigation = useNavigation()
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={[
                styles.container,
                {
                    backgroundColor: 'white',
                },
            ]}
            onPress={onPress}>
            <View style={styles.image}>
                <CustomImage
                    source={
                        { uri: uri }
                    }
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                    resizeMode={'stretch'}
                />
            </View>
            {countryType &&
                <View style={{
                    width: moderateScale(20, 0.6),
                    height: moderateScale(20, 0.6),
                    backgroundColor: Color.themeColor,
                    position: 'absolute',
                    left: 70,
                    bottom: 5,
                    borderRadius: windowWidth,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Icon name={countryType === 'private' ? 'lock' : 'public'} as={countryType === 'public' ? MaterialIcons : Entypo} style={{
                    }} size={moderateScale(12, 0.6)} color={Color.white} />
                </View>
            }
            <View style={{ width: windowWidth * 0.45 }}>
                <CustomText
                    style={{ fontSize: moderateScale(13, 0.6), color: Color.black }}
                    numberOfLines={1}
                    isBold>
                    {name}
                </CustomText>
                <CustomText
                    style={{
                        fontSize: moderateScale(10, 0.6),
                        color: Color.black,
                    }}
                    numberOfLines={1}>
                    {citiesCount}
                </CustomText>
            </View>
            {issettingOption &&
                <TouchableOpacity onPress={onPressSetting} style={{
                    flex: 1,
                    top: 10,
                    position: 'absolute',
                    right: 15,
                }}>
                    <Icon name={'dots-three-horizontal'} as={Entypo} size={moderateScale(20, 0.6)} />
                </TouchableOpacity>
            }

        </TouchableOpacity>
    )
}

export default CountryCard

const styles = ScaledSheet.create({
    image: {
        height: windowHeight * 0.09,
        width: windowWidth * 0.19,
        borderRadius: moderateScale(15, 0.6),
        backgroundColor: 'white',
        // marginLeft: moderateScale(10, 0.3),
        overflow: 'hidden',
    },
    container: {
        gap: 10,
        width: windowWidth * 0.95,
        height: windowHeight * 0.1,
        backgroundColor: 'white',
        //   justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        borderRadius: moderateScale(20, 0.6),
        marginBottom: moderateScale(10, 0.3),
        paddingHorizontal: moderateScale(5, 0.3),
    },
})