import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import {moderateScale} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';

const FilesComponent = ({item}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor:'purple',
        // paddingHorizontal: moderateScale(10, 0.3),
       
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <CustomText
        style={{
          color: 'white',
          fontSize: moderateScale(12, 0.6),
          backgroundColor: 'red',
          padding: moderateScale(10, 0.6),
          borderRadius: moderateScale(20, 0.6),
          transform: [{rotate: '-90deg'}],
        }}>
        {item?.title}
      </CustomText>
      <View style={{height: windowHeight * 0.15, width: windowWidth * 0.85, backgroundColor:'white'}}>
        <CustomText
          style={{
            // width: windowWidth * 0.85,
            // color: 'black',
            // fontSize: moderateScale(12, 0.6),
            // backgroundColor: 'white',
          }}>
          {item?.text}
        </CustomText>
      </View>
    </View>
  );
};

export default FilesComponent;

const styles = StyleSheet.create({});
