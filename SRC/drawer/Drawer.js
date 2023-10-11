import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useRef} from 'react';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../Components/CustomText';
import {Icon} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLogoutAuth } from '../Store/slices/auth';
import { setUserLogOut } from '../Store/slices/common';

const Drawer = () => {
const user = useSelector(state => state.commonReducer.userData)
  // console.log("🚀 ~ file: Drawer.js:22 ~ Drawer ~ user:", user)
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const data = [
    {
      name: 'Home',
      onPress: () => {
        navigation.navigate('HomeScreen');
      },
      iconName: 'home',
      iconType: Feather,
    },

    {
      name: 'Subscription ',
      onPress: () => {
        navigation.navigate('SubscriptionScreen');
      },
      iconName: 'subscriptions',
      iconType: MaterialIcons,
    },
    {
      name: 'Interests',
      onPress: () => {
        navigation.navigate('AssetScreen',{
          fromDrawer : true 
        });
      },
      iconName: 'room-preferences',
      iconType: MaterialIcons,
    },
    {
      name: 'Search',
      onPress: () => {
        navigation.navigate('SearchScreen');
      },
      iconName: 'search',
      iconType: Feather,
    },
    {
      name: 'Saved Notes',
      onPress: () => {
        navigation.navigate('NotepadDesign');
      },
      iconName: 'note-edit-outline',
      iconType: MaterialCommunityIcons,
    },
    {
      name: 'WhishList',
      onPress: () => {
        navigation.navigate('WhishListScreen');
      },
      iconName: 'heart',
      iconType: MaterialCommunityIcons,
    },
    {
      name: 'Change Password',
      onPress: () => {
        navigation.navigate('ChangePassword');
      },
      iconName: 'lock',
      iconType: AntDesign,
    },
    {
      name: 'Log out',
      onPress: () => {
        dispatch(setUserLogoutAuth());
        dispatch(setUserLogOut());
        
      },
      iconName: 'logout',
      iconType: AntDesign,
    },
  ];
 
  return (
    <ScreenBoiler
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}>
      <LinearGradient
        style={{
          // width: windowWidth *0.72,
          height: windowHeight,
        }}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={Color.themeBgColor}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: moderateScale(20, 0.3),
            alignItems: 'center',
            marginLeft: moderateScale(10, 0.3),
          }}>
          <View style={styles.Profile}>
            <CustomImage
              resizeMode={'cover'}
              source={require('../Assets/Images/user.png')}
              style={{width: '100%', height: '100%'}}
            />
          </View>

          <View style={{marginLeft: moderateScale(10, 0.3)}}>
            <CustomText
              style={{fontSize: moderateScale(16, 0.6), color: Color.black}}
              isBold>
              {user?.name}
            </CustomText>

            <CustomText
              style={{
                width: windowWidth * 0.4,
                fontSize: moderateScale(8, 0.6),
                color: Color.black,
              }}>
              Lorem Ispum simply dummy text of the printing and typesetting
            </CustomText>
          </View>
        </View>

        <View
          style={{
            marginLeft: moderateScale(10, 0.3),
            marginTop: moderateScale(40, 0.3),
            // backgroundColor : 'red'
          }}>
          {data.map((item, index) => (
            <TouchableOpacity
              onPress={item?.onPress}
              style={{
                width: windowWidth * 0.5,
                borderBottomWidth: 0.5,
                borderColor: Color.black,
                margin: moderateScale(15, 0.3),
                flexDirection : 'row',
                alignItems : 'center'
              }}>
              <Icon
                name={item.iconName}
                as={item.iconType}
                style={styles.icon2}
                color={Color.black}
                size={moderateScale(16, 0.3)}
              />

              <CustomText
                style={{
                  fontSize: moderateScale(14, 0.6),
                  color: Color.black,
                  marginLeft: moderateScale(10, 0.3),
                }}>
                {item.name}
              </CustomText>
            </TouchableOpacity>
          ))}
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: windowWidth * 0.14,
            height: windowWidth * 0.14,
            borderRadius: (windowWidth * 0.14) / 1,
            backgroundColor: Color.white,
            position: 'absolute',
            bottom: 40,
            left: 20,
            elevation: 10,
          }}>
          <Icon
            onPress={() => {
              navigation.goBack();
            }}
            name="chevron-left"
            as={Feather}
            size={moderateScale(25)}
            color={Color.black}
          />
        </View>
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  Profile: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    borderRadius: (windowWidth * 0.2) / 1,
    borderWidth: 1,
    borderColor: Color.white,
    overflow: 'hidden',
  },
});
