import { ActivityIndicator, FlatList, Platform, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import ScreenBoiler from '../Components/ScreenBoiler'
import LinearGradient from 'react-native-linear-gradient'
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils'
import Color from '../Assets/Utilities/Color'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import { moderateScale } from 'react-native-size-matters'
import { Icon } from 'native-base'
import CustomButton from '../Components/CustomButton'
import Modal from 'react-native-modal';
import CustomImage from '../Components/CustomImage'
import CountryPicker from "react-native-country-picker-modal";
import CustomText from '../Components/CustomText'
import CountryCard from '../Components/CountryCard'
import axios from 'axios'
import TextInputWithTitle from '../Components/TextInputWithTitle'
import { Get, Post } from '../Axios/AxiosInterceptorFunction'
import { useSelector } from 'react-redux'
import { imageUrl } from '../Config'


const CitiesScreen = props => {
    const { data } = props?.route?.params
    console.log("🚀 ~ CitiesScreen ~ data:", data)
    const navigation = useNavigation()
    const [cities, setCities] = useState([])
    const [citiesmodalVisible, setCitiesModalVisible] = useState(false)
    // const [cityData?.name, setSelectedCities] = useState([])
    // console.log("🚀 ~ selectedCities:", selectedCities)
    const [searchQuery, setSearchQuery] = useState('')
    // const [citiesWithImage, setCitiesWithImage] = useState(null)
    const [filteredCities, setFilteredCities] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [citiesList, setCitiesList] = useState([])
    console.log("🚀 ~ citiesList:", citiesList)
    // const [cityName, setCityName] = useState('')
    const [cityData, setCityData] = useState({})
    console.log('cxcxzc',cityData);
    const [countryCode, setCountryCode] = useState(null)
    // console.log("🚀 ~ cityName:", cityName)
    const token = useSelector(state => state.authReducer.token);
    console.log("🚀 ~ token:", token)
    const user = useSelector(state => state.commonReducer.userData);
    console.log("🚀 ~ user:", user?.id)

    const fetchCities = async (countryName) => {
        try {
            const response = await axios.post('https://countriesnow.space/api/v0.1/countries/cities', {
                country: data?.name,
            });
            setCities(response.data.data);
        } catch (error) {
            console.log('Error fetching cities', error);
        }
    };

    useEffect(() => {
        fetchCities();
        const countryCode = data.uri.split("/").pop().split(".")[0].toUpperCase();
        setCountryCode(countryCode)
    }, [])

    useEffect(() => {
        if (searchQuery != '') {
            setFilteredCities(cities.filter(item => item.toLowerCase().includes(searchQuery.toLowerCase())))
        }
    }, [searchQuery])

    // useEffect(() => {
    //     getCityDetails();
    // }, [selectedCities])

    useEffect(() => {
        getCities()
    }, [])

    const getCities = async () => {
        const url = `auth/cities?country_id=${data?.id}`
        const response = await Get(url, token)
        setIsLoading(true)
        if (response != undefined) {
            console.log("🚀 ~ getCities ~ response:", response?.data)
        setIsLoading(false)
            setCitiesList(response?.data?.data)
        } else {
            setIsLoading(false)
        }
    }

    const getCityDetails = async (item) => {
        const apiKey = 'AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc';
        let fetchedData = [];
        // for (const city of selectedCities) {
        try {
            const placesUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=famous+landmarks+in+${item}&key=${apiKey}`;
            const response = await axios.get(placesUrl);

            if (response.data.results.length > 0) {
                const photoReference = response.data.results[0]?.photos?.[0]?.photo_reference;
                console.log("🚀 ~ getCityDetails ~ photoReference:", photoReference)

                if (photoReference) {
                    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
                    fetchedData.push({ name: item, uri: photoUrl });
                    console.log("🚀 ~ getCityDetails ~ photoUrl:", photoUrl)
                } else {
                    fetchedData.push({ name: item, uri: null });
                }
            } else {
                fetchedData.push({ name: item, uri: null });
            }
        } catch (error) {
            console.error(`Error fetching image for ${item}:`, error);
            fetchedData.push({ name: item, uri: null });
        }
        // } 
        const firstUri = fetchedData.length > 0 ? fetchedData[0].uri : null;
        // setCitiesWithImage(fetchedData);
        setCityData({name : item , image : firstUri , id : data?.id})
    }

    const onPressSave = async () => {
        const url = 'auth/cities'
        // const firstItem = selectedCities[0];
        const body = {
            country_id: cityData?.id,
            name: cityData?.name,
            image: cityData?.image
        }
    //    return console.log("🚀 ~ onPressSave ~ body:", body)
        setIsLoading(false)
        const response = await Post(url, body, apiHeader(token))
      
        setIsLoading(false)
        if (response != undefined) {
            setCitiesList((prev)=> [...prev , 
                {
                    country_id: cityData?.id,
                    name: cityData?.name,
                    image: cityData?.image
                }
            ])
            // getCities()
            setCityData({})
            setCitiesModalVisible(false)
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
                            navigation.goBack();
                        }}>
                        <Icon
                            onPress={() => {
                                navigation.goBack();
                                //   console.log('Toggle drawer'); navigation.toggleDrawer();
                            }}
                            name="chevron-back"
                            as={Ionicons}
                            size={moderateScale(25, 0.6)}
                            color={Color.black}
                        />
                    </TouchableOpacity>
                    <CustomButton
                        text={'Add City'}
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

                            setCitiesModalVisible(true)
                        }}
                    // right={moderateScale(5,0.3)}
                    />

                </View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{
                        height: windowHeight * 0.8,
                        marginTop: moderateScale(20, 0.3),
                    }}
                    contentContainerStyle={{

                        paddingBottom: moderateScale(50, 0.6),

                    }}
                    data={citiesList}
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
                        return (
                            <CountryCard
                                name={item?.name}
                                uri={item?.image}
                                onPress={() => navigation.navigate('NotepadDesign', { data: item, country: data?.name })}
                            />
                        )
                    }}
                />
            </LinearGradient>
            <Modal isVisible={citiesmodalVisible} onBackButtonPress={() => {
                setCitiesModalVisible(false)
            }}>
                <View style={styles.cities_card}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: windowWidth * 0.85 }}>
                        <CustomText isBold style={styles.heading}>Select Cities</CustomText>
                        <Icon name='cross' as={Entypo} size={moderateScale(25, 0.6)}
                            color={Color.black} onPress={() => setCitiesModalVisible(false)} />
                    </View>
                    <TextInputWithTitle
                        placeholder={'Search Cities'}
                        setText={setSearchQuery}
                        value={searchQuery}
                        // iconName={'search'}
                        // iconType={Feather}
                        marginTop={moderateScale(5, 0.3)}
                        viewHeight={0.05}
                        viewWidth={0.83}
                        inputHeight={0.05}
                        inputWidth={0.75}
                        color={Color.black}
                        placeholderColor={'#000000'}
                        isBold
                        border={2}
                        borderRadius={moderateScale(16, 0.3)}
                        borderColor={Color.themeColor}
                        alignSelf={"center"}
                        marginBottom={moderateScale(20, 0.6)}
                    />
                    <FlatList
                        data={searchQuery != '' ? filteredCities : cities}
                        // ListEmptyComponent={<CustomText style={styles.emphty_text}>please select country first</CustomText>}
                        renderItem={({ item, index }) => {
                            // console.log("🚀 ~ item:", selectedCities === item)
                            return (
                                <TouchableOpacity style={[styles.cites_btn, {
                                    backgroundColor: cityData?.name === item ? Color.themeColor : 'white',
                                }]} onPress={() => {
                                    if (citiesList.findIndex(item1 => item1?.name == item) != -1) {
                                        Platform.OS == 'android' ? ToastAndroid.show('City already added', ToastAndroid.SHORT) : alert('City already added')
                                    }
                                    else {
                                        getCityDetails(item)
                                        // setSelectedCities(item)
                                        // setCityName(item)
                                        setSearchQuery('')
                                        // onPressSave()
                                    }
                                }}>
                                    {cityData?.name === item && isLoading ? (
                                        <ActivityIndicator/>
                                    ) :(
                                        <CustomText style={styles.text}>{item}</CustomText>
                                    )}
                                </TouchableOpacity>
                            )
                        }}
                    />
                    <CustomButton
                        text={
                            isLoading ? (
                                <ActivityIndicator size={'small'} color={'white'} />
                            ) : (
                                'Save'
                            )
                        }
                        onPress={() => onPressSave()}
                        isBold
                        textColor={Color.white}
                        width={windowWidth * 0.3}
                        height={windowHeight * 0.05}
                        bgColor={Color.themeColor}
                        fontSize={moderateScale(11, 0.6)}
                        borderRadius={moderateScale(5, 0.3)}
                        marginTop={moderateScale(20, 0.3)}
                    />
                </View>
            </Modal>

        </ScreenBoiler>
    )
}

export default CitiesScreen

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
    cities_card: {
        width: windowWidth * 0.9,
        height: windowHeight * 0.5,
        backgroundColor: Color.white,
        borderRadius: moderateScale(20, 0.6),
        justifyContent: 'flex-start',
        alignItems: "flex-start",
        paddingHorizontal: moderateScale(10, 0.6),
        paddingVertical: moderateScale(20, 0.6)
    },
    cites_btn: {
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