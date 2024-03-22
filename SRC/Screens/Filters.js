import {
  ActivityIndicator,
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ScreenBoiler from '../Components/ScreenBoiler';
import Header from '../Components/Header';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import {SectionList} from 'react-native';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {Badge, Icon} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import CustomText from '../Components/CustomText';
import Modal from 'react-native-modal';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import {color} from 'native-base/lib/typescript/theme/styled-system';
import CustomImage from '../Components/CustomImage';
import PreferenceModal from '../Components/PreferenceModal';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {setPrefrences, setUserData} from '../Store/slices/common';
// import {setPreferencesSet, setPreferences} from '../Store/slices/auth';
import axios from 'axios';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
const Filters = ({route}) => {
  const dispatch = useDispatch()
  const fromDrawer = route?.params?.fromDrawer;
  const navigation = useNavigation();
  const token = useSelector(state => state.authReducer.token);
  const userReduxPreferences = useSelector(state => state.commonReducer.prefrences);
  const filteredUserPreference = userReduxPreferences?.map(item=> item?.preferences)
  console.log("🚀 ~ Filters ~ filteredUserPreference:", filteredUserPreference)
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [userPreferences, setUserPreferences] = useState(filteredUserPreference?.length > 0 ? filteredUserPreference : []);
  const [currentItem, setCurrentItem] = useState({});
  const [isLoading , setIsLoading] = useState(false)
  const [types, setTypes] = useState([
    // {
    // id: 'cat1',
    // type: 'Food & Drink',
    // categories: [
    {
      id: 'f1',
      name: 'restaurant',
      label: 'Restaurant',
      icon: 'coffee-outline',
      as: MaterialCommunityIcons,
      preferences: [],
    },
    {
      id: 'f2',
      name: 'cafe',
      label: 'Cafe',
      icon: 'coffee-outline',
      as: MaterialCommunityIcons,
      preferences: [],
    },
    {
      id: 'f3',
      label: 'Takeout',
      name: 'meal_takeaway',
      icon: 'food-takeout-box-outline',
      as: MaterialCommunityIcons,
      preferences: [],
    },
    {
      id: 'f4',
      label: 'Delivery',
      name: 'meal_delivery',
      icon: 'delivery-dining',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 'f5',
      name: 'bar',
      label: 'Bar',
      icon: 'local-bar',
      as: MaterialIcons,
      preferences: [],
    },
    //   ],
    // },
    // {
    //   id: 'cat2',
    //   type: 'Things to do',
    //   categories: [
    // {id: 't1', name: 'parks', icon: 'park', as: MaterialIcons, preferences: []},
    {
      id: 't2',
      name: 'gym',
      label: 'Gyms',
      icon: 'fitness-center',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 't3',
      name: 'art_gallery',
      label: 'Art Gallery',
      icon: 'image-frame',
      as: MaterialCommunityIcons,
      preferences: [],
    },
    {
      id: 't4',
      name: 'amusement_park',
      label: 'Amusement Park',
      icon: 'attractions',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 't5',
      name: 'night_club',
      label: 'Night Club',
      icon: 'musical-note',
      as: Ionicons,
      preferences: [],
    },
    {
      id: 't8',
      name: 'museum',
      label: 'Museum',
      icon: 'museum',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 't9',
      name: 'library',
      label: 'Library',
      icon: 'local-library',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 't12',
      name: 'aquarium',
      label: 'Aquarium',
      icon: 'dolphin',
      as: MaterialCommunityIcons,
      preferences: [],
    },
    {
      id: 't12',
      name: 'campground',
      label: 'Campground',
      icon: 'tent',
      as: Fontisto,
      preferences: [],
    },
    {
      id: 't13',
      name: 'bowling_alley',
      label: 'Bowling Alley',
      icon: 'bowling',
      as: MaterialCommunityIcons,
      preferences: [],
    },
    {
      id: 't14',
      name: 'night_club',
      label: 'Night_Club',
      icon: 'musical-note',
      as: Ionicons,
      preferences: [],
    },
    {
      id: 't15',
      name: 'casino',
      label: 'Casino',
      icon: 'dice-6',
      as: MaterialCommunityIcons,
      preferences: [],
    },
    {
      id: 't16',
      name: 'stadium',
      label: 'Stadium',
      icon: 'stadium',
      as: MaterialCommunityIcons,
      preferences: [],
    },
    {
      id: 't17',
      name: 'zoo',
      label: 'Zoo',
      icon: 'pets',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 't18',
      name: 'movie_rental',
      label: 'Movie Rental',
      icon: 'local-movies',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 't19',
      name: 'movie_theater',
      label: 'Movie Theater',
      icon: 'theaters',
      as: MaterialIcons,
      preferences: [],
    },
    //   ],
    // },
    // {
    //   id: 'cat3',
    //   type: 'Shopping',
    //   categories: [
    {
      id: 's1',
      name: 'home_goods_store',
      label: 'Home Goods Store',
      icon: 'home',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 's2',
      name: 'clothing_store',
      label: 'Clothing Store',
      icon: 'shirt',
      as: Ionicons,
      preferences: [],
    },
    {
      id: 's3',
      name: 'shopping_mall',
      label: 'Shopping Mall',
      icon: 'local-mall',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 's4',
      name: 'electronics',
      label: 'Electronics',
      icon: 'devices',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 's5',
      name: 'sporting_goods',
      label: 'Sporting Goods',
      icon: 'football',
      as: Ionicons,
      preferences: [],
    },
    {
      id: 's6',
      name: 'convenience_store',
      label: 'Convenience Store',
      icon: 'local-convenience-store',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 's7',
      name: 'liquor_store',
      label: 'Liquor Store',
      icon: 'local-bar',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 's8',
      name: 'shoe_store',
      label: 'Shoe Store',
      icon: 'shoe-sneaker',
      as: MaterialCommunityIcons,
      preferences: [],
    },

    {
      id: 's9',
      name: 'jewelry_store',
      label: 'Jewelry Store',
      icon: 'necklace',
      as: MaterialCommunityIcons,
      preferences: [],
    },
    {
      id: 's10',
      name: 'supermarket',
      label: 'SuperMarket',
      icon: 'local-convenience-store',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 's11',
      name: 'furniture_store',
      label: 'Furniture Store',
      icon: 'weekend',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 's12',
      name: 'hardware_store',
      label: 'Hardware Store',
      icon: 'hardware-chip',
      as: Ionicons,
      preferences: [],
    },
    {
      id: 's13',
      name: 'bicycle_store',
      label: 'Bicycle Store',
      icon: 'directions-bike',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 's14',
      name: 'book_store',
      label: 'Book Store',
      icon: 'menu-book',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 's15',
      name: 'department_store',
      label: 'Department Store',
      icon: 'store',
      as: MaterialIcons,
      preferences: [],
    },
    //   ],
    // },
    // {
    //   id: 'cat4',
    //   type: 'Services',
    //   categories: [
    {
      id: 'sa1',
      name: 'accounting',
      label: 'Accounting',
      icon: 'local-hotel',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 'sa2',
      name: 'atm',
      label: 'ATM',
      icon: 'atm',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 'sa3',
      name: 'spa',
      label: 'Beauty Supplies',
      icon: 'spa',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 'sa4',
      name: 'car_rental',
      label: 'Car Rental',
      icon: 'car-rental',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 'sa5',
      name: 'car_wash',
      label: 'car wash',
      icon: 'local-car-wash',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 'sa6',
      name: 'gas_station',
      label: 'Gas Station',
      icon: 'local-gas-station',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 'sa7',
      name: 'hospital',
      label: 'Hospital',
      icon: 'local-hospital',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 'sa8',
      label: 'Libraries',
      name: 'library',
      icon: 'local-library',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 'sa9',
      name: 'airport',
      label: 'Airport',
      icon: 'local-airport',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 'sa10',
      name: 'parking',
      label: 'Parking',
      icon: 'local-parking',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 'sa11',
      name: 'pharmacy',
      label: 'Pharmacy',
      icon: 'local-pharmacy',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 'sa12',
      label: 'Veterinary Care',
      name: 'veterinary_care',
      icon: 'clinic-medical',
      as: FontAwesome5,
      preferences: [],
    },
    {
      id: 'sa13',
      name: 'transit_station',
      label: 'Transit Station',
      icon: 'train',
      as: FontAwesome,
      preferences: [],
    },
    {
      id: 'sa14',
      name: 'university',
      label: 'University',
      icon: 'school',
      as: Ionicons,
      preferences: [],
    },
    {
      id: 'sa15',
      name: 'taxi_stand',
      label: 'Taxi Stand',
      icon: 'local-taxi',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 'sa16',
      name: 'synagogue',
      label: 'Synagogue',
      icon: 'star-of-david',
      as: FontAwesome5,
      preferences: [],
    },
    {
      id: 'sa17',
      name: 'store',
      label: 'Store',
      icon: 'store',
      as: FontAwesome5,
      preferences: [],
    },
    {
      id: 'sa18',
      name: 'storage',
      label: 'Storage',
      icon: 'storage',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 'sa19',
      name: 'school',
      label: 'School',
      icon: 'school',
      as: FontAwesome5,
      preferences: [],
    },
    {
      id: 'sa20',
      name: 'roofing_contractor',
      label: 'Roofing Contractor',
      icon: 'construction',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 'sa21',
      name: 'real_estate_agency',
      label: 'Real Estate Agency',
      icon: 'home',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 'sa22',
      name: 'rv_park',
      label: 'RV Park',
      icon: 'directions-car',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 'sa23',
      name: 'post_office',
      label: 'Post Office',
      icon: 'local-post-office',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 'sa24',
      name: 'police',
      label: 'Police',
      icon: 'local-police',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 'sa25',
      name: 'plumber',
      label: 'Plumber',
      icon: 'pipe',
      as: MaterialCommunityIcons,
      preferences: [],
    },
    {
      id: 'sa26',
      name: 'physiotherapist',
      label: 'Physiotherapist',
      icon: 'accessible',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 'sa27',
      name: 'locksmith',
      label: 'Locksmith',
      icon: 'lock',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 'sa28',
      name: 'moving_company',
      label: 'Moving Company',
      icon: 'local-shipping',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 'sa29',
      name: 'mosque',
      label: 'Mosque',
      icon: 'mosque',
      as: FontAwesome5,
      preferences: [],
    },
    {
      id: 'sa30',
      name: 'lodging',
      label: 'Lodging',
      icon: 'hotel',
      as: FontAwesome5,
      preferences: [],
    },
    {
      id: 'sa31',
      name: 'laundry',
      label: 'Laundry',
      icon: 'local-laundry-service',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 'sa32',
      name: 'lawyer',
      label: 'Lawyer',
      icon: 'gavel',
      as: MaterialCommunityIcons,
      preferences: [],
    },
    {
      id: 'sa33',
      name: 'insurance_agency',
      label: 'Insurance Agency',
      icon: 'account-balance',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 'sa34',
      name: 'hindu_temple',
      label: 'Hindu Temple',
      icon: 'place-of-worship',
      as: FontAwesome5,
      preferences: [],
    },
    {
      id: 'sa35',
      name: 'florist',
      label: 'Florist',
      icon: 'local-florist',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 'sa36',
      name: 'fire_station',
      label: 'Fire Station',
      icon: 'local-fire-department',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 'sa37',
      name: 'embassy',
      label: 'Embassy',
      icon: 'account-balance',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 'sa38',
      name: 'electrician',
      label: 'Electrician',
      icon: 'power-plug',
      as: MaterialCommunityIcons,
      preferences: [],
    },
    {
      id: 'sa39',
      name: 'dentist',
      label: 'Dentist',
      icon: 'doctor',
      as: MaterialCommunityIcons,
      preferences: [],
    },
    {
      id: 'sa41',
      name: 'doctor',
      label: 'Doctor',
      icon: 'doctor',
      as: Fontisto,
      preferences: [],
    },
    {
      id: 'sa42',
      name: 'church',
      label: 'Church',
      icon: 'church',
      as: FontAwesome5,
      preferences: [],
    },
    {
      id: 'sa43',
      name: 'hair_care',
      label: 'Hair Care',
      icon: 'spa',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 'sa43',
      name: 'cemetery',
      label: 'Cemetery',
      icon: 'grave-stone',
      as: MaterialCommunityIcons,
      preferences: [],
    },
    {
      id: 'sa44',
      name: 'car_repair',
      label: 'Car Repair',
      icon: 'car-repair',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 'sa45',
      name: 'city_hall',
      label: 'City Hall',
      icon: 'town-hall',
      as: MaterialCommunityIcons,
      preferences: [],
    },
    {
      id: 'sa46',
      name: 'bank',
      label: 'Bank',
      icon: 'bank',
      as: FontAwesome,
      preferences: [],
    },
    {
      id: 'sa47',
      name: 'beauty_salon',
      label: 'Beauty Salon',
      icon: 'spa',
      as: MaterialIcons,
      preferences: [],
    },
    {
      id: 'sa48',
      name: 'local_government_office',
      label: 'Court',
      icon: 'building',
      as: FontAwesome,
      preferences: [],
    },
    //   ],
    // },
  ]);
  const sendPrefrences = async () => {
    const url = 'auth/preferences';
    const body = {
      preferences: userPreferences,
    };

    if(userPreferences.length < 1){
      ToastAndroid.show("Please choose Preferences....", ToastAndroid.SHORT);
      return;
    }

    console.log('🚀 ~ sendPrefrences ~ body:', JSON.stringify(body , null , 2));
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
   console.log("🚀 ~ sendPrefrences ~ response:", JSON.stringify(response?.data?.user,null,2))
      
      dispatch(setUserData(response?.data?.user));
      dispatch(setPrefrences(response?.data?.user?.preferences));
      // fromDrawer ? navigation.goBack() :
      // dispatch(setPreferencesSet(true));
    }
  };

  return (
    <ScreenBoiler
      statusBarBackgroundColor={[Color.themeColor, Color.themeColor]}
      statusBarContentStyle={'light-content'}>
       
          
         {fromDrawer && <TouchableOpacity activeOpacity={0.8} style={styles.Rounded} onPress={() => {
                navigation.toggleDrawer();
              }}>
            <Icon
              onPress={() => {
                navigation.toggleDrawer();
              }}
              name="menu"
              as={Ionicons}
              size={moderateScale(25)}
              color={Color.black}
            />
          </TouchableOpacity>}

      <Header
        headerColor={[Color.themeColor, Color.themeColor]}
        title={'Preferences'}
        titleColor={Color.white}
        titleWeight={'bold'}
        showBack={false}
        hideUser={true}
        titleSize={moderateScale(20, 0.9)}
      />

      <LinearGradient 
      colors={["#f5f1ed","#ffffff", "#f5f1ed"]}
      start={{x:1,y:0}}
      end={{x:0,y:1}}
      style={{height: windowHeight * 0.9,
      
   
      }}>
        {/* <Button title="Send Preferences" onPress={sendPrefrences} /> */}
        <TouchableOpacity
        onPress={sendPrefrences}
        style={styles.save}
        >
           <Icon
              onPress={sendPrefrences}
              name="save"
              as={Ionicons}
              size={moderateScale(25)}
              color={Color.themeBgColor}
            />

            {isLoading ? <ActivityIndicator size={'small'} color={Color.themeColor} /> : <CustomText isBold>Save</CustomText>}
        </TouchableOpacity>
       {!fromDrawer && <TouchableOpacity
        onPress={() =>{
          // navigation.pop()
        }}
        style={styles.skip}
        >
           <Icon
              onPress={sendPrefrences}
              name="skip"
              as={Octicons}
              size={moderateScale(25)}
              color={Color.themeBgColor}
            />
            <CustomText>Skip</CustomText>
        </TouchableOpacity>}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentStyle}>
          <View style={styles.sectionItems}>
            {types?.map((item, index) => {
              return (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      if (
                        // userPreferences?.length == 0 ||
                        userPreferences?.some(item1 => item1?.id == item?.id)
                      ) {
                        setUserPreferences(
                          userPreferences?.filter(
                            item2 => item2?.id != item?.id,
                          ),
                        );
                      } else {
                        setUserPreferences(prev => [...prev, item]);
                        setCurrentItem(item);
                        setModalIsVisible(true);
                      }
                    }}
                    key={index}
                    style={[
                      styles.sectionInnerItem,
                      userPreferences?.some(data => data?.id == item?.id) && {
                        backgroundColor: Color.themeColor,
                        borderColor: Color.white,
                      },
                    ]}>
                    {userPreferences[
                      userPreferences?.findIndex(item3 => item3?.id == item?.id)
                    ]?.preferences?.length > 0 && (
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: windowWidth * 0.04,
                          height: windowWidth * 0.04,
                          position: 'absolute',
                          right: 0,
                          backgroundColor: 'red',
                          top: -5,
                          padding: moderateScale(2, 0.7),
                          borderRadius: moderateScale(8, 0.9),
                        }}>
                        <CustomText
                          isBold
                          style={{
                            color: 'white',
                            fontSize: moderateScale(8, 0.9),
                            textAlign: 'center',
                          }}>
                          {
                            userPreferences[
                              userPreferences?.findIndex(
                                item3 => item3?.id == item?.id,
                              )
                            ]?.preferences?.length
                          }
                        </CustomText>
                      </View>
                    )}

                    <Icon
                      as={item.as}
                      name={item.icon}
                      size={moderateScale(14, 0.1)}
                      color={
                        userPreferences?.some(data => data?.id == item?.id)
                          ? Color.white
                          : Color.themeColor
                      }
                    />

                    <CustomText
                      style={{
                        color: userPreferences?.some(
                          data => data?.id == item?.id,
                        )
                          ? Color.white
                          : Color.themeColor,
                        fontSize: moderateScale(12, 0.1),
                      }}>
                      {item.label}
                    </CustomText>
                  </TouchableOpacity>
                </>
              );
            })}
          </View>
        </ScrollView>
        {modalIsVisible && (
          <PreferenceModal
            modalIsVisible={modalIsVisible}
            search={search}
            setSearch={setSearch}
            setModalIsVisible={setModalIsVisible}
            selectedType={currentItem}
            setUserPreferences={setUserPreferences}
            userPreferences={userPreferences}
          />
        )}
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default Filters;

