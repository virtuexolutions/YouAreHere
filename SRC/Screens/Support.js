import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
  ToastAndroid,
  Platform,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import CustomText from '../Components/CustomText';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import navigationService from '../navigationService';
import Color from '../Assets/Utilities/Color';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import ScreenBoiler from '../Components/ScreenBoiler';
import {useSelector} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import CustomButton from '../Components/CustomButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import CustomStatusBar from '../Components/CustomStatusBar';
import { Icon } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign'

const Support = () => {
  const navigationN = useNavigation()
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const token = useSelector(state => state.authReducer.token);
  const isFocused = useIsFocused();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [supportData, setSupportData] = useState();
  const [submitLoading, setSubmitLoading] = useState(false);
  

  const GetSupportData = async () => {
    const url = 'auth/admin/info';
    setLoading(true);
    const response = await Get(url, token);
    setLoading(false);
    if (response != undefined) {
      console.log(response?.data);
      setSupportData(response?.data?.data);
    }
  };
  // useEffect(() => {
  //   GetSupportData();
  //   // setFullName('');
  //   // setPhone('');
  //   // setEmail('');
  //   // setSubject('');
  //   // setMessage('');
  // }, [isFocused]);
  const sendQuestion = async () => {
    const url = 'auth/contact/submit';
    const body = {
      name: fullName,
      phone: phone,
      email: email,
      subject: subject,
      description: message,
    };
    for (let key in body) {
      if (body[key] === '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`${key}  is required`, ToastAndroid.SHORT)
          : alert(`${key}  is required`);
      }
    }
    setSubmitLoading(true);

    const response = await Post(url, body, apiHeader(token));
    setSubmitLoading(false);
    if (response != undefined) {
      Platform.OS == 'android'
        ? ToastAndroid.show('Sent Successfully', ToastAndroid.SHORT)
        : alert('Sent Successfully');
      navigationService.navigate('HomeScreen');
    }
  };

  return (
    <>
    <CustomStatusBar
     backgroundColor={
      Color.white
    }
      barStyle={'dark-content'}
    />
       <LinearGradient
      style={{
        width: windowWidth,
        height: windowHeight,
      }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y:1}}
      colors={Color.themeBgColor}
      // locations ={[0, 0.5, 0.6]}
      >
          <TouchableOpacity
          activeOpacity={0.8}
        style={{
          position : 'absolute',
          top : moderateScale(20,0.3),
          left : moderateScale(20,0.3),
          height: moderateScale(30, 0.3),
          width: moderateScale(30, 0.3),
          borderRadius: moderateScale(5, 0.3),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:'white',
          zIndex : 1
        }}>
       
          <Icon
            name={'arrowleft'}
            as={AntDesign}
            size={moderateScale(22, 0.3)}
            color={Color.themeColor}
            onPress={()=>{
              navigationN.goBack()
            }}
          />
          </TouchableOpacity>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop : moderateScale(20,0.6),
            paddingBottom: moderateScale(20, 0.6),
            alignItems: 'center',
         width: '100%',
            height: windowHeight,
          }}>
          <CustomText style={styles.Txt1} isBold>
            {'Contact Us'}
          </CustomText>
          <TouchableOpacity
            style={[styles?.ContactInfoContainer]}
            activeOpacity={0.85}
            onPress={() => {
              Linking.openURL(`tel:${supportData?.phone}`);
            }}>
            <FontAwesome
              name="phone"
              color={Color.white}
              style={styles.icon1}
              size={moderateScale(22, 0.6)}
            />
            <CustomText style={[styles.contactInfoText]} isRegular>
              {loading
                ? 'loading...'
                : supportData?.phone
                ? supportData?.phone
                : 'no contact added yet'}
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles?.ContactInfoContainer]}
            activeOpacity={0.85}
            onPress={() => {
              Linking.openURL(`mailto: ${supportData?.official_email}`);
            }}>
            <Entypo
              name="mail"
              color={Color.white}
              style={styles.icon1}
              size={moderateScale(22, 0.6)}
            />
            <CustomText style={[styles.contactInfoText]} isRegular>
              {loading
                ? 'loading...'
                : supportData?.official_email
                ? supportData?.official_email
                : 'not added yet'}
            </CustomText>
          </TouchableOpacity>
          <CustomText
            style={[styles.Txt1, {marginTop: moderateScale(10, 0.3)}]}
            isBold>
            {'Ask a Question'}
          </CustomText>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TextInputWithTitle
              titleText={'Your Name'}
              secureText={false}
              placeholder={'Your Name'}
              setText={setFullName}
              value={fullName}
              viewHeight={0.06}
              viewWidth={0.85}
              inputWidth={0.8}
              border={1}
              borderColor={Color.themeLightGray}
              placeholderColor={Color.black}
              marginTop={moderateScale(15, 0.3)}
              backgroundColor={'#F5F5F5'}
              borderRadius={moderateScale(25,0.3)}
            />
            <TextInputWithTitle
              titleText={'Phone'}
              secureText={false}
              placeholder={'Phone'}
              keyboardType={'numeric'}
              setText={setPhone}
              value={phone}
              viewHeight={0.06}
              viewWidth={0.85}
              inputWidth={0.8}
              border={1}
              placeholderColor={Color.black}
              borderColor={Color.themeLightGray}
              backgroundColor={'#F5F5F5'}
              marginTop={moderateScale(15, 0.3)}
              borderRadius={moderateScale(25,0.3)}

            />

            <TextInputWithTitle
              titleText={'Email'}
              secureText={false}
              placeholder={'Email'}
              setText={setEmail}
              value={email}
              viewHeight={0.06}
              viewWidth={0.85}
              inputWidth={0.8}
              marginTop={moderateScale(15, 0.3)}
              border={1}
              placeholderColor={Color.black}
              borderColor={Color.themeLightGray}
              backgroundColor={'#F5F5F5'}
              borderRadius={moderateScale(25,0.3)}

