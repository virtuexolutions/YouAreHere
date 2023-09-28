import React, {useRef, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Color from '../Assets/Utilities/Color';
import MultiSelect from 'react-native-multiple-select';
import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import { windowWidth } from '../Utillity/utils';

const CustomDropDownMultiSelect = ({min, max, item, setItem, array, title , maxHeight , marginTop , containerStyle}) => {
  const userRole = useSelector(state => state.commonReducer.selectedRole); 
  // const {min, max, item, setItem, array, title} = props;
  return (
    <View style={{
      // padding : 5,
      width : containerStyle?.width,
      marginTop : moderateScale(10,0.3)
    }}>
      <MultiSelect
        items={array}
        onSelectedItemsChange={selectedItems => {
          console.log(selectedItems);
          setItem(selectedItems);
        }}
        selectedItems={item}
        selectText={title}
        searchInputPlaceholderText={'Search items ...'}
        textInputProps={{autoFocus: false}}
        hideDropdown
        tagRemoveIconColor={ userRole == 'Qbid Member' ?  Color.blue : Color.themeColor}
        tagBorderColor={ userRole == 'Qbid Member' ?  Color.blue : Color.white}
        tagTextColor={ userRole == 'Qbid Member' ?  Color.white : Color.white}
        
        displayKey="name"
        uniqueKey="id"
        // hideSubmitButton
        submitButtonColor={Color.themeColor}
        submitButtonText={'Done'}
        styleMainWrapper={{
          // align
          width: Dimensions.get('window').width * 0.7,
          // backgroundColor :'red',
          flexWrap: 'wrap',
          flexDirection: 'row',
          borderRadius: moderateScale(10,0.6),
        }}
        styleInputGroup={{
          borderColor: Color.lightGrey,
          borderTopWidth: 1,
          borderRightWidth: 1,
          borderLeftWidth: 1,
          paddingRight: 10,
          borderTopEndRadius: 10,
          borderTopStartRadius: 10,
          height: moderateScale(50, 0.3),
          fontSize: moderateScale(20, 0.3),
        }}
        selectedItemIconColor={Color.themeColor}
        selectedItemTextColor={Color.themeColor}
        styleDropdownMenu={[{
          width: Dimensions.get('window').width * 0.9,
          paddingHorizontal: 10,
          height: Dimensions.get('window').height * 0.07,
          borderRadius: moderateScale(30,0.3),
          backgroundColor : Color.white,
          overflow : 'hidden',
          marginTop : marginTop
        },containerStyle]}
        styleItemsContainer={{
          backgroundColor: Color.white,
          width: containerStyle?.width,
          borderColor: Color.lightGrey,
          borderWidth: 1,
          maxHeight: maxHeight,
        }}
        styleTextDropdownSelected={{
          fontSize: moderateScale(16,0.3),
          color: Color.gray,
          fontFamily: 'Inter-Medium',
        }}
        styleTextDropdown={{
          fontSize: 16,
          color: Color.gray,
          // paddingLeft: Dimensions.get('window').width * 0.0325,
          fontFamily: 'Inter-Medium',
        }}
        styleRowList={{
          height: moderateScale(40, 0.3),
          fontSize: moderateScale(20, 0.3),
          justifyContent: 'center',
          borderBottomColor: Color.lightGrey,
          borderBottomWidth: 1,
          fontFamily: 'Inter-Medium',
        }}
        searchInputStyle={{
          fontFamily: 'Inter-Medium',
          color: Color.black,
        }}
        selectedItemFontFamily="Inter-Medium"
        fontFamily="Inter-Medium"
        itemFontFamily="Inter-Medium"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: Dimensions.get('window').height * 0.01,
    backgroundColor : 'red',
   },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: Color.black,
    marginBottom: Dimensions.get('window').height * 0.01,
    textTransform: 'capitalize',
  },

  dropDownBtn: {
    width: Dimensions.get('window').width * 0.9,
    backgroundColor: Color.red,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Color.lightGrey,
    height: Dimensions.get('window').height * 0.08,
    // backgroundColor: 'red',
  },
  dropDownBtnText: {
    width: Dimensions.get('window').width * 0.9,
    fontSize: 16,
    color: Color.gray,
    textAlign: 'center',
    // fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  dropDownRow: {
    backgroundColor: Color.red,
  },
  dropDownRowText: {
    width: Dimensions.get('window').width * 0.9,
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default CustomDropDownMultiSelect;
