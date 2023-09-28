import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { windowWidth } from '../Utillity/utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Color from '../Assets/Utilities/Color';
import { useSelector } from 'react-redux';
import { moderateScale } from 'react-native-size-matters';
import { Icon } from 'native-base';
import CustomText from './CustomText';


const MarkCheckWithText = ({
  checked,
  setChecked,
  containerStyle,
  iconStyle,
  textStylePrimary,
  textStyleSecondary,
  textPrimary,
  textSecondary,




}) => {
    const userRole = useSelector(state => state.commonReducer.selectedRole);
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          width: windowWidth * 0.85,
          // backgroundColor : 'red',
          marginTop: moderateScale(20, 0.3),
          alignItems: 'center',
        },
        containerStyle,
      ]}>
      <Icon
        name={checked ? 'check-square-o' : 'checkbox-passive'}
        as={checked ? FontAwesome : Fontisto}
        color={Color.white}
        onPress={() => {
          setChecked(!checked);
        }}
        size={moderateScale(13, 0.3)}
        style={iconStyle}
      />
      <CustomText
        onPress={() => {
            setChecked(!checked);
        }}
        style={[
          styles.txt3,
          {
            color: Color.white,
            marginHorizontal: moderateScale(10, 0.3),
          },
          textStylePrimary
        ]}>
        {textPrimary}
        {
          <CustomText
            isBold
            style={[
              styles.txt3,
              {
                color:
                  userRole == 'Qbid member' ? Color.blue : Color.themeColor,
              },
              textStyleSecondary
            ]}>
        {textSecondary}
          </CustomText>
        }
      </CustomText>
    </View>
  );
};

export default MarkCheckWithText;

const styles = StyleSheet.create({});
