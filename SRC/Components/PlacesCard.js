import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Platform,
  Linking,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CustomText from './CustomText';
import CustomImage from './CustomImage';
import { moderateScale } from 'react-native-size-matters';
import { Icon, Divider, Radio, Button } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import RatingComponent from './RatingComponent';
import { Get, Post } from '../Axios/AxiosInterceptorFunction';
import Modal from 'react-native-modal';
import CustomButton from './CustomButton';
import ModalReview from './ModalReview';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';
import navigationService from '../navigationService';
import Share from 'react-native-share';
import axios from 'axios';

const PlacesCard = ({
  item,
  fromWishList,
  setIds,
  ids,
  onPressSave,
  fromHome,
  isLoading2,
  style,
  isshownSave = true
}) => {
  const token = useSelector(state => state.authReducer.token);
  const WhishList = useSelector(state => state.commonReducer.WishList);
  const user = useSelector(state => state.commonReducer.userData);
  const apiKey = 'AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc';
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const [ref, setRef] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [reviewData, setReviewData] = useState([]);
  // const [isLoading2, setIsLoading2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [place_id, setPlaceId] = useState('')
  const [details, setDetails] = useState({})
  const getData = async () => {
    const url = `auth/review_detail/${item.id}`;
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);

    if (response != undefined) {
      setReviewData(response?.data?.reviews);
    }
  };

  useEffect(() => {
    getPlaceDetails()
  }, [place_id])

  // const saveCard = async () => {
  //   const url = 'auth/wishlist';
  //   const body = {
  //     user_id: user?.id,
  //     place_id: item?.place_id,
  //     name: item?.name,
  //     address: item?.address,
  //     types: item?.types,
  //     rating: item?.rating,
  //     totalRatings: item?.rating,
  //     openNow: item?.open_now?.openNow,
  //     image: item?.image,
  //     latitude: item?.location?.lat,
  //     longitude: item?.location?.lng,
  //     sub_category: false,
  //   };
  //   console.log('🚀 ~ saveCard ~ body:', body);
  //   setIsLoading2(true);
  //   const response = await Post(url, body, apiHeader(token));
  //   setIsLoading2(false);
  //   if (response?.data?.success) {
  //     console.log(response?.data);
  //     // setSaveModalVisible(true);
  //     Platform.OS == 'android'
  //       ? ToastAndroid.show('Added To Wishlist', ToastAndroid.SHORT)
  //       : Alert.alert('Added To Wishlist');
  //   }
  // };

  useEffect(() => {
    if (isModalVisible) {
      getData();
    }
  }, [isModalVisible]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const sharePlace = async () => {
    //   Share.open({url: `${item?.geometry?.location?.lat},${item?.geometry?.location?.lng}`})
    // .then((res) => {
    //   console.log(res);
    // })
    // .catch((err) => {
    //   err && console.log(err);
    // });
    // const navigateToMap = () => {
    const scheme = Platform.select({
      ios: 'maps://0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${item?.latitude},${item?.longitude}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    console.log(url);

    const shareResponse = await Share.open({ url: url });
  };

  const navigateToMap = () => {
    const scheme = Platform.select({
      ios: 'maps://0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${item?.latitude},${item?.longitude}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };


  const getPlaceDetails = async () => {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${apiKey}&fields=name,formatted_address,formatted_phone_number,opening_hours,website,plus_code`;
    try {
      const response = await axios.get(url);
      setDetails(response?.data?.result)
      // return response?.data?.result;
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.container,
          {
            backgroundColor:
              ids?.some(data => data == item?.id)
                ? '#E0FFFF'
                : 'white',
          },
          style
        ]}
        onLongPress={() => {
          !fromHome &&
            !ids?.some(data => data == item?.id) &&
            setIds(prev => [...prev, item?.id]);
        }}
        onPress={() => {
          setPlaceId(item?.place_id)
          if (!fromHome) {
            if (ids.length > 0) {
              !ids?.some(data => data == item?.id)
                ? setIds(prev => [...prev, item?.id])
                : setIds(ids?.filter(data => data != item?.id));
            } else {
              ref.open();
            }
          } else {
            ref.open();
          }
        }}>
        <View style={styles.imageContainer}>
          <CustomImage
            source={
              item?.photos ?
                { uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item?.photos[0]?.photo_reference}&key=AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc` }
                :
                ['', undefined, null].includes(item?.image)
                  ? require('../Assets/Images/errorimage.png')
                  : { uri: item?.image }
            }
            style={styles.image}
            resizeMode={'cover'}
          />
        </View>
        <View style={{ width: windowWidth * 0.45 }}>
          <CustomText
            style={{ fontSize: moderateScale(13, 0.6), color: Color.black }}
            numberOfLines={1}
            isBold>
            {item?.name}
          </CustomText>
          <CustomText
            style={{
              fontSize: moderateScale(10, 0.6),
              color: Color.black,
            }}
            numberOfLines={1}>
            {item?.address}
          </CustomText>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            height: windowWidth * 0.085,
            width: windowWidth * 0.085,
            borderRadius: (windowWidth * 0.085) / 2,
            backgroundColor: '#1a73e8',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            navigateToMap();
          }}>
          <Icon
            name={'directions'}
            as={MaterialCommunityIcons}
            size={moderateScale(18, 0.6)}
            color={Color.white}
            onPress={() => {
              navigateToMap();
            }}
          />
        </TouchableOpacity>
        {isshownSave &&
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              fromWishList
                ? Platform?.OS == 'android'
                  ? ToastAndroid.show('Already added', ToastAndroid.SHORT)
                  : Alert.alert('Already added')
                : onPressSave();
              // saveCard();
            }}
            style={{
              height: windowWidth * 0.09,
              width: windowWidth * 0.09,
              borderRadius: (windowWidth * 0.09) / 2,
              backgroundColor: '#1a73e8',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 5,
            }}>
            <Icon
              name={isLoading2 ? 'reload-sharp' : 'bookmark-outline'}
              as={Ionicons}
              size={moderateScale(18, 0.3)}
              color={'white'}
              onPress={() => {
                fromWishList
                  ? Platform?.OS == 'android'
                    ? ToastAndroid.show('Already added', ToastAndroid.SHORT)
                    : Alert.alert('Already added')
                  : onPressSave();
                //  saveCard();
              }}
            />
          </TouchableOpacity>
        }
      </TouchableOpacity>
      {/* <Modal isVisible={true} onBackdropPress={() => {
        setModalVisible(!isModalVisible);
      }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View></View>
      </Modal> */}
      <RBSheet
        ref={ref => {
          setRef(ref);
        }}
        closeOnDragDown={true}
        dragFromTopOnly={true}
        openDuration={250}
        height={windowHeight * 0.8}
        customStyles={{
          container: {
            borderTopEndRadius: moderateScale(30, 0.6),
            borderTopLeftRadius: moderateScale(30, 0.6),
            overflow: 'hidden',
          },
        }}>
        <View style={{ height: windowHeight, width: windowWidth }}>
          <View
            style={{
              height: windowHeight * 0.3,
              width: windowWidth,
              overflow: 'hidden',
              justifyContent: 'center',
              zIndex: -1,
              marginTop: moderateScale(-25, 0.3),
            }}>
            <CustomImage
              source={
                item?.photos
                  ? { uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item?.photos[0]?.photo_reference}&key=AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc` }
                  : ['', undefined, null].includes(item?.image)
                    ? require('../Assets/Images/errorimage.png')
                    : { uri: item?.image }
              }
              style={{ width: '100%', height: '100%', backgroundColor: 'white' }}
              resizeMode={'stretch'}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: moderateScale(10, 0.6),
              marginTop: moderateScale(10, 0.3),
            }}>
            <CustomText
              numberOfLines={2}
              style={{
                width: windowWidth * 0.6,
                fontSize: moderateScale(17, 0.6),
                color: Color.black,
              }}>
              {item?.name}
            </CustomText>

            <CustomButton
              onPress={toggleModal}
              text={'Reviews'}
              textColor={Color.white}
              height={windowHeight * 0.03}
              bgColor={Color.themeColor}
              paddingHorizontal={moderateScale(14, 0.6)}
              fontSize={moderateScale(10, 0.6)}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: moderateScale(5, 0.3),
            }}>
            <CustomText
              style={{
                fontSize: moderateScale(13, 0.6),
                color: Color.themeDarkGray,
                paddingLeft: moderateScale(10, 0.6),
              }}>
              {`${item?.rating} `}
            </CustomText>
            <RatingComponent
              disable={true}
              rating={item?.rating}
              starColor={'#Fdcc0d'}
              starStyle={{
                marginRight: moderateScale(1, 0.3),
                marginTop: moderateScale(1, 0.3),
              }}
              starSize={moderateScale(11, 0.3)}
            />
            <CustomText
              style={{
                fontSize: moderateScale(13, 0.6),
                color: Color.themeDarkGray,
              }}>
              {` (${item?.totalRatings})` || `(${item?.user_ratings_total})`}
            </CustomText>
          </View>

          <View
            style={{
              width: windowWidth * 0.95,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <CustomText
              style={{
                fontSize: moderateScale(13, 0.6),
                color: Color.themeDarkGray,
                paddingLeft: moderateScale(10, 0.6),
                marginTop: moderateScale(5, 0.3),
              }}>
              {item?.types[0]}
            </CustomText>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                height: windowWidth * 0.1,
                width: windowWidth * 0.1,
                borderRadius: (windowWidth * 0.1) / 2,
                backgroundColor: '#1a73e8',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                ref.close();
                navigationService.navigate('NotepadDesign', {
                  item: { uri: item?.image, name: item?.name },
                  fromDetails: true,
                });
              }}>
              <Icon
                onPress={() => {
                  ref.close();
                  navigationService.navigate('NotepadDesign', {
                    item: { uri: item?.image, name: item?.name },
                    fromDetails: true,
                  });
                }}
                name="note-edit-outline"
                as={MaterialCommunityIcons}
                size={moderateScale(20)}
                color={Color.white}
              />
            </TouchableOpacity>
          </View>

          <Divider my="2" _light={{ bg: 'muted.300' }} />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: windowWidth * 0.9,
              alignItems: 'center',
              marginTop: moderateScale(10, 0.3),
              paddingLeft: moderateScale(10, 0.6),
            }}>
            <CustomText
              style={{
                color:
                  ['', null, undefined].includes(item?.openNow) &&
                    item.openNow &&
                    item.openNow.toLowerCase() == 'yes'
                    ? 'green'
                    : 'red',

                // item?.openNow.toLowerCase() == 'yes' ? 'green' : 'red',
              }}>
              {['', null, undefined].includes(item?.openNow) &&
                item.openNow &&
                item.openNow.toLowerCase() == 'yes'
                ? 'Open Now'
                : 'Closed'}
              {/* {item?.openNow.toLowerCase() == 'yes' ? 'Open Now' : 'Closed'} */}
            </CustomText>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigateToMap();
              }}
              style={{
                height: windowWidth * 0.1,
                width: windowWidth * 0.1,
                borderRadius: (windowWidth * 0.1) / 2,
                backgroundColor: '#1a73e8',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name="directions"
                as={MaterialCommunityIcons}
                size={moderateScale(20)}
                color={Color.white}
                onPress={() => {
                  navigateToMap();
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                fromWishList
                  ? Platform?.OS == 'android'
                    ? ToastAndroid.show('Already added', ToastAndroid.SHORT)
                    : Alert.alert('Already added')
                  : saveCard();
              }}
              activeOpacity={0.5}
              style={{
                height: windowWidth * 0.1,
                width: windowWidth * 0.1,
                borderRadius: (windowWidth * 0.1) / 2,
                backgroundColor: '#1a73e8',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name="bookmark-outline"
                as={Ionicons}
                size={moderateScale(20)}
                color={Color.white}
                onPress={() => {
                  fromWishList
                    ? Platform?.OS == 'android'
                      ? ToastAndroid.show('Already added', ToastAndroid.SHORT)
                      : Alert.alert('Already added')
                    : saveCard();
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={sharePlace}
              activeOpacity={0.5}
              style={{
                height: windowWidth * 0.1,
                width: windowWidth * 0.1,
                borderRadius: (windowWidth * 0.1) / 2,
                backgroundColor: '#1a73e8',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name="share-google"
                as={EvilIcons}
                size={moderateScale(20)}
                color={Color.white}
              />
            </TouchableOpacity>
          </View>

          <Divider my="2" _light={{ bg: 'muted.300' }} style={{ marginTop: 20 }} />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              paddingHorizontal: moderateScale(10, 0.6),
            }}>
            <Icon
              name="location"
              as={Entypo}
              size={moderateScale(20)}
              color={Color.Darkblue}
            />

            <CustomText
              style={{
                fontSize: moderateScale(12, 0.6),
                color: Color.black,
                width: windowWidth * 0.85,
              }}>
              {item?.address || item?.address?.formatted_address || details?.formatted_address}
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              paddingHorizontal: moderateScale(10, 0.6),
              marginTop: moderateScale(10, 0.3),
            }}>
            <Icon
              name="globe"
              as={Entypo}
              size={moderateScale(20)}
              color={Color.Darkblue}
            />

            <CustomText
              style={{
                fontSize: moderateScale(12, 0.6),
                color: Color.black,
                width: windowWidth * 0.85,
                color: 'blue',
              }}>
              {details?.website}
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              paddingHorizontal: moderateScale(10, 0.6),
              marginTop: moderateScale(10, 0.3),
            }}>
            <Icon
              name="phone"
              as={Entypo}
              size={moderateScale(20)}
              color={Color.Darkblue}
            />

            <CustomText
              style={{
                fontSize: moderateScale(12, 0.6),
                color: Color.black,
                width: windowWidth * 0.85,
                color: 'blue',
              }}>
              {details?.formatted_phone_number}</CustomText>
          </View>
        </View>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => {
            setModalVisible(!isModalVisible);
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: windowHeight * 0.85,
              width: windowWidth * 0.95,
              backgroundColor: '#eee',
              borderTopLeftRadius: moderateScale(20, 0.3),
              borderBottomRightRadius: moderateScale(20, 0.3),
              borderWidth: 4,
              borderColor: Color.themeColor,
            }}>
            <CustomText
              style={{
                fontSize: moderateScale(19, 0.6),
                marginTop: moderateScale(10, 0.6),
                paddingLeft: moderateScale(10, 0.6),
                color: Color.black,
              }}>
              Review
            </CustomText>

            <Divider my="2" _light={{ bg: 'muted.400' }} style={{ marginTop: 5 }} />
            {isLoading ? (
              <View
                style={{
                  width: windowWidth * 0.95,
                  height: windowHeight * 0.7,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ActivityIndicator size={'large'} color={Color.themeColor} />
                <CustomText
                  style={{
                    color: Color.themeColor,
                    fontSize: moderateScale(14, 0.6),
                  }}>
                  Please Wait
                </CustomText>
              </View>
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: moderateScale(50, 0.6),
                }}
                data={reviewData}
                renderItem={({ item, index }) => {
                  return <ModalReview item={item} />;
                }}
              />
            )}

            {/* <Button title="Hide modal" onPress={toggleModal} /> */}
          </View>
        </Modal>
      </RBSheet>
    </>
  );
};

export default PlacesCard;

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.95,
    height: windowHeight * 0.11,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: moderateScale(20, 0.6),
    marginBottom: moderateScale(10, 0.3),
    paddingHorizontal: moderateScale(5, 0.3),
  },
  image: {
    height: windowHeight * 0.1,
    width: windowWidth * 0.19,
    borderRadius: moderateScale(15, 0.6),
    backgroundColor: 'white',
    // marginLeft: moderateScale(10, 0.3),
    overflow: 'hidden',
  },
  listImg: {
    height: windowHeight * 0.12,
    width: windowWidth * 0.19,
    marginLeft: moderateScale(5, 0.3),
    borderRadius: moderateScale(10, 0.6),
    // paddingVertical: moderateScale(20, 0.6),
    overflow: 'hidden',
    backgroundColor: 'black',
  },
  viewLocation: {
    fontSize: moderateScale(8, 0.6),
    color: Color.black,
    borderColor: Color.themeColor,
    borderWidth: 1,
    padding: moderateScale(5, 0.6),
    borderRadius: moderateScale(20, 0.6),
    textAlign: 'center',
    marginRight: moderateScale(10, 0.3),
  },
});
