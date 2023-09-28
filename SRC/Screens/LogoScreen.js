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

const LogoScreen = () => {

  return (
    <ScreenBoiler
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}>
      
      <View style={styles.container}>

      <View
          style={{
            width: windowWidth * 0.5,
            height: windowHeight * 0.06,
          }}>
          <CustomImage
          resizeMode={'contain'}
            source={require('../Assets/Images/logo.png')}
            style={{width: '100%', height: '100%'}}
          />
        </View>
        <CustomText style={{marginTop:moderateScale(16,0.3),color:Color.black}}>Please Wait....</CustomText>
      </View>


    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  container: {
    justifyContent: 'center',
    alignItems:'center',
    height: windowHeight,
    width: windowWidth,
    backgroundColor: Color.white,
  },

});

export default LogoScreen;
