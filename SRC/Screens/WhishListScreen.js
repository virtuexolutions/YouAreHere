import {StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useState , useEffect} from 'react';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../Components/CustomText';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Icon} from 'native-base';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import PlacesCard from '../Components/PlacesCard';
import {useSelector} from 'react-redux';
import { Get } from '../Axios/AxiosInterceptorFunction';
import { clockRunning } from 'react-native-reanimated';

const WhishListScreen = ({item}) => {
  const isFocused = useIsFocused()
  const WhishList = useSelector(state => state.commonReducer.WishList);
  const token = useSelector(state => state.authReducer.token);
  console.log("🚀 ~ file: WhishListScreen.js:22 ~ WhishListScreen ~ token:", token)

  const navigationN = useNavigation()
  const [isLoading , setIsLoading] = useState(false)
  const [wishListData , setWishListData] = useState([])
  const getWishListData = async()=>{
    const url = 'auth/wishlist/fetch';
    setIsLoading(true)
    const response = await Get(url , token)
    setIsLoading(false)
    if(response?.data?.success){
      // return console.log(response?.data?.wish_list)
      setWishListData(response?.data?.wish_list)
    }
  }

  useEffect(() => {
    getWishListData()
  }, [isFocused])
  

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
            // flexDirection: 'row',
            // justifyContent: 'space-between',
            alignItems: 'center',
            // paddingHorizontal: moderateScale(10, 0.6),
            paddingVertical: moderateScale(10, 0.6),

          }}>
         
          <CustomText
            style={{fontSize: moderateScale(18, 0.6), color: Color.black}}
            isBold>
            WISHLIST
          </CustomText>
          <TouchableOpacity activeOpacity={0.8} style={styles.Rounded}>
          <Icon
           onPress={()=>{
            navigationN.toggleDrawer()
           }}
            name="menu"
            as={Ionicons}
            size={moderateScale(25)}
            color={Color.black}
          />
        </TouchableOpacity>

          {/* <Icon
            name="shopping-bag"
            as={Feather}
            size={moderateScale(20, 0.6)}
            color={Color.black}
          /> */}
        </View>
        {
          isLoading ?
          <View style={{
            width : windowWidth,
            height : windowHeight * 0.8 ,
            justifyContent : 'center',
            alignItems : 'center'
          }}>
            <ActivityIndicator 
            size={'large'}
            color={Color.themeColor}
            />
            <CustomText style={{
              color : Color.white,
              fontSize : moderateScale(13,0.6)
            }}>Please Wait</CustomText>
          </View>
      :  
      

        <FlatList
          data={wishListData}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: moderateScale(10, 0.3),
            marginBottom: moderateScale(20, 0.3),
          }}
          renderItem={({item, index}) => {
            return <PlacesCard item={item} fromWishList={true} />;
          }}
        />
}
      </LinearGradient>
    </ScreenBoiler>
  );
};

const styles= StyleSheet.create({
  Rounded: {
    width: windowWidth * 0.09,
    height: windowWidth * 0.09,
    borderRadius: windowWidth * 0.09 /2,
    backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    position: 'absolute',
    top: 10,
    right: 10,
  },
})

export default WhishListScreen;
