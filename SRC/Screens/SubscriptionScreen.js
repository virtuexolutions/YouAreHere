import React, {useState} from 'react';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import {View, FlatList, TouchableOpacity} from 'react-native';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Icon, ScrollView, Switch} from 'native-base';
import { useNavigation } from '@react-navigation/native';

const SubscriptionScreen = () => {
  const navigation = useNavigation()
  const [selectedValue, setSelectedValue] = useState(0);

  console.log('DATA', selectedValue);

  const SubscriptionData = [
    {
      id: 1,
      name: 'Monthly',
      price: 20,
      desc: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et doloremagna aliqua. Ut enim ad minim veniam enim ad minimveniam Ut enim ad minim veniam enim ad minimveniam',
      feature: [
        'Lorem Ispum Dolor Sit Amet consectetur adipiscing',
        'Lorem Ispum Dolor Sit Amet consectetur adipiscing',
        'Lorem Ispum Dolor Sit Amet consectetur adipiscing',
        'Lorem Ispum Dolor Sit Amet consectetur adipiscing',
        'Lorem Ispum Dolor Sit Amet consectetur adipiscing',
      ],
    },
    {
      id: 2,
      name: 'Yearly',
      price: 50,
      desc: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et doloremagna aliqua. Ut enim ad minim veniam enim ad minimveniam',
      feature: [
        'Lorem Ispum Dolor Sit Amet consectetur adipiscing',
        'Lorem Ispum Dolor Sit Amet consectetur adipiscing',
        'Lorem Ispum Dolor Sit Amet consectetur adipiscing',
        'Lorem Ispum Dolor Sit Amet consectetur adipiscing',
        'Lorem Ispum Dolor Sit Amet consectetur adipiscing',
      ],
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
          alignItems: 'center',
        }}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={Color.themeBgColor}>
        <LinearGradient
          style={styles.Profile}
          start={{x: 1, y: 0}}
          end={{x: 1, y: 1}}
          colors={Color.themeBgColor}>
          <CustomImage
            resizeMode={'contain'}
            source={require('../Assets/Images/subscription.png')}
            style={{
              width: '100%',
              height: '100%',
              marginTop: moderateScale(10, 0.3),
            }}
          />
       

        <TouchableOpacity activeOpacity={0.8} style={styles.Rounded}>
          <Icon
           onPress={()=>{
            navigation.toggleDrawer()
           }}
            name="menu"
            as={Ionicons}
            size={moderateScale(25)}
            color={Color.black}
          />
        </TouchableOpacity>
        </LinearGradient>
        <View
          style={{
            width: windowWidth,
            height: windowHeight,
            backgroundColor: Color.white,
            // marginTop: moderateScale(15, 0.3),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginTop: moderateScale(20, 0.3),
              width: windowWidth * 0.5,
              alignSelf: 'center',
              marginTop: moderateScale(40, 0.3),
            }}>
            <CustomText
              style={{fontSize: moderateScale(16, 0.6), color: Color.black}}>
              Monthly
            </CustomText>
            <Switch
              size="lg"
              onTrackColor={Color.themeColor}
              onValueChange={() => {
                setSelectedValue(prev => !prev);
              }}
            />
            <CustomText
              style={{fontSize: moderateScale(16, 0.6), color: Color.black}}>
              Yearly
            </CustomText>
          </View>

          <View style={{marginTop: moderateScale(10, 0.3)}}>
            {SubscriptionData.map(
              (item, index) =>
                selectedValue == index && (
                  <>
                    <View
                      style={{
                        width: windowWidth * 0.80,
                        height: windowHeight * 0.18,
                        borderWidth: 1,
                        borderColor: '#F79C00',
                        alignSelf: 'center',
                        borderRadius: moderateScale(15, 0.3),
                        marginTop: moderateScale(20, 0.3),
                        alignItems: 'center',
                      }}>
                      <CustomText isBold style={styles.Text4}>
                        ${item.price}
                      </CustomText>

                      <CustomText style={styles.Text5}>{item.desc}</CustomText>
                    </View>

                    <View style={{marginTop: moderateScale(10, 0.3)}}>
                      {item.feature.map((i, index) => {
                        return (
                          <View
                            style={{
                              width: windowWidth * 0.8,
                              height: windowHeight * 0.02,
                              borderBottomWidth: 1,
                              borderColor: 'rgba(247,156,0,0.18)',
                              alignSelf: 'center',
                              margin: moderateScale(7, 0.3),
                            }}>
                            <CustomText style={styles.txt1}>{i}</CustomText>
                          </View>
                        );
                      })}
                    </View>
                  </>
                ),
            )}
          </View>

          <CustomButton
            text={'Subscribe Now'}
            isBold
            textColor={Color.white}
            width={windowWidth * 0.6}
            height={windowHeight * 0.06}
            marginTop={moderateScale(10, 0.3)}
            bgColor={Color.themeColor}
            borderRadius={moderateScale(30, 0.3)}
            // alignSelf={'flex-start'}
          />

          <CustomText style={styles.txt6}>
            By Continue your'rs agree to easyfast <CustomText style={{ textDecorationLine: 'underline', color: Color.black}}>Privacy policy</CustomText> and <CustomText style={{ textDecorationLine: 'underline', color: Color.black,}}>Term of use</CustomText>
          </CustomText>
        </View>
      </LinearGradient>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  Profile: {
    width: windowWidth,
    height: windowHeight * 0.3,
    zIndex: 1,
  },

  Rounded: {
    width: windowWidth * 0.1,
    height: windowHeight * 0.05,
    borderRadius: moderateScale(30, 0.3),
    backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  txt1: {
    fontSize: moderateScale(8, 0.6),
    textAlign: 'center',
  },
  Text4: {
    fontSize: moderateScale(58, 0.6),
    color: Color.black,
  },
  Text5: {
    fontSize: moderateScale(6, 0.6),
    textAlign: 'center',
    paddingHorizontal: moderateScale(15, 0.6),
    lineHeight: 14,
    color: Color.black,
  },
  txt6: {
    fontSize: moderateScale(6, 0.6),
    textAlign: 'center',
    marginTop: moderateScale(40, 0.3),
    color: Color.black,
  },
});

export default SubscriptionScreen;
