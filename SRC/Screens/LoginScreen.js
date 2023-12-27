import React, {useState} from 'react';
import * as Animatable from 'react-native-animatable';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';

import {
  View,
  ToastAndroid,
  Platform,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import navigationService from '../navigationService';
import {useDispatch, useSelector} from 'react-redux';
import {setPreferencesSet, setUserToken} from '../Store/slices/auth';
import {validateEmail} from '../Config';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {setUserData} from '../Store/slices/common';

const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const LoginUser = async () => {
    const url = 'login';
    const body = {
      email: email,
      password: password,
    };
    for (let key in body) {
      if (body[key] == '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`${key} is required`, ToastAndroid.SHORT)
          : Alert.alert(`${key} is required`);
      }
    }
    if (!validateEmail(email)) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Email is invalid', ToastAndroid.SHORT)
        : Alert.alert('Email is invalid');
    }

    setIsLoading(true);
    const response = await Post(url, body, apiHeader());
    setIsLoading(false);

    console.log(
      '🚀 ~ file: loginScreen.js:59 ~ LoginUser ~ response:',
      response?.data,
    );

    if (response?.data?.success) {
      // return console.log(
      //   'Login Testing =============>>>>>>',
      //   response?.data?.data?.user_info?.preferences,
      // );
      dispatch(setUserToken({token: response?.data?.data?.token}));
      dispatch(setUserData(response?.data?.data?.user_info));
      dispatch(
        setPreferencesSet(
          response?.data?.data?.user_info?.preferences.length > 0
            ? true
            : false,
        ),
      );
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
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={Color.themeBgColor}
          // locations ={[0, 0.5, 0.6]}
        >
          <View
            style={{
              width: windowWidth * 0.6,
              height: windowHeight * 0.1,
              marginTop: moderateScale(130, 0.3),
            }}>
            {/* <LottieView
              resizeMode="cover"
              source={require('../Assets/Images/animation2.json')}
              // style={{height: '90%' }}
              autoPlay
              loop
            /> */}
            {/* <CustomImage
              source={require('../Assets/Images/logo.png')}
              style={{width: '100%', height: '100%'}}
            /> */}
          </View>

          <TextInputWithTitle
            iconName={'email'}
            iconType={Fontisto}
            LeftIcon={true}
            titleText={'Email'}
            placeholder={'Email'}
            setText={setEmail}
            value={email}
            viewHeight={0.06}
            viewWidth={0.8}
            inputWidth={0.6}
            border={1}
            borderColor={Color.black}
            marginTop={moderateScale(50, 0.3)}
            color={Color.black}
            placeholderColor={Color.black}
          />

          <TextInputWithTitle
            iconName={'key-outline'}
            iconType={Ionicons}
            secureText
            LeftIcon={true}
            titleText={'Password'}
            placeholder={'Type your password'}
            setText={setPassword}
            value={password}
            viewHeight={0.06}
            viewWidth={0.8}
            inputWidth={0.6}
            border={1}
            borderColor={'#000'}
            marginTop={moderateScale(40, 0.3)}
            color={Color.black}
            placeholderColor={Color.black}
          />

          {/* <TextInputWithTitle
          iconName={'check-outline'}
          iconType={MaterialCommunityIcons}
          LeftIcon={true}
          titleText={'username'}
          placeholder={'Re-type your password'}
          setText={setUserName}
          value={username}
          viewHeight={0.06}
          viewWidth={0.8}
          inputWidth={0.86}
          border={1}
          borderColor={'#000'}
          marginTop={moderateScale(40, 0.3)}
          color={Color.black}
          placeholderColor={Color.black}
        /> */}
          <CustomText
            numberOfLines={1}
            children={'Forgot Password?'}
            style={{
              fontSize: moderateScale(10, 0.6),
              color: 'black',
              width: windowWidth * 0.8,
              textAlign: 'right',
              marginTop: moderateScale(10, 0.3),
            }}
            onPress={() => {
              console.log('here');
              navigationService.navigate('EnterPhone');
            }}
          />

          <CustomButton
            onPress={() => {
              LoginUser();
            }}
            text={
              isLoading ? (
                <ActivityIndicator color={'white'} size={'small'} />
              ) : (
                'Login'
              )
            }
            textColor={Color.white}
            width={windowWidth * 0.4}
            height={windowHeight * 0.06}
            marginTop={moderateScale(50, 0.3)}
            bgColor={Color.btnColor}
            borderRadius={moderateScale(5, 0.3)}
            isGradient
          />

          <CustomText style={styles.txt5}>Don't have an account ?</CustomText>
          <CustomText
            onPress={() => navigationService.navigate('Signup')}
            isBold
            style={styles.txt6}>
            SignUp
          </CustomText>
        </LinearGradient>
      </ScrollView>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  txt5: {
    marginTop: moderateScale(25, 0.3),
    fontSize: moderateScale(11, 0.6),
    color: Color.black,
  },
  txt6: {
    fontSize: moderateScale(19, 0.6),
    color: Color.black,
  },
});

export default LoginScreen;
