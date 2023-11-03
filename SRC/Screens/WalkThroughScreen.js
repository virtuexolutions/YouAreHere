import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  PixelRatio,
} from 'react-native';
import {Icon} from 'native-base';
import AppIntroSlider from 'react-native-app-intro-slider';
import Color from '../Assets/Utilities/Color';
import {useSelector, useDispatch} from 'react-redux';
import ScreenBoiler from '../Components/ScreenBoiler';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import {setWalkThrough} from '../Store/slices/auth';
import LinearGradient from 'react-native-linear-gradient';

const WalkThroughScreen = props => {
  const dispatch = useDispatch();

  const slides = [
    {
      key: '1',
      logo: require('../Assets/Images/MobileLocation.png'),
      title: 'Capture Moments, Preserve Your Journeys',
      text: `Experience the essence of our app's magic with a simple, yet powerful feature – note-taking. With 'Capture Moments, Preserve Your Journeys,' you can chronicle your travel adventures effortlessly. Every destination becomes a memory, and every note an entry in your travel diary. Whether it's the flavors of a street market, \n\n the view from a hidden viewpoint, or the warmth of a local cafe, your notes will be the heart and soul of your travels. Say goodbye to forgetting the small details and embrace a world of memories at your fingertips. So, explore the world, and with every visit, capture the essence of your journey.`,
    },
    {
      key: '2',
      logo: require('../Assets/Images/searchLocation.png'),
      title: 'Navigate, Discover, Dine, Your Way',
      text: `Navigate your world effortlessly with our cutting-edge location feature. Your journey becomes a seamless adventure as we provide you with real-time, personalized recommendations based on your preferences. Whether you're searching for the finest dining experiences, hidden gems, or exciting attractions, we've got you covered. \n\n See the world through the eyes of local experts as you access Google details, reviews, and ratings, ensuring every choice is the right one. 'Navigate, Discover, Dine, Your Way' brings the power of discovery to your fingertips, guaranteeing you find the best, wherever you are, and wherever you want to go.`},
    {
      key: '3',
      logo: require('../Assets/Images/EarthLocation.png'),
      title: 'Define Your Destination, Unlock Endless Adventures',
      text: `Customize your adventure with our location customization feature and unlock boundless possibilities. 'Define Your Destination, Unlock Endless Adventures' empowers you to set your own course and preferences, just like a local explorer. Whether you crave exquisite dining, unique attractions, or hidden gems, it's all within your grasp. \n\n Discover what's important to you, while retaining access to Google details, reviews, and ratings, making informed choices the standard. Tailor your journey to your desires, and experience the world on your terms. Wherever you are, whatever you seek, your adventure starts here with location customization.`},
  ];
  // 

  const RenderSlider = ({item}) => {
    return (
      <View style={styles.SliderContainer}>
        <LinearGradient
          start={{x: 0.0, y: 0.25}}
          end={{x: 0.5, y: 1.0}}
          colors={Color.themeBgColor}
          style={{
            width: windowWidth,
            alignItems: 'center',
            //   justifyContent: 'center',
            height: windowHeight,
          }}>
          <Image
            source={item.logo}
            resizeMode={'contain'}
            style={{height: windowHeight * 0.5}}
          />
          <View
            style={{
              width: windowWidth * 0.9,
              // height: windowHeight * 0.4,
              borderRadius: moderateScale(20, 0.6),
              paddingVertical: moderateScale(26, 0.6),
              backgroundColor: 'rgba(255,255,255,.7)',
              alignItems: 'center',
            }}>
            <CustomText
              style={{
                color: Color.black,
                fontSize: moderateScale(20, 0.6),
                width: windowWidth * 0.8,
                textAlign: 'center',
                paddingVertical: moderateScale(5, 0.6),
              }}
              numberOfLines={2}
              isBold>
              {item?.title}
            </CustomText>
            <CustomText
              style={{
                color: Color.black,
                fontSize: moderateScale(10, 0.6),
                width: windowWidth * 0.8,
                textAlign: 'center',
                paddingVertical: moderateScale(5, 0.6),
              }}
              // numberOfLines={5}
              >
              {item?.text}
            </CustomText>
           
          </View>
          {/* <View
            style={{
              alignItems: 'center',
            }}>
            <Text numberOfLines={1} style={styles.title}>
              {item.title}
            </Text>
            <Text numberOfLines={4} style={styles.subText}>
              {item.text}
            </Text>
          </View> */}
        </LinearGradient>
      </View>
    );
  };

  const RenderNextBtn = () => {
    return (
      <CustomText style={[styles.generalBtn, styles.btnRight]}>Next</CustomText>
    );
  };
  const RenderDoneBtn = () => {
    return (
      <CustomText
        onPress={() => {
          dispatch(setWalkThrough(true));
        }}
        style={[styles.generalBtn, styles.btnRight]}>
        Done
      </CustomText>
    );
  };
  const RenderSkipBtn = () => {
    return (
      <CustomText
        onPress={() => {
          dispatch(setWalkThrough(true));
        }}
        style={[styles.generalBtn, styles.btnLeft]}>
        Skip
      </CustomText>
    );
  };
  const RenderBackBtn = () => {
    return (
      <CustomText style={[styles.generalBtn, styles.btnLeft]}>Back</CustomText>
    );
  };
  return (
    <ScreenBoiler
      showHeader={false}
      statusBarBackgroundColor={[Color.white, Color.white]}
      statusBarContentStyle={'dark-content'}>
      <View style={styles.container}>
        {/* <CustomImage
          source={backgroundImage}
          resizeMode="contain"
          style={styles.bgImage}
        /> */}
        <AppIntroSlider
          renderItem={RenderSlider}
          data={slides}
          showSkipButton={true}
          showPrevButton={true}
          activeDotStyle={{backgroundColor: Color.white}}
          dotStyle={{
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: Color.white,
          }}
          renderDoneButton={RenderDoneBtn}
          renderNextButton={RenderNextBtn}
          renderSkipButton={RenderSkipBtn}
          renderPrevButton={RenderBackBtn}
        />
      </View>
    </ScreenBoiler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
  },
  SliderContainer: {
    // flex: 1,
    height: windowHeight,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
  },
  title: {
    color: Color.white,
    fontWeight: '700',
    fontSize: 30,
    textAlign: 'center',
    width: windowWidth * 0.8,
    marginTop: windowHeight * 0.065,
  },
  subcontainer: {
    width: windowWidth,
    height: windowHeight * 0.55,
    backgroundColor: Color.green,
    borderTopLeftRadius: moderateScale(35, 0.3),
    borderTopRightRadius: moderateScale(35, 0.3),
  },
  subText: {
    color: Color.white,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: moderateScale(15, 0.3),
    width: windowWidth * 0.8,
    marginTop: moderateScale(10, 0.3),
  },
  generalBtn: {
    paddingVertical: moderateScale(15, 0.3),
    textAlign: 'center',
    fontWeight: '400',
    fontSize: moderateScale(15, 0.3),
  },
  btnLeft: {
    color: Color.white,
    paddingLeft: moderateScale(20, 0.3),
  },
  btnRight: {
    color: Color.white,
    paddingRight: moderateScale(20, 0.3),
  },
});

export default WalkThroughScreen;
