import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { windowHeight, windowWidth } from '../Utillity/utils';
import CustomText from './CustomText';
import CustomImage from './CustomImage';
import { moderateScale } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';

const StoriesComponent = ({ item, setSelectedStory, selectedStory }) => {
  // console.log("🚀 ~ file: StoriesComponent.js:10 ~ StoriesComponent ~ item:", item)
  // console.log(
  //   '🚀 ~ file: StoriesComponent.js:9 ~ StoriesComponent ~ item:',
  //   item,
  // );
  // console.log(
  //   '🚀 ~ file: StoriesComponent.js:9 ~ StoriesComponent ~ selectedStory:',
  //   selectedStory,
  // );

  return (
    <TouchableOpacity
      onPress={() => {
        // setNotes(item?.Notes);
        setSelectedStory(item);
      }}
      style={{
        // marginTop: moderateScale(10, 0.3),
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'purple',
        marginTop: moderateScale(10, .3),
        marginHorizontal: moderateScale(5, 0.3),
        paddingBottom: moderateScale(10, 0.6),
      }}>
      <View
        style={[
          styles.Profile,
          selectedStory.id == item?.id && {
            width: windowWidth * 0.17,
            height: windowWidth * 0.17,
            borderRadius: (windowWidth * 0.17) / 2,
            borderColor: Color.green,
            borderWidth: 3,
          },
        ]}>
        <CustomImage
          onPress={() => {
            // setNotes(item?.Notes);
            setSelectedStory(item);
          }}
          resizeMode={'cover'}
          source={item?.flag ? { uri: `https://flagcdn.com/w320/${item?.flag.toLowerCase()}.png` } : require('../Assets/Images/15.jpg')}
          style={{ width: '100%', height: '100%' }}
        />
      </View>

      <CustomText
        numberOfLines={2}
        style={{
          fontSize: selectedStory.id == item.id ? moderateScale(12, 0.6) : moderateScale(10, 0.6),
          color: Color.black,
          textAlign: 'center',
          width: windowWidth * 0.16,
          marginTop: moderateScale(5, 0.3),
        }}
        isBold>
        {item?.country}
      </CustomText>
      <CustomText style={{
        fontSize: moderateScale(9, 0.6)
      }}>{'(' + item?.city + ')'}</CustomText>
    </TouchableOpacity>
  );
};

export default StoriesComponent;

const styles = StyleSheet.create({
  Profile: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    borderRadius: (windowWidth * 0.15) / 2,
    borderWidth: 1,
    borderColor: Color.white,
    overflow: 'hidden',
  },
});
