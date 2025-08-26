import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import { windowHeight, windowWidth } from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import LottieView from 'lottie-react-native';
import CustomText from './CustomText';

const CustomListEmptyComponent = ({text , customViewStyle}) => {
  return (
    <View
      style={[styles.mainView , customViewStyle && customViewStyle]}>
      <LottieView
        resizeMode="cover"
        source={require('../Assets/Images/Emptybox.json')}
        style={styles.image}
        autoPlay
        loop
      />
      <CustomText
        style={styles.text}>
        {text}
      </CustomText>
    </View>
  );
};

export default CustomListEmptyComponent;

const styles = ScaledSheet.create({
  mainView: {
    height: windowHeight * 0.2,
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor : 'red'
  },
  image: {
    height: windowHeight * 0.1,
    width: windowWidth * 0.3,
    backgroundColor: 'transparent',
  },
  text: {
    color: Color.white,
    textAlign: 'center',
    width: windowWidth * 0.5,
    // marginTop: moderateScale(20, 0.6),
  },
});
