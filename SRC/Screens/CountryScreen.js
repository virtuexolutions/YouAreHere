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
import { Get, Post } from '../Axios/AxiosInterceptorFunction'
import { useSelector } from 'react-redux'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import TextInputWithTitle from '../Components/TextInputWithTitle'
import RBSheet from 'react-native-raw-bottom-sheet'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const CountryScreen = () => {
    const focused = useIsFocused()
    const navigation = useNavigation()
    const [countryModalVisible, setCountryModalVisible] = useState(false)
    const [country, setCountry] = useState({ "callingCode": ["1"], "cca2": "US", "currency": ["USD"], "flag": "flag-us", "name": "United States", "region": "Americas", "subregion": "North America" });
    const [visible, setVisible] = useState(false)
    const [countryCode, setCountryCode] = useState("US");
    const [withFilter, setFilter] = useState(true);
    const [countries, setCountries] = useState(countriesList)
    console.log("🚀 ~ CountryScreen ~ countries:", countries)
    const [loading, setLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [countriesList, setCountriesList] = useState([]);
    console.log("🚀 ~ CountryScreen ~ countriesList:", countriesList)
    const token = useSelector(state => state.authReducer.token);
    const [privacyVisible, setprivacyVisible] = useState(null)
    const [openSelectedTab, setOpenSelectedTab] = useState(false)
    const [selectTab, setSelectedTab] = useState({
        country: '',
        type: ""
    })
    const [selectedCountryIndex, setSelectedCountryIndex] = useState(null);
    console.log("🚀 ~ CountryScreen ~ selectedCountryIndex:", selectedCountryIndex)
    // const [title, setTitle] = useState('')
    // const [description, setDescription] = useState('')



    const onSelect = country => {
        setCountryCode(country.cca2);
        setCountry(country);
    };


    useEffect(() => {
        setCountries(countriesList);
    }, [countriesList]);

    const getCountries = async () => {
        const url = 'auth/countries'
        setIsLoading(true)
        const response = await Get(url, token)
        setIsLoading(false)
        if (response != undefined) {
            setCountriesList(response?.data?.data)
        }
    }

    const addCountry = async (data) => {
        const url = 'auth/countries'
        setLoading(true)
        const response = await Post(url, data, apiHeader(token))
        setLoading(false)
        if (response != undefined) {
            getCountries()
        }
    }

    useEffect(() => {
        getCountries()
    }, [focused])


    const updatePrivacyStatus = (status) => {
        const updatedCountries = [...countries];
        console.log("🚀 ~ updatePrivacyStatus ~ updatedCountries:", updatedCountries)
        updatedCountries[selectedCountryIndex] = {
            ...updatedCountries[selectedCountryIndex],
            type: status
        };
        setCountries(updatedCountries);
        privacyVisible?.close();
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
                    //   justifyContent:'center'
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
                            navigation.toggleDrawer();
                        }}>
                        <Icon
                            onPress={() => {
                                navigation.toggleDrawer();
                                //   console.log('Toggle drawer'); navigation.toggleDrawer();
                            }}
                            name="menu"
                            as={Ionicons}
                            size={moderateScale(25, 0.6)}
                            color={Color.black}
                        />
                    </TouchableOpacity>
                    <CustomButton
                        text={'Add Trip'}
                        isBold
                        textColor={Color.themeColor}
                        // width={windowWidth * 0.2}
                        height={windowHeight * 0.03}
                        bgColor={Color.white}
                        fontSize={moderateScale(11, 0.6)}
                        borderRadius={moderateScale(5, 0.3)}
                        //   alignSelf={'flex-end'}
                        marginTop={moderateScale(20, 0.3)}
                        style={{
                            marginRight: moderateScale(10, 0.3),
                        }}
                        onPress={() => {

                            setCountryModalVisible(true)
                        }}
                    // right={moderateScale(5,0.3)}
                    />

                </View>

                {isLoading ? (
                    <View style={{
                        width: windowWidth,
                        height: windowHeight * 0.4,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>

                        <ActivityIndicator
                            style={styles.indicatorStyle}
                            size="small"
                            color={Color.white}
                        />
                    </View>
                ) : (
                    <>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            style={{
                                height: windowHeight * 0.8,
                                marginTop: moderateScale(20, 0.3),
                            }}
                            contentContainerStyle={{

                                paddingBottom: moderateScale(50, 0.6),

                            }}
                            data={countries}
                            ListEmptyComponent={() => {
                                return (
                                    <View style={{
                                        width: windowWidth,
                                        height: windowHeight * 0.5,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <CustomText>No Data Found</CustomText>
                                    </View>
                                )
                            }}
                            renderItem={({ item, index }) => {
                                console.log(item, '================>itemmmmmmm')
                                return (
                                    <>
                                        <CountryCard
                                            // citiesCount={`No of cities added = ${item?.city_count}`}
                                            name={item?.name}
                                            uri={item?.uri}
                                            countryType={item?.type}
                                            issettingOption
                                            isPublicType
                                            onPressSetting={() => {
                                                setSelectedCountryIndex(index);
                                                privacyVisible?.open()
                                            }}
                                            onPress={() => navigationService.navigate('CitiesScreen', { data: item })}
                                        />
                                    </>
                                )
                            }}

                        />

                    </>
                )
                }
                < View style={{ marginBottom: moderateScale(20, 0.6) }} />
            </LinearGradient>
            <Modal
                isVisible={countryModalVisible}
                onBackdropPress={() => {
                    setCountryModalVisible(false);
                    //   setImage({});
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
                                // setCountriesList(prev => [...prev,
                                // {
                                //     name: country?.name, uri: `https://flagcdn.com/w320/${country.cca2.toLowerCase()}.png`,
                                //     city_count: 0
                                // }]),
                                setCountryModalVisible(false)
                                // setCountry({ cca2: 'US', name: 'United States'})
                                // setCountryCode('US')
                                addCountry({
                                    name: country?.name,
                                    uri: `https://flagcdn.com/w320/${country.cca2.toLowerCase()}.png`,
                                    // city_count: 0
                                })
                            }
                        }
                        }
                    />
                </View>
            </Modal>
            <RBSheet
                ref={ref => {
                    setprivacyVisible(ref);
                }}
                closeOnDragDown={true}
                dragFromTopOnly={true}
                openDuration={250}
                height={windowHeight * 0.35}
                customStyles={{
                    container: {
                        borderTopEndRadius: moderateScale(30, 0.6),
                        borderTopLeftRadius: moderateScale(30, 0.6),
                        overflow: 'hidden',
                    },
                }}>
                <View style={{
                    paddingVertical: moderateScale(10, 0.6),
                    paddingHorizontal: moderateScale(20, 0.6)
                }}>
                    <CustomText isBold style={{
                        fontSize: moderateScale(14, 0.6),
                        textAlign: 'center'
                    }}>Privacy type</CustomText>
                    <CustomText isBold style={{
                        fontSize: moderateScale(14, 0.6),
                        marginTop: moderateScale(10, 0.6)
                    }}>Please select the privacy type</CustomText>
                    <View style={{
                        width: windowWidth * 0.9,
                        backgroundColor: Color.white,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 4,
                        },
                        shadowOpacity: 0.32,
                        shadowRadius: 5.46,
                        elevation: 9,
                        borderRadius: moderateScale(20, 0.6),
                        paddingHorizontal: moderateScale(15, 0.6),
                        paddingVertical: moderateScale(15, 0.6)
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: "center",
                            justifyContent: 'space-between',
                        }}>
                            <CustomText isBold style={{
                                fontSize: moderateScale(14, 0.6),
                                color: Color.darkGray
                            }}>Select type</CustomText>
                            <Icon onPress={() => {
                                setOpenSelectedTab(!openSelectedTab)
                            }} as={Entypo} name={'chevron-down'} size={moderateScale(16, 0.6)} color={Color.darkGray} />
                        </View>
                        {openSelectedTab &&
                            <View style={{
                                width: windowWidth * 0.8,
                                height: windowHeight * 0.1,
                                top: -10,
                                zIndex: 1,
                                marginTop: moderateScale(20, 0.6)
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: "center",
                                    justifyContent: 'space-between',
                                    width: windowWidth * 0.8,
                                    height: moderateScale(40, 0.6),
                                    borderRadius: moderateScale(10, 0.6),
                                    borderWidth: 1.5,
                                    borderColor: Color.lightGrey
                                }}
                                >
                                    <TouchableOpacity onPress={() => updatePrivacyStatus('private')} style={{
                                        flexDirection: 'row',
                                        alignItems: "center",
                                        justifyContent: 'space-between',
                                        marginLeft: moderateScale(10, 0.6)
                                    }}>
                                        <Icon name={'lock'} as={Entypo} size={moderateScale(20, 0.6)} color={Color.veryLightGray} />
                                        <CustomText isBold style={{
                                            fontSize: moderateScale(13, 0.6),
                                            marginLeft: moderateScale(7, 0.6),
                                            color: Color.veryLightGray
                                        }}>Private</CustomText>
                                    </TouchableOpacity>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: "center",
                                    justifyContent: 'space-between',
                                    width: windowWidth * 0.8,
                                    height: moderateScale(40, 0.6),
                                    borderRadius: moderateScale(10, 0.6),
                                    borderWidth: 1.5,
                                    borderColor: Color.lightGrey,
                                    marginTop: moderateScale(10, 0.6)
                                }}
                                >
                                    <TouchableOpacity onPress={() => updatePrivacyStatus('public')} style={{
                                        flexDirection: 'row',
                                        alignItems: "center",
                                        justifyContent: 'space-between',
                                        marginLeft: moderateScale(10, 0.6)
                                    }}>
                                        <Icon name={'public'} as={MaterialIcons
                                        } size={moderateScale(20, 0.6)} color={Color.veryLightGray} />
                                        <CustomText isBold style={{
                                            fontSize: moderateScale(13, 0.6),
                                            marginLeft: moderateScale(7, 0.6),
                                            color: Color.veryLightGray
                                        }}>Public</CustomText>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    </View>
                    {/* <TextInputWithTitle
                        placeholder={'Title'}
                        setText={setTitle}
                        value={title}
                        viewHeight={0.06}
                        viewWidth={0.85}
                        inputWidth={0.6}
                        marginTop={moderateScale(10, 0.3)}
                        color={Color.orange}
                        borderRadius={moderateScale(20, 0.6)}
                        placeholderColor={Color.mediumGray}
                        backgroundColor={Color.white}
                        style={{
                            shadowColor: Color.themeColor,
                            shadowOffset: {
                                width: 0,
                                height: 4,
                            },
                            shadowOpacity: 0.32,
                            shadowRadius: 5.46,
                            elevation: 9,
                            paddingLeft: moderateScale(10, 0.6)
                        }}
                    />
                    <TextInputWithTitle
                        placeholder={'Description'}
                        setText={setDescription}
                        value={description}
                        viewHeight={0.15}
                        viewWidth={0.85}
                        inputWidth={0.85}
                        marginTop={moderateScale(10, 0.3)}
                        color={Color.orange}
                        borderRadius={moderateScale(20, 0.6)}
                        placeholderColor={Color.mediumGray}
                        backgroundColor={Color.white}
                        alignItems={'flex-start'}
                        multiline
                        style={{
                            shadowColor: Color.themeColor,
                            shadowOffset: {
                                width: 0,
                                height: 4,
                            },
                            shadowOpacity: 0.32,
                            shadowRadius: 5.46,
                            elevation: 9,
                            paddingLeft: moderateScale(10, 0.6)
                        }}
                    /> */}
                    {/* <View style={{ alignSelf: "center" }}>
                        <CustomButton
                            text={publish_loading ? (
                                <ActivityIndicator size={'small'} color={'white'} />
                            ) : (
                                'Submit'
                            )}
                            isBold
                            textColor={Color.white}
                            width={windowWidth * 0.8}
                            height={windowHeight * 0.05}
                            bgColor={Color.themeColor}
                            fontSize={moderateScale(11, 0.6)}
                            borderRadius={moderateScale(10, 0.3)}
                            alignSelf={'flex-end'}
                            marginTop={moderateScale(20, 0.3)}
                            onPress={() => {
                                onPressPublish()
                            }}
                        />
                    </View> */}
                </View>
            </RBSheet>
        </ScreenBoiler>
    )
}




export default CountryScreen

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