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

const HomeScreen = () => {
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
  const [preferences, setPreferences] = useState([]);
  const [places, setPlaces] = useState([]);
  const [wishList, setWishList] = useState([]);

  const [refreshing, setRefreshing] = React.useState(false);

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
      url2 += `&place[]=${item}`;
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

  useEffect(() => {
    Platform.OS == 'android' ? handleEnableLocation() : getLocation();
  }, [preferences, isFocused, customLocation]);
  useEffect(() => {
    setPlaces(
      user?.preferences?.length > 0
        ? user?.preferences?.map(item => item?.preferences)
        : [],
    );
  }, [isFocused]);

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
          style={{minHeight: windowHeight * 0.9}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.placesContainer}>
              {places?.map(item => {
                return (
                  <CustomText
                    numberOfLines={1}
                    onPress={() => {
                      if (preferences.includes(item)) {
                        setPreferences(preferences.filter(i => i !== item));
                      } else {
                        setPreferences(prev => [...prev, item]);
                      }
                    }}
                    style={[
                      styles.text,
                      preferences.includes(item) && {
                        backgroundColor: Color.yellow,
                        color: 'white',
                        borderColor: 'white',
                        borderWidth: 1,
                      },
                    ]}>
                    {item}
                  </CustomText>
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
                return <PlacesCard item={item} fromHome={true}/>;
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
    marginTop: moderateScale(10, 0.3),
    justifyContent: 'flex-start',
    paddingHorizontal: moderateScale(10, 0.3),
  },
});

export default HomeScreen;
