import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
// import CustomImage from './CustomImage';
// import CustomText from './CustomText';
import {Icon, ScrollView} from 'native-base';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import SearchContainer from '../Components/SearchContainer';
import CustomText from '../Components/CustomText';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

const SearchScreen = () => {
  const navigation = useNavigation()
  const [searchData, setSearchData] = useState('');
  const Data = [
    {
      id: 1,
      desc: 'Lorem Ispum Dolor Sit Amet',
    },
    {
      id: 2,
      desc: 'Lorem Ispum Dolor Sit Amet',
    },
    {
      id: 3,
      desc: 'Lorem Ispum Dolor Sit Amet',
    },
    {
      id: 4,
      desc: 'Lorem Ispum Dolor Sit Amet',
    },
    {
      id: 5,
      desc: 'Lorem Ispum Dolor Sit Amet',
    },
    {
      id: 6,
      desc: 'Lorem Ispum Dolor Sit Amet',
    },
    {
      id: 7,
      desc: 'Lorem Ispum Dolor Sit Amet',
    },
    {
      id: 8,
      desc: 'Lorem Ispum Dolor Sit Amet',
    },
    {
      id: 9,
      desc: 'Lorem Ispum Dolor Sit Amet',
    },
  ];
  const homePlace = {
    description: 'Home',
    geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
  };
  const workPlace = {
    description: 'Work',
    geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
  }; 

  return (
    <View style={styles.main}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: moderateScale(7, 0.6),
        }}>
        {/* <SearchContainer
          width={windowWidth * 0.82}
          // input
          places
          inputStyle={{
            height: windowHeight * 0.05,
          }}
          style={{
            height: windowHeight * 0.07,
            marginRight: moderateScale(5, 0.3),
            borderRadius: moderateScale(25, 0.3),
            alignSelf: 'center',
          }}
          data={searchData}
          placeHolder={'Enter your address'}
          setData={setSearchData}
          rightIcon
        /> */}
              <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'AIzaSyDa3hGQ1LsGw7cyjCwCKx6rxU62g6vt0b8',
        language: 'en',
      }}
      predefinedPlaces={[homePlace, workPlace]}
    />

        <TouchableOpacity activeOpacity={0.8} style={styles.Rounded}>
          <Icon
          onPress={()=>{
            navigation.toggleDrawer()
          }}
            name="menu"
            as={Ionicons}
            size={moderateScale(20)}
            color={Color.black}
          />
        </TouchableOpacity>
      </View>

      {/* <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{
          marginTop:moderateScale(15,0.3)
        }}>
        {Data.map((item, index) => (
          <View
            style={{
              width: windowWidth * 0.9,
              borderBottomWidth: 1,
              borderColor: Color.lightGrey,
              alignSelf: 'center',
              margin: moderateScale(7, 0.3),
            }}>
            <CustomText style={styles.txt1}>{item.desc}</CustomText>
          </View>
        ))}
      </ScrollView> */}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  main: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: '#fff',
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
  },

  txt1: {
    fontSize:moderateScale(12,0.6),
    color:Color.black
  },
});
