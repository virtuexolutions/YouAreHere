
import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from './CustomText';
import {Icon} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from './CustomButton';
import {useNavigation} from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import CustomImage from './CustomImage';

// import { useNavigation } from '@react-navigation/core';
// import { setVoucherData } from '../Store/slices/common';

const WelcomeModal = ({item, isModalVisible, setIsModdalVisible , matchLocation , setMatchLocation}) => {
  const navigation = useNavigation();
  console.log(matchLocation , 'welcome modal')
  // const dispatch =useDispatch()
  //   const Voucher = useSelector(state => state.commonReducer.selectedVoucher);

  return (
    <Modal
      hasBackdrop={true}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      isVisible={isModalVisible}
      onBackdropPress={() => {
        setIsModdalVisible(false);
        setMatchLocation({})
      }}>
      <View
        style={{
          backgroundColor: Color.white,
          width: windowWidth * 0.8,
          alignItems: 'center',
          borderRadius: moderateScale(20, 0.3),
          paddingVertical: moderateScale(15, 0.3),
        }}>
    <View style={{
        height : windowHeight *0.08,
        width :windowWidth *0.17,

    }}>
        <CustomImage style={{
            height : '100%',
            width : '100%',
        }}
        source={require('../Assets/Images/welcome.png')}/>
    </View>

        {/* <CustomText
          style={{
            color: Color.black,
            fontSize: moderateScale(22, 0.6),
          }}
          isBold>
      welcome you are now in restaurant
        </CustomText> */}

        <CustomText
          style={{
            color: Color.darkGray,
            
            width : '80%',
            fontSize: moderateScale(12, 0.6),
            paddingBottom: moderateScale(5, 0.3),
            paddingVertical : moderateScale(15,.6),
            textAlign : 'center'
          }}
          isBold>
          welcome Back to {matchLocation?.label} we're glad to see you again !!
            </CustomText>
        <View
          style={{
            width: windowWidth * 0.7,
            alignItems: 'center',
          }}>
          <CustomButton
            textColor={Color.white}
            width={windowWidth * 0.7}
            height={windowHeight * 0.05}
            borderRadius={moderateScale(30, 0.4)}
            text={'thanks'}
            fontSize={moderateScale(12, 0.3)}
            onPress={() => {
              setIsModdalVisible(false)
              setMatchLocation({})
            }}
            bgColor={Color.themeColor}
            // isGradient={true}
            isBold
            marginTop={moderateScale(5, 0.3)}
          />
        </View>
      </View>
    </Modal>
  );
};

export default WelcomeModal;

const styles = StyleSheet.create({});
