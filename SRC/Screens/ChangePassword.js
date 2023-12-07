import React, {useState} from 'react';
import {
  Image,
  Dimensions,
  ImageBackground,
  Platform,
  ToastAndroid,
  TouchableOpacity,
  Alert,
  View,
  ScrollView,
} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import navigationService from '../navigationService';

import TextInputWithTitle from '../Components/TextInputWithTitle';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';

import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomButton from '../Components/CustomButton';
import {ActivityIndicator} from 'react-native';
import {Post} from '../Axios/AxiosInterceptorFunction';
import CardContainer from '../Components/CardContainer';
// import CustomHeader from '../Components/CustomHeader';
import {Icon} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {setUserToken} from '../Store/slices/auth';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ChangePassword = props => {
  const navigationN = useNavigation()
  const token = useSelector(state => state.authReducer.token);

  const navigation = useNavigation();
  const SelecteduserRole = useSelector(
    state => state.commonReducer.selectedRole,
  );
  const dispatch = useDispatch();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const changePassword = async () => {
    const url = 'auth/change-password';
    const body = {
      current_password: currentPassword,
      new_password: newPassword,
      confirm_password: confirmNewPassword,
    };
    for (let key in body) {
      if (body[key] == '') {
        return Platform.OS == 'android'
        ? ToastAndroid.show(`${key} is required`, ToastAndroid.SHORT)
        : Alert.alert(`${key} is required`);
      }
    }

    if (newPassword != confirmNewPassword) {
      return Platform.OS == 'android'
            ? ToastAndroid.show('Passwords Donot match', ToastAndroid.SHORT)
            : Alert.alert('Passwords Donot match');
    }

    console.log(
      '🚀 ~ file: ChangePassword.js:60 ~ ChangePassword ~ body:',
      body,
    );

    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);

    if (response?.data?.success) {
      console.log(
        '🚀 ~ file: ChangePassword.js:64 ~ ChangePassword ~ response:',
        response?.data,
      );
      Platform.OS = 'android'
        ? ToastAndroid.show('Password changed Successfully', ToastAndroid.SHORT)
        : Alert.alert('Password changed Successfully');
      navigationN.goBack()
    }
  };

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      {/* <ScrollView> */}
        <LinearGradient
          style={{
            width: windowWidth,
            height: windowHeight,
          }}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={Color.themeBgColor}
          // locations ={[0, 0.5, 0.6]}
        >
          <TouchableOpacity activeOpacity={0.8} style={styles.Rounded} onPress={()=>{
            navigation.toggleDrawer()
           }}>
          <Icon
           onPress={()=>{
            navigation.toggleDrawer()
           }}
            name="menu"
            as={Ionicons}
            size={moderateScale(25)}
            color={Color.black}
          />
        </TouchableOpacity>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: moderateScale(20, 0.3),
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: windowHeight,
            }}>
            <CardContainer
              style={{
                paddingVertical: moderateScale(30, 0.3),
                alignItems: 'center',
              }}>
              <CustomText isBold style={styles.txt2}>
                Change Password
              </CustomText>
              <CustomText style={styles.txt3}>
                Want to change password ? don't worry, jsut take a simple step
                and create your new password!
              </CustomText>

              <TextInputWithTitle
                secureText
                titleText={'Current Passwrod'}
                placeholder={'Current Passwrod'}
                setText={setCurrentPassword}
                value={currentPassword}
                viewHeight={0.07}
                viewWidth={0.75}
                inputWidth={0.6}
                // border={1}
                borderColor={'#ffffff'}
                backgroundColor={'#FFFFFF'}
                marginTop={moderateScale(35, 0.3)}
                color={Color.themeColor}
                placeholderColor={Color.themeLightGray}
                borderRadius={moderateScale(25, 0.3)}
                elevation
              />

              <TextInputWithTitle
                secureText
                titleText={'Enter New Password'}
                placeholder={'Enter New Password'}
                setText={setNewPassword}
                value={newPassword}
                viewHeight={0.07}
                viewWidth={0.75}
                inputWidth={0.65}
                // border={1}
                borderColor={'#ffffff'}
                backgroundColor={'#FFFFFF'}
                marginTop={moderateScale(10, 0.3)}
                color={Color.themeColor}
                placeholderColor={Color.themeLightGray}
                borderRadius={moderateScale(25, 0.3)}
                elevation
              />
              <TextInputWithTitle
                secureText
                titleText={'Confirm your new password'}
                placeholder={'Confirm your new password'}
                setText={setConfirmNewPassword}
                value={confirmNewPassword}
                viewHeight={0.07}
                viewWidth={0.75}
                inputWidth={0.65}
                // border={1}
                borderColor={'#ffffff'}
                backgroundColor={'#FFFFFF'}
                marginTop={moderateScale(10, 0.3)}
                color={Color.themeColor}
                placeholderColor={Color.themeLightGray}
                borderRadius={moderateScale(25, 0.3)}
                elevation
              />
              <CustomButton
                text={
                  isLoading ? (
                    <ActivityIndicator color={'#FFFFFF'} size={'small'} />
                  ) : (
                    'Reset'
                  )
                }
                textColor={Color.white}
                width={windowWidth * 0.75}
                height={windowHeight * 0.06}
                marginTop={moderateScale(20, 0.3)}
                onPress={() => {
                  changePassword();
                  // dispatch(setUserToken({token : 'sadasdawdadas'}))
                }}
                bgColor={Color.themeColor}
                // borderColor={Color.white}
                // borderWidth={2}
                borderRadius={moderateScale(30, 0.3)}
              />
            </CardContainer>
          </KeyboardAwareScrollView>
        </LinearGradient>
      {/* </ScrollView> */}
    </>
  );
};

const styles = ScaledSheet.create({
  txt2: {
    color: Color.black,
    fontSize: moderateScale(25, 0.6),
  },
  txt3: {
    color: Color.themeLightGray,
    fontSize: moderateScale(10, 0.6),
    textAlign: 'center',
    width: '80%',
    marginTop: moderateScale(5, 0.3),
    lineHeight: moderateScale(17, 0.3),
  },

  phoneView: {
    width: '80%',
    paddingVertical: moderateScale(5, 0.3),
    flexDirection: 'row',
    marginTop: moderateScale(20, 0.3),
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.9,
    // marginTop: moderateScale(10,0.3),
  },
  menuIcon: {
    backgroundColor: Color.white,
    width: windowWidth * 0.11,
    height: windowWidth * 0.11,
    borderRadius: (windowWidth * 0.11) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    // right:moderateScale(10,.6),
    // top:moderateScale(5,.6)
  },
  txt4: {
    color: Color.purple,
    fontSize: moderateScale(14, 0.6),
    marginTop: moderateScale(8, 0.3),
    fontWeight: 'bold',
  },
  Rounded: {
    width: windowWidth * 0.1,
    height: windowHeight * 0.05,
    borderRadius: moderateScale(30, 0.3),
    backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex:1,
  },
  txt5: {
    color: Color.themeLightGray,
    marginTop: moderateScale(10, 0.3),
    fontSize: moderateScale(12, 0.6),
  },
});

export default ChangePassword;
