import {Icon} from 'native-base';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
// import EvilIcons from 'react-native-vector-icons/EvilIcons'

const CountryCard = ({
  uri,
  issettingOption = false,
  countryType,
  isPublicType = false,
  onPressSetting,
  name,
  onPress,
  citiesCount,
  onLongPress,
  isDeleted,
  countryid,
  onDelete,
}) => {
  // const navigation = useNavigation()
  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      activeOpacity={0.8}
      style={[
        styles.container,
        {
          backgroundColor: isDeleted == countryid ? '#DEEFF5' : 'white',
        },
      ]}
      onPress={onPress}>
      <View style={styles.image}>
        <CustomImage
          source={uri== null ? require('../Assets/Images/no_image.jpg') :{uri: uri}}
          style={{
            width: '100%',
            height: '100%',
          }}
          resizeMode={'stretch'}
        />
      </View>
      {isPublicType && (
        <>
          {countryType === 'public' ? (
            <View
              style={{
                width: moderateScale(20, 0.6),
                height: moderateScale(20, 0.6),
                backgroundColor: Color.themeColor,
                position: 'absolute',
                left: 70,
                bottom: 5,
                borderRadius: windowWidth,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name={'public'}
                as={MaterialIcons}
                style={{}}
                size={moderateScale(12, 0.6)}
                color={Color.white}
              />
            </View>
          ) : (
            <View
              style={{
                width: moderateScale(20, 0.6),
                height: moderateScale(20, 0.6),
                backgroundColor: Color.themeColor,
                position: 'absolute',
                left: 70,
                bottom: 5,
                borderRadius: windowWidth,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name={'lock'}
                as={Entypo}
                style={{}}
                size={moderateScale(12, 0.6)}
                color={Color.white}
              />
            </View>
          )}
        </>
      )}

      <View style={{width: windowWidth * 0.45}}>
        <CustomText
          style={{fontSize: moderateScale(13, 0.6), color: Color.black}}
          numberOfLines={1}
          isBold>
          {name}
        </CustomText>
        <CustomText
          style={{
            fontSize: moderateScale(10, 0.6),
            color: Color.black,
          }}
          numberOfLines={1}>
          {citiesCount}
        </CustomText>
      </View>

      {issettingOption && (
        <TouchableOpacity
          onPress={onPressSetting}
          style={{
            flex: 1,
            top: 10,
            position: 'absolute',
            right: 15,
          }}>
          <Icon
            name={'dots-three-horizontal'}
            as={Entypo}
            size={moderateScale(20, 0.6)}
          />
        </TouchableOpacity>
      )}

      {isDeleted && (
        <Icon
        onPress={() =>{
onDelete()
        }}
          style={{
            position: 'absolute',
            right: 10,
            bottom: 5,
          }}
          as={EvilIcons}
          name="trash"
          size={moderateScale(25, 0.6)}
          color={Color.black}
        />
      )}
    </TouchableOpacity>
  );
};

export default CountryCard;

const styles = ScaledSheet.create({
  image: {
    height: windowHeight * 0.09,
    width: windowWidth * 0.19,
    borderRadius: moderateScale(15, 0.6),
    backgroundColor: 'white',
    // marginLeft: moderateScale(10, 0.3),
    overflow: 'hidden',
  },
  container: {
    gap: 10,
    width: windowWidth * 0.95,
    height: windowHeight * 0.1,
    backgroundColor: 'white',
    //   justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: moderateScale(20, 0.6),
    marginBottom: moderateScale(10, 0.3),
    paddingHorizontal: moderateScale(5, 0.3),
  },
});
