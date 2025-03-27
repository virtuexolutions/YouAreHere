import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  Alert,
  Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../Components/CustomText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Icon } from 'native-base';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import PlacesCard from '../Components/PlacesCard';
import { useSelector } from 'react-redux';
import { Delete, Get, Post } from '../Axios/AxiosInterceptorFunction';
import NearPlacesCard from '../Components/NearPlacesCard';
import { ItemClick } from 'native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types';
import { MapPolygon } from 'react-native-maps';
import navigationService from '../navigationService';

const WhishListScreen = ({ item }) => {
  const isFocused = useIsFocused();
  const WhishList = useSelector(state => state.commonReducer.WishList);
  const token = useSelector(state => state.authReducer.token);

  const navigationN = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [wishListData, setWishListData] = useState([]);
  const [tripList, setTripList] = useState([])
  const [tripListloading, setTripListLoading] = useState(false)
  const [ids, setIds] = useState([]);
  console.log("🚀 ~ WhishListScreen ~ ids:", ids)
  const [seletedTrip, setSeletedTrip] = useState(null);
  const [seletedTripOpen, setseletedTripOpen] = useState(false);
  const [playListData, setplayListData] = useState([]);
  console.log("🚀 ~ WhishListScreen ~ playListData:", playListData)
  const [deleteTrip, setTripDelete] = useState(null)
  console.log("🚀 ~ WhishListScreen ~ playListData:", playListData)

  const [playListDataLoading, setplayListDataLoading] = useState(false);
  const removeCard = async () => {
    const url = `auth/wishlist/delete`;
    const body = {
      // ids: ['ChIJc7lNKki3j4ARyqLFNOl42cc'],
      ids: ids,
    };
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      getWishListData();
      setIds([]);
      Platform.OS == 'android'
        ? ToastAndroid.show('Removed from WishList', ToastAndroid.SHORT)
        : Alert.alert('Removed from WishList');
    }
  };

  const getWishListData = async () => {
    const url = 'auth/wishlist/fetch';
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response?.data?.success) {
      setWishListData(response?.data?.wish_list);
    }
  };



  const getTripList = async () => {
    const url = 'auth/playlists '
    setTripListLoading(true)
    const response = await Get(url, token)
    setTripListLoading(false)
    if (response?.data != undefined) {
      setTripListLoading(false)
      setTripList(response?.data?.data)
    }
  }

  // useEffect(() => {
  //   getPlayListData()
  // }, [seletedTrip?.id])


  // const getPlayListData = async (id) => {
  //   console.log("🚀 ~ getPlayListData ~ id:", id)
  //   const url = `auth/playlists_detail/${id}`
  //   setplayListDataLoading(true)
  //   const response = await Get(url, token)
  //   setplayListDataLoading(false)
  //   console.log("responseeeeeeeeeeeeeeeeeeeeeeee", response?.data)
  //   if (response?.data != undefined) {
  //     setplayListDataLoading(false)
  //     setplayListData(response?.data?.data)
  //   }
  // }


  const removeTrip = async (id) => {
    const url = `auth/playlists/${id}?_method=delete`
    const response = await Post(url, '', apiHeader(token))
    console.log("🚀 ~ removeTrip ~ response:", response?.data)
    if (response?.data != undefined) {
      Platform.OS == 'android'
        ? ToastAndroid.show('Trip List Deleted', ToastAndroid.SHORT)
        : Alert.alert('Trip List Deleted');
      getTripList()
    }
  }

  useEffect(() => {
    getWishListData();
    getTripList()
    // removeCard();
  }, [isFocused]);

  return (
    <ScreenBoiler
      statusBarBackgroundColor={'#ffffff'}
      statusBarContentStyle={'dark-content'}>
      <LinearGradient
        style={{
          width: windowWidth,
          height: windowHeight,
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={Color.themeBgColor}>
        <View
          style={{
            width: windowWidth,
            height: windowHeight * 0.07,
            alignItems: 'center',
            paddingVertical: moderateScale(10, 0.6),
          }}>
          <CustomText
            style={{ fontSize: moderateScale(18, 0.6), color: Color.black }}
            isBold>
            Trips List
          </CustomText>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.Rounded}
            onPress={() => {
              navigationN.toggleDrawer();
            }}>
            <Icon
              onPress={() => {
                navigationN.toggleDrawer();
              }}
              name="menu"
              as={Ionicons}
              size={moderateScale(25)}
              color={Color.black}
            />
          </TouchableOpacity>
        </View>
        {ids.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: moderateScale(20, 0.6),
              marginVertical: moderateScale(10, 0.3),
            }}>
            <CustomText
              style={{ color: 'black', fontSize: moderateScale(14, 0.6) }}
              isBold>
              {ids.length} Selected
            </CustomText>
            <Icon
              onPress={() => {
                removeCard();
              }}
              as={Ionicons}
              name={'trash-outline'}
              style={{ color: 'red' }}
              size={moderateScale(20, 0.6)}
            />
          </View>
        )}
        {tripListloading ? (
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
            data={tripList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              // marginTop: moderateScale(10, 0.3),
              // marginBottom: moderateScale(20, 0.3),
            }}
            renderItem={({ item, index }) => {
              return (
                <>
                  <TouchableOpacity onPress={() => {
                    setSeletedTrip(item)
                    setseletedTripOpen(!seletedTripOpen)
                    navigationService.navigate('TripDetailsLocation', { id: item?.id })
                  }} onLongPress={() => setTripDelete(item?.id)} style={{
                    width: windowWidth * 0.95,
                    height: windowHeight * 0.07,
                    backgroundColor: 'white',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    alignSelf: 'center',
                    borderRadius: moderateScale(10, 0.6),
                    marginBottom: moderateScale(10, 0.3),
                    paddingHorizontal: moderateScale(5, 0.3),
                    borderWidth: 2,
                    borderColor: seletedTrip?.id === item?.id && seletedTripOpen ? Color.black : Color.white
                  }}>
                    <CustomText
                      style={{
                        fontSize: moderateScale(13, 0.6), color: Color.black,
                        textTransform: "capitalize",
                        marginLeft: moderateScale(10, 0.6)
                      }}
                      numberOfLines={1}
                      isBold
                    >{item?.name}</CustomText>
                    {deleteTrip === item?.id &&
                      <Icon onPress={() => {
                        removeTrip(deleteTrip)
                      }
                      } name={'delete'} as={AntDesign} style={{ color: Color.themeColor }}
                        size={moderateScale(20, 0.6)} />
                    }
                    {/* <View style={{
                      flexDirection: 'row',
                      width: windowWidth * 0.15,
                      justifyContent: deleteTrip === item?.id ? "space-between" : 'flex-end',
                      alignItems: 'center'
                    }}>
                      <Icon onPress={() => {
                        setSeletedTrip(item)
                        setseletedTripOpen(!seletedTripOpen)
                        getPlayListData(item?.id)
                      }
                      } name={seletedTrip?.id === item?.id && seletedTripOpen ? 'up' : 'down'} as={AntDesign} style={{ color: Color.themeColor }}
                        size={moderateScale(20, 0.6)} />
                   
                    </View> */}
                  </TouchableOpacity>
                  {/* <>
                    {seletedTrip?.id === item?.id && seletedTripOpen && (
                      <View style={{
                        width: windowWidth * 0.95,
                        height: windowHeight * 0.6,
                        backgroundColor: 'white',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        alignSelf: 'center',
                        borderRadius: moderateScale(10, 0.6),
                        paddingHorizontal: moderateScale(5, 0.3),
                      }}>
                        {playListDataLoading ? (
                          <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1
                          }}>
                            <ActivityIndicator size={'large'} color={Color.themeColor} />
                          </View>
                        ) : (
                          <>
                            {playListData.map((item) => {
                              return (
                                <FlatList
                                  data={item?.detail}
                                  keyExtractor={(item, index) => index.toString()}
                                  ListEmptyComponent={<CustomText style={{
                                    fontSize: moderateScale(15, 0.6),
                                    color: Color.red,
                                    marginTop: moderateScale(10, 0.6),
                                    textAlign: "center"
                                  }}>No Data Found</CustomText>}
                                  renderItem={({ item }) => (
                                    <NearPlacesCard
                                      isshownSave={false}
                                      item={item}
                                      style={styles.card}
                                      fromHome={true}
                                      onPressSave={() => saveCard(item)}
                                    />
                                  )}
                                />
                              )
                            })}
                          </>
                        )}
                      </View>
                    )}

                  </> */}
                </>
              )
              // return <PlacesCard
              //   item={item}
              //   fromWishList={true}
              //   setIds={setIds}
              //   ids={ids}
              // />
              // return  item?.sub_category == true ? (
              //   <NearPlacesCard
              //     item={item}
              //     fromWishList={true}
              //     setIds={setIds}
              //     ids={ids}
              //   />
              // ) : (
              //   <PlacesCard
              //     item={item}
              //     fromWishList={true}
              //     setIds={setIds}
              //     ids={ids}
              //   />
              // );
            }}
          />
        )}
      </LinearGradient>
    </ScreenBoiler>
  );
};

const styles = StyleSheet.create({
  Rounded: {
    width: windowWidth * 0.09,
    height: windowWidth * 0.09,
    borderRadius: (windowWidth * 0.09) / 2,
    backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  card: {
    width: windowWidth * 0.92,
    height: windowHeight * 0.10,
    backgroundColor: Color.lightGrey,
    marginBottom: moderateScale(0, 0.3),
  }
});

export default WhishListScreen;
