import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';

const CardContainer = ({children, style}) => {
  return (
    <View style={[styles.container, style && style]}>
      {children}
    </View>
  );
};

export default CardContainer;

const styles = ScaledSheet.create({
  container: {
    width: windowWidth * 0.9,
    borderRadius: moderateScale(20, 0.3),
    backgroundColor: '#F8FFEE',
    // height: windowHeight * 0.45,
    marginBottom: moderateScale(10, 0.3),
    paddingHorizontal: moderateScale(10, 0.3),
  },
});
