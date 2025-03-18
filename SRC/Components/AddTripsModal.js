import { ActivityIndicator, Alert, FlatList, Platform, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from 'react-native-modal';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import { moderateScale } from 'react-native-size-matters';
import CustomText from './CustomText';
import CountryPicker from "react-native-country-picker-modal";
import { Icon } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import axios from 'axios';
import DropDownSingleSelect from './DropDownSingleSelect';
import CountryCard from './CountryCard';
import { useNavigation } from '@react-navigation/native';
import TextInputWithTitle from './TextInputWithTitle';
import CustomImage from './CustomImage';
import CustomButton from './CustomButton';
import ImagePickerModal from './ImagePickerModal';
import { TapGesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/tapGesture';
import { Post } from '../Axios/AxiosInterceptorFunction';
import { useSelector } from 'react-redux';

const AddTripsModal = ({ isVisible, setisVisible, data }) => {
    console.log("🚀 ~ AddTripsModal ~ data:", data)
    const navigation = useNavigation()
    const token = useSelector(state => state.authReducer.token);
    const user = useSelector(state => state.commonReducer.userData);
    const [visible, setVisible] = useState(false)
    const [cityModalVisible, setcityModalVisible] = useState(false)
    const [countryCode, setCountryCode] = useState("US");
    const [country, setCountry] = useState([])
    const [cities, setCities] = useState([])
    console.log(country?.name, 'countryyyyyyyyy')
    const [withFilter, setFilter] = useState(true);
    const [selectedCities, setSelectedCities] = useState('');
    const [title, setTitle] = useState('');
    const [imagePickerModal, setImagePickerModal] = useState(false);
    const [image, setImage] = useState({})
    const [loading, setLoading] = useState(false)
    const [description, setDescription] = useState('')
    console.log("🚀 ~ AddTripsModal ~ image:", image)

    const onSelect = country => {
        setCountryCode(country.cca2);
        setCountry(country);
    };

    const fetchCities = async (countryName) => {
        try {
            const response = await axios.post('https://countriesnow.space/api/v0.1/countries/cities', {
                country: country?.name,
            });
            console.log('reposennnnnne', response?.data?.data)
            setCities(response.data.data);
        } catch (error) {
            console.log('Error fetching cities', error);
        }
    };

    useEffect(() => {
        fetchCities()
    }, [country?.name])

    const onPressSubmit = async () => {
        const url = 'auth/trip_notes'
        const body = {
            title: title,
            description: description,
            image: null,
            // notes: {},
            location_name: 'KFC',
            lat: '3.96046',
            lng: '37.59400',
            country: country?.name,
            city: selectedCities,
            flag: country?.cca2,
            user_id: user?.id,
        }
        console.log("🚀 ~ onPressSubmit ~ body:", body)
        setLoading(true)
        const response = await Post(url, body, apiHeader(token))
        console.log("🚀 ~ onPressSubmit ~ response:", response?.data)
        setLoading(false)
        if (response != undefined) {
            setLoading(false)
            Platform?.OS == 'android'
                ? ToastAndroid.show('Added Successfullt', ToastAndroid.SHORT)
                : Alert.alert('Already added')
        }
    }

    return (
        <Modal isVisible={isVisible}
            swipeDirection="up"
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: Color.white,
            }}
            onBackdropPress={() => {
                setisVisible(false);
            }}>
            <View style={styles.modal_inner_view}>
                <View style={styles.main_view}>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
                        <CustomText isBold style={{
                            fontSize: moderateScale(20, 0.6),
                            textAlign: 'center',
                            marginTop: moderateScale(10, 0.6)
                        }}>Add Trip Details</CustomText>
                        <Icon onPress={() => setisVisible(false)} name={'cross'} as={Entypo} size={moderateScale(25, 0.6)}
                            color={Color.mediumGray} />
                    </View>
                    <View style={{ justifyContent: "flex-start", alignItems: "flex-start", marginVertical: moderateScale(20, 0.6) }}>
                        <CustomText isBold style={{
                            fontSize: moderateScale(12, 0.6),
                            color: Color.orange
                        }}>Select Country</CustomText>
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
                        <CustomText isBold style={{
                            fontSize: moderateScale(12, 0.6),
                            color: Color.orange,
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
                        {cityModalVisible &&
                            <View style={{
                                width: windowWidth * 0.8,
                                height: windowHeight * 0.5,
                                backgroundColor: '#F2F0EF',
                                alignSelf: 'center',
                                marginTop: moderateScale(5, 0.6)
                            }}>
                                <FlatList
                                    data={cities}
                                    renderItem={({ item }) => {
                                        return (
                                            <TouchableOpacity onPress={() => {
                                                setSelectedCities(item)
                                                setcityModalVisible(false)
                                            }} style={{
                                                width: windowWidth * 0.75,
                                                alignSelf: 'center',
                                                marginTop: moderateScale(10, 0.6),
                                                height: moderateScale(40, 0.6),
                                                alignItems: 'flex-start',
                                                justifyContent: "center",
                                                paddingHorizontal: moderateScale(15, 0.6),
                                                borderBottomColor: Color.black,
                                                borderBottomWidth: 0.5
                                            }}>
                                                <CustomText style={{
                                                    fontSize: moderateScale(12, 0.6),
                                                    color: Color.black
                                                }} >{item}</CustomText>
                                            </TouchableOpacity>
                                        )
                                    }}
                                />
                            </View>
                        }
                        <CustomText isBold style={{
                            fontSize: moderateScale(12, 0.6),
                            color: Color.orange,
                            marginTop: moderateScale(10, 0.6)
                        }}>
                            Title
                        </CustomText>
                        <TextInputWithTitle
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
                        <CustomText isBold style={{
                            fontSize: moderateScale(12, 0.6),
                            color: Color.orange,
                            marginTop: moderateScale(10, 0.6)
                        }}>
                            Description
                        </CustomText>
                        <TextInputWithTitle
                            placeholder={'Description'}
                            setText={setDescription}
                            value={description}
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
                        <CustomText isBold style={{
                            fontSize: moderateScale(12, 0.6),
                            color: Color.orange,
                            marginTop: moderateScale(10, 0.6)
                        }}>
                            Add Image
                        </CustomText>
                        <TouchableOpacity onPress={() => setImagePickerModal(true)} style={{
                            width: windowWidth * 0.3,
                            height: windowHeight * 0.18,
                            borderRadius: moderateScale(15, 0.6),
                            marginTop: moderateScale(10, 0.6),
                            backgroundColor: Color.lightGrey,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            {image?.uri ?
                                <CustomImage source={image?.uri ? { uri: image?.uri } : require('../Assets/Images/no_image.jpg')} style={{ width: '100%', height: '100%', borderRadius: moderateScale(10, 0.6) }} />
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
                                // setCitiesModalVisible(true)
                            }}
                        />
                    </View>
                </View>
            </View>
            <ImagePickerModal
                isVisible={imagePickerModal}
                setisVisible={setImagePickerModal}
                setFileObject={setImage}
            />
        </Modal >
    )
}

export default AddTripsModal

const styles = StyleSheet.create({
    modal_inner_view: {
        height: windowHeight,
        width: windowWidth,
        //   backgroundColor: 'green',
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    main_view: {
        width: windowWidth * 0.92,
        height: windowHeight * 0.9,
        backgroundColor: Color.white,
        borderRadius: moderateScale(15, 0.6),
        paddingHorizontal: moderateScale(10, 0.6),
        paddingVertical: moderateScale(10, 0.6)
    },
    birthday: {
        width: windowWidth * 0.85,
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
})