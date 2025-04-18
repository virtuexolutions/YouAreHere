import React from "react";
import { Text } from "react-native";
import Color from "../Assets/Utilities/Color";

const CustomText = (props) => {
  const { children, numberOfLines, style, isBold, onPress, ellipsizeMode} = props;
  return (
    <Text
      onPress={onPress}
      style={[
        {
          // textTransform: "capitalize",
          // textTransform: "capitalize",
          color: Color.black,
        },
        style,
        // {   fontFamily: 'Oswald-Regular' },
        isBold && {
          // fontFamily: 'Oswald-Bold',
          fontWeight: "bold",
        },
      ]}
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
};

export default CustomText;
