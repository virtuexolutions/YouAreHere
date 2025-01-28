import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {
  requestLocationPermission,
  windowHeight,
  windowWidth,
} from '../Utillity/utils';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomText from './CustomText';
import Color from '../Assets/Utilities/Color';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Icon} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import SearchContainer from './SearchContainer';
import {useNavigation} from '@react-navigation/native';
import SearchLocationModal from './SearchLocationModal';
import {useSelector, useDispatch} from 'react-redux';
import {setDeletFavLocation, setFavouriteLocaion} from '../Store/slices/common';

const AddPlacesModal = ({
  item,
  setRef,
  rbRef,
  locationName,
  // setFavouriteLocaion,
  // favouriteLocation,
  setLabel,
  label,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const favouriteplaces = useSelector(
    state => state.commonReducer.favouriteLocation,
  );
  console.log(
    'item ======================== favouriteLocation',
    favouriteplaces,
  );

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const mapRef = useRef(null);
  const [selectedPlace, setSelectedPlace] = useState({});

  return (
    <RBSheet
      ref={ref => setRef(ref)}
      closeOnDragDown={true}
      height={450}
      dragFromTopOnly={true}
      openDuration={250}
      customStyles={{
        container: {
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        },
      }}>
      <View
        style={{
          paddingHorizontal: moderateScale(15, 0.6),
          // backgroundColor:'red' ,
          alignItems: 'center',
        }}>
        <TouchableOpacity style={styles.row}>
          <Icon
            style={{
              marginTop: moderateScale(4, 0.6),
            }}
            name="location-arrow"
            as={FontAwesome5}
            size={moderateScale(10, 0.6)}
            color={Color.black}
          />
          <CustomText
            style={{
              width: windowWidth * 0.6,
              fontSize: moderateScale(12, 0.6),
              // textAlign: 'center',
              color: Color.black,
              textTransform: 'capitalize',
              paddingHorizontal: moderateScale(10, 0.6),
            }}>
            use my current Location
          </CustomText>
        </TouchableOpacity>

        <View style={styles.container}>
          <View style={styles.mapcontainer}>
           
            <MapView
              ref={mapRef}
              style={styles.map}
              //   provider={PROVIDER_GOOGLE}ßß
              initialRegion={{
                latitude: parseFloat(item?.latitude),
                longitude: parseFloat(item?.longitude),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              <Marker
                pinColor="red"
                coordinate={{
                  latitude: parseFloat(item?.latitude),
                  longitude: parseFloat(item?.longitude),
                }}
              />
            </MapView>
          </View>
          <CustomText style={styles.txt}>{locationName}</CustomText>
        </View>
        <FlatList
          // data={}
          style={{
            width: '100%',
            height: windowHeight * 0.1,
            // backgroundColor: 'red',
            marginVertical: moderateScale(15, 0.6),
          }}
          data={favouriteplaces}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedPlace(item);
                }}
                style={{
                  flexDirection: 'row',
                  marginVertical: moderateScale(7, 0.6),
                  // backgroundColor : 'red' ,
                  width: '80%',
                }}>
              
                <View>
                  <CustomText style={styles.FlatListtxt}>
                    {item?.label} 
                  </CustomText>

                  <CustomText
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={styles.txt1}>
                    {item?.name}
                  </CustomText>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setDeletFavLocation(item));
                  }}
                  style={{
                    width: moderateScale(15, 0.6),
                    height: moderateScale(15, 0.6),
                    backgroundColor: 'red',
                    borderRadius: moderateScale(20, 0.6),
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    right: -2,
                    bottom: 20,
                  }}>
                  <Icon as={Entypo} name="cross" color={Color.white} />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          }}
        />

        {favouriteplaces?.length < 2 && (
          <TouchableOpacity
            onPress={() => {
              setModalIsVisible(true);
            }}
            style={styles.row}>
            <Icon
              name="plus"
              as={Entypo}
              size={moderateScale(18, 0.6)}
              color={Color.black}
            />
            <CustomText style={styles.addtxt}>add new address</CustomText>
          </TouchableOpacity>
        )}
        <SearchLocationModal
          setLabel={setLabel}
          label={label}
          setIsModalVisible={setModalIsVisible}
          isModalVisible={modalIsVisible}
          // address={favouriteLocation}
          // setAddress={setFavouriteLocaion}
        />
      </View>
    </RBSheet>
  );
};

export default AddPlacesModal;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    alignSelf: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  mapcontainer: {
    height: windowHeight * 0.15,
    width: windowWidth * 0.9,
  },
  container: {
    backgroundColor: Color.lightGrey,
    height: windowHeight * 0.2,
    width: windowWidth * 0.93,
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: moderateScale(7, 0.6),
  },
  txt: {
    fontSize: moderateScale(15, 0.6),
    textAlign: 'left',
    // backgroundColor : 'red' ,
    width: '100%',
    paddingVertical: moderateScale(3, 0.6),
    // paddingHorizontal: moderateScale(8, 0.6),
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: moderateScale(8, 0.6),
    // paddingHorizontal: moderateScale(18, 0.6),
  },
  addtxt: {
    width: windowWidth * 0.6,
    fontSize: moderateScale(14, 0.6),
    // textAlign: 'center',
    color: Color.black,
    textTransform: 'capitalize',
    // paddingHorizontal: moderateScale(5, 0.6),
  },
  FlatListtxt: {
    fontSize: moderateScale(15, 0.6),
    color: Color.black,
    paddingHorizontal: moderateScale(10, 0.6),
    // backgroundColor : 'red' ,
    width: windowWidth * 0.87,
    textTransform: 'capitalize',
  },
  txt1: {
    width: windowWidth * 0.7,
    fontSize: moderateScale(11, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
  },
});
