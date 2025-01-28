import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  requestLocationPermission,
  windowHeight,
  windowWidth,
} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import Modal from 'react-native-modal';
import CustomText from './CustomText';
import {moderateScale} from 'react-native-size-matters';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
// import 'react-native-get-random-values';
import CustomButton from './CustomButton';
import { setFavouriteLocation } from '../Store/slices/common';
import {useDispatch} from 'react-redux';
import {setDropoffLocation} from '../Store/slices/common';
import TextInputWithTitle from './TextInputWithTitle';
import DropDownSingleSelect from './DropDownSingleSelect';

const SearchLocationModal = ({
  isModalVisible,
  setIsModalVisible,
  // setAddress,
  locationType,
  setPickupLocation,
  setdropOffLocation,
  onPressCurrentLocation,
  isyourLocation = false,
  setcurrentPossition,
  onPress,
  addLocation,
  setAdditionalLocation,
  additionalLocation,
  setLabel,
  // address,
  label,
}) => {
  const dispatch = useDispatch();
  const [address , setAddress] = useState({})
  return (
    <Modal
      hasBackdrop={true}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      isVisible={isModalVisible}
      onBackdropPress={() => {
        setIsModalVisible(false);
      }}>
      <View style={styles.maincontainer}>
        <CustomText
          style={{
            color: Color.themeBlack,
            // marginBottom: moderateScale(10, 0.3),
            fontSize: moderateScale(22, 0.6),
          }}
          isBold>
          Add Place
        </CustomText>
        {/* <TextInputWithTitle
          borderColor={Color.themeColor}
          backgroundColor={Color.white}
          titleText={'search'}
          placeholder={'Label'}
          setText={setLabel}
          paddingHorizontal={moderateScale(18, 0.3)}
          // marginVertical={moderateScale(10,.3)}
          value={label}
          viewHeight={0.06}
          viewWidth={0.8}
          inputWidth={0.79}
          border={0.5}
          marginTop={moderateScale(30, 0.3)}
          color={Color.black}
          placeholderColor={Color.veryLightGray}
          borderRadius={moderateScale(38, 0.7)}
          style={styles.input}
        /> */}
         <DropDownSingleSelect
              array={['Home', 'Work Place']}
              item={label}
              setItem={setLabel}
              placeholder={'add Label'}
              width={windowWidth * 0.8}
              dropDownHeight={windowHeight * 0.06}
              borderColor={Color.themeColor}
              borderWidth={1}
              dropdownStyle={{
                width: windowWidth * 0.9,
           
                marginTop: moderateScale(15, 0.3),
              }}
          
            />

        <GooglePlacesAutocomplete
          onFail={error => console.error(error, 'errrrrrorrrr')}
          placeholder="Enter Your Address"
          textInputProps={{
            placeholderTextColor: '#5d5d5d',
            // value: inputValue,
          }}
          onPress={(data, details = null) => {
            console.log('Location ========>>>>', {
              name: data?.description,
              lat: details?.geometry?.location?.lat,
              lng: details?.geometry?.location?.lng,
            });
            // setIsModalVisible(false);

            const newFave = {
              id:Math.random(),
              name: data?.description,
              lat: details?.geometry?.location?.lat,
              lng: details?.geometry?.location?.lng,
              label: label,
            };
            setAddress(newFave)
           
            // const updatedfave = [...address, newFave];
            // updatefav(updatedfave);
          }}
          query={{
            key: 'AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc',
            language: 'en',
          }}
          isRowScrollable={true}
          fetchDetails={true}
          styles={{
            textInputContainer: {
              width: windowWidth * 0.8,
              marginLeft: moderateScale(5, 0.6),
            },
            textInput: {
              height: windowHeight * 0.06,
              color: Color.black,
              fontSize: moderateScale(12, 0.6),
              borderWidth: 0.5,
              borderColor: Color.themeColor,
              borderRadius: moderateScale(38, 0.6),
              marginVertical: moderateScale(15, 0.3), 
            },
            listView: {
              width: windowWidth * 0.8,
              marginLeft: moderateScale(5, 0.6),
              borderColor: Color.veryLightGray,
            },
            description: {
              color: 'black',
            },
          }}
        />
        {/* {Object.keys(address)?.length > 0 && ( */}
          <View
            style={{
              // alignSelf : 'center',
              position: 'absolute',
              bottom: 15,
              // height :windowHeight *0
            }}>
            <CustomButton
              text={'confrim'}
              textColor={Color.white}
              width={windowWidth * 0.8}
              height={windowHeight * 0.06}
              marginTop={moderateScale(20, 0.3)}
              onPress={() => {
                if(Object.keys(address).length > 0){

                  dispatch(setFavouriteLocation(address));
                  setLabel('')
                  setIsModalVisible(false)
                }
              }}
              bgColor={'#FFB000'}
              borderColor={Color.white}
              borderWidth={1}
              borderRadius={moderateScale(30, 0.3)}
            />
          </View>
        {/* )} */}
      </View>
    </Modal>
  );
};

export default SearchLocationModal;

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: Color.white,
    width: windowWidth * 0.9,
    height: windowHeight * 0.82,
    alignItems: 'center',
    borderRadius: moderateScale(20, 0.3),
    paddingVertical: moderateScale(15, 0.3),
    borderWidth: 1,
    borderColor: Color.themeColor,
  },
});
