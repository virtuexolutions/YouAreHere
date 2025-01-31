import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from './CustomText';
import CustomImage from './CustomImage';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import {} from 'react-native-gesture-handler';
import navigationService from '../navigationService';
import moment from 'moment';

const NotesComponent = ({item, setSelectedNote, selectedStory}) => {
  console.log('🚀 ~ file: NotesComponent.js:12 ~ NotesComponent ~ item:', item);
  // console.log('DATA=========>>>>', item.image?.uri);
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        setSelectedNote(item);
        // setNoteModalVisible(true)
        navigationService.navigate('NotePad', {
          item: item,
          selectedStory: selectedStory,
        });
      }}
      style={{
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        marginTop: moderateScale(20, 0.3),
      }}>
      <View
        style={{
          width: windowWidth * 0.09,
          height: windowHeight * 0.01,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: Color.black,
          backgroundColor: Color.white,
          marginRight: moderateScale(5, 0.3),
          //   position: 'absolute',
          //   left: 0,
          //   top: 60,
          zIndex: 1,
        }}></View>
      <View
        style={{
          // paddingHorizontal: moderateScale(10, 0.6),
          flexDirection: 'row',
          alignItems: 'center',
          width: windowWidth * 0.9,
          height: windowHeight * 0.11,
          backgroundColor: Color.lightGrey,
          marginLeft: moderateScale(-20, 0.3),
          alignSelf: 'center',
          //   marginTop: moderateScale(20, 0.3),
          borderRadius: moderateScale(10, 0.3),
          elevation: 5,
          borderWidth: 1,
          borderColor: Color.black,
          // zIndex : 1,
        }}>
        <View
          style={{
            width: windowWidth * 0.03,
            height: windowWidth * 0.03,
            borderRadius: (windowWidth * 0.03) / 2,
            backgroundColor: Color.black,
            marginRight: moderateScale(5, 0.3),
            marginLeft: moderateScale(10, 0.3),
          }}></View>

        <View style={styles.Profile}>
          <CustomImage
            resizeMode={'cover'}
            source={
              item?.image
                ? {uri: item?.image}
                : require('../Assets/Images/n.jpg')
            }
            style={{width: '100%', height: '100%'}}
          />
        </View>

        <View
          style={{
            marginLeft: moderateScale(20, 0.3),
          }}>
          <CustomText
            numberOfLines={1}
            style={{
              fontSize: moderateScale(13, 0.6),
              color: Color.black,
              width: windowWidth * 0.4,
            }}>
            {item.title}
          </CustomText>
          <CustomText
            numberOfLines={2}
            style={{
              fontSize: moderateScale(9, 0.6),
              color: Color.black,
              width: windowWidth * 0.4,
            }}>
            {item.description}
          </CustomText>
        </View>
        {/* <TouchableOpacity
          style={{
            backgroundColor: Color.themeColor,
            padding: moderateScale(3, 6),
            borderRadius: moderateScale(5, 0.6),
            position : 'absolute' ,
             right: 15 ,
          }}>
          <CustomText
            isBold
            style={{
              color: 'white',
            }}>
            Start Trip
          </CustomText>
        </TouchableOpacity> */}

        <View style={{position: 'absolute', right: 10, top: 2}}>
          <CustomText
            style={{fontSize: moderateScale(9, 0.6), color: Color.black}}>
            {moment(item?.created_at).format('DD MMM')}
          </CustomText>
        </View>
      </View>
      <View
        style={{
          height: '100%',
          width: windowWidth * 0.9,
          borderRadius: moderateScale(10, 0.3),
          borderBottomLeftRadius: moderateScale(10, 0.3),
          position: 'absolute',
          top: 5,
          left: 23,
          right: 0,
          bottom: 0,
          zIndex: -1,
          // left: 15,
          borderBottomWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderWidth: 1,
          borderColor: Color.black,
          alignSelf: 'center',
          // backgroundColor : 'red'
        }}
      />
    </TouchableOpacity>
  );
};

export default NotesComponent;

const styles = StyleSheet.create({
  Profile: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    borderRadius: (windowWidth * 0.1) / 2,
    borderWidth: 1,
    borderColor: Color.black,
    overflow: 'hidden',
  },
});
