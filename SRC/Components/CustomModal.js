import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {windowHeight, windowWidth} from '../Utillity/utils';
import { moderateScale } from 'react-native-size-matters';

const CustomModal = ({children , isVisible , setIsVisible , container , contentContainerStyle}) => {
  return (
   
      <Modal  
      isVisible={isVisible}
      hasBackdrop={true}
      onBackdropPress={()=>{
        setIsVisible(false)
      }}
      style={{
        justifyContent :  'center',
        alignItems : 'center',
      }}
      >
        <ScrollView style={container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={contentContainerStyle}
        >
        {children}
        </ScrollView>
     
       </Modal>
  
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalContainer: {
    
    position : 'absolute',
    backgroundColor : 'rgba(255,255,255,0.95)',
    // backgroundColor: 'red',
    width: windowWidth * 0.9,
    height: windowHeight * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
    borderRadius : moderateScale(10,0.3),
    alignSelf : 'center',
    top : moderateScale(20,0.3)
    
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    // backgroundColor : 'red'
  }
});
