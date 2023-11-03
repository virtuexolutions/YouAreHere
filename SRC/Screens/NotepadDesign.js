import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import LinearGradient from 'react-native-linear-gradient';
import ScreenBoiler from '../Components/ScreenBoiler';
import Color from '../Assets/Utilities/Color';
import {windowWidth, windowHeight, apiHeader} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import StoriesComponent from '../Components/StoriesComponent';
import {FlatList, Icon} from 'native-base';
import NotesComponent from '../Components/NotesComponent';
import CustomButton from '../Components/CustomButton';
import RBSheet from 'react-native-raw-bottom-sheet';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import {useDispatch, useSelector} from 'react-redux';
import {setFiles, setNotePadData} from '../Store/slices/common';
import {ActivityIndicator} from 'react-native';
import moment from 'moment';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ImagePickerModal from '../Components/ImagePickerModal';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';

const Stories = [
  {
    id: 1,
    name: 'Thailand',
    image: require('../Assets/Images/8.jpeg'),
    Notes: [
      {
        id: 1,
        name: 'Shopping mall',
        desc: 'Hellow how are u',
        date: '23 May',
        image: require('../Assets/Images/20.jpg'),
      },
      {
        id: 2,
        name: 'Food Court',
        desc: 'Hi Are u There But I didnt',
        date: '15 jun',
        image: require('../Assets/Images/16.jpg'),
      },
      {
        id: 3,
        name: 'Chad Griffton',
        desc: 'u improvement The pet Show',
        date: '10 Aug',
        image: require('../Assets/Images/17.jpg'),
      },
      {
        id: 4,
        name: 'Glen Guzman',
        desc: 'Thats pretty Your Fine',
        date: '4 Dec',
        image: require('../Assets/Images/18.jpg'),
      },
      {
        id: 5,
        name: 'Cora Bush',
        desc: 'Hellow how are u',
        date: '1 Sep',
        image: require('../Assets/Images/19.jpg'),
      },
    ],
  },
  {
    id: 2,
    name: 'Central America',
    image: require('../Assets/Images/9.jpeg'),
    Notes: [
      {
        id: 1,
        name: 'Emma Balley',
        desc: 'Hellow how are u',
        date: '23 May',
        image: require('../Assets/Images/20.jpg'),
      },
    ],
  },
  {
    id: 3,
    name: 'Cambodia',
    image: require('../Assets/Images/10.jpeg'),
    Notes: [
      {
        id: 1,
        name: 'Emma Balley',
        desc: 'Hellow how are u',
        date: '23 May',
        image: require('../Assets/Images/20.jpg'),
      },
      {
        id: 2,
        name: 'Madge Gomez',
        desc: 'Hi Are u There But I didnt',
        date: '15 jun',
        image: require('../Assets/Images/16.jpg'),
      },
      {
        id: 3,
        name: 'Chad Griffton',
        desc: 'u improvement The pet Show',
        date: '10 Aug',
        image: require('../Assets/Images/17.jpg'),
      },
      {
        id: 4,
        name: 'Glen Guzman',
        desc: 'Thats pretty Your Fine',
        date: '4 Dec',
        image: require('../Assets/Images/18.jpg'),
      },
      {
        id: 5,
        name: 'Cora Bush',
        desc: 'Hellow how are u',
        date: '1 Sep',
        image: require('../Assets/Images/19.jpg'),
      },
    ],
  },
  {
    id: 4,
    name: 'The Balkans',
    image: require('../Assets/Images/11.jpg'),
    Notes: [
      {
        id: 1,
        name: 'Emma Balley',
        desc: 'Hellow how are u',
        date: '23 May',
        image: require('../Assets/Images/20.jpg'),
      },
      {
        id: 2,
        name: 'Madge Gomez',
        desc: 'Hi Are u There But I didnt',
        date: '15 jun',
        image: require('../Assets/Images/16.jpg'),
      },
      {
        id: 3,
        name: 'Chad Griffton',
        desc: 'u improvement The pet Show',
        date: '10 Aug',
        image: require('../Assets/Images/17.jpg'),
      },
    ],
  },
  {
    id: 5,
    name: 'China',
    image: require('../Assets/Images/12.jpeg'),
    Notes: [
      {
        id: 1,
        name: 'Emma Balley',
        desc: 'Hellow how are u',
        date: '23 May',
        image: require('../Assets/Images/20.jpg'),
      },
      {
        id: 2,
        name: 'Madge Gomez',
        desc: 'Hi Are u There But I didnt',
        date: '15 jun',
        image: require('../Assets/Images/16.jpg'),
      },
      {
        id: 3,
        name: 'Chad Griffton',
        desc: 'u improvement The pet Show',
        date: '10 Aug',
        image: require('../Assets/Images/17.jpg'),
      },
      {
        id: 4,
        name: 'Glen Guzman',
        desc: 'Thats pretty Your Fine',
        date: '4 Dec',
        image: require('../Assets/Images/18.jpg'),
      },
    ],
  },
  {
    id: 6,
    name: 'India',
    image: require('../Assets/Images/13.jpeg'),
    Notes: [
      {
        id: 1,
        name: 'Emma Balley',
        desc: 'Hellow how are u',
        date: '23 May',
        image: require('../Assets/Images/20.jpg'),
      },
      {
        id: 2,
        name: 'Madge Gomez',
        desc: 'Hi Are u There But I didnt',
        date: '15 jun',
        image: require('../Assets/Images/16.jpg'),
      },
    ],
  },
  {
    id: 7,
    name: 'Georgia',
    image: require('../Assets/Images/14.jpeg'),
    Notes: [
      {
        id: 1,
        name: 'Emma Balley',
        desc: 'Hellow how are u',
        date: '23 May',
        image: require('../Assets/Images/20.jpg'),
      },
      {
        id: 2,
        name: 'Madge Gomez',
        desc: 'Hi Are u There But I didnt',
        date: '15 jun',
        image: require('../Assets/Images/16.jpg'),
      },
      {
        id: 3,
        name: 'Chad Griffton',
        desc: 'u improvement The pet Show',
        date: '10 Aug',
        image: require('../Assets/Images/17.jpg'),
      },
      {
        id: 4,
        name: 'Glen Guzman',
        desc: 'Thats pretty Your Fine',
        date: '4 Dec',
        image: require('../Assets/Images/18.jpg'),
      },
      {
        id: 5,
        name: 'Cora Bush',
        desc: 'Hellow how are u',
        date: '1 Sep',
        image: require('../Assets/Images/19.jpg'),
      },
    ],
  },
  {
    id: 8,
    name: 'Portugal',
    image: require('../Assets/Images/15.jpg'),
    Notes: [
      {
        id: 1,
        name: 'Emma Balley',
        desc: 'Hellow how are u',
        date: '23 May',
        image: require('../Assets/Images/20.jpg'),
      },
      {
        id: 2,
        name: 'Madge Gomez',
        desc: 'Hi Are u There But I didnt',
        date: '15 jun',
        image: require('../Assets/Images/16.jpg'),
      },
      {
        id: 3,
        name: 'Chad Griffton',
        desc: 'u improvement The pet Show',
        date: '10 Aug',
        image: require('../Assets/Images/17.jpg'),
      },
      {
        id: 4,
        name: 'Glen Guzman',
        desc: 'Thats pretty Your Fine',
        date: '4 Dec',
        image: require('../Assets/Images/18.jpg'),
      },
    ],
  },
];

