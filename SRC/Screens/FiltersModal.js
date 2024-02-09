import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenBoiler from '../Components/ScreenBoiler';
import Header from '../Components/Header';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import {SectionList} from 'react-native';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {Icon} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import CustomText from '../Components/CustomText';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../Components/CustomButton';

const FiltersModal = ({
  isVisibleModal,
  setIsVisibleModal,
  preferences,
  setPreferences,
}) => {
  const [categories, setcategories] = useState(
   [],
  );
  console.log('🚀 ~ categories:', categories);

  const foodDrinkArray = [
    {id: 'f1', name: 'Restaurants', icon: 'restaurant', as: MaterialIcons},
    {
      id: 'f2',
      name: 'Coffee',
      icon: 'coffee-outline',
      as: MaterialCommunityIcons,
    },
    {
      id: 'f3',
      name: 'Takeout',
      icon: 'food-takeout-box-outline',
      as: MaterialCommunityIcons,
    },
    {id: 'f4', name: 'Delivery', icon: 'delivery-dining', as: MaterialIcons},
  ];

  const shoppingArray = [
    {
      id: 's1',
      name: 'Groceries',
      icon: 'local-grocery-store',
      as: MaterialIcons,
    },
    {id: 's2', name: 'Beauty Supplies', icon: 'spa', as: MaterialIcons},
    {id: 's3', name: 'Car Dealers', icon: 'directions-car', as: MaterialIcons},
    {id: 's4', name: 'Home & Garden', icon: 'home', as: MaterialIcons},
    {
      id: 's5',
      name: 'Apparel',
      icon: 'tshirt-crew-outline',
      as: MaterialCommunityIcons,
    },
    {id: 's6', name: 'Shopping Centers', icon: 'local-mall', as: MaterialIcons},
    {id: 's7', name: 'Electronics', icon: 'devices', as: MaterialIcons},
    {id: 's8', name: 'Sporting Goods', icon: 'football', as: Ionicons},
    {
      id: 's9',
      name: 'Convenience Stores',
      icon: 'local-convenience-store',
      as: MaterialIcons,
    },
  ];

  const servicesArray = [
    {id: 'h1', name: 'Hotels', icon: 'local-hotel', as: MaterialIcons},
    {id: 'h2', name: 'ATMs', icon: 'atm', as: MaterialIcons},
    // {id: 's3', name: 'Beauty Supplies', icon: 'spa', as: MaterialIcons},
    {id: 'h4', name: 'Car Rental', icon: 'car-rental', as: MaterialIcons},
    {id: 'h5', name: 'Car Wash', icon: 'local-car-wash', as: MaterialIcons},
    {id: 'h6', name: 'Gas', icon: 'local-gas-station', as: MaterialIcons},
    {
      id: 'h7',
      name: 'Hospitals & Clinics',
      icon: 'local-hospital',
      as: MaterialIcons,
    },
    {id: 'h8', name: 'Libraries', icon: 'local-library', as: MaterialIcons},
    {
      id: 'h9',
      name: 'Mail & Shipping',
      icon: 'local-shipping',
      as: MaterialIcons,
    },
    {id: 'h20', name: 'Parking', icon: 'local-parking', as: MaterialIcons},
    {id: 'h10', name: 'Pharmacies', icon: 'local-pharmacy', as: MaterialIcons},
    {id: 'h11', name: 'Dry cleaning', icon: 'dry-cleaning', as: MaterialIcons},
    {id: 'h12', name: 'Charging Stations', icon: 'flash', as: Fontisto},
  ];

  const thingsToDoArray = [
    {id: 't1', name: 'Parks', icon: 'park', as: MaterialIcons},
    {id: 't2', name: 'Gyms', icon: 'fitness-center', as: MaterialIcons},
    {
      id: 't3',
      name: 'Art',
      icon: 'palette-outline',
      as: MaterialCommunityIcons,
    },
    {id: 't4', name: 'Attractions', icon: 'attractions', as: MaterialIcons},
    {id: 't5', name: 'Nightlife', icon: 'nightlife', as: MaterialIcons},
    {id: 't6', name: 'Live Music', icon: 'music-note', as: MaterialIcons},
    {
      id: 't7',
      name: 'Movies',
      icon: 'movie-outline',
      as: MaterialCommunityIcons,
    },
    {id: 't8', name: 'Museums', icon: 'museum', as: MaterialIcons},
  ];

  const categoryDetails = [
    {title: 'Food & Drink', data: foodDrinkArray},
    {title: 'Things to do', data: thingsToDoArray},
    {title: 'Shopping', data: shoppingArray},
    {title: 'Services', data: servicesArray},
  ];

  useEffect(() => {
    if(preferences?.length > 0 && isVisibleModal == true){
      console.log('hererer')
      setcategories(preferences)
    }
  }, [isVisibleModal])
  

  return (
    <Modal
      isVisible={isVisibleModal}
      // hasBackdrop={false}
      // onBackdropPress={}
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={[{
            backgroundColor: 'white',
            // borderRadius: moderateScale(20, 0.6),
            height: windowHeight,
            width: windowWidth,

          },Platform.OS == 'ios' && {paddingTop : 50}]}>
          <View style={styles.header}>
            <Icon
              onPress={() => {
                setIsVisibleModal(false);
              }}
              name={'arrowleft'}
              as={AntDesign}
              color={Color.black}
              size={21}
            />
            <CustomText isBold style={styles.text1}>
              More Categories
            </CustomText>
          </View>

          <FlatList
            data={categoryDetails}
            keyExtractor={item => item.title}
            contentContainerStyle={{
              paddingBottom: moderateScale(100, 0.6),
            }}
            renderItem={({item}) => {
              return (
                <View style={styles.section}>
                  <CustomText
                    isBold
                    style={{
                      paddingHorizontal: moderateScale(10, 0.6),
                      fontSize: moderateScale(15, 0.6),
                    }}>
                    {item.title}
                  </CustomText>
                  <View style={styles.sectionItems}>
                    {item?.data?.map((catData, index) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            if (
                              categories?.some(
                                (item1, index) => item1?.id == catData?.id,
                              )
                            ) {
                              console.log('fdsfse');

                              setcategories(
                                categories?.filter(
                                  (item3, index) => item3?.id != catData?.id,
                                ),
                              );
                            } else {
                              setcategories(prev => [...prev, catData]);
                              console.log('hey selected item here');
                            }
                          }}
                          key={index}
                          style={[
                            styles.sectionInnerItem,
                            {
                              backgroundColor: categories?.some(
                                (item2, index) => item2?.id == catData?.id,
                              )
                                ? Color.themeColor
                                : Color.white,
                            },
                          ]}>
                          <Icon
                            as={catData.as}
                            name={catData.icon}
                            size={moderateScale(14, 0.1)}
                            color={
                              categories?.some(
                                (item1, index) => item1?.id == catData?.id,
                              )
                                ? Color.white
                                : Color.themeColor
                            }
                          />
                          <CustomText
                            isBold
                            style={{
                              color: categories?.some(
                                (item1, index) => item1?.id == catData?.id,
                              )
                                ? Color.white
                                : Color.themeColor,
                              paddingHorizontal: moderateScale(3, 0.6),
                              fontSize: moderateScale(12, 0.1),
                            }}>
                            {catData.name}
                          </CustomText>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              );
            }}
          />
          {categories?.length > 0 && (
            <View
              style={{
                position: 'absolute',
                bottom: moderateScale(40, 0.6),
                alignSelf: 'center',
              }}>
              <CustomButton
                onPress={() => {
                  setIsVisibleModal(false);
                  setPreferences(categories);
                }}
                text={'Apply Filters'}
                textColor={Color.white}
                height={windowHeight * 0.06}
                width={windowWidth * 0.4}
                bgColor={Color.themeColor}
                paddingHorizontal={moderateScale(14, 0.6)}
                fontSize={moderateScale(12, 0.6)}
                borderRadius={moderateScale(15, 0.6)}
                isBold
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default FiltersModal;

const styles = StyleSheet.create({
  categories: {
    justifyContent: 'space-between',
    paddingTop: moderateScale(7, 0.5),
  },
  category: {
    padding: moderateScale(5, 0.6),
    borderRadius: moderateScale(15, 0.6),
    marginHorizontal: moderateScale(8, 0.5),
  },
  section: {
    width: windowWidth * 0.9,
    marginTop: moderateScale(11, 0.5),
  },
  sectionItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: moderateScale(10, 0.6),
  },
  text1: {
    width: windowWidth * 0.62,
    color: Color.black,
    fontSize: moderateScale(15, 0.6),
  },
  header: {
    // backgroundColor:'red',0
    flexDirection: 'row',
    height: windowHeight * 0.08,
    paddingTop: moderateScale(10, 0.6),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20, 0.6),
  },
  sectionInnerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: moderateScale(4, 0.2),
    padding: moderateScale(5, 0.5),
    // borderWidth: 0.5,
    // borderColor: Color.black,
    borderRadius: moderateScale(25, 0.2),
    overflow: 'hidden',
    paddingHorizontal: 12,
    backgroundColor: Color.lightGrey,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
});
