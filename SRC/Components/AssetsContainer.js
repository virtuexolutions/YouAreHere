import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Color from '../Assets/Utilities/Color';
import { useDispatch } from 'react-redux';
import { setPrefrences } from '../Store/slices/common';
// import { setPrefrences } from '../Store/slices/common';

const AssetsContainer = ({item, preferences, setPreferences , index}) => {
  console.log("🚀 ~ file: AssetsContainer.js:12 ~ AssetsContainer ~ preferences:", preferences)
  const [activetab, setActiveTab] = useState(false);
  const dispatch = useDispatch()
  
  return (
    <TouchableOpacity 
    activeOpacity={0.8}
    onPress={() => {
      setActiveTab(!activetab);
      console.log('item name==========', item?.name)

      // dispatch(setPrefrences(item?.name))

      if(preferences.includes(item?.name)){
        console.log('Condition 1 ')
        setPreferences(preferences.filter(asset=> asset != item?.name ))

      }else{
        console.log('Condition 2')

        setPreferences(prev => [...prev, item?.name])
      }

    }}
    style={styles.main}>
      <View
        style={{
          width: windowWidth * 0.08,
          height: windowHeight * 0.04,
          backgroundColor: Color.yellow,
          borderRadius: 20,
          overflow: 'hidden',
          padding: moderateScale(7, 0.6),
        }}>
        <CustomImage
          source={item.Image}
          style={{width: '100%', height: '100%'}}
        />
      </View>

      <CustomText style={styles.txt1}>{item.name}</CustomText>

      <TouchableOpacity
        onPress={() => {
          setActiveTab(!activetab);
          console.log('item name==========', item?.name)

          // dispatch(setPrefrences(item?.name))

          if(preferences.includes(item?.name)){
            console.log('Condition 1 ')
            setPreferences(preferences.filter(asset=> asset != item?.name ))

          }else{
            console.log('Condition 2')
    
            setPreferences(prev => [...prev, item?.name])
          }

        }}
        style={{
          width: windowWidth * 0.06,
          height: windowHeight * 0.03,
          borderWidth: 1,
          borderColor: preferences.includes(item?.name) ? '#00e32d' : '#f0bb39',
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: preferences.includes(item?.name) ? '#00E32D' : null,
        }}>
        <Icon
          onPress={() => {
            setActiveTab(!activetab);
            // dispatch(setPrefrences(item?.name))
            
            if(preferences.includes(item?.name)){
              console.log('Condition 1 ')
              setPreferences(preferences.filter(asset=> asset != item?.name ))
  
            }else{
              console.log('Condition 2')
  
              setPreferences(prev => [...prev, item?.name])
            }

            console.log('DATA', activetab);
          }}
          name="check"
          as={AntDesign}
          size={moderateScale(12)}
          color={preferences.includes(item?.name) ? '#fff' : '#f0bb39'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default AssetsContainer;

const styles = StyleSheet.create({
  main: {
    width: windowWidth * 0.95,
    height: windowHeight * 0.06,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Color.white,
    borderRadius: moderateScale(20, 0.3),
    margin: moderateScale(5, 0.3),
    alignItems: 'center',
    padding: moderateScale(10, 0.6),
  },

  txt1: {
    width: windowWidth * 0.66,
    // backgroundColor:'red',
    fontSize: moderateScale(13, 0.7),
  },
});
