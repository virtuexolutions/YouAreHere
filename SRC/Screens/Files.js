import React, {useState, useEffect} from 'react';
import * as Animatable from 'react-native-animatable';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity, View} from 'react-native';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import navigationService from '../navigationService';
import {useDispatch, useSelector} from 'react-redux';

import {FlatList, Icon} from 'native-base';

import { useIsFocused, useNavigation } from '@react-navigation/native';

const Files = props => {
  const navigationN = useNavigation()
  const data = props?.route?.params?.data;

  console.log('🚀 ~ file: Files.js:23 ~ Files ~ props:', data);
  const files = useSelector(state=> state.commonReducer.notePadData)
  const [finalData, setFinalData] = useState(files.find(item=>{
    return(item?.id == data?.id)
  }))
  
  console.log("🚀 ~ file: Files.js:34 ~ finalData ~ finalData:", finalData)

  const [isLoading, setIsLoading] = useState(false);

  const [username, setUserName] = useState('');
  const dispatch = useDispatch();
  const focused = useIsFocused()

  notePadFiles = [
    {
      title: 'Lorem Ips Dolor',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
    },
    {
      title: 'Lorem Ips Dolor',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
    },
    {
      title: 'Lorem Ips Dolor',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
    },
    {
      title: 'Lorem Ips Dolor',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
    },
    {
      title: 'Lorem Ips Dolor',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
    },
    {
      title: 'Lorem Ips Dolor',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
    },
    {
      title: 'Lorem Ips Dolor',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
    },
  ];
  useEffect(() => {
   setFinalData(files.find(item=>{
    return(item?.id == data?.id)
  }))
  
   
  }, [focused])
  
  return (
    <ScreenBoiler
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}
    
      >
      <LinearGradient
        style={{
          width: windowWidth,
          height: windowHeight,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={Color.themeBgColor}
        // locations ={[0, 0.5, 0.6]}
      >
          <View
        style={{
          height: moderateScale(30, 0.3),
          width: moderateScale(30, 0.3),
          borderRadius: moderateScale(5, 0.3),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:'white',
          position : 'absolute',
          top : moderateScale(30,0.3),
          left : moderateScale(20,0.3)
        }}>
        
          <Icon
            name={'arrowleft'}
            as={AntDesign}
            size={moderateScale(22, 0.3)}
            color={Color.themeColor}
            onPress={() => {
              navigationN.goBack();
            }}
          />
      
      </View>
        <CustomText
          style={{
            fontSize: moderateScale(19, 0.6),
            color: 'black',
            height: windowHeight * 0.07,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: moderateScale(30, 0.3),
          }}
          isBold>
          Files
        </CustomText>
        {/* <FilesComponent  item={notePadFiles[0]}/> */}
        <TouchableOpacity
          onPress={() => {
            navigationService.navigate('NotePad', {data: data?.id});
          }}
          style={{
            backgroundColor: Color.themeColor,
            width: windowWidth * 0.18,
            height: windowWidth * 0.18,
            borderRadius: (windowWidth * 0.18) / 2,
            position: 'absolute',
            zIndex: 1,
            bottom: 30,
            padding: moderateScale(18, 0.6),
            justifyContent: 'center',
            // alignItems:'center',
            right: 15,
          }}>
          <CustomImage
            source={require('../Assets/Images/notepad.png')}
            onPress={() => {
              navigationService.navigate('NotePad', {data: data?.id});
            }}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
        </TouchableOpacity>

        <FlatList
          data={finalData?.files}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            // marginTop: moderateScale(10, 0.3),
            paddingBottom: moderateScale(50, 0.3),
            // height: windowHeight * 0.25,
          }}
          renderItem={({item, index}) => {
            const colorr =
              'rgb(' +
              Math.random() * 256 +
              ',' +
              Math.random() * 256 +
              ',' +
              Math.random() * 256 +
              ')';
            return (
              <TouchableOpacity
                onPress={()=>{
                  navigationService.navigate('NotePad',{item:item, data:data?.id})
                }}
                style={{
                  flexDirection: 'row',
                  //   backgroundColor:'purple',
                  // paddingHorizontal: moderateScale(10, 0.3),
                  width: windowWidth * 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: moderateScale(10, 0.3),
                }}>
                <CustomText
                  style={{
                    color: 'white',
                    // position:'absolute',
                    width: windowHeight * 0.15,
                    left: 10,
                    fontSize: moderateScale(10, 0.6),
                    textAlign:'center',
                    marginLeft: moderateScale(-40, 0.3),
                    backgroundColor: item?.color,
                    padding: moderateScale(10, 0.6),
                    borderRadius: moderateScale(20, 0.6),
                    transform: [{rotate: '-90deg'}],
                  }}>
                  {item?.title}
                </CustomText>
                <View
                  style={{
                    height: windowHeight * 0.15,
                    width: windowWidth * 0.8,
                    marginLeft: moderateScale(-15, 0.3),
                    borderColor: item?.color,
                    borderLeftWidth: 7,
                    borderWidth: 1,
                    borderRadius: moderateScale(10, 0.6),
                    overflow: 'hidden',
                    backgroundColor: 'white',
                    padding: moderateScale(10, 0.6),
                  }}>
                  <CustomText
                    style={{
                      //   width: windowWidth * 0.85,
                      color: 'black',
                      fontSize: moderateScale(8, 0.6),
                      backgroundColor: 'white',
                    }}>
                    {item?.text}
                  </CustomText>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </LinearGradient>
 
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  txt5: {
    marginTop: moderateScale(25, 0.3),
    fontSize: moderateScale(11, 0.6),
    color: Color.black,
  },
  txt6: {
    fontSize: moderateScale(19, 0.6),
    color: Color.black,
  },
});

export default Files;
