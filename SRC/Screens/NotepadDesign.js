import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import LinearGradient from 'react-native-linear-gradient';
import ScreenBoiler from '../Components/ScreenBoiler';
import Color from '../Assets/Utilities/Color';
import { windowWidth, windowHeight, apiHeader } from '../Utillity/utils';
import { moderateScale } from 'react-native-size-matters';
import StoriesComponent from '../Components/StoriesComponent';
import { FlatList, Icon } from 'native-base';
import NotesComponent from '../Components/NotesComponent';
import CustomButton from '../Components/CustomButton';
import RBSheet from 'react-native-raw-bottom-sheet';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import { useDispatch, useSelector } from 'react-redux';
import { setFiles, setNotePadData } from '../Store/slices/common';
import { ActivityIndicator } from 'react-native';
import moment from 'moment';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ImagePickerModal from '../Components/ImagePickerModal';
import { Get, Post } from '../Axios/AxiosInterceptorFunction';
import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

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
  let Notedata = props?.route?.params?.data;
  let Country = props?.route?.params?.country;
  console.log("🚀 ~ Country:", Country)
  console.log("🚀 ~ Notedata:", Notedata?.country)
  const token = useSelector(state => state.authReducer.token);
  console.log(token, 'tokeeeeeeeeeeeeeeen')
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  // const stories = useSelector(state => state.commonReducer.notePadData);
  const [isLoading, setIsLoading] = useState(false);
  const [trips, setTrips] = useState([]);
  console.log("🚀 ~ trips:", trips)
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
  const [type, setType] = useState('trip');
  const [searchData, setSearchData] = useState({})
  console.log("🚀 ~ searchData:", searchData)
  const [selectedStory, setSelectedStory] = useState({});
  const [country, setCountry] = useState('');
  console.log("🚀 ~ country:", country)
  const [imagePicker, setImagePicker] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({})
  const [countryCode, setcountryCode] = useState('')
  console.log("🚀 ~ countryCode:", countryCode)
  const user = useSelector(state => state.commonReducer.userData);

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
            : Alert.alert('Place Added Successfully');
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
  };

  const saveTrip = async () => {
    const url = 'auth/trip';
    const body = {
      location_name: country,
      user_id: user?.id,
      // location_name: searchData?.location?.name,
      lat: searchData?.location?.lat,
      lng: searchData?.location?.lng,
      city: Notedata?.name,
      country: Country,
      flag: Notedata?.data?.country?.uri,
      image: image?.uri,
      // title : 
    };
    // if (Object.keys(image).length > 0) {
    //   const imageForServer = await RNFetchBlob.fs.readFile(
    //     Platform.OS == 'android'
    //       ? image?.uri
    //       : image?.uri.replace('file://', ''),
    //     'base64',
    //   );
    //   console.log(imageForServer);

    //   body.image = `data:application/octet-stream;base64,${imageForServer}`;
    // }
    if (country == '') {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Please add country name', ToastAndroid.SHORT)
        : Alert.alert('Please add country name');
    }
    console.log("🚀 ~ saveTrip ~ body:", body)
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
        : Alert.alert('Place Added Successfully');
    }
  };

  const getTrips = async () => {
    console.log('fasdasd asd ad asd d asd d  sdasd');
    const url = `auth/trip/index/${user?.id}?country=${Country}&city=${Notedata?.name}`;
    setTripLoading(true);
    console.log("🚀 ~ getTrips ~ url:", url)
    const response = await Get(url, token);
    console.log("🚀 ~ getTrips ~ response:", response?.data)
    setTripLoading(false);
    if (response != undefined) {
      setTrips(response?.data?.Trip);
    }
  };

  const getTripNotes = async () => {
    const url = `auth/notes/index?place_id=${selectedStory?.id}`;
    setNotesLoading(true);
    const response = await Get(url, token);
    setNotesLoading(false);
    if (response !== undefined) {
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
    setIsLoading(true);
    const response = await Post(url, formData, apiHeader(token));
    setIsLoading(false);

    console.log(
      '🚀 ~ file: NotepadDesign.js:442 ~ saveTripNote ~ response:',
      response?.data,
    );
    if (response != undefined) {
      setNoteDesc('');
      setImage({});
      setNoteName('');
      setNoteModalVisible(false);
      getTripNotes();
    }
  };

  useEffect(() => {
    getTrips();
    if (Object.keys(selectedStory).length > 0) {
      getTripNotes();
    }
    if (isFocused) {
      Notedata?.fromDetails && setImage(Notedata?.item);
      Notedata?.fromDetails && setCountry(Notedata?.item?.name);
      Notedata?.fromDetails &&
        setTimeout(() => {
          setTripModalVisibe(true);
        }, 500);
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


  useEffect(() => {
    getLatLngFromCity(Notedata?.name)
  }, [])

  const getLatLngFromCity = async (city) => {
    const apiKey = 'AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(Notedata?.name)}&key=${apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("🚀 ~ getLatLngFromCity ~ data:", data)

      if (data.status === "OK") {
        const result = data.results[0];
        const location = result.geometry.location;
        const countryComponent = result.address_components.find(component =>
          component.types.includes("country")
        );

        const countryCode = countryComponent ? countryComponent.short_name : "Unknown";

        console.log(`Latitude: ${location.lat}, Longitude: ${location.lng}, Country Code: ${countryCode}`);
        setCurrentLocation({
          latitude: location.lat,
          longitude: location?.lng,
        })
        setcountryCode(countryCode)
        return { lat: location.lat, lng: location.lng, countryCode };
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      return null;
    }
  };

  return (
    <ScreenBoiler
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}>
      <LinearGradient
        style={{
          width: windowWidth,
          height: windowHeight,
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={Color.themeBgColor}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.Rounded}
          onPress={() => {
            console.log('Toggle drawer');
            navigation.goBack();
          }}>
          <Icon
            onPress={() => {
              navigation.goBack();
              //   console.log('Toggle drawer'); navigation.toggleDrawer();
            }}
            name="chevron-back"
            as={Ionicons}
            size={moderateScale(25, 0.6)}
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
          <View style={{ marginLeft: moderateScale(10, 0.3) }}>
            <CustomText
              style={{ fontSize: moderateScale(9, 0.6), color: Color.black }}
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
            setType('trip');
            setTripModalVisibe(true);
          }}
        // right={moderateScale(5,0.3)}
        />

        {tripLoading ? (
          <View style={{ paddingVertical: moderateScale(40, 0.6) }}>
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
                      style={{ width: '100%', height: '100%' }}
                      source={require('../Assets/Images/no-data.png')}
                      resizeMode={'cover'}
                    />
                  </View>
                  <CustomText
                    style={{ color: 'black', fontSize: moderateScale(12, 0.6) }}
                    isBold>
                    Data Not Found
                  </CustomText>
                </View>
              );
            }}
            renderItem={({ item, index }) => {
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
                setType('notes');
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
                      height: windowHeight * 0.5,
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
                        style={{ width: '100%', height: '100%' }}
                        source={require('../Assets/Images/no-data.png')}
                        resizeMode={'cover'}
                      />
                    </View>
                    <CustomText
                      style={{ color: 'black', fontSize: moderateScale(15, 0.6) }}
                      isBold>
                      Data Not Found
                    </CustomText>
                  </View>
                );
              }}
              renderItem={({ item, index }) => {
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
            // isVisible={true}
            onBackdropPress={() => {
              setTripModalVisibe(false);
              setImage({});
              Notedata?.fromDetails && navigation.goBack();
            }}>
            <View
              style={{
                // width: windowWidth * 0.82,
                padding: moderateScale(10., 6),
                // height: windowHeight * 0.5,
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
                        ? { uri: image?.uri }
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
                    setTripModalVisibe(false);
                    setTimeout(() => {
                      setImagePicker(true);
                    }, 500);
                  }}>
                  <Icon
                    name="pencil"
                    as={FontAwesome}
                    style={styles.icon2}
                    color={Color.white}
                    size={moderateScale(16, 0.3)}
                    onPress={() => {
                      setTripModalVisibe(false);
                      setTimeout(() => {
                        setImagePicker(true);
                      }, 500);
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

              <View
                style={styles.searchbox}
              >
                <GooglePlacesAutocomplete
                  placeholder="Search"
                  textInputProps={{
                    placeholderTextColor: '#5d5d5d',
                    // returnKeyType: "search"
                  }}
                  onPress={(data, details = null) => {
                    console.log('hello hereeeee ========  >>>>>>>>>', {
                      name: data?.description,
                      location: details?.geometry?.location,
                    });
                    setSearchData({
                      name: data?.description,
                      location: details?.geometry?.location,
                    });
                  }}
                  query={{
                    key: 'AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc',
                    language: 'en',
                    components: `country:${countryCode}`,
                    location: `${currentLocation?.latitude},${currentLocation?.longitude}`,
                  }}
                  isRowScrollable={true}
                  fetchDetails={true}
                  styles={{
                    textInputContainer: {
                      width: windowWidth * 0.7,
                    },
                    textInput: {
                      height: windowHeight * 0.06,
                      color: Color.black,
                      fontSize: 16,
                      borderBottomWidth: 1,
                      borderColor: Color.black,
                      // borderRadius: moderateScale(20, 0.6),
                    },
                    listView: {
                      width: windowWidth * 0.8,
                      marginLeft: moderateScale(5, 0.6),
                      borderColor: Color.veryLightGray,
                      height: windowHeight * 0.3,
                    },
                    description: {
                      color: '#5d5d5d',
                      fontSize: moderateScale(9, 0.6),
                      numberOfLines: 2
                    },
                  }}
                />
              </View>
              {/* {Object.keys(searchData)?.length > 0 ? (
                <View style={{
                  width: windowWidth * 0.82,
                  height: windowHeight * 0.3,
                }}>
                  <MapView
                    ref={mapRef}
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={{
                      latitude: parseInt(searchData?.location?.lat),
                      longitude: parseInt(searchData?.location?.lng),
                      latitudeDelta: 0.005,
                      longitudeDelta: 0.005
                    }}
                  >
                    <Marker
                      coordinate={{
                        latitude: parseFloat(searchData?.location?.lat),
                        longitude: parseFloat(searchData?.location?.lng),
                      }}
                      title={country}
                      pinColor={Color.red}
                    />
                  </MapView>
                </View>
              ) : (
                <ActivityIndicator size={'small'} color={'white'} />
              )
              } */}
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
                  setTripModalVisibe(false)
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
              style={styles.modalView}>
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
                        ? { uri: image?.uri }
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
                    setNoteModalVisible(false);
                    setTimeout(() => {
                      setImagePicker(true);
                    }, 500);
                  }}>
                  <Icon
                    name="pencil"
                    as={FontAwesome}
                    style={styles.icon2}
                    color={Color.white}
                    size={moderateScale(16, 0.3)}
                    onPress={() => {
                      setNoteModalVisible(false);
                      setTimeout(() => {
                        setImagePicker(true);
                      }, 500);
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
                disabled={isLoading}
              />
            </View>
          </Modal>
        </View>
      </LinearGradient>
      <ImagePickerModal
        show={imagePicker}
        setShow={setImagePicker}
        setFileObject={setImage}
        setTripModalVisibe={
          type == 'trip' ? setTripModalVisibe : setNoteModalVisible
        }
        fromNotePad={true}
      // type={type}
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
  },
  map: {
    ...StyleSheet.absoluteFillObject,
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
    zIndex: 1,
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
  searchbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: moderateScale(7, 0.6)

  },
  modalView: {
    width: windowWidth * 0.8,
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
  },
});
