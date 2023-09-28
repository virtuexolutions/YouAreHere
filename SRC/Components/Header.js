import React, {useState} from 'react';
import {Icon} from 'native-base';
import {View, Platform, Dimensions, TouchableOpacity} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from './CustomText';
import CustomImage from './CustomImage';
const {height, width} = Dimensions.get('window');
import Foundation from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Modal from 'react-native-modal';

import {useDispatch, useSelector} from 'react-redux';
import {imageUrl} from '../Config';
import {setUserLogout} from '../Store/slices/auth';
import LinearGradient from 'react-native-linear-gradient';

const Header = props => {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.commonReducer.notification);
  const navigationN = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const {
    title,
    showBack,
    showList,
    headerColor,
    titleColor,
    close,
    navigateTO,
    headerType,
    Notify,
    hideUser,
  } = props;

  const [searchText, setSearchText] = useState('');
  const user = useSelector(state => state.commonReducer.userData);
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const token = useSelector(state => state.authReducer.token);
  const statusArray = [
    {label: 'Change Password', value: 'ChangePassword'},
    {label: 'Terms & Conditions', value: 'TermsAndConditions'},
    {label: 'Financial Breakdown', value: 'FinancialBreakDown'},
    {label: 'Logout', value: 'Logout'},
  ];

  return (
    <LinearGradient
      style={styles.header2}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y:1}}
      colors={
        headerColor ? headerColor : [Color.themeColor, '#83D475', '#ABE098']
      }>
      {/* <View
      style={[
        styles.header2,
        headerColor && {
          backgroundColor: headerColor,
        },
      ]}> */}

      <View
        style={{
          height: moderateScale(30, 0.3),
          width: moderateScale(30, 0.3),
          borderRadius: moderateScale(5, 0.3),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: showBack || showList ? 'white' : 'transparent',
        }}>
        {showBack ? (
          <Icon
            name={'arrowleft'}
            as={AntDesign}
            size={moderateScale(22, 0.3)}
            color={userRole == 'Qbid Member' ? Color.themeColor : Color.blue}
            onPress={() => {
              navigationN.goBack();
            }}
          />
        ): (
          <View></View>
        )}
      </View>
      <CustomImage
        resizeMode={'contain'}
        style={{
          width: windowWidth * 0.21,
          // backgroundColor : 'red' ,
          height: windowHeight * 0.05,
        }}
        source={
          userRole == 'Qbid Member'
            ? require('../Assets/Images/bedge1.png')
            : require('../Assets/Images/bedge1.png')
        }
      /> 
     
      {/* <CustomText isBold style={{color : Color.white , fontSize : moderateScale(20,0.6)}} >Hola!!</CustomText> */}
      {!hideUser ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigationN.navigate('MyAccounts');
          }}
          style={{
            width: moderateScale(36, 0.3),
            height: moderateScale(36, 0.3),
            borderRadius: moderateScale(18, 0.3),
            backgroundColor: Color.green,
            overflow: 'hidden',
          }}>
          <CustomImage
            onPress={() => {
              navigationN.navigate('MyAccounts');
            }}
            source={
              user?.photo
                ? {uri: `${user?.photo}`}
                : require('../Assets/Images/bedge1.png')
            }
            resizeMode={'cover'}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
          {/* )} */}
        </TouchableOpacity>
      ) : (
        <View
          style={{
            width: moderateScale(40, 0.3),
          }}></View>
      )}
    </LinearGradient>
  );
};
const styles = ScaledSheet.create({
  header1: {
    width: windowWidth,
    height: windowHeight * 0.1,
    backgroundColor: Color.white,
    marginBottom: moderateScale(5, 0.3),
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  statusModal: {
    alignSelf: 'flex-end',
    paddingVertical: moderateScale(15, 0.3),
    paddingHorizontal: moderateScale(10, 0.3),
    backgroundColor: Color.white,
    // borderRadius: moderateScale(5, 0.3),
    marginTop: moderateScale(60, 0.3),
    // borderWidth: 1,
    borderColor: Color.green,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 3,
  },
  header2: {
    width: windowWidth,
    // height: windowHeight * 0.13,
    backgroundColor: Color.themeColor,
    // justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20, 0.3),
    paddingVertical: moderateScale(15, 0.3),
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  notificationCircle: {
    position: 'absolute',
    height: moderateScale(10, 0.3),
    width: moderateScale(10, 0.3),
    borderRadius: moderateScale(5, 0.3),
    backgroundColor: Color.green,
    right: moderateScale(5, 0.3),
    // marginTop : moderateScale(10,0.3)
  },
});
export default Header;
