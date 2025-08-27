import React, {useState, useEffect} from 'react';
import Color from '../Assets/Utilities/Color';
import {
  requestLocationPermission,
  windowHeight,
  windowWidth,
} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Platform,
  ToastAndroid,
  // ActivityIndicator
} from 'react-native';
import {FlatList, Icon, ScrollView} from 'native-base';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import {useDispatch, useSelector} from 'react-redux';
import navigationService from '../navigationService';
import CustomImage from '../Components/CustomImage';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import CustomButton from '../Components/CustomButton';
// import { Icon } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import ImagePickerModal from '../Components/ImagePickerModal';
import CustomText from '../Components/CustomText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {setUserData} from '../Store/slices/common';
import { Post } from '../Axios/AxiosInterceptorFunction';
import { apiHeader } from '../Utillity/utils';
import LottieView from 'lottie-react-native';

const Profile = props => {
  const dispatch =useDispatch()
  const navigationN = useNavigation();
  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);
  console.log('hello==>', userData);
  //   const userPreferences = useSelector(state => state.commonReducer.prefrences);
  //   const filteredUserPreference = userPreferences?.map(
  //     item => item?.preferences,
  //   );

  const customLocation = useSelector(
    state => state.commonReducer.customLocation,
  );

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(userData?.email ? userData?.email : '');
  // console.log('hello---->', email);
  const [image, setImage] = useState({});
  const [username, setUserName] = useState(
    userData?.name ? userData?.name : '',
  );
  const [imagePicker, setImagePicker] = useState(false);


  const profileUpdate = async () => {
    const formData = new FormData();
    const body = {
      name: username,
      // email: email,
    };
    for (let key in body) {
      formData?.append(key, body[key]);
    }
    if (Object.keys(image).length > 0) formData.append('image', image);
    const url = 'auth/profile-update';

    // return  console.log('FormData ===== > ', formData);
    setIsLoading(true); 
    const response = await Post(url, formData, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      console.log('heyyyyyyyy=======>',response?.data)
      Platform.OS == 'android'
        ? ToastAndroid.show('profile updated Successfully', ToastAndroid.SHORT)
        : alert('profile updated Successfully');
      console.log('🚀 ~ profileUpdate ~ response:', response?.data?.user_info);
      navigationN.navigate('HomeScreen');
    }
    dispatch(setUserData(response?.data?.user_info));
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
          colors={['#f8de7e', '#f4c430', '#ED9121']}
          // locations ={[0, 0.5, 0.6]}
        >
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
              Edit Profile
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
          <View
            style={{
              width: windowWidth * 0.6,
              height: windowHeight * 0.15,
              marginTop: moderateScale(40, 0.3),
              alignItems :'center'
            }}>
            <View
              style={{
                height: windowHeight * 0.13,
                width: windowHeight * 0.13,
                borderRadius: moderateScale((windowHeight * 0.13) / 2),
              }}>
              <CustomImage
                source={
                  Object.keys(image).length > 0
                    ? {uri: image?.uri}
                    : userData?.image
                    ? {uri: userData?.image}
                    : require('../Assets/Images/user.png')
                }
                style={{
                  width: '100%',
                  height: '100%',
                  // backgroundColor: 'blue',

                  borderRadius: moderateScale((windowHeight * 0.13) / 2),
                }}
              />

              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.edit}
                onPress={() => {
                  setImagePicker(true);
                }}>
                <Icon
                  name="pencil"
                  as={FontAwesome}
                  style={styles.icon2}
                  color={Color.black}
                  size={moderateScale(13, 0.3)}
                  onPress={() => {
                    setImagePicker(true);
                  }}
                />
              </TouchableOpacity>
            </View>

           </View>

          <TextInputWithTitle
            iconName={'user'}
            iconType={FontAwesome}
            LeftIcon={true}
            titleText={'username'}
            placeholder={'username'}
            setText={setUserName}
            value={username}
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
            disable={true}
          />

          
          <CustomButton
            onPress={() => profileUpdate()}
            text={
              isLoading ? (
                <ActivityIndicator size={'small'} color={'white'} />
              ) : (
                'save'
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

          <ImagePickerModal
            show={imagePicker}
            setShow={setImagePicker}
            setFileObject={setImage}
            romNotePad={false}
          />
        </LinearGradient>
      </ScrollView>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  container: {
    // alignItems: "center",
    justifyContent: 'center',
    height: windowHeight,
    width: windowWidth,
    backgroundColor: Color.themeColor,
  },
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
  edit: {
    backgroundColor: Color.white,
    width: moderateScale(20, 0.3),
    height: moderateScale(20, 0.3),
    position: 'absolute',
    bottom: 11,
    right: 5,
    borderRadius: moderateScale(10, 0.3),
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default Profile;