const NotepadDesign = props => {
  let Notedata = props?.route?.params;
  const user = useSelector(state => state.commonReducer.userData);
  // console.log("🚀 ~ file: HomeScreen.js:24 ~ HomeScreen ~ user:", user)
  // console.log("🚀 ~ file: NotepadDesign.js:302 ~ NotepadDesign ~ Notedata:", Notedata)
  const token = useSelector(state => state.authReducer.token);
  const isFocused = useIsFocused();
  // const stories = useSelector(state => state.commonReducer.notePadData);
  const [isLoading, setIsLoading] = useState(false);
  const [trips, setTrips] = useState([]);
  const [tripNotes, setTripNotes] = useState([]);
  const [image, setImage] = useState({});
  const [selectedNote, setSelectedNote] = useState({});
  const [tripLoading, setTripLoading] = useState(false);
  const [notesLoading, setNotesLoading] = useState(false);
  const navigation = useNavigation();
  const [noteDesc, setNoteDesc] = useState('');
  const [noteName, setNoteName] = useState('');
  const [tripModalVisibe, setTripModalVisibe] = useState(false);
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [selectedStory, setSelectedStory] = useState({});
  // console.log("🚀 ~ file: NotepadDesign.js:322 ~ NotepadDesign ~ selectedStory:", selectedStory)

  // const [notes, setNotes] = useState(
  //   stories?.find(item => {
  //     return item?.id == selectedStory?.id;
  //   })?.Notes,
  // );

  const [country, setCountry] = useState('');
  const [imagePicker, setImagePicker] = useState(false);

  const dispatch = useDispatch();

  const saveTripFromDetails = async () => {
    //  return console.log('here from details')
    const url = 'auth/trip';

    var imageForServer = null;
    try {
      const response = await fetch(image?.uri);

      const blob = await response.blob();
      const reader = new FileReader();
      reader.onload = async () => {
        imageForServer = reader.result;
        console.log('Base64 image:', imageForServer);
        const body = {
          image: imageForServer,
          title: country,
          user_id: user?.id,
        };
        setIsLoading(true);
        if (!(Object.keys(image).length > 0)) {
          return Platform.OS == 'android'
            ? ToastAndroid.show('Please add an image', ToastAndroid.SHORT)
            : Alert.alert('Please add an image');
        } else if (country == '') {
          return Platform.OS == 'android'
            ? ToastAndroid.show('Please add country name', ToastAndroid.SHORT)
            : Alert.alert('Please add country name');
        }

        const responseData = await Post(url, body, apiHeader(token));
        setIsLoading(false);
        if (responseData != undefined) {
          console.log(
            '🚀 ~ file: NotepadDesign.js:373 ~ saveTrip ~ responseData:',
            responseData?.data,
          );
          setTripModalVisibe(false);
          setImage({});
          setCountry('');
          Platform.OS == 'android'
            ? ToastAndroid.show('Place Added Successfully', ToastAndroid.SHORT)
            : alert('Place Added Successfully');
          navigation.goBack();
          // getTrips();
          // Notedata = null ;
        }
      };

      reader.readAsDataURL(blob);
      // return base64Image ;
    } catch (error) {
      console.error('Error fetching or converting image:', error);
    }

    // dispatch(setNotePadData({...body, Notes: []}));
  };
  const saveTrip = async () => {
    // return console.log('here')
    const url = 'auth/trip';

    // console.log('Base64 image:', imageForServer);
    // return console.log("🚀 ~ file: NotepadDesign.js:361 ~ saveTrip ~ imageForServer:" , `data:application/octet-stream;base64,${imageForServer}`)
    const body = {
      title: country,
      user_id: user?.id,
    };
    // return console.log('🚀 ~ file: NotepadDesign.js:297 ~ saveTrip ~ body:', body);
    setIsLoading(true);
    if (Object.keys(image).length > 0) {
      const imageForServer = await RNFetchBlob.fs.readFile(
        image?.uri,
        'base64',
      );

      body.image = `data:application/octet-stream;base64,${imageForServer}`;
    }
    if (country == '') {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Please add country name', ToastAndroid.SHORT)
        : Alert.alert('Please add country name');
    }

    setIsLoading(true);
    const responseData = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (responseData != undefined) {
      console.log(
        '🚀 ~ file: NotepadDesign.js:373 ~ saveTrip ~ responseData:',
        responseData?.data,
      );
      setTripModalVisibe(false);
      setImage({});
      setCountry('');
      getTrips();
      Platform.OS == 'android'
        ? ToastAndroid.show('Place Added Successfully', ToastAndroid.SHORT)
        : alert('Place Added Successfully');
    }
  };

  const getTrips = async () => {
    console.log('fasdasd asd ad asd d asd d  sdasd');
    const url = `auth/trip/index/${user?.id}`;
    // return  console.log("🚀 ~ file: NotepadDesign.js:437 ~ getTrips ~ url:", url)
    setTripLoading(true);
    const response = await Get(url, token);
    setTripLoading(false);
    if (response != undefined) {
      // console.log("🚀 ~ file: NotepadDesign.js:390 ~ getTrips ~ response:", response?.data)
      setTrips(response?.data?.Trip);
    }
  };
  const getTripNotes = async () => {
    const url = `auth/notes/index?place_id=${selectedStory?.id}`;
    setNotesLoading(true);
    const response = await Get(url, token);
    setNotesLoading(false);
    if (response !== undefined) {
      // console.log(
      //   '🚀 ~ file: NotepadDesign.js:426 ~ tripNotes ~ response:',
      //   response?.data,
      // );
      setTripNotes(response?.data?.notes);
    }
  };

  const saveTripNote = async () => {
    const url = 'auth/notes';
    const body = {
      description: noteDesc,
      title: noteName,
      // image: image,
      place_id: selectedStory?.id,
    };

    for (let key in body) {
      if (body[key] == '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`${key} is required`, ToastAndroid.SHORT)
          : Alert.alert(`${key} is required`);
      }
    }
    const formData = new FormData();
    for (let key in body) {
      formData.append(key, body[key]);
    }
    if (Object.keys(image).length > 0) {
      formData.append('image', image);
    }

    //  return console.log(
    //     `🚀 ~ file: TripDetailsScreen.js ~ line 157 ~ saveTripNote ~ ${JSON.stringify(formData,null ,2)}`,
    //   );
    setIsLoading(true);
    const response = await Post(url, formData, apiHeader(token));
    setIsLoading(false);

    console.log(
      '🚀 ~ file: NotepadDesign.js:442 ~ saveTripNote ~ response:',
      response?.data,
    );
    // return console.log('Data is here========>>>>>>>>>>',{...body, storyId: selectedStory.id})
    if (response != undefined) {
      setNoteDesc('');
      setImage({});
      setNoteName('');
      setNoteModalVisible(false);
      getTripNotes();
    }

    // dispatch(
    //   setFiles({
    //     ...body,
    //     image: image,
    //     id: -1,
    //     storyId: selectedStory?.id,
    //     date: moment().format('DD MMMM YYYY'),
    //   }),
    // );
  };

  useEffect(() => {
    getTrips();
    if (Object.keys(selectedStory).length > 0) {
      getTripNotes();
    }
    if (isFocused) {
      Notedata?.fromDetails && setImage(Notedata?.item);
      Notedata?.fromDetails && setCountry(Notedata?.item?.name);
      Notedata?.fromDetails && setTripModalVisibe(true);
    }
    return () => {
      setImage('');
      setCountry('');
      setTripModalVisibe(false);
      Notedata = null;
      // Notedata= null
    };
  }, [isFocused]);

  useEffect(() => {
    if (Object.keys(selectedStory).length > 0) {
      getTripNotes();
    }
  }, [selectedStory]);

  return (
    <ScreenBoiler
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}>
      <LinearGradient
        style={{
          width: windowWidth,
          height: windowHeight,
        }}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={Color.themeBgColor}>
        <TouchableOpacity activeOpacity={0.8} style={styles.Rounded}>
          <Icon
            onPress={() => {
              navigation.toggleDrawer();
            }}
            name="menu"
            as={Ionicons}
            size={moderateScale(25)}
            color={Color.black}
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: moderateScale(20, 0.3),
            alignItems: 'center',
            paddingHorizontal: moderateScale(10, 0.6),
          }}>
          <View style={{marginLeft: moderateScale(10, 0.3)}}>
            <CustomText
              style={{fontSize: moderateScale(9, 0.6), color: Color.black}}
              isBold>
              Good Morning
            </CustomText>

            <CustomText
              isBold
              style={{
                width: windowWidth * 0.4,
                fontSize: moderateScale(17, 0.6),
                color: Color.black,
              }}>
              Dear {user?.name},
            </CustomText>
          </View>
        </View>

        <CustomButton
          text={'Add Trip'}
          isBold
          textColor={Color.themeColor}
          // width={windowWidth * 0.2}
          height={windowHeight * 0.03}
          bgColor={Color.white}
          fontSize={moderateScale(11, 0.6)}
          borderRadius={moderateScale(5, 0.3)}
          alignSelf={'flex-end'}
          marginTop={moderateScale(20, 0.3)}
          style={{
            marginRight: moderateScale(10, 0.3),
          }}
          onPress={() => {
            setTripModalVisibe(true);
          }}
          // right={moderateScale(5,0.3)}
        />

        {tripLoading ? (
          <View style={{paddingVertical: moderateScale(40, 0.6)}}>
            <ActivityIndicator size={moderateScale(40, 0.6)} color={'white'} />
          </View>
        ) : (
          <FlatList
            data={trips}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              // marginTop: moderateScale(25, 0.3),
              marginBottom: moderateScale(10, 0.3),
            }}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    // backgroundColor: 'red',
                    width: windowWidth,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: windowWidth * 0.3,
                      height: windowHeight * 0.13,
                      // alignSelf: 'center',
                      // marginTop: moderateScale(130, 0.3),
                      // backgroundColor: 'green',
                      // position: 'absolute',
                      // left:0,
                    }}>
                    <CustomImage
                      style={{width: '100%', height: '100%'}}
                      source={require('../Assets/Images/no-data.png')}
                      resizeMode={'cover'}
                    />
                  </View>
                  <CustomText style={{color:'black', fontSize:moderateScale(12,.6)}} isBold>Data Not Found</CustomText>
                </View>
              );
            }}
            renderItem={({item, index}) => {
              return (
                <StoriesComponent
                  item={item}
                  selectedStory={selectedStory}
                  setSelectedStory={setSelectedStory}
                />
              );
            }}
          />
        )}

        <View
          style={{
            width: windowWidth,
            height: windowHeight * 0.7,
            backgroundColor: Color.white,
            borderTopLeftRadius: moderateScale(25, 0.3),
            borderTopRightRadius: moderateScale(25, 0.3),
          }}>
          <CustomButton
            text={'Add Notes'}
            isBold
            textColor={Color.white}
            // width={windowWidth * 0.2}
            height={windowHeight * 0.03}
            bgColor={Color.themeColor}
            fontSize={moderateScale(11, 0.6)}
            borderRadius={moderateScale(5, 0.3)}
            alignSelf={'flex-end'}
            marginTop={moderateScale(30, 0.3)}
            onPress={() => {
              if (Object.keys(selectedStory).length > 0) {
                setNoteModalVisible(true);
              } else {
                return Platform.OS == 'android'
                  ? ToastAndroid.show(`Select any Country`, ToastAndroid.SHORT)
                  : Alert.alert(`Select any Country`);
              }
            }}
            style={{
              position: 'absolute',
              marginRight: moderateScale(10, 0.3),
              zIndex: 1,
              right: 5,
            }}

            
          />

          {notesLoading ? (
            <View
              style={{
                justifyContent: 'center',
                // backgroundColor: 'black',
                height: windowHeight * 0.6,
              }}>
              <ActivityIndicator
                color={Color.themeColor}
                size={moderateScale(50, 0.6)}
              />
            </View>
          ) : (
            <FlatList
              data={tripNotes}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: moderateScale(50, 0.6),
                paddingTop: moderateScale(50, 0.6),
              }}
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      // backgroundColor: 'red',
                      width: windowWidth,
                      justifyContent: 'center',
                      alignItems: 'center',
                      height:windowHeight*0.5
                    }}>
                    <View
                      style={{
                        width: windowWidth * 0.5,
                        height: windowHeight * 0.25,
                        // alignSelf: 'center',
                        // marginTop: moderateScale(130, 0.3),
                        // backgroundColor: 'green',
                        // position: 'absolute',
                        // left:0,
                      }}>
                      <CustomImage
                        style={{width: '100%', height: '100%'}}
                        source={require('../Assets/Images/no-data.png')}
                        resizeMode={'cover'}
                      />
                    </View>
                    <CustomText style={{color:'black', fontSize:moderateScale(15,.6)}} isBold>Data Not Found</CustomText>
                  </View>
                );
              }}
              renderItem={({item, index}) => {
                // console.log('Notes item==========>', item);
                return (
                  <NotesComponent
                    item={item}
                    // setNoteModalVisible ={setNoteModalVisible}
                    selectedStory={selectedStory}
                    setSelectedNote={setSelectedNote}
                  />
                );
              }}
            />
          )}
          <Modal
            isVisible={tripModalVisibe}
            onBackdropPress={() => {
              setTripModalVisibe(false);
              setImage({});
              Notedata?.fromDetails && navigation.goBack();
            }}>
            <View
              style={{
                width: windowWidth * 0.8,
                height: windowHeight * 0.4,
                backgroundColor: '#fff',
                alignSelf: 'center',
                alignItems: 'center',
                borderRadius: moderateScale(10, 0.3),
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}>
              <View>
                <View
                  style={[
                    styles.Profile1,
                    !(Object.keys(image).length > 0) && {
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  ]}>
                  <CustomImage
                    resizeMode={'cover'}
                    source={
                      Object.keys(image).length > 0
                        ? {uri: image?.uri}
                        : require('../Assets/Images/profileimage.png')
                    }
                    style={{
                      width:
                        Object.keys(image).length > 0
                          ? '100%'
                          : moderateScale(70, 0.6),
                      height:
                        Object.keys(image).length > 0
                          ? '100%'
                          : moderateScale(70, 0.6),
                    }}
                  />
                </View>
                {/* { !Notedata?.fromDetails && Object.keys(image).length > 0 && */}

                <TouchableOpacity
                  activeOpacity={0.6}
                  style={styles.edit}
                  onPress={() => {
                    setImagePicker(true);
                  }}>
                  <Icon
                    name="pencil"
                    as={FontAwesome}
                    style={styles.icon2}
                    color={Color.white}
                    size={moderateScale(16, 0.3)}
                    onPress={() => {
                      setImagePicker(true);
                    }}
                  />
                </TouchableOpacity>
                {/* } */}
              </View>

              <TextInputWithTitle
                title={'Place Name'}
                titleText={'Enter Place Name'}
                placeholder={'Enter Place Name'}
                setText={setCountry}
                value={country}
                viewHeight={0.06}
                viewWidth={0.7}
                inputWidth={0.7}
                borderBottom={1}
                borderColor={Color.black}
                // marginTop={moderateScale(15, 0.3)}
                color={Color.black}
                placeholderColor={Color.veryLightGray}
              />

              <CustomButton
                text={
                  isLoading ? (
                    <ActivityIndicator size={'small'} color={'white'} />
                  ) : (
                    'Save'
                  )
                }
                isBold
                textColor={Color.white}
                width={windowWidth * 0.3}
                height={windowHeight * 0.05}
                bgColor={Color.themeColor}
                fontSize={moderateScale(11, 0.6)}
                borderRadius={moderateScale(5, 0.3)}
                // alignSelf={'flex-end'}
                marginTop={moderateScale(20, 0.3)}
                onPress={() => {
                  Notedata?.fromDetails ? saveTripFromDetails() : saveTrip();
                }}
              />
            </View>
          </Modal>
          <Modal
            isVisible={noteModalVisible}
            onBackdropPress={() => {
              setNoteModalVisible(false);
              setImage({});
            }}>
            <View
              style={{
                width: windowWidth * 0.8,
                // height: windowHeight * 0.5,
                paddingVertical: moderateScale(20, 0.6),
                backgroundColor: '#fff',
                alignSelf: 'center',
                alignItems: 'center',
                borderRadius: moderateScale(10, 0.3),
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}>
              <View>
                <View
                  style={[
                    styles.Profile1,
                    !(Object.keys(image).length > 0) && {
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  ]}>
                  <CustomImage
                    resizeMode={'cover'}
                    source={
                      image?.uri
                        ? {uri: image?.uri}
                        : require('../Assets/Images/profileimage.png')
                    }
                    style={{
                      width:
                        Object.keys(image).length > 0
                          ? '100%'
                          : moderateScale(70, 0.6),
                      height:
                        Object.keys(image).length > 0
                          ? '100%'
                          : moderateScale(70, 0.6),
                    }}
                  />
                </View>

                <TouchableOpacity
                  activeOpacity={0.6}
                  style={styles.edit}
                  onPress={() => {
                    setImagePicker(true);
                  }}>
                  <Icon
                    name="pencil"
                    as={FontAwesome}
                    style={styles.icon2}
                    color={Color.white}
                    size={moderateScale(16, 0.3)}
                    onPress={() => {
                      setImagePicker(true);
                    }}
                  />
                </TouchableOpacity>
              </View>

              <TextInputWithTitle
                title={'Title'}
                titleText={'Title'}
                placeholder={'Title'}
                setText={setNoteName}
                value={noteName}
                viewHeight={0.06}
                viewWidth={0.7}
                inputWidth={0.7}
                borderBottom={1}
                borderColor={Color.black}
                // marginTop={moderateScale(15, 0.3)}
                color={Color.black}
                placeholderColor={Color.veryLightGray}
              />
              <TextInputWithTitle
                title={'Description'}
                titleText={'Enter Description'}
                placeholder={'Enter Description'}
                setText={setNoteDesc}
                value={noteDesc}
                viewHeight={0.06}
                viewWidth={0.7}
                inputWidth={0.7}
                borderBottom={1}
                borderColor={Color.black}
                // marginTop={moderateScale(15, 0.3)}
                color={Color.black}
                placeholderColor={Color.veryLightGray}
              />

              <CustomButton
                text={
                  isLoading ? (
                    <ActivityIndicator size={'small'} color={'white'} />
                  ) : (
                    'Save'
                  )
                }
                isBold
                textColor={Color.white}
                width={windowWidth * 0.3}
                height={windowHeight * 0.05}
                bgColor={Color.themeColor}
                fontSize={moderateScale(11, 0.6)}
                borderRadius={moderateScale(5, 0.3)}
                // alignSelf={'flex-end'}
                marginTop={moderateScale(20, 0.3)}
                onPress={() => {
                  saveTripNote();
                }}
              />
            </View>
          </Modal>
        </View>
      </LinearGradient>
      <ImagePickerModal
        show={imagePicker}
        setShow={setImagePicker}
        setFileObject={setImage}
      />
    </ScreenBoiler>
  );
};

export default NotepadDesign;

const styles = StyleSheet.create({
  Profile: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    borderRadius: (windowWidth * 0.1) / 1,
    borderWidth: 1,
    borderColor: Color.white,
    overflow: 'hidden',
  },
  Profile1: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    borderRadius: (windowWidth * 0.3) / 2,
    borderWidth: 1,
    borderColor: Color.white,
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: '#EEEEEE',
    marginTop: moderateScale(20, 0.3),
    // alignItems: 'center',
    // justifyContent: 'center',
    // borderColor : 'black'
  },
  Rounded: {
    width: windowWidth * 0.1,
    height: windowHeight * 0.05,
    borderRadius: moderateScale(30, 0.3),
    backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    position: 'absolute',
    top: 10,
    right: 10,
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

// <RBSheet
// ref={ref => {
//   setRbsheetRef(ref);
// }}
// closeOnDragDown={true}
// dragFromTopOnly={true}
// openDuration={250}
// height={windowHeight * 0.5}
// customStyles={{
//   container: {
//     borderTopEndRadius: moderateScale(30, 0.6),
//     borderTopLeftRadius: moderateScale(30, 0.6),
//     overflow: 'hidden',
//   },
// }}>
// <View
//   style={{
//     height: '100%',
//     width: windowWidth,
//     alignItems: 'center',
//   }}>
//   <TouchableOpacity
//     style={{
//       height: windowHeight * 0.2,
//       width: windowWidth,
//       overflow: 'hidden',
//       justifyContent: 'center',
//       // alignItems: 'center',
//       // borderColor:'black',
//       // borderWidth:1,
//       zIndex: -1,
//       marginTop: moderateScale(-25, 0.3),
//       // backgroundColor: 'red',
//     }}>
//     {Object.keys(image).length > 0 ? (
//       <CustomImage
//         source={{uri: image.uri}}
//         style={{width: '100%', height: '100%'}}
//         resizeMode={'cover'}
//       />
//     ) : (
//       <CustomButton
//         text={'Add Image'}
//         isBold
//         textColor={Color.white}
//         // width={windowWidth * 0.2}
//         height={windowHeight * 0.05}
//         bgColor={Color.themeColor}
//         fontSize={moderateScale(11, 0.6)}
//         borderRadius={moderateScale(5, 0.3)}
//         // alignSelf={'flex-end'}
//         marginTop={moderateScale(30, 0.3)}
//         style={{
//           marginRight: moderateScale(10, 0.3),
//         }}
//         onPress={() => {
//           setImagePicker(true);
//         }}
//         // right={moderateScale(5,0.3)}
//       />
//     )}
//   </TouchableOpacity>

//   <TextInputWithTitle
//     titleText={'Story Title'}
//     secureText={false}
//     placeholder={'Story Title'}
//     setText={setCountry}
//     value={country}
//     viewHeight={0.07}
//     viewWidth={0.9}
//     inputWidth={0.9}
//     // border={1}
//     borderColor={'#ffffff'}
//     backgroundColor={'#FFFFFF'}
//     marginTop={moderateScale(35, 0.3)}
//     color={Color.themeColor}
//     placeholderColor={Color.themeLightGray}
//     borderRadius={moderateScale(25, 0.3)}
//     elevation
//   />

//   <CustomButton
//     text={
//       isLoading ? (
//         <ActivityIndicator size={'small'} color={'white'} />
//       ) : (
//         'Save'
//       )
//     }
//     isBold
//     textColor={Color.white}
//     width={windowWidth * 0.3}
//     height={windowHeight * 0.05}
//     bgColor={Color.themeColor}
//     fontSize={moderateScale(15, 0.6)}
//     borderRadius={moderateScale(5, 0.3)}
//     // alignSelf={'flex-end'}
//     marginTop={moderateScale(30, 0.3)}
//     style={{
//       marginRight: moderateScale(10, 0.3),
//     }}
//     onPress={() => {
//       saveTrip();
//     }}
//     // right={moderateScale(5,0.3)}
//   />
// </View>
// </RBSheet>
// <RBSheet
// ref={ref => {
//   setAddNotesRef(ref);
// }}
// closeOnDragDown={true}
// dragFromTopOnly={true}
// openDuration={250}
// height={windowHeight * 0.8}
// customStyles={{
//   container: {
//     borderTopEndRadius: moderateScale(30, 0.6),
//     borderTopLeftRadius: moderateScale(30, 0.6),
//     overflow: 'hidden',
//   },
// }}>
// <View
//   style={{
//     height: windowHeight,
//     width: windowWidth,
//     alignItems: 'center',
//   }}>
//   <TouchableOpacity
//     style={{
//       height: windowHeight * 0.4,
//       width: windowWidth,
//       overflow: 'hidden',
//       justifyContent: 'center',
//       zIndex: -1,
//       marginTop: moderateScale(-25, 0.3),
//     }}>
//     {Object.keys(image).length > 0 ? (
//       <CustomImage
//         source={{uri: image.uri}}
//         style={{width: '100%', height: '100%'}}
//         resizeMode={'stretch'}
//       />
//     ) : (
//       <CustomButton
//         text={'Add Image'}
//         isBold
//         textColor={Color.white}
//         height={windowHeight * 0.05}
//         bgColor={Color.themeColor}
//         fontSize={moderateScale(11, 0.6)}
//         borderRadius={moderateScale(5, 0.3)}
//         marginTop={moderateScale(30, 0.3)}
//         style={{
//           marginRight: moderateScale(10, 0.3),
//         }}
//         onPress={() => {
//           setImagePicker(true);
//         }}
//       />
//     )}
//   </TouchableOpacity>

//   <TextInputWithTitle
//     titleText={'Title'}
//     secureText={false}
//     placeholder={'Title'}
//     setText={setNoteName}
//     value={noteName}
//     viewHeight={0.07}
//     viewWidth={0.9}
//     inputWidth={0.9}
//     borderColor={'#ffffff'}
//     backgroundColor={'#FFFFFF'}
//     marginTop={moderateScale(35, 0.3)}
//     color={Color.themeColor}
//     placeholderColor={Color.themeLightGray}
//     borderRadius={moderateScale(25, 0.3)}
//     elevation
//   />
//   <TextInputWithTitle
//     titleText={'Description'}
//     secureText={false}
//     placeholder={'Description'}
//     setText={setNoteDesc}
//     value={noteDesc}
//     viewHeight={0.07}
//     viewWidth={0.9}
//     inputWidth={0.9}
//     borderColor={'#ffffff'}
//     backgroundColor={'#FFFFFF'}
//     marginTop={moderateScale(35, 0.3)}
//     color={Color.themeColor}
//     placeholderColor={Color.themeLightGray}
//     borderRadius={moderateScale(25, 0.3)}
//     elevation
//   />

//   <CustomButton
//     text={
//       isLoading ? (
//         <ActivityIndicator size={'small'} color={'white'} />
//       ) : (
//         'Save'
//       )
//     }
//     isBold
//     textColor={Color.white}
//     width={windowWidth * 0.3}
//     height={windowHeight * 0.05}
//     bgColor={Color.themeColor}
//     fontSize={moderateScale(15, 0.6)}
//     borderRadius={moderateScale(5, 0.3)}
//     marginTop={moderateScale(30, 0.3)}
//     style={{
//       marginRight: moderateScale(10, 0.3),
//     }}
//     onPress={() => {
//       saveTripNote();
//     }}
//   />
// </View>
// </RBSheet>
