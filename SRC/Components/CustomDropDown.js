import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import TextInputWithTitle from './TextInputWithTitle';
// import ListModal from './ListModal';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { moderateScale } from 'react-native-size-matters';

const CustomDropDown = ({placeholder , setData , data ,borderColor ,
     bgColor , placeHolderColor , color ,
      borderRadius , elevation , rightIcon , viewHeight , viewWidth , inputWidth , array}) => {
        const [isVisible , setIsVisble] = useState(false)
        return (
   <>
            <TextInputWithTitle
    iconName="down"
    iconType={AntDesign}
    titleText={placeholder}
    placeholder={placeholder}
    setText={setData}
    value={data}
    viewHeight={viewHeight}
    viewWidth={viewWidth}
    inputWidth={inputWidth}
    border={1}
    borderColor={borderColor}
    backgroundColor={bgColor}
    marginTop={moderateScale(12, 0.3)}
    color={color}
    placeholderColor={placeHolderColor}
    borderRadius={borderRadius}
    elevation={elevation}
    rightIcon={rightIcon}
    onPressLeft={() => {
      setIsVisble(true);
    }}
    disable
  />
  {/* <ListModal
  isModalVisible={isVisible}
  setIsModalVisible={setIsVisble}
  title={placeholder}
  listArray={array}
  data={data}
  setData={setData}
/> */}
</>

  )
}

export default CustomDropDown

const styles = StyleSheet.create({})