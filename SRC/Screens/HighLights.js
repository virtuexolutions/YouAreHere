import React, {useState} from 'react';
import * as Animatable from 'react-native-animatable';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import {Platform, ToastAndroid, TouchableOpacity, View} from 'react-native';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import navigationService from '../navigationService';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList, Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import {deleteFolders, setNotePadData} from '../Store/slices/common';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'

const statusArray = [
  {
    label: 'Edit',
    onPress: () => {},
  },
  {
    label: 'Delete',
    onPress: () => {},
  },
  {
    label: 'Save to Gallery',
    onPress: async () => {},
  },
  {
    label: 'Close',
    onPress: async () => {},
  },
];

const HighLights = () => {
  const notePad = useSelector(state => state.commonReducer.notePadData);
  console.log('🚀 ~ file: HighLights.js:27 ~ HighLights ~ notePad:', notePad);
  const [modal, setModal] = useState(false);
  const [folderName, setFolderName] = useState('');
  // const [selected, setSelected] = useState('');

  console.log(
    '🚀 ~ file: HighLights.js:30 ~ HighLights ~ folderName:',
    folderName,
  );
  const [selectedItem, setSelectedItem] = useState([]);
  console.log(
    '🚀 ~ file: HighLights.js:58 ~ HighLights ~ selectedItem:',
    selectedItem,
  );

  const [indexx, setIndexx] = useState(-1);
  console.log('🚀 ~ file: HighLights.js:28 ~ HighLights ~ index:', indexx);

  console.log('🚀 ~ file: Countries.js:26 ~ Countries ~ modal:', modal);
  const dispatch = useDispatch();
  const navigationN = useNavigation()


  const highLights = [
    {
      name: 'London',
      Date: '12 january 2020',
      files: [
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
      ],
    },
    {
      name: 'Canada',
      Date: '12 january 2020',

      files: [
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
      ],
    },
    {
      name: 'China',
      Date: '12 january 2020',

      files: [
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
      ],
    },
  ];

  return (
    <>
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
          {/* <Icon name={'arrowleft'} as/> */}
          <TouchableOpacity activeOpacity={0.8} style={styles.Rounded}>
          <Icon
           onPress={()=>{
            navigationN.toggleDrawer()
           }}
            name="menu"
            as={Ionicons}
            size={moderateScale(25)}
            color={Color.black}
          />
        </TouchableOpacity>
          <CustomText
            style={{
              fontSize: moderateScale(19, 0.6),
              color: 'black',
              height: windowHeight * 0.07,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: moderateScale(10, 0.3),
            }}
            isBold>
            Saved Notes
          </CustomText>
          {selectedItem?.length > 0 && (
            <View
              style={{
                width: windowWidth,
                height: windowHeight * 0.05,
                flexDirection: 'row',
                backgroundColor: 'rgba(256,256,256,.5)',
                marginBottom: moderateScale(10, 0.3),
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              <Icon
                name={'cross'}
                as={Entypo}
                color={'black'}
                size={5}
                onPress={() => {
                  setSelectedItem([]);
                }}
              />
              <CustomText
                style={{
                  fontSize: moderateScale(12, 0.6),
                  marginLeft: moderateScale(10, 0.3),
                  width: windowWidth * 0.65,
                }}>
                {selectedItem?.length} Selected items
              </CustomText>

              <Icon name={'sharealt'} as={AntDesign} size={5} color={'black'} />
              <Icon
                name={'delete'}
                as={AntDesign}
                size={5}
                color={'black'}
                onPress={() => {
                  console.log('Here ');
                  dispatch(deleteFolders(selectedItem));
                  setSelectedItem([]);
                }}
              />
              <Icon
                name={'dots-three-vertical'}
                as={Entypo}
                size={5}
                color={'black'}
              />
            </View>
          )}

          <TouchableOpacity
            onPress={() => {
              //   navigationService.navigate('NotePad');
              console.log('here');
              setModal(true);
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
              alignItems: 'center',
              right: 15,
            }}>
            <Icon
              name={'plus'}
              as={AntDesign}
              size={8}
              color={'white'}
              onPress={() => {
                setModal(true);
              }}
            />
          </TouchableOpacity>

          <FlatList
            data={notePad}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              // marginTop: moderateScale(10, 0.3),
              paddingBottom: moderateScale(50, 0.3),
              // height: windowHeight * 0.25,
            }}
            renderItem={({item, index}) => {
              console.log(
                '🚀 ~ file: HighLights.js:178 ~ HighLights ~ i:',
                index,
              );
              const colorr =
                'rgb(' +
                Math.random() * 256 +
                ',' +
                Math.random() * 256 +
                ',' +
                Math.random() * 256 +
                ')';
              return (
                <>
                  <FileCard
                    item={item}
                    setSelectedItem={setSelectedItem}
                    selectedItem={selectedItem}
                    // longPressModal={longPressModal}
                    // setlongPressModal={setlongPressModal}
                  />
                </>
              );
            }}
          />
          <Modal
            isVisible={modal}
            onBackdropPress={() => {
              setModal(false);
            }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={styles.container}>
              <TextInputWithTitle
                titleText={'Folder Name'}
                placeholder={'Folder Name'}
                setText={setFolderName}
                value={folderName}
                viewHeight={0.06}
                viewWidth={0.8}
                inputWidth={0.86}
                border={1}
                borderColor={Color.veryLightGray}
                marginTop={moderateScale(40, 0.3)}
                color={Color.black}
                placeholderColor={Color.veryLightGray}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  //   margin: moderateScale(5, 0.3),
                  // backgroundColor:'black',
                  width: windowWidth * 0.8,
                }}>
                <CustomButton
                  onPress={() => {setModal(false)}}
                  text={'cancel'}
                  textColor={Color.white}
                  width={windowWidth * 0.3}
                  height={windowHeight * 0.05}
                  marginTop={moderateScale(50, 0.3)}
                  bgColor={Color.themeColor}
                  borderRadius={moderateScale(25, 0.3)}
                  // marginLeft={moderateScale(15, 0.3)}
                  // isGradient
                />
                <CustomButton
                  onPress={() => {
                    // console.log('Data=================>>>',data)
                    if (folderName == '') {
                      return Platform.OS == 'android'
                        ? ToastAndroid.show(
                            'Folder name is required',
                            ToastAndroid.SHORT,
                          )
                        : Alert('Folder name is required');
                    } else if (
                      notePad
                        ?.map(item => {
                          return item?.name.toLowerCase();
                        })
                        .includes(folderName.toLowerCase())
                    ) {
                      Platform.OS == 'android'
                        ? ToastAndroid.show(
                            'This name Already exists',
                            ToastAndroid.SHORT,
                          )
                        : Alert('This name Already exists');
                    } else {
                      dispatch(
                        setNotePadData({
                          name: folderName,
                          Date: moment().format('DD MMMM YYYY'),
                          files: [],
                        }),
                      );
                      setFolderName(false);
                      setModal(false);
                    }
                  }}
                  text={'create'}
                  textColor={Color.white}
                  width={windowWidth * 0.3}
                  height={windowHeight * 0.05}
                  marginTop={moderateScale(50, 0.3)}
                  bgColor={Color.themeColor}
                  borderRadius={moderateScale(25, 0.3)}
                  // isGradient
                />
              </View>
            </View>
          </Modal>
        </LinearGradient>
      </ScreenBoiler>
    </>
  );
};

