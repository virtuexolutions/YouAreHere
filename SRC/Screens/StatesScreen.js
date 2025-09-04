import { useIsFocused, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Icon } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { Get, Post } from '../Axios/AxiosInterceptorFunction';
import CountryCard from '../Components/CountryCard';
import CustomButton from '../Components/CustomButton';
import CustomText from '../Components/CustomText';
import ScreenBoiler from '../Components/ScreenBoiler';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';

const StatesScreen = props => {
  const { data } = props?.route?.params;
  // const  stateData  = props?.route?.params?.stateData

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [cities, setCities] = useState([]);
  console.log('===================>', cities)
  const [citiesmodalVisible, setCitiesModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [citiesList, setCitiesList] = useState([]);
  const [cityData, setCityData] = useState({});
  console.log("🚀 ~ StatesScreen ~ cityData:", cityData)
  const [countryCode, setCountryCode] = useState(null);
  const token = useSelector(state => state.authReducer.token);
  const user = useSelector(state => state.commonReducer.userData);

  const fetchStates = async countryName => {
    console.log('from fetch function');
    try {
      const response = await axios.post(
        'https://countriesnow.space/api/v0.1/countries/states',
        {
          country: data?.name,
        },
      );
      // console.log('first= =========================== >',response.data.data?.states)

      setCities(response.data.data?.states);
    } catch (error) {
      console.log('Error fetching cities', error);
    }
  };

  useEffect(() => {
    fetchStates();
    const countryCode = data.uri.split('/').pop().split('.')[0].toUpperCase();
    setCountryCode(countryCode);
  }, []);

  useEffect(() => {
    if (searchQuery != '') {
      setFilteredCities(
        cities.filter(item =>
          item?.name.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      );
    }
  }, [searchQuery]);

  // useEffect(() => {
  //     getCityDetails();
  // }, [selectedCities])



  const getStates = async () => {
    const url = `auth/states?country_id=${data?.id}`;
    setIsLoading(true);
    const response = await Get(url, token);
    if (response != undefined) {
      setIsLoading(false);
      //  return   console.log("🚀 ~ getStates ~ response ================== >>>>>>:", response?.data)
      setCitiesList(response?.data?.data);
    }
  };
  useEffect(() => {
    getStates();
  }, [isFocused]);

  const getCityDetails = async item => {
    const apiKey = 'AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc';
    let fetchedData = [];
    try {
      const placesUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=famous+landmarks+in+${item?.name}+${item?.state_code}+USA&key=${apiKey}`;
      ;
      console.log("🚀 ~ getCityDetails ~ placesUrl frommmmmmmmmmmmm state :", placesUrl)
      const response = await axios.get(placesUrl);
      console.log("🚀 ~ getCityDetails ~ response  frommmmmmmmmmmmm state :", response?.data)

      if (response.data.results.length > 0) {
        const photoReference =
          response.data.results[0]?.photos?.[0]?.photo_reference;
        console.log('🚀 ~ getCityDetails ~ photoReference:', photoReference);

        if (photoReference) {
          const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
          fetchedData.push({ name: item, uri: photoUrl });
          console.log('🚀 ~ getCityDetails ~ photoUrl:', photoUrl);
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
    const firstUri = fetchedData.length > 0 ? fetchedData[0].uri : null;
    setCityData({ name: item, image: firstUri, id: data?.id });
  };

  const onPressSave = async () => {
    const url = 'auth/states';
    const body = {
      country_id: cityData?.id,
      name: cityData?.name?.name,
      image: cityData?.image,
    };
    // return  console.log('first=   ======== = === == >>> ',body)

    setIsLoading(false);
    const response = await Post(url, body, apiHeader(token));
    // return  console.log('first=   ======== = === == >>> response ',response?.data)

    setIsLoading(false);
    if (response != undefined) {
      setCitiesList(prev => [
        ...prev,
        {
          country_id: cityData?.id,
          name: cityData?.name?.name,
          image: cityData?.image,
        },
      ]);
      setCityData({});
      setCitiesModalVisible(false);
    }
  };

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
        <View style={styles.row}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.Rounded}
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon
              onPress={() => {
                navigation.goBack();
              }}
              name="chevron-back"
              as={Ionicons}
              size={moderateScale(25, 0.6)}
              color={Color.black}
            />
          </TouchableOpacity>
          <CustomButton
            text={'Add state'}
            isBold
            textColor={Color.themeColor}
            height={windowHeight * 0.03}
            bgColor={Color.white}
            fontSize={moderateScale(11, 0.6)}
            borderRadius={moderateScale(5, 0.3)}
            marginTop={moderateScale(20, 0.3)}
            style={{
              marginRight: moderateScale(10, 0.3),
            }}
            onPress={() => {
              setCitiesModalVisible(true);
            }}
          />
        </View>
        {isLoading ? (
          <View
            style={{
              width: windowWidth,
              height: windowHeight * 0.8,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size={'large'} color={Color.themeColor} />
            <CustomText
              style={{
                color: Color.white,
                fontSize: moderateScale(13, 0.6),
              }}>
              Please Wait
            </CustomText>
          </View>
        ) : (
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
                <View
                  style={{
                    width: windowWidth,
                    height: windowHeight * 0.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <CustomText>No Data Found</CustomText>
                </View>
              );
            }}
            renderItem={({ item, index }) => {
              return (
                <CountryCard
                  name={item?.name}
                  uri={item?.image}
                  onPress={() =>
                    navigation.navigate('CitiesScreen', {
                      data: item,
                      country: data?.name,
                      type: data?.type,
                      country_id: data?.id
                    })
                  }
                />
              );
            }}
          />
        )}
      </LinearGradient>
      <Modal
        isVisible={citiesmodalVisible}
        onBackButtonPress={() => {
          setCitiesModalVisible(false);
        }}>
        <View style={styles.cities_card}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: windowWidth * 0.85,
            }}>
            <CustomText isBold style={styles.heading}>
              Select states
            </CustomText>
            <Icon
              name="cross"
              as={Entypo}
              size={moderateScale(25, 0.6)}
              color={Color.black}
              onPress={() => setCitiesModalVisible(false)}
            />
          </View>
          <TextInputWithTitle
            placeholder={'Search states'}
            setText={setSearchQuery}
            value={searchQuery}
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
            alignSelf={'center'}
            marginBottom={moderateScale(20, 0.6)}
          />
          <FlatList
            data={searchQuery != '' ? filteredCities : cities}
            renderItem={({ item, index }) => {
              console.log("🚀 ~ item:========================== ..", item)
              return (
                <TouchableOpacity
                  style={[
                    styles.cites_btn,
                    {
                      backgroundColor:
                        cityData?.name?.name === item?.name
                          ? Color.themeColor
                          : 'white',
                    },
                  ]}
                  onPress={() => {
                    if (
                      citiesList.findIndex(
                        item1 => item1?.name?.name == item?.name,
                      ) != -1
                    ) {
                      Platform.OS == 'android'
                        ? ToastAndroid.show(
                          'State already added',
                          ToastAndroid.SHORT,
                        )
                        : alert('State already added');
                    } else {
                      getCityDetails(item);
                      setSearchQuery('');
                    }
                  }}>
                  {cityData?.name?.name === item?.name && isLoading ? (
                    <ActivityIndicator />
                  ) : (
                    <CustomText style={styles.text}>{item?.name}</CustomText>
                  )}
                </TouchableOpacity>
              );
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
  );
};

export default StatesScreen;

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
    justifyContent: 'space-between',
  },
  cities_card: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.5,
    backgroundColor: Color.white,
    borderRadius: moderateScale(20, 0.6),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(20, 0.6),
  },
  cites_btn: {
    width: windowWidth * 0.83,
    paddingVertical: moderateScale(10, 0.6),
    borderRadius: moderateScale(10, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
    marginBottom: moderateScale(10, 0.6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: Color.themeColor,
    borderBottomWidth: 1,
  },
});
