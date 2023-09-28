import React, {useState} from 'react';
import * as Animatable from 'react-native-animatable';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import {View, FlatList} from 'react-native';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import navigationService from '../navigationService';
import AssetsContainer from '../Components/AssetsContainer';
import {Icon} from 'native-base';
import {color} from 'react-native-reanimated';
import DatePicker from 'react-native-date-picker';

const PaymentScreen = () => {
  const [username, setUsername] = useState('');
  const [cardnum, setCardNum] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  return (
    <ScreenBoiler
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}>
      <LinearGradient
        style={{
          width: windowWidth,
          height: windowHeight,
          alignItems: 'center',
        }}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={Color.themeBgColor}>
        <View style={styles.headerContainer}>
          <View style={styles.Profile}>
            <CustomImage
              resizeMode={'cover'}
              source={require('../Assets/Images/profile.png')}
              style={{width: '100%', height: '100%'}}
            />
          </View>

          <View style={{width: windowWidth * 0.60}}>
            <CustomText isBold style={styles.Text1}>
              Hello,Dudley !
            </CustomText>
            <CustomText style={styles.Text2}>Welcome back</CustomText>
          </View>

          <View style={styles.NotficationBox}>
            <View
              style={{
                width: windowWidth * 0.02,
                height: windowWidth * 0.02,
                borderRadius: (windowWidth * 0.02) / 1,
                backgroundColor: '#F83333',
                position: 'absolute',
                top: 5,
                right: 2,
              }}></View>
            <Icon
              name="notifications"
              as={Ionicons}
              size={moderateScale(25)}
              color={Color.black}
            />
          </View>
        </View>

        <View
          style={{
            width: windowWidth * 0.90,
            height: windowHeight * 0.30,
            marginTop: moderateScale(10, 0.3),
          }}>
          <CustomImage
            resizeMode={'cover'}
            source={require('../Assets/Images/payment.png')}
            style={{width: '100%', height: '100%'}}
          />
        </View>

        <TextInputWithTitle
          placeholder={'ida L. Duley'}
          setText={setUsername}
          value={username}
          viewHeight={0.06}
          viewWidth={0.85}
          inputWidth={0.99}
          border={1}
          borderColor={Color.black}
          marginTop={moderateScale(40, 0.3)}
          color={Color.black}
          placeholderColor={Color.black}
        />

        <TextInputWithTitle
          title={'Card Number'}
          placeholder={'0000 0000 0000 0000'}
          setText={setCardNum}
          value={cardnum}
          viewHeight={0.06}
          viewWidth={0.85}
          inputWidth={0.99}
          border={1}
          borderColor={Color.black}
          color={Color.black}
          placeholderColor={Color.black}
        />

        <View
          style={{
            width: windowWidth * 0.82,
            borderBottomWidth: 1,
            borderColor: Color.black,
            marginTop: moderateScale(40, 0.3),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <CustomText style={styles.Text3}>Exp Date</CustomText>

          <Icon
            onPress={()=>setOpen(true)}
            name="arrow-down"
            as={SimpleLineIcons}
            size={moderateScale(15)}
            color={Color.black}
          />

          <CustomText style={styles.Text3}>Cvv</CustomText>

          <Icon
            name="arrow-down"
            as={SimpleLineIcons}
            size={moderateScale(15)}
            color={Color.black}
          />

          <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>

        <CustomButton
          // textTransform={"capitalize"}
          text={'Pay'}
          isBold
          textColor={Color.black}
          width={windowWidth * 0.6}
          height={windowHeight * 0.06}
          marginTop={moderateScale(80, 0.3)}
          bgColor={Color.white}
          borderRadius={moderateScale(30, 0.3)}
        />
      </LinearGradient>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  headerContainer: {
    width: windowWidth * 0.95,
    height: windowHeight * 0.15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding:moderateScale(5,0.6)
  },

  Profile: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    borderRadius: (windowWidth * 0.15) / 1,
    borderWidth: 1,
    borderColor: Color.white,
    overflow: 'hidden',
  },

  NotficationBox: {
    width: windowWidth * 0.12,
    height: windowWidth * 0.12,
    borderRadius: (windowWidth * 0.12) / 1,
    backgroundColor:'#F9F9F9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  Text1: {
    color: '#1A3C40',
    fontSize: moderateScale(20, 0.6),
  },

  Text2: {
    color:'#1A3C40',
    fontSize: moderateScale(12, 0.6),
  },

  Text3: {
    color: Color.black,
    fontSize: moderateScale(12, 0.6),
  },
});

export default PaymentScreen;
