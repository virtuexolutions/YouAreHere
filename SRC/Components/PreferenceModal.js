import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ToastAndroid,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import Modal from 'react-native-modal';
import CustomText from './CustomText';
import { moderateScale } from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Icon } from 'native-base';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import TextInputWithTitle from './TextInputWithTitle';
import Color from '../Assets/Utilities/Color';
import PreferenceModalListItem from './PreferenceModalListItem';
import axios from 'axios';
import CustomImage from './CustomImage';
import { setUserData } from '../Store/slices/common';
import { Post } from '../Axios/AxiosInterceptorFunction';
import { useSelector } from 'react-redux';
const PreferenceModal = ({
  modalIsVisible,
  setModalIsVisible,
  search,
  setSearch,
  selectedType,
  setUserPreferences,
  userPreferences,
}) => {
  // console.log('🚀 ~ userPreferences:', userPreferences);

  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState({});
  const [index, setIndex] = useState(
    userPreferences?.findIndex(data => data?.id == selectedType?.id),
  );
  console.log('🚀 ~ index:', index);

  const placesDetails = async placeId => {
    const apiKey = 'AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc';
    const url = `https://maps.googleapis.com/maps/api/place/details/json?&place_id=${placeId}&key=${apiKey}`;
    try {
      const response = await axios.get(url);
      if (response != undefined) {
        console.log('response ===== >', response?.data?.result?.icon);
        setItem({
          id: response?.data?.result?.place_id,
          name: search,
          photo: response?.data?.result?.icon,
        });
      }
    } catch (err) {
      console.log('Error Occured on getting places details : ', err);
    }
  };

  const findNearestPlaces = async () => {
    const apiKey = 'AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc';
    const keyword = selectedType.name;
    console.log('🚀 ~ findNearestMcDonalds ~ keyword:', keyword);

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${search}&key=${apiKey}&keyword=${keyword}`;

    // return console.log("🚀 ~ findNearestPlaces ~ url:", url)
    console.log('apiStart');

    try {
      setIsLoading(true);
      const response = await axios.get(url);
      if (response != undefined) {
        const filteredPredictions = response?.data?.predictions.filter(
          prediction => prediction.types.includes(keyword),
        );
        if (filteredPredictions.length > 0) {
          userPreferences[index]?.preferences.some(
            item => item?.id == filteredPredictions[0]?.place_id,
          )
            ? alert('Already added in your preference')
            : placesDetails(filteredPredictions[0]?.place_id);
        } else {
          Platform.OS == 'android' ?
            ToastAndroid.show(
              'No place Found,kindly enter right place or corrent your spellinig',
              ToastAndroid.SHORT,
            ) :
            alert('No place Found,kindly enter right place or corrent your spellinig')
        }
      }
      // setSearch('');
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching McDonald's locations:", error);
      setIsLoading(false);
    }
  };

  function onCloseModal() {
    setModalIsVisible(false);

    setSearch('');
    setItem({});
  }
  return (
    <Modal
      isVisible={modalIsVisible}
      hasBackdrop={true}
      onBackdropPress={onCloseModal}>
      <View style={styles.modal}>
        <View style={styles.modalHeader}>
          <CustomText
            style={{
              color: 'white',
              fontSize: moderateScale(25, 0.8),
              fontWeight: 'bold',
            }}>
            {selectedType?.label}
          </CustomText>
        </View>
        <View style={styles.modalBody}>
          <View style={styles.modalSearchBar}>
            <TextInputWithTitle
              borderColor={Color.themeColor}
              backgroundColor={Color.white}
              titleText={'search'}
              placeholder={`Search in ${selectedType?.name}.....`}
              setText={setSearch}
              paddingHorizontal={moderateScale(18, 0.3)}
              value={search}
              viewHeight={0.05}
              viewWidth={0.7}
              inputWidth={0.79}
              border={0.5}
              marginTop={moderateScale(50, 0.3)}
              color={Color.black}
              placeholderColor={Color.veryLightGray}
              borderRadius={moderateScale(38, 0.7)}
              style={styles.input}
            />
            <TouchableOpacity
              style={{
                backgroundColor: Color.veryLightGray,
                borderRadius: moderateScale(36, 0.9) / 2,
                alignItems: 'center',
                justifyContent: 'center',
                width: moderateScale(36, 0.3),
                height: moderateScale(36, 0.3),
                padding: moderateScale(20, 0.3),
                marginTop: moderateScale(48, 0.3),
              }}
              onPress={findNearestPlaces}>
              <Icon
                name="search"
                as={FontAwesome}
                color={Color.lightGrey}
                size={moderateScale(20, 0.7)}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {Object.keys(item).length == 0 &&
              userPreferences?.[index]?.preferences.length == 0 && (
                <>
                  <View
                    style={{
                      width: windowWidth * 0.45,
                      height: windowWidth * 0.44,
                      marginTop: moderateScale(24, 0.2),
                      overflow: 'hidden',
                    }}>
                    <CustomImage
                      style={{ width: '100%', height: '100%' }}
                      source={require('../Assets/Images/fallback.png')}
                    />
                  </View>
                  <CustomText
                    style={{
                      color: Color.themeColor,
                      fontSize: moderateScale(19, 0.8),
                    }}
                    isBold={true}>
                    No places
                  </CustomText>
                </>
              )}
          </View>
          <View style={styles.list}>
            {userPreferences?.[index]?.preferences.length > 0 &&
              userPreferences?.[index]?.preferences.map(
                (preferenceItem, preferenceindex) => {
                  return (
                    <PreferenceModalListItem
                      isSelected={userPreferences[index]?.preferences?.some(
                        (data, index) => data?.id == preferenceItem?.id,
                      )}
                      onToggle={() => {
                        if (
                          userPreferences[index]?.preferences?.some(
                            (data1, index) => data1?.id == preferenceItem?.id,
                          )
                        ) {
                          console.log('this runs 1');
                          setUserPreferences(
                            prev => [...prev],
                            (userPreferences[index].preferences =
                              userPreferences[index]?.preferences?.filter(
                                data1 => data1?.id != preferenceItem?.id,
                              )),
                          );
                        } else {
                          console.log('this runs 2');

                          setUserPreferences(
                            prev => [...prev],
                            userPreferences[index]?.preferences.push(
                              preferenceItem,
                            ),
                          );
                        }
                      }}
                      item={preferenceItem}
                    />
                  );
                },
              )}
            {Object.keys(item).length > 0 && (
              <PreferenceModalListItem
                isSelected={userPreferences[index]?.preferences?.some(
                  (data, index) => data?.id == item?.id,
                )}
                onToggle={() => {
                  if (
                    userPreferences[index]?.preferences?.some(
                      (data1, index) => data1?.id == item?.id,
                    )
                  ) {
                    console.log('this runs 1');
                    setUserPreferences(
                      prev => [...prev],
                      (userPreferences[index].preferences = userPreferences[
                        index
                      ]?.preferences?.filter(data1 => data1?.id != item?.id)),
                    );
                  } else {
                    console.log('this runs 2');

                    setUserPreferences(
                      prev => [...prev],
                      userPreferences[index]?.preferences.push(item),
                    );
                    setItem({});
                  }
                }}
                item={item}
              />
            )}
          </View>
          {isLoading && (
            <ActivityIndicator
              color={Color.themeColor}
              size={moderateScale(29, 0.8)}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default PreferenceModal;
const styles = StyleSheet.create({
  list: {
    paddingHorizontal: moderateScale(12, 0.9),
  },
  modalBody: {
    // alignItems:'center',
    justifyContent: 'center',
    gap: moderateScale(5, 0.2),
  },

  modal: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.6,
    backgroundColor: Color.white,

    overflow: 'hidden',
    borderRadius: moderateScale(20, 0.5),
  },
  modalHeader: {
    backgroundColor: Color.themeColor,
    height: windowHeight * 0.09,
    justifyContent: 'center',
    paddingHorizontal: moderateScale(19, 0.8),
  },
  modalSearchBar: {
    marginTop: moderateScale(-30, 0.9),
    paddingHorizontal: moderateScale(19, 0.5),
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
  },
});
