import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../Components/CustomText';
import Color from '../Assets/Utilities/Color';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from './CustomImage';
import { mode } from 'native-base/lib/typescript/theme/tools';
import RatingComponent from './RatingComponent';
import { Divider } from 'native-base';

const ModalReview = ({item}) => {
  console.log('item?. rating' , item?.rating)
  return (
    <View
      style={{
        width: windowWidth * 0.9 ,
        paddingVertical: moderateScale(15, 0.6),
        paddingHorizontal: moderateScale(10, 0.6),
      }}>
         <RatingComponent
              disable={true}
              rating={item?.rating}
              starColor={'#Fdcc0d'}
              starStyle={{
                marginRight: moderateScale(1, 0.3),
                marginTop: moderateScale(1, 0.3),

              }}
              starSize={moderateScale(13, 0.3)}
              style={{
                position : 'absolute',
                right : moderateScale(10,0.6),
                top : moderateScale(35,0.6),
              }}
              // ratingGiven={star}
              // setRatingGiven={setStar}
            />
      <View
        style={{
          flexDirection: 'row',
          // alignItems: 'center',
          // paddingHorizontal: moderateScale(10, 0.6),
        }}>
        <View style={styles.profileSection}>
          <CustomImage
            source={[null , undefined , ''].includes(item?.profile_photo_url) ? require('../Assets/Images/profile.png') : {uri : item?.profile_photo_url}}
            style={{width: '100%', height: '100%'}}
          />
        </View>

        <View style={{marginLeft: moderateScale(10, 0.3)}}>
          <CustomText
            style={{
              fontSize: moderateScale(14, 0.6),
              marginTop: moderateScale(10, 0.6),
              color: Color.black,
            }}>
            {item?.author_name}
          </CustomText>

          <CustomText
            style={{
              fontSize: moderateScale(11, 0.6),
              // marginTop: moderateScale(5, 0.6),
              color: Color.black,
            }}>
           {item?.relative_time_description}
          </CustomText>
        </View>
      </View>

      <CustomText
        style={{
          fontSize: moderateScale(11, 0.6),
          marginTop: moderateScale(10, 0.6),
          color: Color.black,
        }}>
       {item?.text}
      </CustomText>

      <Divider my="2" _light={{bg: 'muted.300'}} />
    </View>
  );
};

export default ModalReview;

const styles = StyleSheet.create({
  profileSection: {
    height: windowWidth * 0.15,
    width: windowWidth * 0.15,
    backgroundColor: '#fff',
    borderRadius: (windowWidth * 0.15) / 2,
    borderWidth: 3,
    borderColor: Color.themeBlack,
    overflow: 'hidden',
  },
});
