import React, {useState, useEffect} from 'react';
import Color from '../Assets/Utilities/Color';
import {
  requestLocationPermission,
  windowHeight,
  windowWidth,
} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Platform,
  ToastAndroid,
  Alert,
  Linking,
} from 'react-native';
import CustomText from '../Components/CustomText';
import SearchContainer from '../Components/SearchContainer';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FlatList, Icon, ScrollView} from 'native-base';
import PlacesCard from '../Components/PlacesCard';
import WelcomeCard from '../Components/WelcomeCard';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Get} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import navigationService from '../navigationService';
import GetLocation from 'react-native-get-location';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import FiltersModal from './FiltersModal';
import axios from 'axios';
import OptionsMenu from 'react-native-options-menu';
import CustomImage from '../Components/CustomImage';
import NearPlacesCard from '../Components/NearPlacesCard';
import {PERMISSIONS, check, request} from 'react-native-permissions';

const HomeScreen = props => {
  // const
  const isFocused = useIsFocused();
  const token = useSelector(state => state.authReducer.token);
  const user = useSelector(state => state.commonReducer.userData);
  // console.log("🚀 ~ HomeScreen ~ user==================>:", user)
  const userPreferences = useSelector(state => state.commonReducer.prefrences);
  const filteredUserPreference = userPreferences?.map(
    item => item?.preferences,
  );

  const customLocation = useSelector(
    state => state.commonReducer.customLocation,
  );

  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState('');
  console.log('test=====> hello=====>', searchData);
  const [placesData, setplacesData] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [preferences, setPreferences] = useState([]);
  const [selectedLocation, setSelectedLoacation] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [searchedPlaces, setSearchedPlaces] = useState([]);
  const places = [
    {
      id: 'f1',
      name: 'Restaurants',
      label: 'restaurant',
      icon: 'restaurant',
      as: MaterialIcons,
      // onPress: () => {},
    },
    {
      id: 'h6',
      name: 'Gas',
      label: 'gas',
      icon: 'local-gas-station',
      as: MaterialIcons,
      // onPress: () => {},
    },
    {
      id: 't4',
      name: 'Attractions',
      icon: 'attractions',
      as: MaterialIcons,
      // onPress: () => {},
    },
    {
      id: 'h1',
      name: 'Hotels',
      label: 'hotel',
      icon: 'local-hotel',
      as: MaterialIcons,
      // onPress: () => {},
    },
    {
      id: 'f2',
      name: 'Coffee',
      icon: 'coffee-outline',
      as: MaterialCommunityIcons,
      // onPress: () => {},
    },
    {
      id: 's1',
      name: 'Groceries',
      label: 'shopping_mall',
      icon: 'local-grocery-store',
      as: MaterialIcons,
      // onPress: () => {},
    },
    {
      id: 't1',
      name: 'Parks',
      label: 'parks',
      icon: 'park',
      as: MaterialIcons,
      // onPress: () => {},
    },
  ];

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
  const getData = async location => {
    setplacesData([]);
    const url = `location?latitude=${
      Object.keys(customLocation).length > 0
        ? customLocation?.location?.lat
        : location?.lat
    }&longitude=${
      Object.keys(customLocation).length > 0
        ? customLocation?.location?.lng
        : location?.lng
    }&place[]=${preferences?.name != undefined ? preferences?.name : 'all'}`;
    // return console.log('🚀 ~ getData ~  url:', url);

    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
      setplacesData(response?.data?.places);
    }
  };
  const findNearestMcDonalds = async location => {
    const radius = 50000; // Search radius in meters (adjust as needed)
    const apiKey = 'AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc';
    const latitude = 24.871941;
    const longitude = 66.98806;
    // const keyword = 'mc donald';
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${apiKey}&location=${
      Object.keys(customLocation).length > 0
        ? customLocation?.location?.lat
        : location?.lat
    },${
      Object.keys(customLocation).length > 0
        ? customLocation?.location?.lng
        : location?.lng
    }&radius=${radius}&keyword=${preferences?.name}`;

    console.log('🚀 ~ findNearestMcDonalds ~ url:', url);
    try {
      setIsLoading(true);
      const response = await axios.get(url);
      setIsLoading(false);
      if (response != undefined) {
        setplacesData(response?.data?.results);
      }
    } catch (error) {
      console.error("Error fetching McDonald's locations:", error);
    }
  };

  const handleEnableLocation = () => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then(data => {
        console.log('data ================= =  = = =  = = = = >', data);
        setIsLoading(true);
        getLocation();
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
    console.log('test', preferences, preferences?.name);
    const url = 'locationstore';
    const permissionResult =
      Platform.OS == 'android'
        ? await requestLocationPermission()
        : await requestLocationPermissionIOS();

    // return console.log('result == >', permissionResult);
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
              {text: 'Settings', onPress: () => Linking.openSettings()},
            ],
          );
    }
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(async location => {
        console.log('test======>', preferences, preferences?.name);
        preferences?.label == 'All' || preferences?.label == undefined
          ? getData({lat: location?.latitude, lng: location?.longitude})
          : findNearestMcDonalds({
              lat: location?.latitude,
              lng: location?.longitude,
            });
      })
      .catch(error => {
        setIsLoading(false);
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  useEffect(() => {
    Platform.OS == 'android' ? handleEnableLocation() : getLocation();
  }, [preferences, isFocused, customLocation]);

  // return Object.keys(searchedPlaces)?.length > 0 &&    <CustomImage
  // source={{uri : `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${400}&photoreference=${searchedPlaces?.photos[0]?.photo_reference}&key=${apiKey}`}}
  // style={{
  // width : 200 ,
  //   height : 200 ,
  //   backgroundColor : 'red'
  // }}

  // />
  return (
    <ScreenBoiler
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}>
      <LinearGradient
        style={{
          width: windowWidth,
          height: windowHeight,
          //   justifyContent:'center'
        }}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={Color.themeBgColor}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{minHeight: windowHeight}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.placesContainer}>
              {filteredUserPreference?.map((item, index) => {
                return (
                  <TouchableOpacity key={item.id} onPress={() => {}}>
                    <OptionsMenu
                      customButton={
                        <View
                          key={item.id}
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
                            {item.label}
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
                        ...item?.preferences.map(place => place?.name),
                        'All',
                      ]}
                      // options={['Invite Member', 'Bubble Management' , 'See Activity' ]}
                      actions={[
                        ...item?.preferences.map(place => () => {
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
            </View>
          </ScrollView>
          <View style={styles.search}>
            <SearchContainer
              onPress={() => {
                navigationService.navigate('SearchScreen');
              }}
              width={windowWidth * 0.82}
              // input
              text
              // inputStyle={{
              //   height: windowHeight * 0.05,
              // }}
              style={{
                // height: windowHeight * 0.06,
                //   marginTop: moderateScale(13, 0.3),
                marginRight: moderateScale(5, 0.3),
                borderRadius: moderateScale(25, 0.3),
                alignSelf: 'center',
                justifyContent: 'space-between',
              }}
              textStyle={{
                width: windowWidth * 0.6,
                fontSize: moderateScale(10, 0.6),
                // backgroundColor :'red'
              }}
              data={searchData}
              placeHolder={customLocation?.name}
              setData={setSearchData}
              rightIcon
            />
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
          </View>

          <View
            style={{flexDirection: 'row', marginTop: moderateScale(10, 0.3)}}>
            <FlatList
              data={cardData}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                marginTop: moderateScale(10, 0.3),
                height: windowHeight * 0.25,
              }}
              renderItem={({item, index}) => {
                return <WelcomeCard item={item} />;
              }}
            />
          </View>

          <View style={styles.textContainer}>
            <CustomText
              style={{fontSize: moderateScale(15, 0.6), color: Color.black}}
              onPress={() => {}}
              isBold>
              Places
            </CustomText>
            {!isLoading && (
              <CustomText
                isBold
                onPress={() => {}}
                style={{
                  fontSize: moderateScale(13, 0.6),
                  color: Color.white,
                  textTransform: 'uppercase',
                }}>
                Searched count : {placesData?.length}
              </CustomText>
            )}
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
                style={{color: 'white', fontSize: moderateScale(14, 0.6)}}>
                Please Wait
              </CustomText>
            </View>
          ) : (
            <FlatList
              data={placesData}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                //   alignItems: 'center',
                marginTop: moderateScale(10, 0.3),
                marginBottom: moderateScale(20, 0.3),
                //   backgroundColor:'black',
                //   height: windowHeight * 0.25,
              }}
              renderItem={({item, index}) => {
                return preferences?.label == 'All' ||
                  preferences?.label == undefined ? (
                  <PlacesCard item={item} fromHome={true} />
                ) : (
                  <NearPlacesCard item={item} fromHome={true} />
                );
              }}
            />
          )}
        </ScrollView>
      </LinearGradient>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  container: {
    // alignItems: "center",
    justifyContent: 'center',
    height: windowHeight,
    width: windowWidth,
    backgroundColor: Color.themeColor,
  },
  bottomImage: {
    width: windowWidth * 0.5,
  },
  sectionInnerItem: {
    // width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 4,
    margin: moderateScale(6, 0.6),
    padding: moderateScale(6, 0.5),
    // borderWidth:0.5,
    // borderColor: Color.red,
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
  text: {
    borderRadius: moderateScale(15, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(7, 0.6),
    // backgroundColor:'green',
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
  },

  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10, 0.6),
    marginTop: moderateScale(10, 0.3),
    width: windowWidth,
  },

  LogoText: {
    fontSize: moderateScale(35, 0.3),
    fontWeight: 'bold',
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(10, 0.6),
  },
  placesContainer: {
    // backgroundColor:'white',
    // height:windowHeight*0.2,
    flexDirection: 'row',
    gap: moderateScale(5, 0.25),
    marginTop: moderateScale(10, 0.3),
    justifyContent: 'flex-start',
    paddingHorizontal: moderateScale(10, 0.3),
    // backgroundColor:'red',
  },
});

export default HomeScreen;
