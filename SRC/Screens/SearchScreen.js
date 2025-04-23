import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { windowHeight, windowWidth } from '../Utillity/utils';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
// import CustomImage from './CustomImage';
// import CustomText from './CustomText';
import { Icon, ScrollView } from 'native-base';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import SearchContainer from '../Components/SearchContainer';
import CustomText from '../Components/CustomText';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import CustomButton from '../Components/CustomButton';
import { setCustomLocation } from '../Store/slices/common';
import { useDispatch } from 'react-redux';

const SearchScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const [searchData, setSearchData] = useState('');
  console.log("🚀 ~ file: SearchScreen.js:21 ~ SearchScreen ~ searchData:", searchData)

  const homePlace = {
    description: 'Home',
    geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
  };
  const workPlace = {
    description: 'Work',
    geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
  };

  return (
    <SafeAreaView style={styles.main}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          // alignItems: 'center',
          padding: moderateScale(7, 0.6),
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          activeOpacity={0.8} style={styles.Rounded}>
          <Icon
            onPress={() => {
              navigation.goBack();
            }}
            name="chevron-back-sharp"
            as={Ionicons}
            size={moderateScale(30)}
            color={Color.black}
          />
        </TouchableOpacity>

        <GooglePlacesAutocomplete
          placeholder="Search"
          textInputProps={{
            placeholderTextColor: '#5d5d5d',
            // returnKeyType: "search"
          }}
          onPress={(data, details = null) => {
            console.log('hello hereeeee ========  >>>>>>>>>', { name: data?.description, location: details?.geometry?.location });
            setSearchData({ name: data?.description, location: details?.geometry?.location })
          }}
          query={{
            // key: 'AIzaSyDa3hGQ1LsGw7cyjCwCKx6rxU62g6vt0b8' --old api,
            key: 'AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc',

            language: 'en',
          }}
          isRowScrollable={true}
          fetchDetails={true}
          // enablePoweredByContainer={false}
          styles={{

            textInputContainer: {
              width: windowWidth * 0.8,
              marginLeft: moderateScale(5, 0.6)
            },
            textInput: {
              height: windowHeight * 0.06,
              color: '#5d5d5d',
              fontSize: 16,
              borderWidth: 2,
              borderColor: Color.lightGrey,
              borderRadius: moderateScale(20, 0.6),

            },
            listView: {
              width: windowWidth * 0.8,
              marginLeft: moderateScale(5, 0.6),
              borderColor: Color.veryLightGray,
              // color : 'red',
              // backgroundColor : 'red'

            },

            description: {
              color: '#5d5d5d',
            }

          }}
        // predefinedPlaces={[homePlace, workPlace]}
        />
      </View>

      {
        Object.keys(searchData).length > 0 &&
        <View style={{
          alignSelf: 'center',
          position: 'absolute',
          bottom: 50,
        }}>

          <CustomButton
            text={
              'Proceed'

            }
            textColor={Color.white}
            width={windowWidth * 0.80}
            height={windowHeight * 0.06}
            marginTop={moderateScale(20, 0.3)}
            onPress={() => {
              dispatch(setCustomLocation(searchData))
              navigation.goBack()
            }}
            bgColor={'#FFB000'}
            borderColor={Color.white}
            borderWidth={1}
            borderRadius={moderateScale(30, 0.3)}

          />
        </View>
      }
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  main: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: 'white',
    // alignItems : 'flex-end'
  },

  SearchContainer: {
    width: windowWidth * 0.77,
    height: windowHeight * 0.07,
    borderRadius: 30,
    borderColor: Color.lightGrey,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: moderateScale(5, 0.6),
    alignItems: 'center',
  },

  Rounded: {
    width: windowWidth * 0.12,
    height: windowHeight * 0.06,
    borderRadius: moderateScale(30, 0.3),
    backgroundColor: '#FBB824',
    alignItems: 'center',
    justifyContent: 'center',
    // position : 'absolute',
    // left : 5,
  },

  txt1: {
    fontSize: moderateScale(12, 0.6),
    color: Color.black,
  },
});