const styles = StyleSheet.create({
  categories: {
    justifyContent: 'space-between',
    height: windowHeight * 0.05,
    paddingTop: moderateScale(7, 0.5),
  },
  contentStyle: {
    paddingBottom: moderateScale(40, 0.6),
  },
  // scrollView :  {
  //   height : windowHeight * 0.6,
  // },
 save:{
    width: windowWidth * 0.22,
    height: windowHeight * 0.05,
    gap:6,
    borderRadius: moderateScale(30, 0.3),
    backgroundColor: Color.white,
    alignItems: 'center',
    flexDirection:'row',
    justifyContent: 'center',
    elevation: 5,
    position: 'absolute',
    bottom: 70,
    right: 30,

    // right: 10,
    zIndex:1
  },
  actions:{

  },
 skip:{
    width: windowWidth * 0.22,
    height: windowHeight * 0.05,
    gap:6,
    borderRadius: moderateScale(30, 0.3),
    backgroundColor: Color.white,
    alignItems: 'center',
    flexDirection:'row',
    justifyContent: 'center',
    elevation: 5,
    position: 'absolute',
    bottom: 20,
    right: 30,

    // right: 10,
    zIndex:1
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
    top: 60,

    right: 10,
    zIndex:1
  },

  sectionItems: {
    // justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: moderateScale(10, 0.6),
    gap: moderateScale(10, 0.6),
  },
  sectionInnerItem: {
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 7,
    margin: moderateScale(4, 0.2),
    padding: moderateScale(6, 0.5),
    borderWidth: 0.5,
    borderColor: Color.black,
    borderRadius: moderateScale(25, 0.2),

    paddingHorizontal: 12,
  },
});
