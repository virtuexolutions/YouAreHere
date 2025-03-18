import { Icon } from 'native-base';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { setCustomLocation } from '../Store/slices/common';
import { windowWidth } from '../Utillity/utils';
import CustomImage from './CustomImage';
import CustomText from './CustomText';

const SearchContainer = ({
  width,
  text,
  input,
  onPress,
  data,
  setData,
  style,
  places,
  textStyle,
  inputStyle,
  placeHolder,
  rightIcon,
  countryCode,
  currentLocation
}) => {
  console.log("🚀 ~ currentLocation:", currentLocation)
  const dispatch = useDispatch()
  const customLocation = useSelector(state => state.commonReducer.customLocation)
  return (
    <GestureHandlerRootView>
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        <View
          style={[
            styles.container,
            width && { width: width },
            input && { padding: 0 },
            style && style,
          ]}>
          {text && (
            <>
              {
                !['', null, undefined].includes(placeHolder) ?
                  <CustomText
                    style={[{
                      fontSize: moderateScale(8, 0.6),
                      color: Color.veryLightGray,
                      // lineHeight: moderateScale(20, 0.3),
                    }, textStyle && textStyle]}>{placeHolder} </CustomText>
                  :

                  <CustomText
                    style={[{
                      fontSize: moderateScale(12, 0.6),
                      color: Color.black,
                      // lineHeight: moderateScale(20, 0.3),
                    }, textStyle && textStyle]}>
                    {'Where to? \n'}
                    <CustomText style={{ fontSize: moderateScale(10, 0.6), color: Color.veryLightGray }}>
                      Anytime anyWhere
                    </CustomText>
                  </CustomText>
              }
              <View
                style={{
                  height: windowWidth * 0.09,
                  width: windowWidth * 0.09,
                  overflow: 'hidden',
                  borderRadius: (windowWidth * 0.09) / 2,
                  // borderRadius:moderateScale(20,.6),
                  backgroundColor: '#fff',
                  padding: moderateScale(5, 0.6),
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.32,
                  shadowRadius: 5.46,

                  elevation: 9
                }}>
                <Icon
                  name={Object.keys(customLocation).length > 0 ? 'close' : "search"}
                  as={Object.keys(customLocation).length > 0 ? AntDesign : FontAwesome}
                  size={moderateScale(22)}
                  style={{ alignSelf: 'center' }}
                  color={'#fbb824'}
                  onPress={() => {
                    Object.keys(customLocation).length > 0 ? dispatch(setCustomLocation({})) : onPress()
                  }}
                />
              </View>
            </>
          )}
          {places && (
            // <GooglePlacesAutocomplete
            //   placeholder={placeHolder ? placeHolder : "Enter location"}
            //   fetchDetails={true}
            //   onPress={(data, details = null) => {
            //     // 'details' is provided when fetchDetails = true
            //     let lat = details?.geometry?.location?.lat;
            //     let lng = details?.geometry?.location?.lng;
            //     console.log(lat, lng);
            //     setData({ latitute: lat, longitute: lng });
            //   }}
            //   query={{
            //     key: "AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc",
            //     language: "en",
            //     components: `country:${countryCode}`,
            //   }}
            // />
            <GooglePlacesAutocomplete
              placeholder={placeHolder ? placeHolder : "Enter location"}
              fetchDetails={true}
              onPress={(data, details = null) => {
                let lat = details?.geometry?.location?.lat;
                let lng = details?.geometry?.location?.lng;
                console.log(lat, lng);
                setData({ latitude: lat, longitude: lng });
              }}
              query={{
                // key: "AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc",
                // language: "en",
                // components: `country:PK`,
                key: "AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc",
                language: "en",
                components: `country:${countryCode}`,
                location: `${currentLocation?.latitude},${currentLocation?.longitude}`,
                radius: 50000,
              }}
            />

          )}

          {input && (
            <>
              <Icon
                name={'search'}
                as={FontAwesome}
                size={moderateScale(17, 0.3)}
                color={'#E7DFDC'}
              // style={{backgroundColor : 'red'}}
              />

              <TextInput
                placeholder={placeHolder ? placeHolder : 'Search here'}
                placeholderTextColor={'#E7DFDC'}
                numberOfLines={1}
                value={data}
                onChangeText={text => {
                  setData(text);
                }}
                style={[
                  {
                    marginLeft: moderateScale(10, 0.3),
                    width: windowWidth * 0.61,
                    // backgroundColor:'black',
                    // height : windowHeight * 0.05,
                    // fontSize: moderateScale(15, 0.3),
                    color: Color.black,
                    // backgroundColor : 'red'
                  },
                  inputStyle && inputStyle,
                ]}
              />
              {/* <Icon
              name={'filter'}
              as={Ionicons}
              size={moderateScale(20,0.3)}
              color={'#FF6E2E'}
              // style={{backgroundColor : 'red'}}
              /> */}
              <View

                style={{
                  height: windowWidth * 0.09,
                  width: windowWidth * 0.09,
                  overflow: 'hidden',
                  borderRadius: (windowWidth * 0.09) / 2,
                  // borderRadius:moderateScale(20,.6),
                  backgroundColor: '#fbb824',
                  padding: moderateScale(5, 0.6),
                }}>
                <CustomImage
                  source={require('../Assets/Images/filter.png')}
                  style={{ height: '100%', width: '100%' }}
                />
              </View>
            </>
          )}
        </View>
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
};

const styles = ScaledSheet.create({
  container: {
    // flexGrow: 0,
    flexDirection: 'row',
    // justifyContent: "space-between",
    // marginTop: moderateScale(10, 0.3),
    borderWidth: 1,
    borderColor: '#EAEBEC',
    backgroundColor: Color.white,
    borderRadius: moderateScale(5, 0.3),
    paddingVertical: moderateScale(8, 0.3),
    paddingHorizontal: moderateScale(10, 0.3),

    //  elevation: 5,
    alignItems: 'center',
  },
});

export default SearchContainer;
