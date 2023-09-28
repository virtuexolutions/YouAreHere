import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import CustomText from './CustomText'
import Color from '../Assets/Utilities/Color'
import { windowHeight, windowWidth } from '../Utillity/utils'
import { moderateScale } from 'react-native-size-matters'
import CustomImage from './CustomImage'

const WelcomeCard = ({item}) => {
  return (
    <LinearGradient
    style={styles.card}
    start={{x: 0, y: 0}}
    end={{x: 1, y: 1}}
    colors={item?.color}
    locations ={[0, 0.5, 0.6]}
  >
    <CustomText style={styles.heading} isBold>
      {item?.heading}
    </CustomText>
    <CustomText
      style={{
        fontSize: moderateScale(15, 0.6),
        color: Color.white,
      }}
      isBold>
      {item?.title}
    </CustomText>
    <CustomText style={styles.description}>
      {item?.description}
    </CustomText>
    <View style={styles.cardImg}>
      <CustomImage
       resizeMode="cover"
        source={item?.image}
        style={{width: '100%', height: '100%'}}
      />
    </View>
  </LinearGradient>
  )
}

export default WelcomeCard

const styles = StyleSheet.create({
    cardImg: {
        height: windowHeight * 0.15,
        width: windowWidth * 0.15,
        backgroundColor: 'transparent',
        position: 'absolute',
        right: 25,
        bottom: 10,
        paddingVertical: moderateScale(20, 0.6),
      },
      heading: {
        fontSize: moderateScale(10, 0.6),
        color: Color.white,
        marginTop: moderateScale(20, 0.3),
      },
      description: {
        fontSize: moderateScale(8, 0.6),
        color: Color.white,
        marginTop: moderateScale(5, 0.3),
        width: windowWidth * 0.5,
      },
      card: {
        width: windowWidth * 0.7,
        paddingHorizontal: moderateScale(10, 0.6),
        height: windowHeight * 0.25,
        borderRadius: moderateScale(20, 0.6),
        // marginRight:moderateScale(10,.3),
        marginLeft: moderateScale(10, 0.3),
      },
})