import { Icon } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Platform, ScrollView, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native';
import CountryPicker from "react-native-country-picker-modal";
import { moderateScale } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomText from '../Components/CustomText';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import CustomButton from '../Components/CustomButton';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import ScreenBoiler from '../Components/ScreenBoiler';
import ImagePickerModal from '../Components/ImagePickerModal';
import CustomImage from '../Components/CustomImage';
import axios from 'axios';
import { Post } from '../Axios/AxiosInterceptorFunction';
import Modal from 'react-native-modal';

const AddTripScreen = props => {
    const { data } = props?.route?.params
    const apiKey = 'AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc';
    const navigation = useNavigation()
    const token = useSelector(state => state.authReducer.token);
    const user = useSelector(state => state.commonReducer.userData);
    const [visible, setVisible] = useState(false)
    const [cityModalVisible, setcityModalVisible] = useState(false)
    const [countryCode, setCountryCode] = useState("US");
    const [country, setCountry] = useState([])
    const [cities, setCities] = useState([])
    const [withFilter, setFilter] = useState(true);
    const [selectedCities, setSelectedCities] = useState('');
    const [citiesWithImage, setCitiesWithImage] = useState(null)
    const [title, setTitle] = useState('');
    const [imagePicker, setImagePicker] = useState(false);
    const [image, setImage] = useState({})
    const [cityimage, setCityImage] = useState()
    console.log("🚀 ~ cityimage:", cityimage)
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredCities, setFilteredCities] = useState([])
    const [loading, setLoading] = useState(false)
    const [description, setDescription] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const onSelect = country => {
        setCountryCode(country.cca2);
        setCountry(country);
    };

    const fetchCities = async (countryName) => {
        try {
            const response = await axios.post('https://countriesnow.space/api/v0.1/countries/cities', {
                country: country?.name,
            });
            setCities(response.data.data);
        } catch (error) {
            console.log('Error fetching cities', error);
        }
    };

    useEffect(() => {
        fetchCities();
        getCityDetails()
    }, [country?.name])


    useEffect(() => {
        if (searchQuery != '') {
            setFilteredCities(cities.filter(item => item.toLowerCase().includes(searchQuery.toLowerCase())))
        }
    }, [searchQuery])



    const getCityDetails = async () => {
        const apiKey = 'AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc';
        let fetchedData = [];
        // for (const city of selectedCities) {
        try {
            const placesUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=famous+landmarks+in+${selectedCities}&key=${apiKey}`;
            const response = await axios.get(placesUrl);

            if (response.data.results.length > 0) {
                const photoReference = response.data.results[0]?.photos?.[0]?.photo_reference;

                if (photoReference) {
                    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
                    fetchedData.push({ name: selectedCities, uri: photoUrl });
                } else {
                    fetchedData.push({ name: selectedCities, uri: null });
                }
            } else {
                fetchedData.push({ name: selectedCities, uri: null });
            }
        } catch (error) {
            console.error(`Error fetching image for ${selectedCities}:`, error);
            fetchedData.push({ name: selectedCities, uri: null });
        }
        // } 
        const firstUri = fetchedData.length > 0 ? fetchedData[0].uri : null;
        setCitiesWithImage(fetchedData);
    }

    const onPressSubmit = async () => {
        const url = 'auth/trip_notes'
        const body = {
            title: title,
            description: description,
            image: null,
            location_name: data?.name,
            lat: data?.geometry?.location?.lat || data?.latitude,
            lng: data?.geometry?.location?.lng || data?.longitude,
            country_name: country,
            city_name: selectedCities,
            flag: `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`,
            user_id: user?.id,
            country_uri: `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`,
            // country_city_count: 1,
            city_image: citiesWithImage?.uri || cityimage,
        }
        console.log("🚀 ~ onPressSubmit ~ body:", body)
        setLoading(true)
        const response = await Post(url, body, apiHeader(token))
        setLoading(false)
        if (response != undefined) {
            setLoading(false)
            Platform?.OS == 'android'
                ? ToastAndroid.show('Trip Added Successfully', ToastAndroid.SHORT)
                : Alert.alert('Already added')
            navigation.goBack()
        }
    }

    useEffect(() => {
        console.log('chk asjhda')
        getCityAndCountry()
    }, [])

    const getCityAndCountry = async () => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(data?.address)}&key=${apiKey}`;

        try {
            const response = await fetch(url);
            const result = await response.json();

            if (result.status !== "OK") {
                console.error("Error fetching location data:", result.error_message || result.status);
                return;
            }

            if (result.results.length > 0) {
                const components = result.results[0].address_components;
                let city = "", country = "", countryCode = "", placeId = "";

                components.forEach(component => {
                    if (component.types.includes("locality")) {
                        city = component.long_name;
                    }
                    if (component.types.includes("country")) {
                        country = component.long_name;
                        countryCode = component.short_name;
                    }
                });

                placeId = result.results[0].place_id;
                setSelectedCities(city);
                setCountryCode(countryCode);
                setCountry(country);

                const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photo&key=${apiKey}`;
                const placeResponse = await fetch(placeDetailsUrl);
                console.log("🚀 ~ getCityAndCountry ~ placeResponse:", placeResponse)
                console.log("🚀 ~ getCityAndCountry ~ placeDetailsUrl:", placeDetailsUrl)
                const placeResult = await placeResponse.json();
                console.log("🚀 ~ placeResult:", placeResult);
                if (placeResult.result && placeResult.result.photos && placeResult.result.photos.length > 0) {
                    const photoReference = placeResult.result.photos[0].photo_reference;
                    console.log("🚀 ~ getCityAndCountry ~ photoReference:", photoReference);
                    const cityImageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
                    setCityImage(cityImageUrl != undefined ? cityImageUrl : null);
                    console.log("🚀 ~ getCityAndCountry ~ cityImageUrl:", cityImageUrl);
                } else {
                    console.warn("No photos found for this place.");
                }
            }
        } catch (error) {
            console.error("Error fetching location data:", error);
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
                    }}>Add Trip Details</CustomText>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.main_view}>
                        <View style={{ justifyContent: "flex-start", alignItems: "flex-start", marginVertical: moderateScale(20, 0.6) }}>
                            <CustomText isBold style={{
                                fontSize: moderateScale(12, 0.6),
                                color: Color.black
                            }}>{country ? country : ' Select Country'}</CustomText>
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
                                        borderRadius: moderateScale(25, 0.6),
                                    },
                                ]}>
                                <CountryPicker
                                    {...{
                                        countryCode,
                                        onSelect,
                                        withFilter,
                                    }}
                                    visible={visible}
                                    onClose={() => {
                                        (false);
                                    }}
                                />
                                {country && (
                                    <CustomText
                                        style={{
                                            fontSize: moderateScale(15, 0.6),
                                            color: '#5E5E5E',
                                        }}>
                                        {country ? country : 'Select Country'}
                                    </CustomText>
                                )}
                                <Icon
                                    name={'angle-down'}
                                    as={FontAwesome}
                                    size={moderateScale(20, 0.6)}
                                    color={Color.themeDarkGray}
                                    onPress={() => {

                                    }}
                                    style={{
                                        position: 'absolute',
                                        right: moderateScale(5, 0.3),
                                    }}
                                />
                            </TouchableOpacity>
                            <CustomText isBold style={{
                                fontSize: moderateScale(12, 0.6),
                                color: Color.black,
                                marginTop: moderateScale(10, 0.6)
                            }}>Select City</CustomText>
                            <TouchableOpacity onPress={() => setcityModalVisible(!cityModalVisible)} style={[styles.birthday,
                            {
                                justifyContent: 'space-between',
                                borderRadius: moderateScale(25, 0.6),
                                overflow: "hidden",
                                flexGrow: 1
                            },
                            ]}>
                                {country && (
                                    <CustomText
                                        style={{
                                            fontSize: moderateScale(15, 0.6),
                                            color: '#5E5E5E',
                                        }}>{selectedCities ? `${selectedCities}` : 'select City'}</CustomText>
                                )}
                                <Icon name={'keyboard-arrow-down'} as={MaterialIcons} size={moderateScale(22, 0.6)}
                                    color={Color.themeDarkGray} />
                            </TouchableOpacity>

                            <CustomText isBold style={{
                                fontSize: moderateScale(12, 0.6),
                                color: Color.black,
                                marginTop: moderateScale(10, 0.6)
                            }}>
                                Name
                            </CustomText>
                            <TextInputWithTitle
                                placeholder={data?.name}
                                // setText={setTitle}
                                // value={title}
                                viewHeight={0.06}
                                viewWidth={0.93}
                                inputWidth={0.6}
                                marginTop={moderateScale(10, 0.3)}
                                color={Color.black}
                                borderRadius={moderateScale(20, 0.6)}
                                placeholderColor={Color.mediumGray}
                                backgroundColor={Color.white}
                                disable
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
                            <CustomText isBold style={{
                                fontSize: moderateScale(12, 0.6),
                                color: Color.black,
                                marginTop: moderateScale(10, 0.6)
                            }}>
                                Title
                            </CustomText>
                            <TextInputWithTitle
                                placeholder={'Title'}
                                setText={setTitle}
                                value={title}
                                viewHeight={0.06}
                                viewWidth={0.93}
                                inputWidth={0.6}
                                marginTop={moderateScale(10, 0.3)}
                                color={Color.black}
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
                            <CustomText isBold style={{
                                fontSize: moderateScale(12, 0.6),
                                color: Color.black,
                                marginTop: moderateScale(10, 0.6)
                            }}>
                                Description
                            </CustomText>
                            <TextInputWithTitle
                                placeholder={'Description'}
                                setText={setDescription}
                                value={description}
                                viewHeight={0.06}
                                viewWidth={0.93}
                                inputWidth={0.6}
                                marginTop={moderateScale(10, 0.3)}
                                color={Color.black}
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
                            <CustomText isBold style={{
                                fontSize: moderateScale(12, 0.6),
                                color: Color.black,
                                marginTop: moderateScale(10, 0.6)
                            }}>
                                Add Image
                            </CustomText>
                            <TouchableOpacity onPress={() => setImagePicker(true)} style={{
                                width: windowWidth * 0.3,
                                height: windowHeight * 0.18,
                                borderRadius: moderateScale(15, 0.6),
                                marginTop: moderateScale(10, 0.6),
                                backgroundColor: Color.lightGrey,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                {Object.keys(image).length > 0 ?
                                    // <CustomImage source={image?.uri ? { uri: image?.uri } : require('../Assets/Images/no_image.jpg')} style={{ width: '100%', height: '100%', borderRadius: moderateScale(10, 0.6), }} />
                                    <CustomImage
                                        source={image?.uri ? { uri: image.uri.replace('file://', '') } : require('../Assets/Images/no_image.jpg')}
                                        style={{ width: '100%', height: '100%', borderRadius: moderateScale(10, 0.6) }}
                                    />
                                    :
                                    <Icon name={'plus-a'} as={Fontisto} size={moderateScale(25, 0.6)}
                                        color={Color.mediumGray} />
                                }
                            </TouchableOpacity>
                            <CustomButton
                                text={loading ? <ActivityIndicator
                                    style={styles.indicatorStyle}
                                    size="small"
                                    color={Color.white}
                                /> : 'Submit'}
                                isBold
                                textColor={Color.white}
                                height={windowHeight * 0.07}
                                width={windowHeight * 0.3}
                                bgColor={Color.orange}
                                fontSize={moderateScale(11, 0.6)}
                                borderRadius={moderateScale(5, 0.3)}
                                marginTop={moderateScale(20, 0.3)}
                                style={{
                                    marginRight: moderateScale(10, 0.3),
                                }}
                                onPress={() => {
                                    onPressSubmit()
                                }}
                            />
                        </View>
                    </View>
                </ScrollView>
                <ImagePickerModal
                    show={imagePicker}
                    setShow={setImagePicker}
                    setFileObject={setImage}
                />
                <Modal isVisible={cityModalVisible} onBackButtonPress={() => {
                    setcityModalVisible(false)
                }}>
                    <View style={styles.cities_card}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: windowWidth * 0.85 }}>
                            <CustomText isBold style={styles.heading}>Select Cities</CustomText>
                            <Icon name='cross' as={Entypo} size={moderateScale(25, 0.6)}
                                color={Color.black} onPress={() => setcityModalVisible(false)} />
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
                            ListEmptyComponent={<CustomText style={styles.emphty_text}>please select country first</CustomText>}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity style={styles.cites_btn} onPress={() => {
                                        if (selectedCities.includes(item)) {
                                            Platform.OS == 'android' ? ToastAndroid.show('City already added', ToastAndroid.SHORT) : alert('City already added')
                                        }
                                        else {
                                            setSelectedCities(item)
                                            setcityModalVisible(false)
                                            // setCityName(item)
                                            setSearchQuery('')
                                        }
                                    }}>
                                        <CustomText style={styles.text}>{item}</CustomText>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>
                </Modal>
            </LinearGradient>
        </ScreenBoiler>
    )
}

export default AddTripScreen


const styles = StyleSheet.create({
    main_view: {
        borderRadius: moderateScale(15, 0.6),
        paddingHorizontal: moderateScale(10, 0.6),
        justifyContent: 'center',
    },
    birthday: {
        width: windowWidth * 0.93,
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
    row: {
        flexDirection: 'row',
        marginTop: 10,
        paddingHorizontal: 10,
        width: windowWidth,
        justifyContent: 'space-between'
    },
    Rounded: {
        width: windowWidth * 0.1,
        height: windowHeight * 0.05,
        borderRadius: moderateScale(30, 0.3),
        backgroundColor: Color.white,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        elevation: 5,
        marginLeft: moderateScale(10, 0.6)
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