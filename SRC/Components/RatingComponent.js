import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icon} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';

const RatingComponent = ({
  rating,
  starColor,
  style,
  starStyle,
  disable,
  ratingGiven,
  setRatingGiven,
  starSize,
}) => {
  const [starArray, setStarArray] = useState([1,2,3,4,5]);


//   useEffect(() => {
//     setStarArray([])
//     for (let index = 1; index < rating; index++) {
//       setStarArray(prev => [...prev, index]);
//     }
//   }, []);

  return (
    <View style={[{flexDirection: 'row'},style]}>
      {starArray.map((x, index) => {
        return (
          <Icon
            name={'star'}
            as={FontAwesome}
            color={rating >= index+1 || index+1 <= ratingGiven ? starColor : Color.veryLightGray }
            size={starSize ? starSize : moderateScale(15, 0.3)}
            style={[starStyle]}
            onPress={()=>{
                !disable && setRatingGiven(index+1)
            }}
          />
        );
      })}
    </View>
  );
};

export default RatingComponent;

const styles = StyleSheet.create({});
