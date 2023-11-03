import {Linking, Platform, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import CustomButton from '../Components/CustomButton';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {setIsLocationEnabled} from '../Store/slices/auth';
import { useDispatch } from 'react-redux';

const LocationEnabler = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const TryAgain = () => {
    if (Platform.OS === 'android') {
      RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000,
      })
        .then(data => {
          dispatch(setIsLocationEnabled(true));
        })
        .catch(err => {
          setIsLoading(true);
        });
    }
  };
  useEffect(() => {
    TryAgain();
  }, []);

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />

      {isLoading && (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            //   backgroundColor: 'black',
            width: windowWidth,
            height: windowHeight,
          }}>
          <CustomText
            style={{fontSize: moderateScale(20, 0.6), color: Color.darkGray}}
            isBold>
            Oops
          </CustomText>
          {Platform.OS == 'android' ? (
            <>
              <CustomText
                style={{
                  fontSize: moderateScale(14, 0.6),
                  color: Color.veryLightGray,
                  marginTop: moderateScale(20, 0.3),
                  width: windowWidth * 0.7,
                  textAlign: 'center',
                }}
                isBold
                numberOfLines={3}>
                you need to allow access to location in order to use Qavah.
                Please try again and hit OK
              </CustomText>
              <CustomButton
                text={'Try Again'}
                textColor={Color.white}
                width={windowWidth * 0.4}
                height={windowHeight * 0.06}
                onPress={() => {
                  console.log('Here');
                  TryAgain();
                }}
                marginLeft={windowWidth * 0.05}
                marginRight={windowWidth * 0.05}
                bgColor={Color.themeColor}
                borderRadius={moderateScale(20, 0.6)}
                marginTop={moderateScale(30, 0.6)}
                marginBottom={moderateScale(10, 0.6)}
                elevation
                isBold
                // isGradient
                fontSize={moderateScale(14, 0.6)}
              />
            </>
          ) : (
            <>
              <CustomText
                style={{
                  fontSize: moderateScale(12, 0.6),
                  color: Color.veryLightGray,
                  marginTop: moderateScale(20, 0.3),
                  width: windowWidth * 0.7,
                  textAlign: 'center',
                }}
                isBold>
                unable to connect
              </CustomText>
              <CustomText
                style={{
                  fontSize: moderateScale(12, 0.6),
                  color: Color.veryLightGray,
                  // marginTop: moderateScale(20, 0.3),
                  width: windowWidth * 0.7,
                  textAlign: 'center',
                }}>
                {`to use qavah you need to enable your loacation sharing so we can show you who is around`}
              </CustomText>
              <CustomText
                style={{
                  fontSize: moderateScale(12, 0.6),
                  color: Color.veryLightGray,
                  // marginTop: moderateScale(20, 0.3),
                  width: windowWidth * 0.7,
                  textAlign: 'center',
                }}>
                {`Go to settings > qavah > Location > enable loaction while using this app`}
              </CustomText>
              <CustomButton
                text={'Go to settings'}
                textColor={Color.white}
                width={windowWidth * 0.4}
                height={windowHeight * 0.06}
                onPress={() => {
                  console.log('Here');
                  Linking.openSettings();
                }}
                marginLeft={windowWidth * 0.05}
                marginRight={windowWidth * 0.05}
                bgColor={Color.themeColor}
                borderRadius={moderateScale(20, 0.6)}
                marginTop={moderateScale(30, 0.6)}
                marginBottom={moderateScale(10, 0.6)}
                elevation
                isBold
                // isGradient
                fontSize={moderateScale(14, 0.6)}
              />
            </>
          )}
        </View>
      )}
    </>
  );
};

export default LocationEnabler;

const styles = StyleSheet.create({});
