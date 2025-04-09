import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import ScreenBoiler from '../Components/ScreenBoiler'
import { windowHeight, windowWidth } from '../Utillity/utils'
import { moderateScale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import { Icon } from 'native-base'
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomText from '../Components/CustomText'
import { SliderBox } from 'react-native-image-slider-box';
import { mode } from 'native-base/lib/typescript/theme/v33x-theme/tools'
import Color from '../Assets/Utilities/Color'
import PlacesCard from '../Components/PlacesCard'
import NearPlacesCard from '../Components/NearPlacesCard'

const ExploreDetails = props => {
    const { data } = props?.route?.params
    const navigation = useNavigation()
    const [btn_text, setBtnText] = useState('details')
    const [loading, setLoading] = useState(false);
    const apiKey = 'AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc';
    const [images, setImages] = useState([]);
    const [placeDetails, setPlaceDetails] = useState([]);
    const [placeLoading, setPlaceLoading] = useState(false)
    console.log("🚀 ~ placeDetails:", placeDetails)
    const [places_list, setPlacesList] = useState([])
    // const images = [
    //     require('../Assets/Images/11.jpg'),
    //     require('../Assets/Images/11.jpg'),
    //     require('../Assets/Images/11.jpg'),
    //     require('../Assets/Images/11.jpg'),
    // ]

    const [locations, setLocations] = useState([
        {
            id: 1,
            name: 'USA Restaurant',
            image: require('../Assets/Images/13.jpeg'),
        },
        {
            id: 2,
            name: 'Canlis',
            image: require('../Assets/Images/13.jpeg'),
        },
        {
            id: 3,
            name: 'Arethusa al tavolo',
            image: require('../Assets/Images/13.jpeg'),
            country: 'USA'
        }
    ]);

    useEffect(() => {
        if (data?.trips?.length > 0) {
            const allPlaces = data.trips[0].places;
            const imageUrls = allPlaces.map(place => place.image);
            setImages(imageUrls);
            allPlaces.forEach(async (place) => {
                const address = await getRestaurantDetails(place?.title);
                setPlaceDetails(prev => [...prev, {
                    locationName: place.title,
                    address: address,
                }]);
            });
        }
    }, [data]);

    const getRestaurantDetails = async (name) => {
        try {
            const searchResponse = await fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(name)}&inputtype=textquery&fields=place_id&key=${apiKey}`);
            const searchData = await searchResponse.json();
            setPlaceLoading(true)
            if (!searchData.candidates.length) {
                console.log('No place found for:', name);
                return null;
            }
            const placeId = searchData.candidates[0].place_id;
            const detailsFields = [
                "name",
                "formatted_address",
                "geometry",
                "photos",
                "place_id",
                "plus_code",
                "opening_hours",
                "rating",
                "types",
                "icon",
                "icon_mask_base_uri",
                "icon_background_color",
                "user_ratings_total",
                "vicinity"
            ].join(',');
            const detailsResponse = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${detailsFields}&key=${apiKey}`);
            const detailsData = await detailsResponse.json();
            if (detailsData) {
                setPlaceLoading(false)
            }
            return detailsData.result;
        } catch (error) {
            console.error('Error fetching restaurant details:', error);
            return null;
        }
    };



    return (
        <ScreenBoiler
            statusBarBackgroundColor={'white'}
            statusBarContentStyle={'dark-content'}
        >
            {data?.trips?.map((item) => {
                return (
                    <LinearGradient
                        style={{
                            width: windowWidth,
                            height: windowHeight,
                        }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={Color.themeBgColor}>
                        <View style={{ flexDirection: 'row', justifyContent: "flex-start", alignItems: "center", marginTop: moderateScale(15, 0.6) }}>
                        </View>
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
                            }}>Details</CustomText>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.main_view}>
                                <SliderBox
                                    images={images}
                                    sliderBoxHeight={windowHeight * 0.3}
                                    parentWidth={windowWidth * 0.9}
                                    onCurrentImagePressed={index => console.log(`Image ${index} pressed`)}
                                    dotColor="#FFEE58"
                                    inactiveDotColor="#90A4AE"
                                    // paginationBoxVerticalPadding={20}
                                    autoplay
                                    circleLoop
                                />
                                <View style={styles.text_view}>
                                    <CustomText isBold style={styles.heading}>{item?.name}</CustomText>
                                    <View style={styles.text_view}>
                                        <Icon name='star' as={AntDesign} size={moderateScale(14, 0.6)} color={Color.black} />
                                        <CustomText style={styles.rating_text}>5.9</CustomText>
                                    </View>
                                </View>
                                <View style={[styles.text_view, {
                                    justifyContent: "flex-start",
                                    marginTop: moderateScale(10, 0.6)
                                }]}>
                                    <Icon name='location' as={EvilIcons} size={moderateScale(16, 0.6)} color={Color.black} />
                                    <CustomText style={styles.text}>{data?.name}</CustomText>
                                </View>
                                <View style={{
                                    width: windowWidth * 0.9,
                                    height: 1.5,
                                    backgroundColor: Color.black,
                                    marginTop: moderateScale(10, 0.6)
                                }} />
                                <View style={[styles.text_view, {
                                    justifyContent: 'flex-start',
                                    alignItems: "center",
                                }]}>
                                    <TouchableOpacity onPress={() => setBtnText(
                                        'details')} style={styles.tab_btn}>
                                        <CustomText isBold style={[styles.tab_text, {
                                            borderBottomWidth: btn_text === 'details' ? 1 : 0,
                                            borderBottomColor: btn_text === 'details' ? Color.white : 'transparent',
                                            textAlign: 'center'
                                        }]}>Details</CustomText>
                                    </TouchableOpacity >
                                    <TouchableOpacity style={styles.tab_btn} onPress={() => setBtnText('reviews')} >
                                        <CustomText isBold style={[styles.tab_text, {
                                            borderBottomWidth: btn_text === 'reviews' ? 1 : 0,
                                            borderBottomColor: btn_text === 'reviews' ? Color.white : 'transparent',
                                            textAlign: 'center'
                                        }]}>Reviews</CustomText>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.tab_btn} onPress={() => setBtnText('maps')} >
                                        <CustomText isBold style={[styles.tab_text, {
                                            borderBottomWidth: btn_text === 'maps' ? 1 : 0,
                                            borderBottomColor: btn_text === 'maps' ? Color.white : 'transparent',
                                            textAlign: 'center'
                                        }]}>Maps</CustomText>
                                    </TouchableOpacity>
                                </View>
                                {btn_text === 'details' &&
                                    <View>
                                        <CustomText style={styles.description}>
                                            {item?.description}
                                        </CustomText>
                                        <CustomText isBold style={styles.heading}>Locations</CustomText>
                                        <FlatList
                                            data={placeDetails}
                                            showsVerticalScrollIndicator={false}
                                            contentContainerStyle={{
                                                paddingBottom: 50,
                                                marginTop: moderateScale(10, 0.3),
                                                marginBottom: moderateScale(20, 0.3),
                                            }}
                                            renderItem={({ item, index }) => {
                                                return (
                                                    <NearPlacesCard
                                                        item={item}
                                                        isType={false}
                                                    />
                                                )
                                            }}
                                        />
                                    </View>
                                }
                            </View>
                        </ScrollView>
                    </LinearGradient>
                )
            })

            }
        </ScreenBoiler>
    )
}

export default ExploreDetails

const styles = StyleSheet.create({
    main_view: {
        paddingHorizontal: moderateScale(15, 0.6),
        paddingVertical: moderateScale(15, 0.6),
        width: windowWidth,
        height: windowHeight,
        marginTop: moderateScale(10, 0.6)
    },
    heading: {
        fontSize: moderateScale(18, 0.6),
        marginTop: moderateScale(10, 0.6),
        textTransform: 'capitalize'
    },
    text_view: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'
    },
    rating_text: {
        marginLeft: moderateScale(6, 0.6),
        fontSize: moderateScale(12, 0.6)
    },
    text: {
        fontSize: moderateScale(13, 0.6),
    },
    tab_btn: {
        width: windowWidth * 0.2,
        marginRight: moderateScale(10, 0.6),
        marginTop: moderateScale(10, 0.6),
    },
    tab_text: {
        fontSize: moderateScale(14, 0.6),
        width: windowWidth * 0.18,
    },
    description: {
        fontSize: moderateScale(13, 0.6),
        marginTop: moderateScale(10, 0.6)
    }
})