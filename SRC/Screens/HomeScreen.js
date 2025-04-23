import { useIsFocused, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { FlatList, Icon, ScrollView } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  Modal,
  Platform,
  RefreshControl,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import GetLocation from 'react-native-get-location';
import LinearGradient from 'react-native-linear-gradient';
import { check, PERMISSIONS, request } from 'react-native-permissions';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { Get, Post } from '../Axios/AxiosInterceptorFunction';
import CustomText from '../Components/CustomText';
import NearPlacesCard from '../Components/NearPlacesCard';
import PlacesCard from '../Components/PlacesCard';
import ScreenBoiler from '../Components/ScreenBoiler';
import WelcomeCard from '../Components/WelcomeCard';
import {
  apiHeader,
  requestLocationPermission,
  windowHeight,
  windowWidth,
} from '../Utillity/utils';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AddPlacesModal from '../Components/AddPlacesModal';
import SelectFilterModal from '../Components/FilterModal';
import WelcomeModal from '../Components/WelcomeModal';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import CustomButton from '../Components/CustomButton';
import navigationService from '../navigationService';
import TripCards from '../Components/TripCards';
import AddTripsModal from '../Components/AddTripsModal';

const HomeScreen = props => {
  const isFocused = useIsFocused();
  const token = useSelector(state => state.authReducer.token);
  const user = useSelector(state => state.commonReducer.userData);
  const userPreferences = useSelector(state => state.commonReducer.prefrences);
  const favouriteplaces = useSelector(
    state => state.commonReducer.favouriteLocation,
  );
  const filteredUserPreference = userPreferences?.map(
    item => item?.preferences,
  );

  const customLocation = useSelector(
    state => state.commonReducer.customLocation,
  );

  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [label, setLabel] = useState('');
  const [searchData, setSearchData] = useState('');
  const [placesData, setplacesData] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [preferences, setPreferences] = useState(null);
  const [preferencesModalVisible, setPreferencesModalVisible] = useState(false);
  // const [userPreferences, setuserPreferences] = useState(false);
  const [selectedLocation, setSelectedLoacation] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [searchedPlaces, setSearchedPlaces] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({});
  const [locationName, setLocationName] = useState('');
  const [foundLocation, setFoundLocation] = useState({});
  const [countryCode, setCountryCode] = useState('');
  const [listName, setlistName] = useState('');
  const [search, setSearch] = useState('');
  const [currentItem, setCurrentItem] = useState({});
  const [isSaveModalVisible, setSaveModalVisible] = useState(false);
  const [isCreateNewTrip, setCreateNewTrip] = useState(false);
  const [tripLoading, settripLoading] = useState(false);
  const [gettripLoading, setGetTripLoading] = useState(false);
  const [addTripLoading, setAddTripLoading] = useState(false);
  const [tripList, setTripList] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [issaveLoading, setSaveIsLoading] = useState(false);
  const [whishlistdata, setwhishlistdata] = useState(null);
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const [filterplaces, setFilterPlaces] = useState('All');
  const [trip_loading, setTripLoading] = useState(false);
  const [trips, setTrip] = useState([])
  console.log('tripsssssssssssssssss === = = == = = = = =>>  >>')
  const [countryName, setCountryName] = useState('');
  const currentLocation2 = {
    latitude: 24.8598186,
    longitude: 67.06233019999999,
  };

  // console.log(
  //   'currentLocation   ',
  //   // currentLocation,
  //   customLocation?.location,
  //   // favouriteplaces[0].name,
  //   favouriteplaces[1],
  // );
  // const [welcomeModal ,setWelcomeModal ] =useState(true)

  const [rbRef, setRbRef] = useState(null);

  const cardData = [
    {
      heading: 'Jet-Set to New Horizons',
      title: 'Ready for Takeoff?',
      description: `Explore the world with ease. Book your next adventure with our airline partner and soar to new horizons. Your journey begins here.`,
      color: ['#4B9CD3', '#4682B4', '#4F97A3'],
      image: require('../Assets/Images/airline.png'),
    },
    {
      heading: 'Relax and Recharge',
      title: 'Escape to Paradise Resorts',
      description: `Indulge in luxury at top-rated resorts. Find your perfect getaway spot, where relaxation meets adventure. Unwind and rejuvenate today.`,
      color: ['#ED9121', '#f8de7e', '#f4c430'],
      image: require('../Assets/Images/resort.png'),
    },
  ];

  const apiKey = 'AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc';
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      Platform.OS == 'android' ? handleEnableLocation() : getLocation();
    }, 2000);
  };



  const findNearestMcDonalds = async location => {
    const radius = 50000;
    const apiKey = 'AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc';
    const latitude = 24.871941;
    const longitude = 66.98806;
    const keyword = 'mc donald';
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${apiKey}&location=${Object.keys(customLocation).length > 0
      ? customLocation?.location?.lat
      : location?.lat
      },${Object.keys(customLocation).length > 0
        ? customLocation?.location?.lng
        : location?.lng
      }&rankby=distance&keyword=${preferences?.name ? preferences?.name : 'all'}`;
    // const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&rankby=distance&keyword=${keyword}&key=${apiKey}`;
    try {
      setIsLoading(true);
      const response = await axios.get(url);
      setIsLoading(false);
      if (response != undefined) {
        const highestRating = Math.max(...response?.data?.results.map(place => place.rating || 0));
        const topRatedPlaces = response?.data?.results.filter(place => place.rating === highestRating);
        // setplacesData(filterplaces === 'All' ? response?.data?.results : topRatedPlaces);
        setplacesData(response?.data?.results)
      }
    } catch (error) {
      console.error("Error fetching McDonald's locations:", error);
    }
  };



  const getAllTrip = async () => {
    const url = `auth/trip_notes_publish?country=${countryName}`
    setTripLoading(true)
    const response = await Get(url, token);
    setTripLoading(false)
    if (response?.data != undefined) {
      setTripLoading(false)
      setTrip(response?.data)
    }
  }



  const handleEnableLocation = () => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then(data => {
        setIsLoading(true);
        getLocation();
        // fetchAddress();
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const requestLocationPermissionIOS = async () => {
    try {
      const permissionStatus = await check(
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      );

      console.log(permissionStatus);
      if (permissionStatus === 'granted') {
        console.log('Location permission already granted');
        return true;
      } else if (
        permissionStatus === 'blocked' ||
        permissionStatus === 'denied'
      ) {
        const permissionRequest = await request(
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        );

        if (permissionRequest === 'granted') {
          console.log('Location permission granted');
          return true;
        } else {
          console.log('Location permission denied sfsdfdfdfs');
          return false;
        }
      } else {
        console.log('Unknown permission status');
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const getLocation = async () => {
    const url = 'locationstore';
    const permissionResult =
      Platform.OS == 'android'
        ? await requestLocationPermission()
        : await requestLocationPermissionIOS();
    if (permissionResult == false) {
      return Platform.OS == 'android'
        ? ToastAndroid.show(
          'Location Permission denied by user',
          ToastAndroid.SHORT,
        )
        : Alert.alert(
          'Location blocked',
          'Location is blocked as denied by user , enable in settings and try again',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'Settings', onPress: () => Linking.openSettings() },
          ],
        );
    }
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(async location => {
        setCurrentLocation(location);
        getCountryCode();
        getAddressFromCoordinates(location?.latitude, location?.longitude);
        // preferences?.label == 'All' || preferences?.label == undefined
        //   ? getData({ lat: location?.latitude, lng: location?.longitude })
        // :
        findNearestMcDonalds({
          lat: location?.latitude,
          lng: location?.longitude,
        });
      })
      .catch(error => {
        setIsLoading(false);
        const { code, message } = error;
        console.warn(code, message);
      });
  };

  const getCountryCode = async (latitude, longitude) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentLocation?.latitude},${currentLocation?.longitude}&key=${apiKey}`;

    try {
      let response = await fetch(url);
      let data = await response.json();

      if (data.results.length > 0) {
        let addressComponents = data.results[0].address_components;
        let country = addressComponents.find(comp =>
          comp.types.includes('country'),
        );

        if (country) {
          setCountryCode(country.short_name);
          return country.short_name;
        }
      }
    } catch (error) {
      console.error('Error fetching country code:', error);
    }
  };



  const getAddressFromCoordinates = async (latitude, longitude) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'OK') {
        const addressComponents = data.results[0].address_components;
        const formattedAddress = data.results[0].formatted_address;

        let country = '';

        addressComponents.forEach(component => {
          if (component.types.includes('country')) {
            country = component.long_name;
          }
        });

        setLocationName(formattedAddress);
        setCountryName(country);
      } else {
        console.log('No address found');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getTripList = async () => {
    const url = 'auth/playlists';
    setGetTripLoading(true);
    const response = await Get(url, token);
    setGetTripLoading(false);
    if (response?.data != undefined) {
      setGetTripLoading(false);
      setTripList(response?.data?.data);
    }
  };

  const onPressCreate = async () => {
    const url = 'auth/playlists';
    const body = {
      name: listName,
      user_id: user?.id,
    };
    settripLoading(true);
    const response = await Post(url, body, apiHeader(token));
    settripLoading(false);
    if (response?.data != undefined) {
      settripLoading(false);
      setCreateNewTrip(false);
      getTripList()
    }
  };

  const onPressAddTrip = async (id) => {
    const url = `auth/playlists_detail/${id}`;
    const body = {
      wishlist_id: whishlistdata?.id,
    };
    setAddTripLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setAddTripLoading(false);
    if (response?.data != undefined) {
      setAddTripLoading(false);
      setSaveModalVisible(false);

    }
  };

  const saveCard = async item => {
    console.log('helllllllooooooooooooo')
    const url = 'auth/wishlist';
    const body = {
      user_id: user?.id,
      place_id: item?.place_id,
      name: item?.name,
      address: item?.address || item?.vicinity,
      types: item?.types,
      rating: item?.rating,
      totalRatings: item?.user_ratings_total === null ? item?.rating : item?.user_ratings_total,
      openNow: item?.open_now?.openNow || item?.opening_hours?.openNow,
      image: item?.photos != undefined ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${400}&photoreference=${item?.photos[0]?.photo_reference
        }&key=${apiKey}` : null,
      latitude: item?.location?.lat || item?.geometry?.location?.lat,
      longitude: item?.location?.lng || item?.geometry?.location?.lat,
      sub_category: false,
    };
    // return console.log( JSON.stringify(body , null ,2))
    setSaveIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setSaveIsLoading(false);
    // return  console.log(response)
    if (response != undefined) {
      // setSaveModalVisible(true);
      setwhishlistdata(response?.data?.data);
      // getTripList()
      // Platform.OS == 'android'
      //   ? ToastAndroid.show('Added To Wishlist', ToastAndroid.SHORT)
      //   : Alert.alert('Added To Wishlist');
    }
  };

  useEffect(() => {
    Platform.OS == 'android' ? handleEnableLocation() : getLocation();
  }, [preferences, isFocused, customLocation]);
  useEffect(() => {
    if (currentLocation) {
      getAddressFromCoordinates(
        currentLocation?.latitude,
        currentLocation?.longitude,
      );
    }
    getTripList();
  }, []);


  useEffect(() => {
    getAllTrip()
  }, [countryName])

  useEffect(() => {
    getAllTrip()
    // getA;;
    // console.log(
    //   'Running loscatddions ',
    //   currentLocation,
    //   JSON.stringify(favouriteplaces, null, 2),
    // )
    // findNearestMcDonalds(cU)
    if (Object.keys(customLocation).length > 0 && isFocused) {
      favouriteplaces?.some(
        (item, index) =>
          item?.lat == customLocation?.location?.lat &&
          item?.lng == customLocation?.location?.lng,
      ) &&
        (setFoundLocation(
          favouriteplaces?.find(
            (item, index) =>
              item?.lat == customLocation?.location?.lat &&
              item?.lng == customLocation?.location?.lng,
          ),
        ),
          setIsVisibleModal(true));
    } else {
      favouriteplaces?.some(
        (item, index) =>
          item?.lat == currentLocation?.latitude &&
          item?.lng == currentLocation?.longitude,
      ) &&
        (setFoundLocation(
          favouriteplaces?.find(
            (item, index) =>
              item?.lat == currentLocation?.latitude &&
              item?.lng == currentLocation?.longitude,
          ),
        ),
          setIsVisibleModal(true));
    }
  }, [isFocused]);

  return (
    <ScreenBoiler
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}>
      <LinearGradient
        style={{
          width: windowWidth,
          height: windowHeight,
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={Color.themeBgColor}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ minHeight: windowHeight }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.welView}>
            <CustomText style={styles.weltxt}>
              hello ,<CustomText style={styles.weltxt}>{user?.name}</CustomText>
            </CustomText>
          </View>
          <View style={styles.loc}>
            <TouchableOpacity
              onPress={() => {
                rbRef.open();
              }}
              style={[
                styles.loc,
                {
                  paddingHorizontal: moderateScale(0, 0.6),
                },
              ]}>
              <Icon
                name="location"
                color={Color.white}
                size={moderateScale(28, 0.6)}
                as={EvilIcons}
              />
              <CustomText style={styles.loctxt}>{locationName}</CustomText>
            </TouchableOpacity>


          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* <View style={styles.placesContainer}>
              {filteredUserPreference?.map((item, index) => {
                return (
                  <TouchableOpacity key={item.id} onPress={() => { }}>
                    <OptionsMenu
                      customButton={
                        <View
                          key={item?.id}
                          style={[
                            styles.sectionInnerItem,
                            {
                              backgroundColor:
                                preferences?.id == item?.id
                                  ? Color.yellow
                                  : Color.white,
                            },
                          ]}>
                          <CustomText
                            isBold
                            style={{
                              color:
                                preferences?.id == item?.id
                                  ? Color.white
                                  : Color.themeColor,
                              fontSize: moderateScale(12, 0.1),
                            }}>
                            {item?.label}
                          </CustomText>
                        </View>
                      }
                      buttonStyle={{
                        width: 40,
                        height: 30,
                        tintColor: '#000',
                      }}
                      destructiveIndex={1}
                      options={[
                        ...item?.preferences?.map(place => place?.name),
                        'All',
                      ]}
                      // options={['Invite Member', 'Bubble Management' , 'See Activity' ]}
                      actions={[
                        ...item?.preferences?.map(place => () => {
                          setPreferences({
                            id: item?.id,
                            label: place?.name,
                            name: place?.name,
                          });
                        }),
                        () => {
                          setPreferences({
                            id: item?.id,
                            label: 'All',
                            name: item?.label,
                          });
                        },
                      ]}
                    />
                  </TouchableOpacity>
                );
              })}
            </View> */}
          </ScrollView>
          <View style={styles.search}>
            <TouchableOpacity
              onPress={() => {
                navigation.toggleDrawer();
              }}
              style={styles.menuIcon}>
              <Icon
                as={Ionicons}
                name={'menu'}
                color={Color.black}
                size={6}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </TouchableOpacity>
            {/* <GooglePlacesAutocomplete
              placeholder="Search"
              textInputProps={{
                placeholderTextColor: '#5d5d5d',
              }}
              onPress={(data, details = null) => {
                setSearchData({
                  name: data?.description,
                  location: details?.geometry?.location,
                });
              }}
              query={{
                key: 'AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc',
                language: 'en',
              }}
              isRowScrollable={true}
              fetchDetails={true}
              styles={{
                textInputContainer: {
                  width: windowWidth * 0.7,
                  marginLeft: moderateScale(5, 0.6),
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
                  position: 'absolute',
                  top: 50,
                  zIndex: 10,
                  width: windowWidth * 0.8,
                  backgroundColor: 'white',
                },
                description: {
                  color: '#5d5d5d',
                },
              }}
            /> */}
            <TouchableOpacity onPress={() => {
              navigationService.navigate('SearchScreen')
            }} style={{
              backgroundColor: Color.white,
              width: windowWidth * 0.7,
              height: windowHeight * 0.046,
              borderRadius: moderateScale(15, 0.6),
              justifyContent: 'center',
              paddingHorizontal: moderateScale(10, 0.6)
            }}>
              <CustomText>Search</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuIcon}
              onPress={() => setPreferencesModalVisible(true)}>
              {preferences != null &&
                <View style={{
                  position: 'absolute',
                  right: 1,
                  top: -7,
                  width: moderateScale(15, 0.6),
                  height: moderateScale(15, 0.6),
                  borderRadius: moderateScale(7.5, 0.6),
                  backgroundColor: 'red',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <CustomText style={{
                    color: 'white'
                  }}>1</CustomText>
                </View>
              }
              <Icon
                name="filter"
                as={Ionicons}
                color={Color.white}
                size={moderateScale(28, 0.6)}
              />
            </TouchableOpacity>
          </View>
          {/* {preferences != null && ( 
             <View
            //   style={{
            //     width: windowWidth * 0.25,
            //     height: windowHeight * 0.035,
            //     backgroundColor: Color.white,
            //     marginLeft: moderateScale(15, 0.6),
            //     justifyContent: 'space-between',
            //     alignItems: 'center',
            //     borderRadius: moderateScale(20, 0.6),
            //     flexDirection: 'row',
            //     paddingHorizontal: moderateScale(10, 0.6),
            //   }}>
            //   <CustomText
            //     style={{
            //       fontSize: moderateScale(8, 0.6),
            //       textTransform: 'capitalize',
            //       color: Color.black,
            //       marginRight: moderateScale(10, 0.6),
            //     }}
            //     isBold>
            //     {preferences?.name}
            //   </CustomText>
            //   <Icon
            //     onPress={() => setPreferences(null)}
            //     name={'cross'}
            //     as={Entypo}
            //     color={Color.orange}
            //     size={moderateScale(18, 0.6)}
            //   />
            // </View>
          // )}*/}
          {/* <View
            style={{ flexDirection: 'row', marginTop: moderateScale(10, 0.3) }}>
            <FlatList
              data={cardData}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                marginTop: moderateScale(10, 0.3),
                height: windowHeight * 0.25,
              }}
              renderItem={({ item, index }) => {
                return <WelcomeCard item={item} />;
              }}
            />
          </View> */}
          <View style={styles.textContainer}>
            <CustomText
              style={{ fontSize: moderateScale(15, 0.6), color: Color.black }}
              isBold>
              As per your location we have following recommendations for you.
            </CustomText>
          </View>
          {trip_loading ? <ActivityIndicator
            color={Color.white}
            size={moderateScale(20, 0.8)}
          /> :
            <FlatList
              ListEmptyComponent={() => <CustomText style={{
                color: Color.red,
                textAlign: 'center',
                width: windowWidth * 0.9,
                marginTop: moderateScale(20, 0.6)
              }}>No data found</CustomText>}
              style={{
                paddingHorizontal: moderateScale(10, 0.6)
              }} horizontal data={trips} renderItem={({ item }) => {
                return (
                  <TripCards width={windowWidth * 0.7} height={windowHeight * 0.2} style={{ marginRight: moderateScale(10, 0.6), width: windowWidth * 0.7, height: windowHeight * 0.3 }} item={item} />
                )
              }} />
          }
          <View style={styles.textContainer}>
            <CustomText
              style={{ fontSize: moderateScale(15, 0.6), color: Color.black }}
              isBold>
              Places
            </CustomText>
            <TouchableOpacity
              style={[
                styles.menuIcon,
                {
                  backgroundColor: 'transparent',
                },
              ]}
              onPress={() => setPreferencesModalVisible(true)}
            // onPress={() => setDropDownVisible(!dropDownVisible)}
            >
              <Icon
                name="filter"
                as={Ionicons}
                color={Color.white}
                size={moderateScale(28, 0.6)}
              />
            </TouchableOpacity>
            {dropDownVisible && (
              <View style={styles.con}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: moderateScale(10, 0.6),
                    paddingVertical: moderateScale(10, 0.6)
                  }}>
                  <CustomText
                    onPress={() => {
                      setFilterPlaces('All')
                      findNearestMcDonalds()
                    }}
                    style={{
                      fontSize: moderateScale(14, 0.6),
                      color: Color.black,
                      paddingHorizontal: moderateScale(5, 0.6),
                      textTransform: 'capitalize'
                    }}>
                    All
                  </CustomText>
                  {filterplaces === 'All' &&
                    <Icon
                      style={{
                        paddingTop: moderateScale(2, 0.6),
                      }}
                      name="check"
                      as={AntDesign}
                      size={moderateScale(14, 0.6)}
                      color={Color.blue}
                    />
                  }
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: moderateScale(10, 0.6),
                  }}>
                  <CustomText
                    onPress={() => {
                      setFilterPlaces('topRated')
                      findNearestMcDonalds()
                    }}
                    style={{
                      fontSize: moderateScale(14, 0.6),
                      color: Color.black,
                      paddingHorizontal: moderateScale(5, 0.6),
                      textTransform: 'capitalize'
                    }}>
                    top Rated
                  </CustomText>
                  {filterplaces === 'topRated' &&
                    <Icon
                      style={{
                        paddingTop: moderateScale(2, 0.6),
                      }}
                      name="check"
                      as={AntDesign}
                      size={moderateScale(14, 0.6)}
                      color={Color.blue}
                    />}
                </View>

              </View>
            )}
            {/* {!isLoading && (
              <CustomText
                isBold
                onPress={() => { }}
                style={{
                  fontSize: moderateScale(13, 0.6),
                  color: Color.white,
                  textTransform: 'uppercase',
                }}>
                Searched count : {placesData?.length}
              </CustomText>
            )} */}
          </View>
          {isLoading ? (
            <View
              style={{
                width: windowWidth,
                height: windowHeight * 0.5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator size={'large'} color={Color.white} />
              <CustomText
                style={{ color: 'white', fontSize: moderateScale(14, 0.6) }}>
                Please Wait
              </CustomText>
            </View>
          ) : (
            <FlatList
              data={placesData}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 50,
                marginTop: moderateScale(10, 0.3),
                marginBottom: moderateScale(20, 0.3),
              }}
              renderItem={({ item, index }) => {
                return preferences?.label == 'All' ||
                  preferences?.label == undefined ? (
                  <PlacesCard
                    onPressSave={() =>
                      navigationService.navigate('AddTripScreen', { data: item })
                    }
                    item={item}
                    fromHome={true}
                    isLoading2={issaveLoading}
                  />
                ) : (
                  <NearPlacesCard item={item} fromHome={true} onPressSave={() =>
                    navigationService.navigate('AddTripScreen', { data: item })
                  } />
                );
              }}
            />
          )}
          <WelcomeModal
            isModalVisible={isVisibleModal}
            // setIsModdalVisible={setIsVisibleModal}
            matchLocation={foundLocation}
            setMatchLocation={setFoundLocation}
          />
          <AddPlacesModal
            setLabel={setLabel}
            label={label}
            setRef={setRbRef}
            rbRef={rbRef}
            item={currentLocation}
            locationName={locationName}
            countryCode={countryCode}
          />
          <SelectFilterModal
            show={preferencesModalVisible}
            setShow={setPreferencesModalVisible}
            onPressButton={data => {
              setPreferences(data), setPreferencesModalVisible(false);
            }}
          />
          <Modal
            transparent
            visible={isSaveModalVisible}


            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={styles.modal_inner_view}>
              <View style={styles.main_view}>
                <Icon onPress={() => setSaveModalVisible(false)} as={Entypo} name={'cross'} size={moderateScale(26, 0.6)} style={{
                  alignSelf: 'flex-end',
                  marginBottom: moderateScale(10, 0.6)
                }} />
                <ScrollView>
                  <View style={styles.text_view}>
                    <CustomText
                      isBold
                      style={{
                        fontSize: moderateScale(20, 0.6),
                      }}>
                      Save Trip to
                    </CustomText>
                    <TouchableOpacity
                      onPress={() => setCreateNewTrip(true)}
                      style={[
                        styles.text_view,
                        {
                          backgroundColor: Color.lightGrey,
                          paddingHorizontal: moderateScale(9, 0.6),
                          paddingVertical: moderateScale(7, 0.6),
                          borderRadius: moderateScale(10, 0.5),
                        },
                      ]}>
                      <Icon
                        name={'plus'}
                        as={AntDesign}
                        size={moderateScale(18, 0.6)}
                        color={Color.yellow}
                      />
                      <CustomText
                        style={{
                          fontSize: moderateScale(14, 0.6),
                          color: Color.yellow,
                          marginLeft: moderateScale(7, 0.6),
                        }}>
                        Create new Trip
                      </CustomText>
                    </TouchableOpacity>
                  </View>
                  {isCreateNewTrip === true && (
                    <View style={styles.trip_list_view}>
                      <Icon onPress={() => setCreateNewTrip(false)} as={Entypo} name={'cross'} size={moderateScale(16, 0.6)} style={{
                        alignSelf: 'flex-end',
                        marginBottom: moderateScale(10, 0.6)
                      }} />
                      <CustomText>Create New Trip List</CustomText>
                      <TextInputWithTitle
                        setText={setlistName}
                        value={listName}
                        viewHeight={0.06}
                        viewWidth={0.75}
                        inputWidth={0.86}
                        // border={1}
                        // borderColor={Color.black}
                        marginTop={moderateScale(10, 0.3)}
                        color={Color.black}
                        placeholderColor={Color.black}
                        backgroundColor={Color.lightGrey}
                        placeholder={'Enter List Name Here'}
                        placeholderTextColor={Color.darkGray}
                      />
                      <CustomButton
                        onPress={() => onPressCreate()}
                        text={
                          tripLoading ? (
                            <ActivityIndicator size="small" color={Color.white} />
                          ) : (
                            'Create'
                          )
                        }
                        textColor={Color.white}
                        height={windowHeight * 0.05}
                        width={windowWidth * 0.6}
                        bgColor={Color.themeColor}
                        paddingHorizontal={moderateScale(14, 0.6)}
                        fontSize={moderateScale(10, 0.6)}
                        marginTop={moderateScale(10, 0.6)}
                      />

                    </View>
                  )}
                  {gettripLoading ? (
                    <ActivityIndicator style={{
                      marginTop: moderateScale(10, 0.6)
                    }} size="small" color={Color.themeColor} />
                  ) : (
                    <FlatList
                      data={tripList}
                      ListEmptyComponent={() => {
                        <CustomText
                          style={{
                            fontSize: moderateScale(11, 0.6),

                          }}>
                          no data found
                        </CustomText>
                      }}
                      showsVerticalScrollIndicator={false}
                      renderItem={({ item }) => {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              onPressAddTrip(item?.id);
                            }}
                            style={{
                              width: windowWidth * 0.83,
                              height: moderateScale(50, 0.6),
                              backgroundColor: '#EEEEEEEE',
                              marginTop: moderateScale(10, 0.6),
                              borderRadius: moderateScale(10, 0.6),
                              alignItems: 'center',
                              justifyContent: 'center',
                              paddingHorizontal: moderateScale(10, 0.6),
                              borderWidth: 1.5,
                              borderColor:
                                '#EEEEEEEE',
                            }}>
                            <CustomText
                              style={{
                                fontSize: moderateScale(14, 0.6),
                                textTransform: 'capitalize',
                                width: '100%',
                                textAlign: 'left',
                              }}>
                              {item?.name}
                            </CustomText>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  )}
                </ScrollView>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </LinearGradient>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  container: {
    justifyContent: 'center',
    height: windowHeight,
    width: windowWidth,
    backgroundColor: Color.themeColor,
  },
  weltxt: {
    fontSize: moderateScale(18, 0.6),
    textTransform: 'capitalize',
    color: Color.white,
  },
  loctxt: {
    fontSize: moderateScale(13, 0.6),
    paddingTop: moderateScale(5, 0.6),
    color: Color.white,
  },
  loc: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(6, 6),
    paddingVertical: moderateScale(5, 0.6),
    justifyContent: 'space-between',
  },
  text_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomImage: {
    width: windowWidth * 0.5,
  },
  sectionInnerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 4,
    margin: moderateScale(6, 0.6),
    padding: moderateScale(6, 0.5),
    borderRadius: moderateScale(25, 0.2),
    overflow: 'hidden',
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  trip_list_view: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.7)',
    width: windowWidth * 0.8,
    marginTop: moderateScale(10, 0.6),
    alignItems: 'center',
    paddingVertical: moderateScale(10, 0.6),
    borderRadius: moderateScale(15, 0.6),
    borderWidth: 1,
    borderColor: Color.themeColor,
    zIndex: 1,
    alignSelf: 'center',
    top: moderateScale(30, 0.6)

  },
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
    height: windowHeight * 0.5,
    backgroundColor: Color.white,
    borderRadius: moderateScale(10, 0.6),
    paddingHorizontal: moderateScale(15, 0.6),
    paddingVertical: moderateScale(15, 0.6),
  },
  text: {
    borderRadius: moderateScale(15, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(7, 0.6),
    textAlign: 'center',
    alignSelf: 'center',
    overflow: 'hidden',
    margin: moderateScale(3, 0.3),
    backgroundColor: Color.white,
    fontSize: moderateScale(12, 0.6),
    color: Color.black,
    width: windowWidth * 0.25,
    textAlign: 'center',
  },
  menuIcon: {
    backgroundColor: Color.themeColor,
    width: windowWidth * 0.11,
    height: windowWidth * 0.11,
    borderRadius: (windowWidth * 0.11) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    // marginRight: moderateScale(5, 0.3),
  },

  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10, 0.6),
    marginTop: moderateScale(10, 0.3),
    width: windowWidth,
  },
  con: {
    backgroundColor: Color.white,
    height: windowHeight * 0.09,
    borderWidth: 1,
    borderColor: Color.lightGrey,
    width: windowWidth * 0.38,
    borderRadius: moderateScale(10, 0.6),
    zIndex: 1,
    position: 'absolute',
    right: 40,
    top: 35,
  },
  LogoText: {
    fontSize: moderateScale(35, 0.3),
    fontWeight: 'bold',
  },
  search: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(2, 0.6),
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: moderateScale(10, 0.6),
    // backgroundColor : 'red'
  },
  placesContainer: {
    flexDirection: 'row',
    gap: moderateScale(5, 0.25),
    marginTop: moderateScale(10, 0.3),
    justifyContent: 'flex-start',
    paddingHorizontal: moderateScale(10, 0.3),
  },
  welView: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: moderateScale(15.6),
    paddingHorizontal: moderateScale(17, 0.6),
  },
  filterIcon: {
    backgroundColor: Color.themeColor,
    width: windowWidth * 0.11,
    height: windowWidth * 0.11,
    borderRadius: (windowWidth * 0.11) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: moderateScale(5, 0.3),
    textAlign: 'center',
  },
  modal: {
    borderRadius: 20,
    width: windowWidth * 0.4,
    height: windowHeight * 0.25,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
  },
});

export default HomeScreen;
