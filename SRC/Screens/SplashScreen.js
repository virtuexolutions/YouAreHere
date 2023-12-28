import React from 'react';
import {View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
// import LottieView from 'lottie-react-native';
import {SafeAreaView} from 'react-native';
import LottieView from 'lottie-react-native';

const SplashScreen = () => {
  return (
    // <View style={{height:windowHeight, width:windowWidth, backgroundColor:'red'}}>
    <SafeAreaView>
    <View style={{
      height : windowHeight,
      width : windowWidth
    }}>
      <LottieView
        resizeMode="cover"
        source={require('../Assets/Images/animation.json')}
        style={{height: '100%' }}
        autoPlay
        loop
      />
      </View>
    </SafeAreaView>
    // </View>
  );
};

// const SplashScreen = () => {
//   return (
//     <ScreenBoiler

//       statusBarBackgroundColor={'white'}
//       statusBarContentStyle={"dark-content"}
//     >
//         <LinearGradient
//         style={{
//           width: windowWidth,
//           alignItems : 'center',
//           justifyContent : 'center',
//           height: windowHeight,
//         }}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y:1}}
//         colors={['#f8de7e','#f4c430', '#ED9121' ]}
//         // locations ={[0, 0.5, 0.6]}
//         >

//         <Animatable.View
//           animation="fadeInLeft"
//           duration={2500}
//           useNativeDriver
//           style={[styles?.textContainer]}

//           >
//           <CustomImage
//             source={require('../Assets/Images/logo.png')}
//             resizeMode={"contain"}
//             style={[styles.bottomImage]}
//             />
//         </Animatable.View>

//             </LinearGradient>
//     </ScreenBoiler>
//   );
// };

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: 'center',
    height: windowHeight,
    width: windowWidth,
    backgroundColor: Color.themeColor,
  },
  bottomImage: {
    width: windowWidth * 0.5,
  },
  // textContainer: {
  //   flexDirection: "row",
  //   alignSelf :'center',
  //   width : windowWidth * 0.4,
  //   height :windowWidth * 0.4,
  //   borderRadius : moderateScale(windowWidth* 0.7 / 2 , 0.3),
  //   justifyContent : 'center',
  //   alignItems : 'center',
  //   // backgroundColor : Color.white,

  // },
  LogoText: {
    fontSize: moderateScale(35, 0.3),
    fontWeight: 'bold',
  },
});

export default SplashScreen;