const styles = ScaledSheet.create({
  txt5: {
    marginTop: moderateScale(25, 0.3),
    fontSize: moderateScale(11, 0.6),
    color: Color.black,
  },
  Rounded: {
    width: windowWidth * 0.09,
    height: windowWidth * 0.09,
    borderRadius: windowWidth * 0.09 /2,
    backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  txt6: {
    fontSize: moderateScale(19, 0.6),
    color: Color.black,
  },
  container: {
    width: windowWidth * 0.85,
    paddingBottom: moderateScale(20, 0.6),
    backgroundColor: Color.white,
    borderRadius: moderateScale(10, 0.6),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusModal: {
    // alignSelf: 'flex-end',
    color: Color.black,
    height: 200,
    width: windowWidth * 0.25,
    // paddingVertical: moderateScale(15, 0.3),
    paddingHorizontal: moderateScale(10, 0.3),
    backgroundColor: Color.white,
    // marginTop: moderateScale(-30, 0.3),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    // position: 'absolute',
    // zIndex: 1,

    elevation: 3,
    borderRadius: moderateScale(5, 0.6),
    zIndex: 1000,
    // position: 'absolute'
  },
});

export default HighLights;

const FileCard = ({
  item,
  selectedItem,
  setSelectedItem,
  // longPressModal,
  // setlongPressModal,
}) => {
  console.log('🚀 ~ file: HighLights.js:406 ~ item:', selectedItem);
  const [longPressModal, setlongPressModal] = useState(false);
  console.log('🚀 ~ file: HighLights.js:411 ~ longPressModal:', longPressModal);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        {
          flexDirection: 'row',
          width: windowWidth * 0.9,
          height: windowHeight * 0.11,
          backgroundColor: 'white',
          borderRadius: moderateScale(10, 0.6),
          marginBottom: moderateScale(10, 0.3),
        },
        selectedItem.some((data, index) => data?.name == item?.name) && {
          borderWidth: 2,
          borderColor: 'rgb(173, 216, 230)',
          backgroundColor: 'rgba(173, 216, 230 , 0.7)',
        },
      ]}
      onPress={() => {
        selectedItem?.length == 0
          ? navigationService.navigate('Files', {data: item})
          : !selectedItem.some((data, index) => data?.name == item?.name)
          ? setSelectedItem([...selectedItem, item])
          : setSelectedItem(
              selectedItem.filter((data, index) => data?.name != item?.name),
            );
      }}
      onLongPress={() => {
        setSelectedItem(prev => [...prev, item]);
      }}>
      <View
        style={{
          width: windowWidth * 0.2,
          height: windowHeight * 0.09,
          padding: moderateScale(10, 0.6),
          //   alignItems: 'center',
          // backgroundColor:'red',
          alignSelf: 'center',
          justifyContent: 'center',
          marginLeft: moderateScale(10, 0.3),
        }}>
        <CustomImage
          source={require('../Assets/Images/folder.png')}
          style={{width: '100%', height: '100%'}}
        />
      </View>
      <View
        style={{
          // justifyContent: 'space-between',
          padding: moderateScale(10, 0.6),
        }}>
        <CustomText
          style={{
            fontSize: moderateScale(14, 0.6),
            color: 'black',
            textAlign: 'left',
          }}
          isBold>
          {item?.name}
        </CustomText>
        <CustomText
          style={{
            fontSize: moderateScale(12, 0.6),
            color: Color.veryLightGray,
            textAlign: 'left',
          }}>
          {item?.Date}
        </CustomText>
        <CustomText
          style={{
            fontSize: moderateScale(12, 0.6),
            color: Color.black,
            textAlign: 'left',
          }}>
          Files: {item?.files?.length}
        </CustomText>
      </View>
      {/* <View
        style={{
          width : '100%',
          height : windowHeight * 0.2 ,
          position : 'absolute',
          // // backgroundColor : 'red',
          zIndex : 1
          // justifyContent: 'flex-start',
        }}>
      {longPressModal && (
          <View style={styles.statusModal}>
            {statusArray.map((item, index) => {
              return (
                <View key={index}>
                  <CustomText
                    onPress={item?.onPress}
                    style={{
                      borderColor: Color.themeBlack,
                      lineHeight: moderateScale(25, 0.3),
                      marginTop: moderateScale(10, 0.3),
                      color: Color.black,
                    }}>
                    {item?.label}
                  </CustomText>
                </View>
              );
            })}
          </View>
      )}
      </View> */}
    </TouchableOpacity>
  );
};
