import { ActivityIndicator, FlatList, Platform, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import ScreenBoiler from '../Components/ScreenBoiler'
import LinearGradient from 'react-native-linear-gradient'
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils'
import Color from '../Assets/Utilities/Color'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { moderateScale } from 'react-native-size-matters'
import { Icon } from 'native-base'
import CustomButton from '../Components/CustomButton'
import Modal from 'react-native-modal';
import CustomImage from '../Components/CustomImage'
import CountryPicker from "react-native-country-picker-modal";
import CustomText from '../Components/CustomText'
import CountryCard from '../Components/CountryCard'
import navigationService from '../navigationService'
import { useNavigation } from '@react-navigation/native'
import { Post } from '../Axios/AxiosInterceptorFunction'
import { useSelector } from 'react-redux'
import Entypo from 'react-native-vector-icons/Entypo'
import TextInputWithTitle from '../Components/TextInputWithTitle'
import SearchContainer from '../Components/SearchContainer'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

const CitiesNoteScreen = props => {
    const { data } = props?.route?.params
    console.log("🚀 ~ data:", data)
    const token = useSelector(state => state.authReducer.token);
    const [modalVisible, setModalVisible] = useState(false)
    const customLocation = useSelector(
        state => state.commonReducer.customLocation,
    );
    const [searchData, setSearchData] = useState('');
    const [currentLocation, setCurrentLocation] = useState({})
    const [countryCode, setcountryCode] = useState({})
    console.log("🚀 ~ CitiesNoteScreen ~ countryCode:", countryCode)

    useEffect(() => {
        getLatLngFromCity('USA')
    }, [])


    const getLatLngFromCity = async (city) => {
        const apiKey = 'AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc';
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(city)}&key=${apiKey}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log("🚀 ~ getLatLngFromCity ~ data:", data)

            if (data.status === "OK") {
                const result = data.results[0];
                const location = result.geometry.location;
                const countryComponent = result.address_components.find(component =>
                    component.types.includes("country")
                );

                const countryCode = countryComponent ? countryComponent.short_name : "Unknown";

                console.log(`Latitude: ${location.lat}, Longitude: ${location.lng}, Country Code: ${countryCode}`);
                setCurrentLocation({
                    latitude: location.lat,
                    longitude: location?.lng,
                })
                setcountryCode(countryCode)
                return { lat: location.lat, lng: location.lng, countryCode };
            }
        } catch (error) {
            console.error("Error fetching location:", error);
            return null;
        }
    };


    return (
        <ScreenBoiler
            statusBarBackgroundColor={'white'}
            statusBarContentStyle={'dark-content'}
        >
            <LinearGradient
                style={{
                    width: windowWidth,
                    height: windowHeight,
                }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={Color.themeBgColor}>
                <View style={styles.row}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.Rounded}
                        onPress={() => {
                            console.log('Toggle drawer');
                        }}>
                        <Icon
                            onPress={() => {
                            }}
                            name="menu"
                            as={Ionicons}
                            size={moderateScale(25, 0.6)}
                            color={Color.black}
                        />
                    </TouchableOpacity>
                    <CustomButton
                        text={'Add Places'}
                        isBold
                        textColor={Color.themeColor}
                        height={windowHeight * 0.03}
                        bgColor={Color.white}
                        fontSize={moderateScale(11, 0.6)}
                        borderRadius={moderateScale(5, 0.3)}
                        marginTop={moderateScale(20, 0.3)}
                        style={{
                            marginRight: moderateScale(10, 0.3),
                        }}
                        onPress={() => {
                            setModalVisible(true)
                        }}
                    />
                </View>
            </LinearGradient>
            <Modal isVisible={modalVisible} onBackButtonPress={() => {
                setModalVisible(false)
            }}>
                <View style={styles.cities_card}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: windowWidth * 0.85 }}>
                        <CustomText isBold style={styles.heading}>Select Places</CustomText>
                        <Icon name='cross' as={Entypo} size={moderateScale(25, 0.6)}
                            color={Color.black} onPress={() => setModalVisible(false)} />
                    </View>
                    <GooglePlacesAutocomplete
                        placeholder="Search"
                        textInputProps={{
                            placeholderTextColor: '#5d5d5d',
                            // returnKeyType: "search"
                        }}
                        onPress={(data, details = null) => {
                            console.log('hello hereeeee ========  >>>>>>>>>', { name: data?.description, location: details?.geometry?.location });
                            setSearchData({ name: data?.description, location: details?.geometry?.location })
                        }}
                        query={{
                            key: 'AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc',
                            components: `country:${countryCode}`,
                            location: `${currentLocation?.latitude},${currentLocation?.longitude}`,
                            radius: 50000,
                            language: 'en',

                        }}
                        isRowScrollable={true}
                        fetchDetails={true}
                        styles={{

                            textInputContainer: {
                                width: windowWidth * 0.8,
                                marginLeft: moderateScale(5, 0.6)
                            },
                            textInput: {
                                height: windowHeight * 0.06,
                                color: '#5d5d5d',
                                fontSize: 16,
                                borderWidth: 2,
                                borderColor: Color.lightGrey,
                                borderRadius: moderateScale(20, 0.6),

                            },
                            listView: {
                                width: windowWidth * 0.8,
                                marginLeft: moderateScale(5, 0.6),
                                borderColor: Color.veryLightGray,
                                // color : 'red',
                                // backgroundColor : 'red'

                            },

                            description: {
                                color: '#5d5d5d',
                            }

                        }}
                    // predefinedPlaces={[homePlace, workPlace]}
                    />
                    <CustomButton
                        text={'Add Place'}
                        isBold
                        textColor={Color.white}
                        width={windowWidth * 0.7}
                        height={windowHeight * 0.05}
                        bgColor={Color.themeColor}
                        fontSize={moderateScale(11, 0.6)}
                        borderRadius={moderateScale(5, 0.3)}
                        //   alignSelf={'flex-end'}
                        marginTop={moderateScale(20, 0.3)}
                        style={{
                            marginRight: moderateScale(10, 0.3),
                        }}
                    // onPress={() => {
                    //     setCountryModalVisible(true)
                    // }}
                    />
                </View>
            </Modal>

        </ScreenBoiler>
    )
}

