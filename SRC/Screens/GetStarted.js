import React, {useState} from 'react';
import * as Animatable from 'react-native-animatable';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import {View} from 'react-native';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import navigationService from '../navigationService';

const GetStarted = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <ScreenBoiler
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}>
      <LinearGradient
        style={{
          width: windowWidth,
          alignItems: 'center',
          //   justifyContent: 'center',
          height: windowHeight,
        }}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={Color.themeBgColor}
        // locations ={[0, 0.5, 0.6]}
      >
        <View
          style={{
            height: windowHeight * 0.5,
            width: windowWidth * 0.9,
            // marginTop:moderateScale(30,.3),
            // marginBottom:moderateScale(20,.3),
            paddingVertical: moderateScale(20, 0.6),
            // backgroundColor:'black'
          }}>
          <CustomImage
            resizeMode="contain"
            source={require('../Assets/Images/location.png')}
            style={{
              width: '100%',
              height: '100%',
              marginTop: moderateScale(25, 0.3),
            }}
          />
        </View>
        <CustomText
          style={{
            color: Color.white,
            fontSize: moderateScale(30, 0.6),
            width: windowWidth * 0.8,
            textAlign: 'center',
            paddingVertical: moderateScale(5, 0.6),
          }}
          numberOfLines={2}
          isBold>
          One place to track all your locations
        </CustomText>
        <CustomText
          style={{
            color: Color.white,
            fontSize: moderateScale(12, 0.6),
            width: windowWidth * 0.7,
            textAlign: 'center',
            paddingVertical: moderateScale(5, 0.6),
          }}
          numberOfLines={2}>
          Stay Close, Go Far: Your Nearby Adventures Await
        </CustomText>
        <CustomButton
          text={
            isLoading ? (
              <ActivityIndicator color={'#FFFFFF'} size={'small'} />
            ) : (
              'Signup'
            )
          }
          textColor={Color.white}
          width={windowWidth * 0.8}
          height={windowHeight * 0.06}
          marginTop={moderateScale(20, 0.3)}
          onPress={() => {
            navigationService.navigate('Signup');
          }}
          bgColor={'#FFB000'}
          borderColor={Color.white}
          borderWidth={1}
          borderRadius={moderateScale(30, 0.3)}
        />
        <CustomText
        
          style={{
            color: Color.white,
            fontSize: moderateScale(12, 0.6),
            width: windowWidth * 0.7,
            textAlign: 'center',
            paddingVertical: moderateScale(10, 0.6),
          }}>
          Already have an account?{' '}</CustomText>
          {
            <CustomText
              isBold
              style={{
                color: Color.black,
                fontSize: moderateScale(12, 0.7),
              }}
              onPress={() => {
                navigationService.navigate('LoginScreen');
              }}>
              {' '}
              Login Now
            </CustomText>
          }
        
        <CustomText
          style={{
            color: Color.white,
            fontSize: moderateScale(8, 0.7),
            marginTop:moderateScale(10,.3),
            // bottom: moderateScale(80,.6),
            // position: 'absolute',
            width: windowWidth * 0.9,
            lineHeight: 18,

            textAlign: 'center',
          }}
          onPress={() => {}}>
          {' '}
          Discover the extraordinary in the ordinary. Our Nearby Places app
          brings the world closer by helping you explore hidden gems, local
          culture, and exciting experiences, all right in your neighborhood
        </CustomText>

        {/* <Animatable.View
          animation="fadeInLeft"
          duration={2500}
          useNativeDriver
          style={[styles?.textContainer]}
          
          
          >
          <CustomImage
            source={require('../Assets/Images/logo.png')}
            resizeMode={"contain"}
            style={[styles.bottomImage]}
            />
        </Animatable.View> */}
      </LinearGradient>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: 'center',
    height: windowHeight,
    width: windowWidth,
    backgroundColor: Color.themeColor,
  },
  bottomImage: {
    width: windowWidth * 0.5,
  },
  // textContainer: {
  //   flexDirection: "row",
  //   alignSelf :'center',
  //   width : windowWidth * 0.4,
  //   height :windowWidth * 0.4,
  //   borderRadius : moderateScale(windowWidth* 0.7 / 2 , 0.3),
  //   justifyContent : 'center',
  //   alignItems : 'center',
  //   // backgroundColor : Color.white,

  // },
  LogoText: {
    fontSize: moderateScale(35, 0.3),
    fontWeight: 'bold',
  },
});

export default GetStarted;
