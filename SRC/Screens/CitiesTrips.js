import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale} from 'react-native-size-matters';
import TripCards from '../Components/TripCards';
import navigationService from '../navigationService';
import CustomText from '../Components/CustomText';
const CitiesTrips = props => {
  const data = props?.route?.params?.data;
  const countryCode = props?.route?.params?.countryCode;
  const image = props?.route?.params?.image;
  console.log(' CitiesTrips🚀 ~ image:', image);

  console.log('🚀CitiesTrips ~ data:', data);
  console.log('🚀🚀CitiesTrips ~ countryCode:', countryCode);

  const navigation = useNavigation();
  const tripList = [
    {
      id: 1,
      name: 'New York',
      ratings: 4.5,
      image: require('../Assets/Images/8.jpeg'),
    },
    {
      id: 1,
      name: 'New York',
      ratings: 4.5,
      image: require('../Assets/Images/8.jpeg'),
    },
    {
      id: 1,
      name: 'New York',
      ratings: 4.5,
      image: require('../Assets/Images/8.jpeg'),
    },
    {
      id: 1,
      name: 'New York',
      ratings: 4.5,
      image: require('../Assets/Images/8.jpeg'),
    },
    {
      id: 1,
      name: 'New York',
      ratings: 4.5,
      image: require('../Assets/Images/8.jpeg'),
    },
    {
      id: 1,
      name: 'New York',
      ratings: 4.5,
      image: require('../Assets/Images/8.jpeg'),
    },
  ];

  return (
    <ScreenBoiler
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}>
      <LinearGradient
        style={{
          width: windowWidth,
          height: windowHeight,
        }}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={Color.themeBgColor}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: moderateScale(15, 0.6),
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.Rounded}
            onPress={() => {
              console.log('Toggle drawer');
              navigation.goBack();
            }}>
            <Icon
              onPress={() => {
                navigation.goBack();
              }}
              name="chevron-back"
              as={Ionicons}
              size={moderateScale(25, 0.6)}
              color={Color.black}
            />
          </TouchableOpacity>
          <CustomText
            isBold
            style={{
              fontSize: moderateScale(20, 0.6),
              textAlign: 'center',
              width: '80%',
            }}>
            Cities
          </CustomText>
        </View>
        <View style={styles.main_view}>
          <FlatList
            data={data?.cities}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            renderItem={({item}) => {
              console.log('iuteeeeeeeeeeeeeeeeeeem', item);
              return (
                <>
                  <TripCards
                    name={data?.country}
                    country={countryCode}
                    image={image}
                    trip_name={item?.name}
                    onPress={() =>
                      navigationService.navigate('ExploreDetails', {
                        data: item,
                        item: data,
                      })
                    }
                  />
                </>
              );
            }}
          />
        </View>
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default CitiesTrips;

const styles = StyleSheet.create({
  Rounded: {
    width: windowWidth * 0.1,
    height: windowHeight * 0.05,
    borderRadius: moderateScale(30, 0.3),
    backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    elevation: 5,
    marginTop: moderateScale(10, 0.6),
    marginLeft: moderateScale(10, 0.6),
    //    position: 'absolute',
    //    top: 10,
    //    right: 10,
  },
  main_view: {
    paddingHorizontal: moderateScale(15, 0.6),
    paddingVertical: moderateScale(15, 0.6),
  },
  card_view: {
    width: windowWidth * 0.45,
    height: windowHeight * 0.2,
    backgroundColor: 'red',
    marginTop: moderateScale(10, 0.6),
    borderRadius: moderateScale(12, 0.9),
  },
});