/>
            <TextInputWithTitle
              titleText={'Subject'}
              secureText={false}
              placeholder={'Subject'}
              setText={setSubject}
              value={subject}
              viewHeight={0.06}
              viewWidth={0.85}
              inputWidth={0.8}
              marginTop={moderateScale(15, 0.3)}
              border={1}
              placeholderColor={Color.black}
              borderColor={Color.themeLightGray}
              backgroundColor={'#F5F5F5'}
              borderRadius={moderateScale(25,0.3)}

            />

            <TextInputWithTitle
              titleText={'Enter Description'}
              secureText={false}
              placeholder={'Enter Description'}
              setText={setMessage}
              value={message}
              viewHeight={0.15}
              viewWidth={0.85}
              inputWidth={0.7}
              inputHeight={0.1}
              border={1}
              borderColor={Color.themeLightGray}
              backgroundColor={'#F5F5F5'}
              marginTop={moderateScale(20, 0.3)}
              multiline={true}
              inputStyle={{textAlign: 'vertical'}}
              borderRadius={moderateScale(10, 0.3)}
              placeholderColor={Color.black}
            />
           <CustomButton
              text={
                loading ? (
                  <ActivityIndicator color={'#FFFFFF'} size={'small'} />
                ) : (
                  'Reset'
                )
              }
              textColor={Color.white}
              width={windowWidth * 0.85}
              height={windowHeight * 0.07}
              marginTop={moderateScale(20, 0.3)}
              // onPress={() => {
              //   dispatch(setUserToken({token: 'dasdawradawdawrtfeasfzs'}));
              // }}
              bgColor={
               Color.themeColor
              }
              // borderColor={Color.white}
              // borderWidth={2}
              borderRadius={moderateScale(30, 0.3)}
            />
          </View>
        </KeyboardAwareScrollView>
      </LinearGradient>
    </>
  );
};

export default Support;

const styles = ScaledSheet.create({
  Tou: {
    width: windowWidth * 0.85,
    height: windowHeight * 0.055,
    marginTop: windowHeight * 0.05,
    marginBottom: moderateScale(50, 0.3),
  },
  icon: {
    fontWeight: 'bold',
    marginLeft: 30,
    width: windowWidth * 0.3,
  },
  icon1: {
    fontWeight: 'bold',
    marginLeft: 30,
    width: windowWidth * 0.09,
  },
  Txt: {
    fontSize: moderateScale(25, 0.3),
    color: 'black',
  
  },
  Txt1: {
    fontSize: moderateScale(20, 0.6),
    width : '85%' ,
    color: Color.black,
    marginTop: moderateScale(40, 0.3),

    // marginLeft: moderateScale(30, 0.3),
    // alignSelf: "flex-start",
  },
  contactInfoText: {
    fontSize: moderateScale(13, 0.3),
  },

  input: {
    width: windowWidth * 0.8,
    fontSize: moderateScale(14, 0.7),
    paddingLeft: windowWidth * 0.02,
  },

  ContactInfoContainer: {
    width: windowWidth,
    paddingVertical: moderateScale(10, 0.3),
    // marginTop: moderateScale(10, 0.3),
    flexDirection: 'row',
    alignItems: 'center',
  },
});