export default CitiesNoteScreen

const styles = ScaledSheet.create({
    Rounded: {
        width: windowWidth * 0.1,
        height: windowHeight * 0.05,
        borderRadius: moderateScale(30, 0.3),
        backgroundColor: Color.white,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        elevation: 5,
        //    position: 'absolute',
        //    top: 10,
        //    right: 10,
    },
    row: {
        flexDirection: 'row',
        marginTop: 10,
        paddingHorizontal: 10,
        width: windowWidth,
        justifyContent: 'space-between'
    },
    Profile1: {
        width: windowWidth * 0.3,
        height: windowWidth * 0.3,
        borderRadius: (windowWidth * 0.3) / 2,
        borderWidth: 1,
        borderColor: Color.white,
        overflow: 'hidden',
        alignSelf: 'center',
        backgroundColor: '#EEEEEE',
        marginTop: moderateScale(20, 0.3),
        // alignItems: 'center',
        // justifyContent: 'center',
        // borderColor : 'black'
    },
    cities_card: {
        width: windowWidth * 0.9,
        height: windowHeight * 0.45,
        backgroundColor: Color.white,
        borderRadius: moderateScale(20, 0.6),
        justifyContent: 'flex-start',
        alignItems: "flex-start",
        paddingHorizontal: moderateScale(10, 0.6),
        paddingVertical: moderateScale(20, 0.6)
    },
    cites_btn: {
        backgroundColor: 'white',
        width: windowWidth * 0.83,
        paddingVertical: moderateScale(10, 0.6),
        borderRadius: moderateScale(10, 0.6),
        paddingHorizontal: moderateScale(10, 0.6),
        marginBottom: moderateScale(10, 0.6),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        borderColor: Color.themeColor,
        borderBottomWidth: 1,
    },
})