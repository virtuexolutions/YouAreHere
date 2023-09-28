import React, {useEffect, useState} from 'react';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomText from './CustomText';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ShowMoreAndShowLessText = props => {
  const userRole = useSelector((state)=>state.commonReducer.selectedRole)
  const {children, style, minTextLength} = props;
  const [showMore, setShowMore] = useState(false);
  const [textMaxLength, setTextMaxLength] = useState(children.split(' ').length);
  const [renderText, setRenderText] = useState();
  useEffect(() => {
    let stringArray = children !== null ? children.split(' ') : [];
    setTextMaxLength(stringArray.length);
    if (showMore == false && textMaxLength > minTextLength) {
      console.log('here');
      stringArray = stringArray.splice(0, minTextLength);
      let newString = stringArray.join().replace(/,/g, ' ');
      newString = newString + '...';
      setRenderText(newString);
    } else {
      setRenderText(children);

    }
  }, [showMore]);

  return (
   
    <CustomText style={[styles.generalText, style]} isRegular>
      {renderText}{' '}
   
      {textMaxLength > minTextLength && (
      
          <CustomText
          isBold
            onPress={() => {
              setShowMore(!showMore);
            }}
            style={{
              fontSize: moderateScale(12, 0.6),
              color: userRole == 'Qbid Member' ? Color.blue : Color.themeColor,
              textAlign : 'center'
            }}
            isRegular>
            {showMore ? 'Show Less' : 'Show More'}
          </CustomText>
      
      )}
    </CustomText>

  
  );
};

const styles = ScaledSheet.create({
  generalText: {
    fontSize: moderateScale(15, 0.3),
    color: Color.black,
    width: width * 0.85,
   },
});

export default ShowMoreAndShowLessText;
