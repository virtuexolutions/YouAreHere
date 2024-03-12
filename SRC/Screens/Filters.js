import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import ScreenBoiler from '../Components/ScreenBoiler';
import Header from '../Components/Header';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import {SectionList} from 'react-native';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {Badge, Icon} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
const Filters = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [selectedType, setSelectedType] = useState({
    name: '',
    parentIndex: 0,
    childIndex: 0,
  });
  const [selectModalItem, setSelectModalItem] = useState([]);

  const [types, setTypes] = useState([
    {
      id: 'cat1',
      type: 'Food & Drink',
      categories: [
        {
          id: 'f1',
          name: 'restaurant',
          icon: 'coffee-outline',
          as: MaterialCommunityIcons,
          preferences: [],
        },
        {
          id: 'f2',
          name: 'cafe',
          icon: 'coffee-outline',
          as: MaterialCommunityIcons,
          preferences: [],
        },
        {
          id: 'f3',
          name: 'Takeout',
          icon: 'food-takeout-box-outline',
          as: MaterialCommunityIcons,
          preferences: [],
        },
        {
          id: 'f4',
          name: 'Delivery',
          icon: 'delivery-dining',
          as: MaterialIcons,
          preferences: [],
        },
        {
          id:'f5',
          name:"Bar",
          icon: 'table-bar',
          as:MaterialIcons,
          preferences:[],
        },
        
      ],
    },
    {
      id: 'cat2',
      type: 'Things to do',
      categories: [
        // {id: 't1', name: 'parks', icon: 'park', as: MaterialIcons, preferences: []},
        {
          id: 't2',
          name: 'gym',
          label:"Gyms",
          icon: 'fitness-center',
          as: MaterialIcons,
          preferences: [],
        },
        {
          id:'t3',
          name:'art_gallery',
          label:'Art Gallery',
          icon:'image-frame',
          as:MaterialCommunityIcons,
          preferences:[]
        },
        {
          id: 't4',
          name: 'Attractions',
          icon: 'attractions',
          as: MaterialIcons,
          preferences: [],
        },
        {
          id:'t5',
          name:'night_club',
          label:'Night_Club',
          icon:'musical-note',
          as:Ionicons,
          preferences:[]
        },
        {
          id: 't7',
          name: 'movies',
          label:'Movies',
          icon: 'movie-outline',
          as: MaterialCommunityIcons,
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
          id:'t10',
          name:'mmusement_park',
          label:'Mmusement Park',
          icon:'ferris-wheel',
          as:MaterialCommunityIcons,
          preferences:[]
        },
       
        {
          id:'t12',
          name:'aquarium',
          icon:'dolphin',
          as:MaterialCommunityIcons,
          preferences:[]
        },
        {
          id:'t12',
          name:'campground',
          label:'Campground',
          icon:'tent',
          as:Fontisto,
          preferences:[]
        },
        {
          id:'t13',
          name:'bowling_alley',
          label:'Bowling Alley',
          icon:'bowling',
          as:MaterialCommunityIcons,
          preferences:[]
        },
        {
          id:'t14',
          name:'night_club',
          label:'Night_Club',
          icon:'musical-note',
          as:Ionicons,
          preferences:[]
        },
        {
          id:'t15',
          name:'casino',
          label:'Casino',
          icon:'dice-6',
          as:MaterialCommunityIcons,
          preferences:[]
        },
        {
          id:'t16',
          name:'stadium',
          label:'Stadium',
          icon:'stadium',
          as:MaterialCommunityIcons,
          preferences:[]
        },
        {
          id:'t17',
          name:'zoo',
          label:'Zoo',
          icon:'pets',
          as:MaterialIcons,
          preferences:[]
        },
        {
          id:'t18',
          name:'movie_rental',
          label:'Movie Rental',
          icon:'local-movies',
          as:MaterialIcons,
          preferences:[]
        },
        {
          id:'t19',
          name:'movie_theater',
          label:'Movie Theater',
          icon:'theaters',
          as:MaterialIcons,
          preferences:[]
        },
      ],
    },
    {
      id: 'cat3',
      type: 'Shopping',
      categories: [
       
        {
          id: 's3',
          name: 'car_rental',
          label: 'Car Rental',
          icon: 'directions-car',
          as: MaterialIcons,
          preferences: [],
        },
        {
          id: 's4',
          name: 'home_goods_store',
          label: 'Home Goods Store',
          icon: 'home',
          as: MaterialIcons,
          preferences: [],
        },
        {
          id: 's5',
          name: 'clothing_store',
          label: 'Clothing Store',
          icon: 'shirt',
          as: Ionicons,
          preferences: [],
        },
        {
          id: 's6',
          name: 'shopping_mall',
          label: 'Shopping Mall',
          icon: 'local-mall',
          as: MaterialIcons,
          preferences: [],
        },
        {
          id: 's7',
          name: 'electronics',
          label: 'Electronics',
          icon: 'devices',
          as: MaterialIcons,
          preferences: [],
        },
        {
          id: 's8',
          name: 'sporting_goods',
          label: 'Sporting Goods',
          icon: 'football',
          as: Ionicons,
          preferences: [],
        },
        {
          id: 's9',
          name: 'convenience_store',
          label: 'Convenience Store',
          icon: 'local-convenience-store',
          as: MaterialIcons,
          preferences: [],
        },
        {
          id: 's10',
          name: 'liquor_store',
          label: 'Liquor Store',
          icon: 'local-bar',
          as: MaterialIcons,
          preferences: [],
        },
        {
          id: 's11',
          name: 'shoe_store',
          label: 'Shoe Store',
          icon: 'shoe-sneaker',
          as: MaterialCommunityIcons,
          preferences: [],
        },
        
        {
          id: 's12',
          name: 'jewelry_store',
          label: 'Jewelry Store',
          icon: 'necklace',
          as: MaterialCommunityIcons,
          preferences: [],
        },
        {
          id: 's13',
          name: 'supermarket',
          label: 'SuperMarket',
          icon: 'local-convenience-store',
          as: MaterialIcons,
          preferences: [],
        },
        {
          id: 's14',
          name: 'furniture_store',
          label: 'Furniture Store',
          icon: 'weekend',
          as: MaterialIcons,
          preferences: [],
        },{
          id: 's15',
          name: 'hardware_store',
          label: 'Hardware Store',
          icon: 'hardware-chip',
          as: Ionicons,
          preferences: [],
        },
        {
          id: 's16',
          name: 'bicycle_store',
          label: 'Bicycle Store',
          icon: 'directions-bike',
          as: MaterialIcons,
          preferences: [],
        },
        {
          id: 's17',
          name: 'book_store',
          label: 'Book Store',
          icon: 'menu-book',
          as: MaterialIcons,
          preferences: [],
        },
        {
          id: 's18',
          name: 'department_store',
          label: 'Department Store',
          icon: 'store',
          as: MaterialIcons,
          preferences: [],
        },
      ],
    },
    {
      id: 'cat4',
      type: 'Services',
      categories: [
        {
          id: 'sa1',
          name: 'accounting',
          label: 'Accounting',
          icon: 'local-hotel',
          as: MaterialIcons,
          preferences: [],
        },
        {id: 'sa2', 
        name: 'atm', 
        name: 'ATM', 
        icon: 'atm', as: MaterialIcons, preferences: []},
        {
          id: 'sa3',
          name:'spa',
          label: 'Beauty Supplies',
          icon: 'spa',
          as: MaterialIcons,
          preferences: [],
        },
        {
          id: 'sa4',
          name: 'Car Rental',
          label: 'car_tental',
          icon: 'car-rental',
          as: MaterialIcons,
          preferences: [],
        },
        {
          id: 'sa5',
          name: 'Car Wash',
          label: 'car_wash',
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
          name: 'Libraries',
          icon: 'local-library',
          as: MaterialIcons,
          preferences: [],
        },
        {
          id: 'sa9',
          name: 'Mail & Shipping',
          icon: 'local-shipping',
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
          label:'Veterinary Care',
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
          id: 'sa29',
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
          icon: 'temple-hindu',
          as: MaterialIcons,
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
      ],
    },
  ]);

 
  function ModalSearchHandler() {}

  return (
    <ScreenBoiler
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}>
      <Header
        headerColor={[Color.themeColor, Color.themeColor]}
        title={'Preferences'}
        titleColor={Color.white}
        titleWeight={'bold'}
        showBack={false}
        hideUser={true}
        titleSize={moderateScale(18, 0.9)}
      />

      <View style={{height: windowHeight * 0.85}}>
        <FlatList
          data={types}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            // console.log('🚀 ~ item========================>:', item);
            return (
              <View style={styles.section}>
                <CustomText style={{paddingHorizontal: 12}}>
                  {item.type}
                </CustomText>
                <View style={styles.sectionItems}>
                  {item?.categories?.map((catData, index1) => {
                    // console.log(catData, index)

                    return (
                      <>
                        <TouchableOpacity
                          onPress={() => {
                            setModalIsVisible(true);
                            setSelectedType({
                              name: catData?.name,
                              parentIndex: index,
                              childIndex: index1,
                            });
                          }}
                          key={index1}
                          style={[styles.sectionInnerItem]}>
                          <View
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: windowWidth * 0.04,
                              height: windowWidth * 0.04,
                              position: 'absolute',
                              right : 0,
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
                              {catData?.preferences?.length}
                            </CustomText>
                          </View>

                          <Icon
                            as={catData.as}
                            name={catData.icon}
                            size={moderateScale(14, 0.1)}
                            color={Color.Darkblue}
                          />
                          <CustomText
                            style={{
                              color: Color.Darkblue,
                              fontSize: moderateScale(12, 0.1),
                            }}>
                            {catData.name}
                          </CustomText>
                        </TouchableOpacity>
                      </>
                    );
                  })}
                </View>
              </View>
            );
          }}
        />
      </View>
      <PreferenceModal
        selectedPreferences={selectedPreferences}
        setSelectedPreferences={setSelectedPreferences}
        modalIsVisible={modalIsVisible}
        onSearch={ModalSearchHandler}
        search={search}
        setSearch={setSearch}
        setModalIsVisible={setModalIsVisible}
        setTypes={setTypes}
        type={types}
        selectedType={selectedType}
      />
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

  section: {width: windowWidth, marginTop: moderateScale(11, 0.5)},
  sectionItems: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: moderateScale(33, 0.6),
  },
  sectionInnerItem: {
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 4,
    margin: moderateScale(4, 0.2),
    padding: moderateScale(6, 0.5),
    borderWidth: 0.5,
    borderColor: Color.black,
    borderRadius: moderateScale(25, 0.2),

    paddingHorizontal: 12,
  },
});
