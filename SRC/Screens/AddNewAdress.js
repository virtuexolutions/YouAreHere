import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { windowHeight, windowWidth } from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import { moderateScale } from 'react-native-size-matters';
import CustomButton from '../Components/CustomButton';

const AddNewAdress = () => {
    const [label, setLabel] = useState()
    return (
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
                placeholder="Enter Your Address"
                query={{
                    key: 'AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc',
                    language: 'en',
                }}
                fetchDetails={true}
                onPress={(data, details = null) => {
                    console.log('Selected Location:', {
                        name: data?.description,
                        location: details?.geometry?.location,
                    });
                }}
                styles={{
                    textInputContainer: {
                        width: windowWidth * 0.8,
                        marginLeft: moderateScale(5, 0.6),
                    }
                }}
            />
            {/* <GooglePlacesAutocomplete
          onFail={error => console.error(error, 'errrrrrorrrr')}
          placeholder="Enter Your Address"
          textInputProps={{
            placeholderTextColor: '#5d5d5d',
            // value: inputValue,
          }}
          onPress={(data, details = null) => {
            console.log('hello hereeeee ========  >>>>>>>>>', { name: data?.description, location: details?.geometry?.location });
            const newFave = {
              id: Math.random(),
              name: data?.description,
              lat: details?.geometry?.location?.lat,
              lng: details?.geometry?.location?.lng,
              label: label,
            };
            setAddress(newFave)
            // setSearchData({ name: data?.description, location: details?.geometry?.location })
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
        /> */}
            {/* <GooglePlacesAutocomplete
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
              id: Math.random(),
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
        /> */}

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
                        if (Object.keys(address).length > 0) {
                            // dispatch(setFavouriteLocation(address));
                            setLabel('')
                            // setIsModalVisible(false)
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
    )
}

export default AddNewAdress

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
})