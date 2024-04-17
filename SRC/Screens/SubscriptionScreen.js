import React, {useState} from 'react';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import {View, FlatList, TouchableOpacity,Switch, ScrollView} from 'react-native';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Icon, } from 'native-base';
import {useNavigation} from '@react-navigation/native';

const SubscriptionScreen = () => {
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState(0);

  console.log('DATA', selectedValue);

  const SubscriptionData = [
    {
      id: 1,
      name: 'Monthly',
      price: 9.99,
      desc: 'The "YouAreHere Plus" subscription plan offers a premium experience for users who want to take full advantage of the app features, removing ads, providing customization options, and enhancing their overall journey with valuable discounts and a digital travel diary.',
      feature: [
        {
          heading: 'Ad-Free Experience',
          description:
            'Enjoy an uninterrupted, ad-free exploration experience.',
        },
        {
          heading: 'Unlimited Customization',
          description:
            'Tailor recommendations to your preferences with unlimited location customization.',
        },
        {
          heading: 'Travelers Diary',
          description: 'Capture your journeys with a digital travel diary.',
        },
        {
          heading: 'Real-Time Location',
          description:
            ' Access real-time recommendations for dining, attractions, and hidden gems.',
        },
        {
          heading: 'Exclusive Discounts',
          description:
            'Unlock exclusive discounts and special offers at local places.',
        },
      ],
    },
    {
      id: 2,
      name: 'Yearly',
      price: 99.99,
      desc: 'The "YouAreHere Plus" subscription plan offers a premium experience for users who want to take full advantage of the app features, removing ads, providing customization options, and enhancing their overall journey with valuable discounts and a digital travel diary.',
      feature: [
        {
          heading: 'Ad-Free Experience',
          description:
            'Enjoy an uninterrupted, ad-free exploration experience.',
        },
        {
          heading: 'Unlimited Customization',
          description:
            'Tailor recommendations to your preferences with unlimited location customization.',
        },
        {
          heading: 'Travelers Diary',
          description: 'Capture your journeys with a digital travel diary.',
        },
        {
          heading: 'Real-Time Location',
          description:
            ' Access real-time recommendations for dining, attractions, and hidden gems.',
        },
        {
          heading: 'Exclusive Discounts',
          description:
            'Unlock exclusive discounts and special offers at local places.',
        },
      ],
    },
  ];

  return (
    <ScreenBoiler
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}>
      <ScrollView
      showsVerticalScrollIndicator={false}
        style={{
          width: windowWidth,
          // height: windowHeight,
        }}
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom : moderateScale(30,0.6),
          backgroundColor : 'white'
        }}
        >
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

          <TouchableOpacity activeOpacity={0.8} style={styles.Rounded} onPress={() => {
                // navigation.toggleDrawer();
                navigation.toggleDrawer();
              }}>
            <Icon
              onPress={() => {
                navigation.toggleDrawer();
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
            // height: windowHeight,
            backgroundColor: Color.white,
            // marginTop: moderateScale(15, 0.3),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
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
              tintColor={Color.themeColor}
              trackColor={{true:Color.themeColor, false:Color.lightGrey}}
              onValueChange={() => {
                setSelectedValue(prev => !prev);
              }}
              value={selectedValue}
              
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
                        paddingBottom: moderateScale(10, 0.6),
                        width: windowWidth * 0.8,
                        // height: windowHeight * 0.18,
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

                    <View
                      style={{
                        marginTop: moderateScale(10, 0.3),
                        // height: windowHeight * 0.3,
                      }}
                      // contentContainerStyle={{
                      //   paddingBottom: moderateScale(50, 0.6),
                      // }}
                      >
                      {item.feature.map((i, index) => {
                        return (
                          <View
                            style={{
                              width: windowWidth * 0.9,
                              // height: windowHeight * 0.02,
                              // borderBottomWidth: 1,
                              // borderColor: 'rgba(247,156,0,0.18)',
                              // alignSelf: 'center',
                              marginTop : moderateScale(10,0.3),
                              marginLeft : moderateScale(20,0.3),
                            
                              // margin: moderateScale(7, 0.3),
                            }}>
                            <CustomText style={styles.txt1}><CustomText isBold style={{
                              fontSize : moderateScale(13,0.6),
                              lineHeight : moderateScale(15,0.6)
                            }}>{i?.heading}</CustomText> : {i?.description}</CustomText>
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
            By Continue your'rs agree to easyfast{' '}
            <CustomText
              style={{textDecorationLine: 'underline', color: Color.black}}>
              Privacy policy
            </CustomText>{' '}
            and{' '}
            <CustomText
              style={{textDecorationLine: 'underline', color: Color.black}}>
              Term of use
            </CustomText>
          </CustomText>
        </View>
      </ScrollView>
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
    fontSize: moderateScale(10, 0.6),
    // textAlign: 'center',
  },
  Text4: {
    fontSize: moderateScale(58, 0.6),
    color: Color.black,
  },
  Text5: {
    fontSize: moderateScale(8, 0.6),
    textAlign: 'center',
    paddingHorizontal: moderateScale(15, 0.6),
    lineHeight: 14,
    color: Color.black,
  },
  txt6: {
    fontSize: moderateScale(10, 0.6),
    textAlign: 'center',
    marginTop: moderateScale(40, 0.3),
    color: Color.black,
  },
});

export default SubscriptionScreen;
