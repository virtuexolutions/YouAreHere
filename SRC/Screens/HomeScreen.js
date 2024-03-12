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

const HomeScreen = (props) => {
  // const 
  const isFocused = useIsFocused();
  const token = useSelector(state => state.authReducer.token);
  const user = useSelector(state => state.commonReducer.userData);
  const customLocation = useSelector(
    state => state.commonReducer.customLocation,
  );

  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState('');
  const [placesData, setplacesData] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [preferences, setPreferences] = useState([]);
  // console.log('🚀 ~ HomeScreen ~ preferences:', preferences);
  const [selectedLocation, setSelectedLoacation] = useState();
  const [refreshing, setRefreshing] = React.useState(false);
  // const [places, setPlaces] = useState([]);
  const places = [
    {
      id: 'f1',
      name: 'Restaurants',
      icon: 'restaurant',
      as: MaterialIcons,
      // onPress: () => {},
    },
    {
      id: 'h6',
      name: 'Gas',
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
      icon: 'local-grocery-store',
      as: MaterialIcons,
      // onPress: () => {},
    },
    {
      id: 't1',
      name: 'Parks',
      icon: 'park',
      as: MaterialIcons,
      // onPress: () => {},
    },
    {
      id: 8,
      name: 'More',
      icon: 'more-horiz',
      as: MaterialIcons,
      // onPress: () => {
      //   // navigationService.navigate("filters")
      // },
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

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      Platform.OS == 'android' ? handleEnableLocation() : getLocation();
    }, 2000);
  };
  const getData = async location => {
    setplacesData([]);
    var url2 = '';
    preferences.map((item, index) => {
      url2 += `&place[]=${item?.name}`;
    });

    const url = `location?latitude=${
      Object.keys(customLocation).length > 0
        ? customLocation?.location?.lat
        : location?.lat
    }&longitude=${
      Object.keys(customLocation).length > 0
        ? customLocation?.location?.lng
        : location?.lng
    }${url2}`;

    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
      setplacesData(response?.data?.places);
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

  const getLocation = async () => {
    const url = 'locationstore';
    Platform.OS == 'android' && (await requestLocationPermission());
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })

      .then(async location => {
        console.log({lat: location?.latitude, lng: location?.longitude});
        getData({lat: location?.latitude, lng: location?.longitude});
      })
      .catch(error => {
        setIsLoading(false);
        const {code, message} = error;
        console.warn(code, message);
      });
  };


  const findNearestMcDonalds = async() => {
   
  
    const radius = 50000; // Search radius in meters (adjust as needed)
    const apiKey = 'AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc';
    const latitude = 24.871941;
    const longitude = 66.988060;
    const keyword = 'rv_park'
    // const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${apiKey}&location=${latitude},${longitude}&radius=${radius}&keyword=chinese resturant`;
   
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${"36 markit ali hussain downlod wala"}&key=${apiKey}&keyword=${keyword}`
    


    console.log('apiStart')
    try {
    const response = await axios.get(url)
    if(response != undefined){
      // console.log(JSON.stringify( response?.data?.predictions , null ,2))
      const filteredPredictions = response?.data?.predictions.filter(prediction =>
        prediction.types.includes(keyword)
      );
      console.log('result here' , JSON.stringify(filteredPredictions , null ,2))
    }
    }
    catch(error){ console.error('Error fetching McDonald\'s locations:', error)};
    
     
  };

  // useEffect(() => {
  //   Platform.OS == 'android' ? handleEnableLocation() : getLocation();
  // }, [preferences, isFocused, customLocation]);



  useEffect(() => {
    findNearestMcDonalds()
  }, [])
  
  return  (
    
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
          style={{minHeight: windowHeight * 0.9}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.placesContainer}>
              {places?.map((item, index) => {
                return (
                  <TouchableOpacity
                  disabled={isLoading}
                  activeOpacity={0.8}
                    onPress={() => {
                      if (item?.name == 'More') {
                        setIsVisibleModal(true);
                      } else {
                        if (
                          preferences?.some(
                            (item1, index) => item1?.id == item?.id,
                          )
                        ) {
                          setPreferences(
                            preferences?.filter(
                              (item2, index) => item2?.id != item?.id,
                            ),
                          );
                        } else {
                          setPreferences(prev => [...prev, item]);
                        }
                      }
                    }}>
                    <View
                      key={item.id}
                      style={[
                        styles.sectionInnerItem,
                        {
                          backgroundColor: preferences?.some(
                            (item1, index) => item1?.id == item?.id,
                          )
                            ? Color.yellow
                            : Color.white,
                        },
                      ]}>
                      <Icon
                        as={item.as}
                        name={item.icon}
                        size={moderateScale(14, 0.1)}
                        color={
                          preferences?.some(
                            (item1, index) => item1?.id == item?.id,
                          )
                            ? Color.white
                            : Color.themeColor
                        }
                      />
                      <CustomText
                        isBold
                        style={{
                          color: preferences?.some(
                            (item1, index) => item1?.id == item?.id,
                          )
                            ? Color.white
                            : Color.themeColor,
                          fontSize: moderateScale(12, 0.1),
                        }}>
                        {item.name}
                      </CustomText>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView> */}
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
                return <PlacesCard item={item} fromHome={true} />;
              }}
            />
          )}
          <FiltersModal
            isVisibleModal={isVisibleModal}
            setIsVisibleModal={setIsVisibleModal}
            preferences={preferences}
            setPreferences={setPreferences}
          />
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
