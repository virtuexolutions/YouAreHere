import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CustomImage from './CustomImage';
import {moderateScale} from 'react-native-size-matters';
import CustomText from './CustomText';

const TripCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.image_con}>
        <CustomImage
          style={{
            height: '100%',
            width: '100%',
          }}
          source={require('../Assets/Images/3.jpg')}
        />
      </View>
      <View>
        <CustomText isBold style={styles.h1}>
          Trip card
        </CustomText>
        <CustomText isBold style={styles.h2}>
          Note :
          {/* <CustomText  style={styles.h3}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the 
          </CustomText> */}
        </CustomText>
      </View>
    </View>
  );
};

export default TripCard;

const styles = StyleSheet.create({
  card: {
    width: windowWidth * 0.9,
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Color.black,
    height: windowHeight * 0.2,
    paddingVertical: moderateScale(5, 0.6),
    paddingHorizontal: moderateScale(3, 6),
    backgroundColor: Color.white,
  },
  image_con: {
    width: windowWidth * 0.35,
    height: windowHeight * 0.185,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'red',
  },
  h1: {
    fontSize: moderateScale(15, 0.6),
    paddingHorizontal: moderateScale(8, 0.6),
    paddingVertical: moderateScale(10, 0.6),
  },
  h2: {
    fontSize: moderateScale(15, 0.6),
    paddingHorizontal: moderateScale(8, 0.6),
  },
//   h3:{
//     fontSize : moderateScale(12,.6) ,
//     fontWeight :'700' ,
//     width  :windowWidth *0.2

//   }
});
