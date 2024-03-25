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
import React, {useState, useEffect} from 'react';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../Components/CustomText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Icon} from 'native-base';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import PlacesCard from '../Components/PlacesCard';
import {useSelector} from 'react-redux';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import NearPlacesCard from '../Components/NearPlacesCard';

const WhishListScreen = ({item}) => {
  const isFocused = useIsFocused();
  const WhishList = useSelector(state => state.commonReducer.WishList);
  const token = useSelector(state => state.authReducer.token);

  const navigationN = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [wishListData, setWishListData] = useState([]);
  console.log('🚀 ~ WhishListScreen ~ wishListData=========>:', wishListData);
  const [ids, setIds] = useState([]);
  // console.log('🚀 ~ file: WhishListScreen.js:36 ~ WhishListScreen ~ ids:', ids);
  // console.log(
  //   '🚀 ~ file: WhishListScreen.js:27 ~ WhishListScreen ~ wishListData:',
  //   wishListData,
  // );

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
      console.log(
        '🚀 ~ file: PlacesCard.js:66 ~ removeCard ~ response:',
        response?.data,
      );
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

  useEffect(() => {
    getWishListData();
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
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={Color.themeBgColor}>
        <View
          style={{
            width: windowWidth,
            height: windowHeight * 0.07,
            alignItems: 'center',
            paddingVertical: moderateScale(10, 0.6),
          }}>
          <CustomText
            style={{fontSize: moderateScale(18, 0.6), color: Color.black}}
            isBold>
            Trips
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
              style={{color: 'black', fontSize: moderateScale(14, 0.6)}}
              isBold>
              {ids.length} Selected
            </CustomText>
            <Icon
              onPress={() => {
                removeCard();
              }}
              as={Ionicons}
              name={'trash-outline'}
              style={{color: 'red'}}
              size={moderateScale(20, 0.6)}
            />
          </View>
        )}
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
            data={wishListData}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: moderateScale(10, 0.3),
              marginBottom: moderateScale(20, 0.3),
            }}
            renderItem={({item, index}) => {
              return  <PlacesCard
              item={item}
              fromWishList={true}
              setIds={setIds}
              ids={ids}
            /> 
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
});

export default WhishListScreen;
