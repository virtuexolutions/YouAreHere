import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import {Icon} from 'native-base';
import CustomImage from './CustomImage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomText from './CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import { mode } from 'native-base/lib/typescript/theme/tools';

function PreferenceModalListItem({isSelected, item, onToggle}) {
  console.log("🚀 ~ PreferenceModalListItem ~ isSelected:", isSelected)
  // console.log('🚀 ~ PreferenceModalListItem ~ item:', item);
  return (
    <TouchableOpacity
      style={[
        styles.listComponent,
        isSelected && {
          opacity: 0.5,
          borderRadius: moderateScale(12, 0.9),
          backgroundColor: Color.veryLightGray,
        },
      ]}
      onPress={() => {
        onToggle(item?.id, item?.name);
      }}>
      
        <View
          style={{
            width: windowWidth * 0.08,
            height: windowWidth * 0.08,
            overflow: 'hidden',
            // backgroundColor : 'green'
          }}>
          <CustomImage
            style={{width: '100%', height: '100%'}}
            source={{uri: item?.photo}}
            resizeMode={'contain'}
          />
      </View>
          <CustomText style={styles.text}>{item?.name}</CustomText>

      <View style={styles.button}>
        <Icon
          name={isSelected ? 'circle' : 'circle-o'}
          as={FontAwesome}
          color={Color.themeColor}
        />
      </View>
    </TouchableOpacity>
  );
}
export default PreferenceModalListItem;

const styles = StyleSheet.create({
  listComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth * 0.83,
    paddingHorizontal: moderateScale(5, 0.6),
    borderBottomWidth: 0.5,
    borderBottomColor: Color.veryLightGray,
    height : windowHeight * 0.07,
    marginVertical : moderateScale(5,0.6),
    // backgroundColor : 'red'
  },
  text: {
    textTransform: 'capitalize',
    marginLeft : moderateScale(10,0.6)
    // backgroundColor : 'red'
  },
  button : { 
    position : 'absolute' ,
    right : 0,
  },
});
