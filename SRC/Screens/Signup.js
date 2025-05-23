import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import { Platform, ToastAndroid, View, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import navigationService from '../navigationService';
import { Post } from '../Axios/AxiosInterceptorFunction';
import { useDispatch, useSelector } from 'react-redux';
import { validateEmail } from '../Config';
import LottieView from 'lottie-react-native';
import { setUserData } from '../Store/slices/common';
import { setPreferencesSet, setUserToken } from '../Store/slices/auth';
import PreferenceModal from '../Components/PreferenceModal';
import SelectFilterModal from '../Components/FilterModal';

const Signup = () => {
  // const token = useSelector(state => state.authReducer.token);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setcPassword] = useState('');
  const dispatch = useDispatch()
  const [preferenceModal, setPreferencesModal] = useState(false)

  const register = async () => {
    const url = 'register';
    const body = {
      name: name,
      email: email,
      password: password,
      c_password: cPassword,
    };

    for (let key in body) {
      if (body[key] == '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`${key} is required`, ToastAndroid.SHORT)
          : alert(`${key} is required`);
      }
    }
    if (!validateEmail(email)) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Email is invalid', ToastAndroid.SHORT)
        : Alert.alert('Email is invalid');
    }
    if (password != cPassword) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Passwords donot match', ToastAndroid.SHORT)
        : Alert.alert('Passwords donot match');
    }

    setIsLoading(true);
    const response = await Post(url, body, apiHeader());
    setIsLoading(false);

    if (response?.data?.success) {
      //  return console.log(
      //     '🚀 ~ file: Signup.js:50 ~ register ~ response:',
      //     response?.data?.data?.user_details?.preferences.length > 0 ? true : false,
      //   );
      dispatch(setUserData(response?.data?.data?.user_details));
      dispatch(setUserToken({ token: response?.data?.data?.token }));
      dispatch(setPreferencesSet(response?.data?.data?.user_details?.preferences.length > 0 ? true : false));
    }
  };

  return (
    <ScreenBoiler
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}>
      <ScrollView>
        <LinearGradient
          style={{
            width: windowWidth,
            height: windowHeight,
            alignItems: 'center',
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={['#f8de7e', '#f4c430', '#ED9121']}
        // locations ={[0, 0.5, 0.6]}
        >
          <View
            style={{
              width: windowWidth * 0.6,
              height: windowHeight * 0.15,
              marginTop: moderateScale(40, 0.3),
            }}>
            <LottieView
              resizeMode="cover"
              source={require('../Assets/Images/animation2.json')}
              style={{ height: '90%' }}
              autoPlay
              loop
            />
            {/* <CustomImage
            source={require('../Assets/Images/logo.png')}
            style={{width: '100%', height: '100%'}}
          /> */}
          </View>

          <TextInputWithTitle
            iconName={'user'}
            iconType={SimpleLineIcons}
            LeftIcon={true}
            titleText={'username'}
            placeholder={'username'}
            setText={setName}
            value={name}
            viewHeight={0.06}
            viewWidth={0.8}
            inputWidth={0.86}
            border={1}
            borderColor={Color.black}
            marginTop={moderateScale(30, 0.3)}
            color={Color.black}
            placeholderColor={Color.black}
          />

          <TextInputWithTitle
            iconName={'email'}
            iconType={Fontisto}
            LeftIcon={true}
            titleText={'Email'}
            placeholder={'Type your email'}
            setText={setEmail}
            value={email}
            viewHeight={0.06}
            viewWidth={0.8}
            inputWidth={0.86}
            border={1}
            borderColor={Color.black}
            marginTop={moderateScale(30, 0.3)}
            color={Color.black}
            placeholderColor={Color.black}
          />

          <TextInputWithTitle
            secureText
            iconName={'key-outline'}
            iconType={Ionicons}
            LeftIcon={true}
            titleText={'Password'}
            placeholder={'Type your password'}
            setText={setPassword}
            value={password}
            viewHeight={0.06}
            viewWidth={0.8}
            inputWidth={0.86}
            border={1}
            borderColor={'#000'}
            marginTop={moderateScale(30, 0.3)}
            color={Color.black}
            placeholderColor={Color.black}
          />

          <TextInputWithTitle
            iconName={'check-outline'}
            iconType={MaterialCommunityIcons}
            LeftIcon={true}
            secureText
            titleText={'Confirm password'}
            placeholder={'Re-type your password'}
            setText={setcPassword}
            value={cPassword}
            viewHeight={0.06}
            viewWidth={0.8}
            inputWidth={0.86}
            border={1}
            borderColor={'#000'}
            marginTop={moderateScale(30, 0.3)}
            color={Color.black}
            placeholderColor={Color.black}
          />
          {/* <TouchableOpacity onPress={() => setPreferencesModal(true)} style={{
            width: windowWidth * 0.8,
            height: windowHeight * 0.06,
            marginTop: moderateScale(30, 0.3),
            paddingHorizontal: moderateScale(10, 0.6),
            justifyContent: 'center',
            borderColor: '#000',
            borderWidth: 1,
            borderRadius: 8,
          }}>
            <CustomText> Select preferences</CustomText>
          </TouchableOpacity> */}
          <CustomButton
            onPress={() => {
              register();
            }}
            text={isLoading ? <ActivityIndicator size={'small'} color={'white'} /> : 'SIGN UP'}
            textColor={Color.white}
            width={windowWidth * 0.4}
            height={windowHeight * 0.06}
            marginTop={moderateScale(50, 0.3)}
            bgColor={Color.btnColor}
            borderRadius={moderateScale(5, 0.3)}
            isGradient
          />

          <SelectFilterModal
            show={preferenceModal}
            setShow={setPreferencesModal}
            pickMultiple={true}
            onPressButton={data => {
              // setPreferences(data), setPreferencesModalVisible(false);
            }}
          />
        </LinearGradient>
      </ScrollView>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  txt5: {
    marginTop: moderateScale(25, 0.3),
    fontSize: moderateScale(11, 0.6),
  },
  txt6: {
    fontSize: moderateScale(15, 0.6),
  },
});

export default Signup;
