import React, {useState} from 'react';
import * as Animatable from 'react-native-animatable';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Platform,
} from 'react-native';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import navigationService from '../navigationService';
import AssetsContainer from '../Components/AssetsContainer';
import {Icon} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {setUserData} from '../Store/slices/common';
import {setPreferencesSet} from '../Store/slices/auth';

const AssetScreen = props => {
  const navigation = useNavigation();
  const token = useSelector(state => state.authReducer.token);
  const user = useSelector(state => state.commonReducer.userData);
  const fromDrawer = props?.route?.params?.fromDrawer;

  const [preferences, setPreferences] = useState(
    user?.preferences?.length > 0
      ? user?.preferences?.map(item => item?.preferences)
      : [],
  );

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const sendPrefrences = async () => {
    const url = 'auth/preferences';
    const body = {
      preferences: preferences,
    };

    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      dispatch(setUserData(response?.data?.user));
      fromDrawer ? navigation.goBack() : dispatch(setPreferencesSet(true));
    }
  };

  const asset = [
    {
      id: 1,
      Image: require('../Assets/Images/wine.png'),
      name: 'Food',
      Key: 1,
    },
   
    {
      id: 2,
      Image: require('../Assets/Images/coffee-cup.png'),
      name: 'Bank',
      Key: 2,
    },
    {
      id: 3,
      Image: require('../Assets/Images/park.png'),
      name: 'Radio Station',
      Key: 3,
    },
    {
      id: 4,
      Image: require('../Assets/Images/sports.png'),
      name: 'Sports',
      Key:4,
    },
    {
      id: 5,
      Image: require('../Assets/Images/cinema.png'),
      name: 'Cinema',
      Key: 5,
    },
    {
      id: 6,
      Image: require('../Assets/Images/sports.png'),
      name: 'Park',
      Key: 6,
    },

    {
      id: 7,
      Image: require('../Assets/Images/mall.png'),
      name: 'Shopping Mall',
      Key: 7,
    },
    {
      id: 8,
      Image: require('../Assets/Images/bank.png'),
      name: 'Cafe',
      Key: 8,
    },
    {
      id: 9,
      Image: require('../Assets/Images/wine.png'),
      name: 'Bar',
      Key: 9,
    },
    {
      id: 10,
      Image: require('../Assets/Images/coffee-cup.png'),
      name: 'Coffee Shop',
      Key: 10,
    },
    {
      id: 11,
      Image: require('../Assets/Images/park.png'),
      name: 'Museum',
      Key: 11,
    },
    {
      id: 12,
      Image: require('../Assets/Images/cinema.png'),
      name: 'University',
      Key: 12,
    },
    {
      id: 13,
      Image: require('../Assets/Images/sports.png'),
      name: 'Lodging',
      Key: 13,
    },
    {
      id: 14,
      Image: require('../Assets/Images/sports.png'),
      name: 'Hospital',
      Key: 14,
    },
    
    {
      id: 15,
      Image: require('../Assets/Images/sports.png'),
      name: 'MoneyExchange',
      Key: 15,
    },
    {
      id: 16,
      Image: require('../Assets/Images/sports.png'),
      name: 'ATM',
      Key: 16,
    },
    {
      id: 17,
      Image: require('../Assets/Images/sports.png'),
      name: 'Churches',
      Key: 17,
    },
    {
      id: 18,
      Image: require('../Assets/Images/sports.png'),
      name: 'Studios',
      Key: 18,
    },
    {
      id: 19,
      Image: require('../Assets/Images/sports.png'),
      name: 'Mosques',
      Key:19,
    },
   {
      id: 20,
      Image: require('../Assets/Images/sports.png'),
      name: 'Golf Courses',
      Key:20,
    },
  ];

  return (
    <SafeAreaView>
      <LinearGradient
        style={{
          width: windowWidth,
          height: windowHeight,
          alignItems: 'center',
        }}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={Color.themeBgColor}>
        <View
          style={{
            width: windowWidth * 0.96,
            height: windowHeight * 0.12,
            marginTop: moderateScale(30, 0.3),
          }}>
          <CustomText isBold style={styles.txt1}>
            Welcome
          </CustomText>
          <CustomText isBold style={styles.txt2}>
            Please Select Your INTERESTS
          </CustomText>
          <CustomText style={styles.txt3}>
            Select yout interests area and you will be shown near by places
            acordingly
          </CustomText>
        </View>
        {fromDrawer && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.Rounded}
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon
              onPress={() => {
                navigation.goBack();
              }}
              name="menu"
              as={Ionicons}
              size={moderateScale(25)}
              color={Color.black}
            />
          </TouchableOpacity>
        )}
        <View
          style={{
            position: 'absolute',
            // backgroundColor:'red',
            zIndex: 1,
            right: 0,
            bottom: 70,
            left: 0, 
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CustomButton
            onPress={() => {
              sendPrefrences();
            }}
            text={
              isLoading ? (
                <ActivityIndicator
                  size={moderateScale(30, 0.6)}
                  color={'white'}
                />
              ) : (
                'Save'
              )
            }
            textColor={Color.white}
            width={windowWidth * 0.7}
            height={windowHeight * 0.07}
            // marginTop={moderateScale(50, 0.3)}
            bgColor={Color.themeColor}
            borderRadius={moderateScale(25, 0.3)}
          />
        </View>

        <FlatList
          contentContainerStyle={{
            paddingBottom:
              Platform.OS == 'android'
                ? moderateScale(120, 0.6)
                : moderateScale(130, 0.6),
          }}
          data={asset}
          renderItem={({item, index}) => {
            return (
              <AssetsContainer
                item={item}
                preferences={preferences}
                setPreferences={setPreferences}
                index={index}
              />
            );
          }}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  txt1: {
    fontSize: moderateScale(9, 0.6),
    color: Color.black,
  },
  txt2: {
    fontSize: moderateScale(18, 0.6),
    textTransform: 'uppercase',
  },
  txt3: {
    fontSize: moderateScale(11, 0.6),
    lineHeight: 14,
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
  },
});

export default AssetScreen;
