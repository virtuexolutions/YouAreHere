import { Icon } from 'native-base';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Platform,
    ScrollView,
    StyleSheet,
    ToastAndroid,
    TouchableOpacity,
    View
} from 'react-native';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { Post } from '../Axios/AxiosInterceptorFunction';
import CustomText from '../Components/CustomText';
import PreferenceModal from '../Components/PreferenceModal';
import ScreenBoiler from '../Components/ScreenBoiler';
import { setPrefrences, setUserData } from '../Store/slices/common';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
// import {setPreferencesSet, setPreferences} from '../Store/slices/auth';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import CustomButton from './CustomButton';

const SelectFilterModal = ({ show, onPressButton, setShow }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const token = useSelector(state => state.authReducer.token);
    const userReduxPreferences = useSelector(
        state => state.commonReducer.prefrences,
    );
    const filteredUserPreference = userReduxPreferences?.map(
        item => item?.preferences,
    );
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [userPreferences, setUserPreferences] = useState(
        filteredUserPreference?.length > 0 ? filteredUserPreference : [],
    );
    const [currentItem, setCurrentItem] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [types, setTypes] = useState([
        {
            id: 'sa1',
            name: 'accounting',
            label: 'Accounting',
            icon: 'local-hotel',
            as: MaterialIcons,
        },
        {
            id: 'sa9',
            name: 'airport',
            label: 'Airport',
            icon: 'local-airport',
            as: MaterialIcons,
        },
        {
            id: 't4',
            name: 'amusement_park',
            label: 'Amusement Park',
            icon: 'attractions',
            as: MaterialIcons,
        },
        {
            id: 't3',
            name: 'art_gallery',
            label: 'Art Gallery',
            icon: 'image-frame',
            as: MaterialCommunityIcons,
        },
        {
            id: 't12',
            name: 'aquarium',
            label: 'Aquarium',
            icon: 'dolphin',
            as: MaterialCommunityIcons,
        },
        {
            id: 'sa2',
            name: 'atm',
            label: 'ATM',
            icon: 'atm',
            as: MaterialIcons,
        },
        {
            id: 'sa3',
            name: 'spa',
            label: 'Beauty Supplies',
            icon: 'spa',
            as: MaterialIcons,
        },

        {
            id: 'f5',
            name: 'bar',
            label: 'Bar',
            icon: 'local-bar',
            as: MaterialIcons,
        },
        {
            id: 't13',
            name: 'bowling_alley',
            label: 'Bowling Alley',
            icon: 'bowling',
            as: MaterialCommunityIcons,
        },
        {
            id: 's13',
            name: 'bicycle_store',
            label: 'Bicycle Store',
            icon: 'directions-bike',
            as: MaterialIcons,
        },
        {
            id: 's14',
            name: 'book_store',
            label: 'Book Store',
            icon: 'menu-book',
            as: MaterialIcons,
        },
        {
            id: 'sa46',
            name: 'bank',
            label: 'Bank',
            icon: 'bank',
            as: FontAwesome,
        },
        {
            id: 'sa47',
            name: 'beauty_salon',
            label: 'Beauty Salon',
            icon: 'spa',
            as: MaterialIcons,
        },

        {
            id: 'f2',
            name: 'cafe',
            label: 'Cafe',
            icon: 'coffee-outline',
            as: MaterialCommunityIcons,
        },
        {
            id: 't12',
            name: 'campground',
            label: 'Campground',
            icon: 'tent',
            as: Fontisto,
        },
        {
            id: 'sa4',
            name: 'car_rental',
            label: 'Car Rental',
            icon: 'car-rental',
            as: MaterialIcons,
        },
        {
            id: 'sa5',
            name: 'car_wash',
            label: 'car wash',
            icon: 'local-car-wash',
            as: MaterialIcons,
        },
        {
            id: 't15',
            name: 'casino',
            label: 'Casino',
            icon: 'dice-6',
            as: MaterialCommunityIcons,
        },
        {
            id: 's2',
            name: 'clothing_store',
            label: 'Clothing Store',
            icon: 'shirt',
            as: Ionicons,
        },
        {
            id: 's6',
            name: 'convenience_store',
            label: 'Convenience Store',
            icon: 'local-convenience-store',
            as: MaterialIcons,
        },
        {
            id: 'sa42',
            name: 'church',
            label: 'Church',
            icon: 'church',
            as: FontAwesome5,
        },
        {
            id: 'sa43',
            name: 'cemetery',
            label: 'Cemetery',
            icon: 'grave-stone',
            as: MaterialCommunityIcons,
        },
        {
            id: 'sa44',
            name: 'car_repair',
            label: 'Car Repair',
            icon: 'car-repair',
            as: MaterialIcons,
        },
        {
            id: 'sa45',
            name: 'city_hall',
            label: 'City Hall',
            icon: 'town-hall',
            as: MaterialCommunityIcons,
        },
        {
            id: 'sa48',
            name: 'local_government_office',
            label: 'Court',
            icon: 'building',
            as: FontAwesome,
        },

        {
            id: 's15',
            name: 'department_store',
            label: 'Department Store',
            icon: 'store',
            as: MaterialIcons,
        },
        {
            id: 'sa39',
            name: 'dentist',
            label: 'Dentist',
            icon: 'doctor',
            as: MaterialCommunityIcons,
        },
        {
            id: 'sa41',
            name: 'doctor',
            label: 'Doctor',
            icon: 'doctor',
            as: Fontisto,
        },
        {
            id: 's4',
            name: 'electronics',
            label: 'Electronics',
            icon: 'devices',
            as: MaterialIcons,
        },
        {
            id: 'sa38',
            name: 'electrician',
            label: 'Electrician',
            icon: 'power-plug',
            as: MaterialCommunityIcons,
        },
        {
            id: 'sa37',
            name: 'embassy',
            label: 'Embassy',
            icon: 'account-balance',
            as: MaterialIcons,
        },
        {
            id: 's11',
            name: 'furniture_store',
            label: 'Furniture Store',
            icon: 'weekend',
            as: MaterialIcons,
        },
        {
            id: 'sa35',
            name: 'florist',
            label: 'Florist',
            icon: 'local-florist',
            as: MaterialIcons,
        },
        {
            id: 'sa36',
            name: 'fire_station',
            label: 'Fire Station',
            icon: 'local-fire-department',
            as: MaterialIcons,
        },
        {
            id: 't2',
            name: 'gym',
            label: 'Gyms',
            icon: 'fitness-center',
            as: MaterialIcons,
        },
        {
            id: 'sa6',
            name: 'gas_station',
            label: 'Gas Station',
            icon: 'local-gas-station',
            as: MaterialIcons,
        },
        {
            id: 's1',
            name: 'home_goods_store',
            label: 'Home Goods Store',
            icon: 'home',
            as: MaterialIcons,
        },
        {
            id: 'sa34',
            name: 'hindu_temple',
            label: 'Hindu Temple',
            icon: 'place-of-worship',
            as: FontAwesome5,
        },
        {
            id: 'sa43',
            name: 'hair_care',
            label: 'Hair Care',
            icon: 'spa',
            as: MaterialIcons,
        },
        {
            id: 'sa7',
            name: 'hospital',
            label: 'Hospital',
            icon: 'local-hospital',
            as: MaterialIcons,
        },
        {
            id: 's12',
            name: 'hardware_store',
            label: 'Hardware Store',
            icon: 'hardware-chip',
            as: Ionicons,
        },
        {
            id: 'sa33',
            name: 'insurance_agency',
            label: 'Insurance Agency',
            icon: 'account-balance',
            as: MaterialIcons,
        },

        {
            id: 's9',
            name: 'jewelry_store',
            label: 'Jewelry Store',
            icon: 'necklace',
            as: MaterialCommunityIcons,
        },
        {
            id: 't9',
            name: 'library',
            label: 'Library',
            icon: 'local-library',
            as: MaterialIcons,
        },
        {
            id: 's7',
            name: 'liquor_store',
            label: 'Liquor Store',
            icon: 'local-bar',
            as: MaterialIcons,
        },
        {
            id: 'sa8',
            label: 'Libraries',
            name: 'library',
            icon: 'local-library',
            as: MaterialIcons,
        },
        {
            id: 'sa27',
            name: 'locksmith',
            label: 'Locksmith',
            icon: 'lock',
            as: MaterialIcons,
        },
        {
            id: 'sa30',
            name: 'lodging',
            label: 'Lodging',
            icon: 'hotel',
            as: FontAwesome5,
        },
        {
            id: 'sa31',
            name: 'laundry',
            label: 'Laundry',
            icon: 'local-laundry-service',
            as: MaterialIcons,
        },
        {
            id: 'sa32',
            name: 'lawyer',
            label: 'Lawyer',
            icon: 'gavel',
            as: MaterialCommunityIcons,
        },
        {
            id: 't8',
            name: 'museum',
            label: 'Museum',
            icon: 'museum',
            as: MaterialIcons,
        },
        {
            id: 't18',
            name: 'movie_rental',
            label: 'Movie Rental',
            icon: 'local-movies',
            as: MaterialIcons,
        },
        {
            id: 't19',
            name: 'movie_theater',
            label: 'Movie Theater',
            icon: 'theaters',
            as: MaterialIcons,
        },
        {
            id: 'sa28',
            name: 'moving_company',
            label: 'Moving Company',
            icon: 'local-shipping',
            as: MaterialIcons,
        },
        {
            id: 'sa29',
            name: 'mosque',
            label: 'Mosque',
            icon: 'mosque',
            as: FontAwesome5,
        },
        {
            id: 't5',
            name: 'night_club',
            label: 'Night Club',
            icon: 'musical-note',
            as: Ionicons,
        },
        {
            id: 't14',
            name: 'night_club',
            label: 'Night_Club',
            icon: 'musical-note',
            as: Ionicons,
        },
        {
            id: 'sa10',
            name: 'parking',
            label: 'Parking',
            icon: 'local-parking',
            as: MaterialIcons,
        },
        {
            id: 'sa11',
            name: 'pharmacy',
            label: 'Pharmacy',
            icon: 'local-pharmacy',
            as: MaterialIcons,
        },
        {
            id: 'sa23',
            name: 'post_office',
            label: 'Post Office',
            icon: 'local-post-office',
            as: MaterialIcons,
        },
        {
            id: 'sa24',
            name: 'police',
            label: 'Police',
            icon: 'local-police',
            as: MaterialIcons,
        },
        {
            id: 'sa25',
            name: 'plumber',
            label: 'Plumber',
            icon: 'pipe',
            as: MaterialCommunityIcons,
        },
        {
            id: 'sa26',
            name: 'physiotherapist',
            label: 'Physiotherapist',
            icon: 'accessible',
            as: MaterialIcons,
        },
        {
            id: 'sa20',
            name: 'roofing_contractor',
            label: 'Roofing Contractor',
            icon: 'construction',
            as: MaterialIcons,
        },
        {
            id: 'sa21',
            name: 'real_estate_agency',
            label: 'Real Estate Agency',
            icon: 'home',
            as: MaterialIcons,
        },
        {
            id: 'f1',
            name: 'restaurant',
            label: 'Restaurant',
            icon: 'coffee-outline',
            as: MaterialCommunityIcons,
        },
        {
            id: 'r14',
            name: 'radio_broadcaster',
            label: 'Radio',
            icon: 'radio',
            as: MaterialIcons,
        },
        {
            id: 'sa22',
            name: 'rv_park',
            label: 'RV Park',
            icon: 'directions-car',
            as: MaterialIcons,
        },
        {
            id: 't16',
            name: 'stadium',
            label: 'Stadium',
            icon: 'stadium',
            as: MaterialCommunityIcons,
        },
        {
            id: 't16',
            name: 'stadium',
            label: 'Stadium',
            icon: 'stadium',
            as: MaterialCommunityIcons,
        },
        {
            id: 'sa16',
            name: 'synagogue',
            label: 'Synagogue',
            icon: 'star-of-david',
            as: FontAwesome5,
        },
        {
            id: 'sa17',
            name: 'store',
            label: 'Store',
            icon: 'store',
            as: FontAwesome5,
        },
        {
            id: 'sa18',
            name: 'storage',
            label: 'Storage',
            icon: 'storage',
            as: MaterialIcons,
        },
        {
            id: 'sa19',
            name: 'school',
            label: 'School',
            icon: 'school',
            as: FontAwesome5,
        },
        {
            id: 'f3',
            label: 'Takeout',
            name: 'meal_takeaway',
            icon: 'food-takeout-box-outline',
            as: MaterialCommunityIcons,
        },
        {
            id: 'sa13',
            name: 'transit_station',
            label: 'Transit Station',
            icon: 'train',
            as: FontAwesome,
        },
        {
            id: 'sa15',
            name: 'taxi_stand',
            label: 'Taxi Stand',
            icon: 'local-taxi',
            as: MaterialIcons,
        },
        {
            id: 'sa14',
            name: 'university',
            label: 'University',
            icon: 'school',
            as: Ionicons,
        },
        {
            id: 'sa12',
            label: 'Veterinary Care',
            name: 'veterinary_care',
            icon: 'clinic-medical',
            as: FontAwesome5,
        },

        {
            id: 't17',
            name: 'zoo',
            label: 'Zoo',
            icon: 'pets',
            as: MaterialIcons,
        },
    ]);

    const sendPrefrences = async () => {
        const url = 'auth/preferences';
        const body = {
            preferences: userPreferences,
        };

        if (userPreferences.length < 1) {
            ToastAndroid.show('Please choose Preferences....', ToastAndroid.SHORT);
            return;
        }

        console.log('🚀 ~ sendPrefrences ~ body:', JSON.stringify(body, null, 2));
        setIsLoading(true);
        const response = await Post(url, body, apiHeader(token));
        setIsLoading(false);
        if (response != undefined) {
            console.log(
                '🚀 ~ sendPrefrences ~ response:',
                JSON.stringify(response?.data?.user, null, 2),
            );

            dispatch(setUserData(response?.data?.user));
            dispatch(setPrefrences([]));
            dispatch(setPrefrences(response?.data?.user?.preferences));
            Platform.OS == 'android'
                ? ToastAndroid.show('Preference updated', ToastAndroid.SHORT)
                : alert('Preference updated');
        }
    };
    return (
        <Modal isVisible={show}
            swipeDirection="up"
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: Color.white,
            }}
            onBackdropPress={() => {
                setShow(false);
            }}>
            <View style={{
                width: windowWidth,
                height: windowHeight,
                backgroundColor: Color.orange
            }}>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.contentStyle}>
                    <CustomText isBold style={{
                        fontSize: moderateScale(20, 0.6),
                        textAlign: 'center',
                        color: Color.white
                    }}>Select Preference</CustomText>
                    <View style={styles.sectionItems}>
                        {types?.map((item, index) => {
                            return (
                                <>
                                    <TouchableOpacity
                                        key={index}
                                        // style={[
                                        //     styles.sectionInnerItem,
                                        // ]}
                                        onPress={() => {
                                            setCurrentItem(item)
                                            onPressButton(item)
                                        }}>
                                        <View
                                            style={{
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: windowWidth * 0.45,
                                                height: windowWidth * 0.09,
                                                // position: 'absolute',
                                                right: 0,
                                                backgroundColor: currentItem?.id === item?.id ? Color.orange : Color.white,
                                                padding: moderateScale(2, 0.7),
                                                borderRadius: moderateScale(15, 0.9),
                                                flexDirection: "row",
                                                justifyContent: "center",
                                                paddingHorizontal: moderateScale(20, 0.6),
                                                borderWidth: 1,
                                                borderColor: currentItem?.id === item?.id ? Color.white : Color.orange
                                            }}>
                                            <Icon
                                                as={item.as}
                                                name={item.icon}
                                                size={moderateScale(14, 0.1)}
                                                color={
                                                    currentItem?.id === item?.id ? Color.white : Color.orange
                                                }
                                            />

                                            <CustomText
                                                style={{
                                                    color: currentItem?.id === item?.id ? Color.white : Color.orange,
                                                    fontSize: moderateScale(12, 0.1),
                                                    marginLeft: moderateScale(10, 0.6)
                                                }}>
                                                {item.label}
                                            </CustomText>
                                        </View>
                                        {/* <Icon
                                            as={item.as}
                                            name={item.icon}
                                            size={moderateScale(14, 0.1)}
                                            color={
                                                userPreferences?.some(data => data?.id == item?.id)
                                                    ? Color.white
                                                    : Color.themeColor
                                            }
                                        />

                                        <CustomText
                                            style={{
                                                color: userPreferences?.some(
                                                    data => data?.id == item?.id,
                                                )
                                                    ? Color.white
                                                    : Color.themeColor,
                                                fontSize: moderateScale(12, 0.1),
                                            }}>
                                            {item.label}
                                        </CustomText> */}
                                    </TouchableOpacity>
                                    {/* <TouchableOpacity
                                        onPress={() => {
                                            setUserPreferences(prev => [...prev, item]);
                                            setCurrentItem(item);
                                            setModalIsVisible(true);
                                        }}
                                        key={index}
                                        style={[
                                            styles.sectionInnerItem,
                                            userPreferences?.some(data => data?.id == item?.id) && {
                                                backgroundColor: Color.themeColor,
                                                borderColor: Color.white,
                                            },
                                        ]}>
                                        {userPreferences[
                                            userPreferences?.findIndex(item3 => item3?.id == item?.id)
                                        ]?.preferences?.length > 0 && (
                                                <View
                                                    style={{
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        width: windowWidth * 0.04,
                                                        height: windowWidth * 0.04,
                                                        position: 'absolute',
                                                        right: 0,
                                                        backgroundColor: 'red',
                                                        top: -5,
                                                        padding: moderateScale(2, 0.7),
                                                        borderRadius: moderateScale(8, 0.9),
                                                    }}>
                                                    <CustomText
                                                        isBold
                                                        style={{
                                                            color: 'white',
                                                            fontSize: moderateScale(8, 0.9),
                                                            textAlign: 'center',
                                                        }}>
                                                        {
                                                            userPreferences[
                                                                userPreferences?.findIndex(
                                                                    item3 => item3?.id == item?.id,
                                                                )
                                                            ]?.preferences?.length
                                                        }
                                                    </CustomText>
                                                </View>
                                            )}

                                        <Icon
                                            as={item.as}
                                            name={item.icon}
                                            size={moderateScale(14, 0.1)}
                                            color={
                                                userPreferences?.some(data => data?.id == item?.id)
                                                    ? Color.white
                                                    : Color.themeColor
                                            }
                                        />

                                        <CustomText
                                            style={{
                                                color: userPreferences?.some(
                                                    data => data?.id == item?.id,
                                                )
                                                    ? Color.white
                                                    : Color.themeColor,
                                                fontSize: moderateScale(12, 0.1),
                                            }}>
                                            {item.label}
                                        </CustomText>
                                    </TouchableOpacity> */}
                                </>
                            );
                        })}
                    </View>
                    {/* <CustomButton
                        text={'Add Trip'}
                        isBold
                        textColor={Color.themeColor}
                        height={windowHeight * 0.06}
                        width={windowWidth * 0.9}
                        bgColor={Color.white}
                        fontSize={moderateScale(11, 0.6)}
                        borderRadius={moderateScale(5, 0.3)}
                        alignSelf={'center'}
                        marginTop={moderateScale(20, 0.3)}
                        style={{
                            marginRight: moderateScale(10, 0.3),
                        }}
                    // onPress={() => {
                    //     setType('trip');
                    //     setTripModalVisibe(true);
                    // }}
                    /> */}
                </ScrollView>
            </View>
        </Modal>
        // <ScreenBoiler
        //     // statusBarBackgroundColor={ Color.orange}
        //     statusBarContentStyle={'dark-content'}>
        //     <LinearGradient
        //         colors={['#f5f1ed', '#ffffff', '#f5f1ed']}
        //         start={{ x: 1, y: 0 }}
        //         end={{ x: 0, y: 1 }}
        //         style={{ height: windowHeight * 0.9 }}>
        //         {/* <Button title="Send Preferences" onPress={sendPrefrences} /> */}
        //         <TouchableOpacity onPress={sendPrefrences} style={styles.save}>
        //             <Icon
        //                 onPress={sendPrefrences}
        //                 name="save"
        //                 as={Ionicons}
        //                 size={moderateScale(25)}
        //                 color={Color.themeBgColor}
        //             />

        //             {isLoading ? (
        //                 <ActivityIndicator size={'small'} color={Color.themeColor} />
        //             ) : (
        //                 <CustomText isBold>Save</CustomText>
        //             )}
        //         </TouchableOpacity>
        //         {!fromDrawer && (
        //             <TouchableOpacity
        //                 onPress={() => {
        //                     // navigation.pop()
        //                 }}
        //                 style={styles.skip}>
        //                 <Icon
        //                     onPress={sendPrefrences}
        //                     name="skip"
        //                     as={Octicons}
        //                     size={moderateScale(25)}
        //                     color={Color.themeBgColor}
        //                 />
        //                 <CustomText>Skip</CustomText>
        //             </TouchableOpacity>
        //         )}
        //         <ScrollView
        //             style={styles.scrollView}
        //             contentContainerStyle={styles.contentStyle}>
        //             <View style={styles.sectionItems}>
        //                 {types?.map((item, index) => {
        //                     return (
        //                         <>
        //                             <TouchableOpacity
        //                                 onPress={() => {
        //                                     if (
        //                                         // userPreferences?.length == 0 ||
        //                                         userPreferences?.some(item1 => item1?.id == item?.id)
        //                                     ) {
        //                                         Alert.alert('Alert!!', 'Action Required.', [
        //                                             {
        //                                                 text: 'Delete Preference',
        //                                                 onPress: () =>
        //                                                     setUserPreferences(
        //                                                         userPreferences?.filter(
        //                                                             item2 => item2?.id != item?.id,
        //                                                         ),
        //                                                     ),
        //                                             },
        //                                             {
        //                                                 text: 'Add more preferences',
        //                                                 onPress: () => {
        //                                                     setCurrentItem(item);
        //                                                     setModalIsVisible(true);
        //                                                 },
        //                                             },
        //                                         ]);
        //                                     } else {
        //                                         setUserPreferences(prev => [...prev, item]);
        //                                         setCurrentItem(item);
        //                                         setModalIsVisible(true);
        //                                     }
        //                                 }}
        //                                 key={index}
        //                                 style={[
        //                                     styles.sectionInnerItem,
        //                                     userPreferences?.some(data => data?.id == item?.id) && {
        //                                         backgroundColor: Color.themeColor,
        //                                         borderColor: Color.white,
        //                                     },
        //                                 ]}>
        //                                 {userPreferences[
        //                                     userPreferences?.findIndex(item3 => item3?.id == item?.id)
        //                                 ]?.preferences?.length > 0 && (
        //                                         <View
        //                                             style={{
        //                                                 alignItems: 'center',
        //                                                 justifyContent: 'center',
        //                                                 width: windowWidth * 0.04,
        //                                                 height: windowWidth * 0.04,
        //                                                 position: 'absolute',
        //                                                 right: 0,
        //                                                 backgroundColor: 'red',
        //                                                 top: -5,
        //                                                 padding: moderateScale(2, 0.7),
        //                                                 borderRadius: moderateScale(8, 0.9),
        //                                             }}>
        //                                             <CustomText
        //                                                 isBold
        //                                                 style={{
        //                                                     color: 'white',
        //                                                     fontSize: moderateScale(8, 0.9),
        //                                                     textAlign: 'center',
        //                                                 }}>
        //                                                 {
        //                                                     userPreferences[
        //                                                         userPreferences?.findIndex(
        //                                                             item3 => item3?.id == item?.id,
        //                                                         )
        //                                                     ]?.preferences?.length
        //                                                 }
        //                                             </CustomText>
        //                                         </View>
        //                                     )}

        //                                 <Icon
        //                                     as={item.as}
        //                                     name={item.icon}
        //                                     size={moderateScale(14, 0.1)}
        //                                     color={
        //                                         userPreferences?.some(data => data?.id == item?.id)
        //                                             ? Color.white
        //                                             : Color.themeColor
        //                                     }
        //                                 />

        //                                 <CustomText
        //                                     style={{
        //                                         color: userPreferences?.some(
        //                                             data => data?.id == item?.id,
        //                                         )
        //                                             ? Color.white
        //                                             : Color.themeColor,
        //                                         fontSize: moderateScale(12, 0.1),
        //                                     }}>
        //                                     {item.label}
        //                                 </CustomText>
        //                             </TouchableOpacity>
        //                         </>
        //                     );
        //                 })}
        //             </View>
        //         </ScrollView>
        //         {modalIsVisible && (
        //             <PreferenceModal
        //                 modalIsVisible={modalIsVisible}
        //                 search={search}
        //                 setSearch={setSearch}
        //                 setModalIsVisible={setModalIsVisible}
        //                 selectedType={currentItem}
        //                 setUserPreferences={setUserPreferences}
        //                 userPreferences={userPreferences}
        //             />
        //         )}
        //     </LinearGradient>
        // </ScreenBoiler>
    );
};

