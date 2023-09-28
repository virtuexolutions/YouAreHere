import React, {useEffect, useState} from 'react';
import Color from '../Assets/Utilities/Color';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import {
  Alert,
  Platform,
  ToastAndroid,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import {TriangleColorPicker} from 'react-native-color-picker';
import {setFiles} from '../Store/slices/common';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Icon} from 'native-base';
import CustomImage from '../Components/CustomImage';
import ImagePickerModal from '../Components/ImagePickerModal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Post } from '../Axios/AxiosInterceptorFunction';

const NotePad = props => {
  // console.log('🚀 ~ file: NotePad.js:22 ~ NotePad ~ props:', props);
  const token = useSelector(state=> state.authReducer.token)
  const id = props?.route?.params?.data;
  // console.log('🚀 ~ file: NotePad.js:26 ~ NotePad ~ name:', id);
  const item = props?.route?.params?.item;
  console.log('🚀 ~ file: NotePad.js:22 ~ NotePad ~ item:', item);
  const selectedStory = props?.route?.params?.selectedStory;
  // console.log(
  //   '🚀 ~ file: NotePad.js:31 ~ NotePad ~ selectedStory:',
  //   selectedStory,
  // );
  const notePadData = useSelector(state => state.commonReducer.notePadData);
  // console.log('🚀 ~ file: NotePad.js:29 ~ NotePad ~ notePadData:', notePadData);

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(item?.title ? item?.title : '');
  const [text, setText] = useState(item?.description ? item?.description : '');
  const [color, setColor] = useState(item?.color ? item?.color : '');
  const [itemId, setItemId] = useState(item?.itemId ? item?.itemId : -1);
  const [colorModal, setColorModal] = useState(false);
  const [image, setImage] = useState(item?.image ? item?.image : {});
  const [imagePickerModal, setimagePickerModal] = useState(false);
  const isFocused = useIsFocused();

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const updateNotes = async()=>{
    const url = `auth/notes/${item?.id}`
   
      // dispatch(setNotePadData([...NotePad,{name:name, files}]))
      // console.log('title::',title,'description:', text,'color: ', color,)
      const body = {
        title: title, 
        description: text, 
        place_id: item?.place_id
      };

      for (let key in body) {
        console.log('Key========>>>>>>>>', key);
        if (body[key] == '') {
          return Platform.OS == 'android'
            ? ToastAndroid.show(
                `${key} is required`,
                ToastAndroid.SHORT,
              )
            : Alert(`${key} is required`);
        }
      }
       console.log('data body=========>',{
        ...body,
        id: item?.id ? item?.id : -1,
        storyId: selectedStory?.id,
        image:item?.image,
       
      })
      setIsLoading(true)
      const response = await Post(url, body, apiHeader(token))
      setIsLoading(false)

      if(response != undefined){
         console.log("🚀 ~ file: NotePad.js:88 ~ updateNotes ~ response:", response?.data, body)

        navigation.goBack();
      }
      //  dispatch(
      //   setFiles({
      //     ...body,
      //     id: item?.id ? item?.id : -1,
      //     storyId: selectedStory?.id,
      //     image:item?.image,
         
      //   }),
      // );
      // dispatch(setUserToken({token: 'sajdlka skjdslkdj'}));
    
  } 

  return (
    <ScreenBoiler
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}>
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
            backgroundColor: 'white',
            position: 'absolute',
            top: moderateScale(30, 0.3),
            left: moderateScale(20, 0.3),
          }}>
          <Icon
            name={'arrowleft'}
            as={AntDesign}
            size={moderateScale(22, 0.3)}
            color={Color.themeColor}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
        <CustomText
          style={{
            color: 'black',
            fontSize: moderateScale(15, 0.6),
            marginBottom: moderateScale(20, 0.3),
          }}
          isBold>
          Note Pad
        </CustomText>
        <View
          style={{
            width: windowWidth * 0.9,
            height: windowHeight * 0.8,
            backgroundColor: 'white',
            backgroundColor: 'white',
            borderRadius: moderateScale(10, 0.6),
          }}>
          <TextInputWithTitle
            titleText={'title'}
            secureText={false}
            placeholder={'Title'}
            setText={setTitle}
            value={title}
            viewHeight={0.06}
            viewWidth={0.9}
            inputWidth={0.86}
            // border={1}
            borderColor={'#ffffff'}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(15, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(5, 0.3)}
          />
          <TextInputWithTitle
            maxLength={2000}
            secureText={false}
            placeholder={'Description'}
            setText={setText}
            value={text}
            viewHeight={0.45}
            inputHeight={0.3}
            viewWidth={0.9}
            inputWidth={0.86}
            border={1}
            borderColor={'transparent'}
            backgroundColor={'#ffffff'}
            marginTop={moderateScale(5, 0.3)}
            color={Color.red}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(5, 0.3)}
            multiline
          />

          <View
            style={{
              position: 'absolute',
              right: 0,
              bottom: 10,
              left: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomButton
              onPress={()=>{updateNotes()}}
              text={isLoading ? <ActivityIndicator size={moderateScale(20,.6)} color={'white'}/> : 'Save'}
              textColor={Color.white}
              width={windowWidth * 0.7}
              height={windowHeight * 0.07}
              marginTop={moderateScale(50, 0.3)}
              bgColor={Color.themeColor}
              borderRadius={moderateScale(25, 0.3)}
              // isGradient
            />
          </View>
        </View>
      </LinearGradient>

      <ImagePickerModal
        show={imagePickerModal}
        setShow={setimagePickerModal}
        setFileObject={setImage}
      />
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
  Profile1: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    borderRadius: (windowWidth * 0.3) / 2,
    borderWidth: 1,
    borderColor: Color.white,
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: moderateScale(20, 0.3),
  },

  edit: {
    backgroundColor: Color.themeColor1,
    width: moderateScale(25, 0.3),
    height: moderateScale(25, 0.3),
    position: 'absolute',
    top: 110,
    right: 10,
    borderRadius: moderateScale(12.5, 0.3),
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NotePad;
