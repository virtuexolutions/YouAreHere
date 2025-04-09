import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenBoiler from '../Components/ScreenBoiler'
import LinearGradient from 'react-native-linear-gradient'
import { windowHeight, windowWidth } from '../Utillity/utils'
import Color from '../Assets/Utilities/Color'
import { Icon } from 'native-base'
import CustomText from '../Components/CustomText'
import { moderateScale } from 'react-native-size-matters'
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Get } from '../Axios/AxiosInterceptorFunction'
import { useSelector } from 'react-redux'
import TripCard from '../Components/TripCard'
import TripCards from '../Components/TripCards'
import CustomImage from '../Components/CustomImage'
import CountryPicker from "react-native-country-picker-modal";
import CustomButton from '../Components/CustomButton'
import Modal from 'react-native-modal';

const Explore = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused()
    const token = useSelector(state => state.authReducer.token);
    const [trips, setTrip] = useState([])
    console.log("🚀 ~ Expsslore ~ trips:", trips)
    const tripList = [
        {
            id: 1,
            name: "New York",
            ratings: 4.5,
            image: require('../Assets/Images/8.jpeg')
        },
        {
            id: 1,
            name: "New York",
            ratings: 4.5,
            image: require('../Assets/Images/8.jpeg')
        },
        {
            id: 1,
            name: "New York",
            ratings: 4.5,
            image: require('../Assets/Images/8.jpeg')
        },
        {
            id: 1,
            name: "New York",
            ratings: 4.5,
            image: require('../Assets/Images/8.jpeg')
        },
        {
            id: 1,
            name: "New York",
            ratings: 4.5,
            image: require('../Assets/Images/8.jpeg')
        },
        {
            id: 1,
            name: "New York",
            ratings: 4.5,
            image: require('../Assets/Images/8.jpeg')
        },
    ]
    const [countryModalVisible, setCountryModalVisible] = useState(false)
    const [country, setCountry] = useState({ "callingCode": ["1"], "cca2": "US", "currency": ["USD"], "flag": "flag-us", "name": "United States", "region": "Americas", "subregion": "North America" });
    console.log("🚀 ~ Explore ~ country:", country)
    const [visible, setVisible] = useState(false)
    const [countryCode, setCountryCode] = useState("US");
    // console.log("🚀 ~ CountryScreen ~ countryCode:", countryCode)
    const [withFilter, setFilter] = useState(false);
    const [countries, setCountries] = useState([])
    // console.log("🚀 ~ CountryScreen ~ countries:", countries)
    const [loading, setLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [countriesList, setCountriesList] = useState([]);
    const [trip_loading, setTripLoading] = useState(false);

    useEffect(() => {
        getAllTrip()
    }, [country?.name])

    const onSelect = country => {
        setCountryCode(country.cca2);
        setCountry(country);
    };

    const getAllTrip = async () => {
        const url = `auth/trip_notes_publish?country=${country?.name}`
        setTripLoading(true)
        const response = await Get(url, token);
        setTripLoading(false)
        console.log("🚀 ~ getAllTrip ~ response?.data?.data?.country?.cities:", response?.data)
        if (response?.data != undefined) {
            setTripLoading(false)
            setTrip(response?.data?.cities)
        }
    }
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
                <View style={{ flexDirection: 'row', justifyContent: "flex-start", alignItems: "center", marginTop: moderateScale(15, 0.6) }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.Rounded}
                        onPress={() => {
                            console.log('Toggle drawer');
                            navigation.goBack();
                        }}>
                        <Icon
                            onPress={() => {
                                navigation.goBack()
                            }}
                            name="chevron-back"
                            as={Ionicons}
                            size={moderateScale(25, 0.6)}
                            color={Color.black}
                        />
                    </TouchableOpacity>
                    <CustomText isBold style={{
                        fontSize: moderateScale(20, 0.6),
                        textAlign: 'center',
                        width: '80%',
                    }}>Explore</CustomText>
                </View>
                <View style={styles.main_View}>
                    <View style={styles.text_view}>
                        <CustomText isBold style={{
                            fontSize: moderateScale(15, 0.6),
                        }}>Select Country First</CustomText>
                        <Icon
                            onPress={() => setCountryModalVisible(true)}
                            name="filter"
                            as={Ionicons}
                            color={Color.white}
                            size={moderateScale(28, 0.6)}
                        />
                    </View>

                    <FlatList numColumns={2} columnWrapperStyle={{ justifyContent: 'space-between' }} data={trips} renderItem={({ item }) => {
                        return (
                            <TripCards item={item} />
                        )
                    }} />
                </View>
            </LinearGradient>
            <Modal
                isVisible={countryModalVisible}
                onBackdropPress={() => {
                    setCountryModalVisible(false);
                    setCountry({})
                }}>
                <View
                    style={{
                        // width: windowWidth * 0.82,
                        padding: moderateScale(10., 6),
                        // height: windowHeight * 0.5,
                        backgroundColor: '#fff',
                        alignSelf: 'center',
                        alignItems: 'center',
                        borderRadius: moderateScale(10, 0.3),
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                    }}>
                    <View>
                        <View
                            style={[
                                styles.Profile1,
                            ]}>
                            {country?.cca2 ?
                                <CustomImage
                                    resizeMode={'cover'}
                                    source={{ uri: `https://flagcdn.com/w320/${country.cca2.toLowerCase()}.png` }}
                                    style={{
                                        width: '100%',
                                        height: '100%'
                                    }}
                                /> :
                                <CustomImage
                                    source={require('../Assets/Images/profileimage.png')}
                                    resizeMode={'cover'}
                                    style={{
                                        width: '100%',
                                        height: '100%'
                                    }}
                                />
                            }
                        </View>

                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            setVisible(true);
                            console.log('first');
                        }}
                        activeOpacity={0.9}
                        style={[
                            styles.birthday,
                            {
                                justifyContent: 'flex-start',
                                // backgroundColor: 'red',
                                borderRadius: moderateScale(25, 0.6),
                            },
                        ]}>
                        <CountryPicker
                            {...{
                                countryCode,
                                // withCallingCode,
                                onSelect,
                                withFilter,
                            }}
                            visible={visible}
                            onClose={() => {
                                setVisible(false);
                            }}
                        />

                        {country && (
                            <CustomText
                                style={{
                                    fontSize: moderateScale(15, 0.6),
                                    color: '#5E5E5E',
                                }}>{`${country?.name}`}</CustomText>
                        )}

                        <Icon
                            name={'angle-down'}
                            as={FontAwesome}
                            size={moderateScale(20, 0.6)}
                            color={Color.themeDarkGray}
                            onPress={() => {
                                setVisible(true);
                            }}
                            style={{
                                position: 'absolute',
                                right: moderateScale(5, 0.3),
                            }}
                        />
                    </TouchableOpacity>
                    <CustomButton
                        text={
                            loading ? (
                                <ActivityIndicator size={'small'} color={'white'} />
                            ) : (
                                'Save'
                            )
                        }
                        isBold
                        textColor={Color.white}
                        width={windowWidth * 0.3}
                        height={windowHeight * 0.05}
                        bgColor={Color.themeColor}
                        fontSize={moderateScale(11, 0.6)}
                        borderRadius={moderateScale(5, 0.3)}
                        // alignSelf={'flex-end'}
                        marginTop={moderateScale(20, 0.3)}
                        onPress={() => {
                            if (countriesList.findIndex(item => item?.name == country?.name) != -1) {
                                Platform.OS == 'android' ? ToastAndroid.show('country already added', ToastAndroid.SHORT) : alert('country already added')
                            }
                            else {
                                setCountryModalVisible(false)
                            }
                        }
                        }
                    />
                </View>
            </Modal>
        </ScreenBoiler>
    )
}

export default Explore

const styles = StyleSheet.create({
    main_View: {
        paddingHorizontal: moderateScale(15, 0.6),
        paddingVertical: moderateScale(15, 0.6),
        width: windowWidth,
        height: windowHeight
    },
    text_view: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
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
    birthday: {
        width: windowWidth * 0.75,
        height: windowHeight * 0.06,
        marginTop: moderateScale(10, 0.3),
        borderRadius: moderateScale(10, 0.6),
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: Color.lightGrey,
        flexDirection: 'row',
        paddingHorizontal: moderateScale(10, 0.6),
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: Color.themeColor,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    indicatorStyle: {
        marginTop: moderateScale(20, 0.6)
    }
})