export default SelectFilterModal;

const styles = StyleSheet.create({
    categories: {
        justifyContent: 'space-between',
        height: windowHeight * 0.05,
        paddingTop: moderateScale(7, 0.5),
    },
    contentStyle: {
        paddingBottom: moderateScale(40, 0.6),
        paddingTop: moderateScale(20, 0.6)
    },
    save: {
        width: windowWidth * 0.22,
        height: windowHeight * 0.05,
        gap: 6,
        borderRadius: moderateScale(30, 0.3),
        backgroundColor: Color.white,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        elevation: 5,
        position: 'absolute',
        bottom: 70,
        right: 30,

        // right: 10,
        zIndex: 1,
    },
    actions: {},
    skip: {
        width: windowWidth * 0.22,
        height: windowHeight * 0.05,
        gap: 6,
        borderRadius: moderateScale(30, 0.3),
        backgroundColor: Color.white,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        elevation: 5,
        position: 'absolute',
        bottom: 20,
        right: 30,

        // right: 10,
        zIndex: 1,
    },
    Rounded: {
        width: windowWidth * 0.1,
        height: windowHeight * 0.05,
        borderRadius: moderateScale(30, 0.3),
        backgroundColor: Color.white,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        // position: 'absolute',
        // top: 60,

        // right: 10,
        zIndex: 1,
    },

    sectionItems: {
        // justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: moderateScale(10, 0.6),
        gap: moderateScale(10, 0.6),
        marginTop: moderateScale(15, 0.6)
    },
    sectionInnerItem: {
        width: '45%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 7,
        margin: moderateScale(4, 0.2),
        padding: moderateScale(6, 0.5),
        borderWidth: 0.5,
        borderColor: Color.black,
        borderRadius: moderateScale(25, 0.2),

        paddingHorizontal: 12,
    },
});
