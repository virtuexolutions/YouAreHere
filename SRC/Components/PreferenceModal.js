import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import CustomText from './CustomText';
import {moderateScale} from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Icon} from 'native-base';
import {windowHeight, windowWidth} from '../Utillity/utils';
import TextInputWithTitle from './TextInputWithTitle';
import Color from '../Assets/Utilities/Color';
import PreferenceModalListItem from './PreferenceModalListItem';
import axios from 'axios';
import CustomImage from './CustomImage';
const PreferenceModal = ({
  modalIsVisible,
  setModalIsVisible,
  search,
  setSearch,
  onSearch,
  type,
  setTypes,
  selectedType,
}) => {
  console.log('🚀 ~ types:', JSON.stringify(type, null, 2));
  console.log('🚀 ~ selectedType:', selectedType);
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState();
  // const [item, setItem] = useState({
  //   id: '',
  //   name: '',
  //   photo: '',
  // });

  const placesDetails = async placeId => {
    const apiKey = 'AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc';
    const url = `https://maps.googleapis.com/maps/api/place/details/json?&place_id=${placeId}&key=${apiKey}`;
    try {
      const response = await axios.get(url);
      if (response != undefined) {
        setItem({
          id: response?.data?.result?.place_id,
          name: response?.data?.result?.name,
          photo: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${response?.data?.result?.photos[0]?.photo_reference}&key=${apiKey}`,
          // photo: response?.data?.result?.photos[0]?.photo_reference,
        });
          }
    } catch (err) {
      console.log('Error Occured on getting places details : ', err);
    
    }
  };

  const findNearestPlaces = async () => {
    const radius = 50000; // Search radius in meters (adjust as needed)
    const apiKey = 'AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc';
    const latitude = 24.871941;
    const longitude = 66.98806;
    const keyword = selectedType.keyword;
    console.log('🚀 ~ findNearestMcDonalds ~ keyword:', keyword);

   
    // const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${apiKey}&location=${latitude},${longitude}&radius=${radius}&keyword=chinese-resturant`;

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${search}&key=${apiKey}&keyword=${keyword}`;

    console.log('apiStart');

    try {
      setIsLoading(true);
      const response = await axios.get(url);
      if (response != undefined) {
        const filteredPredictions = response?.data?.predictions.filter(
          prediction => prediction.types.includes(keyword),
        );
        if (filteredPredictions.length > 0) {
          placesDetails(filteredPredictions[0]?.place_id);
        } else {
          ToastAndroid.show(
            'Not Found Under this category!',
            ToastAndroid.SHORT,
          );
        }
      }
    setSearch('');
    setIsLoading(false);

    } catch (error) {
      console.error("Error fetching McDonald's locations:", error);
      setIsLoading(false);
    }
  };

  function onCloseModal() {
    setModalIsVisible(false);
    // setItem({
    //   id:'',
    //   name:'',
    //   photo:''
    // })
    setSearch('');
    setItem(null);
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
            {selectedType?.name}
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
            {!isLoading && item ===null && (
              <>
                <View
                  style={{
                    width: windowWidth * 0.45,
                    height: windowWidth * 0.44,
                    marginTop: moderateScale(24, 0.2),
                    overflow: 'hidden',
                  }}>
                  <CustomImage
                    style={{width: '100%', height: '100%'}}
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
          {!isLoading && item && (
            <View style={styles.list}>
              <PreferenceModalListItem
                isSelected={type[selectedType?.parentIndex]?.categories[
                  selectedType?.childIndex
                ]?.preferences?.some((data, index) => data?.id == item?.id)}
                onToggle={() => {
                  if (
                    type[selectedType?.parentIndex]?.categories[
                      selectedType?.childIndex
                    ]?.preferences?.some((data, index) => data?.id == item?.id)
                  ) {
                    setTypes(
                      prev => [...prev],
                      type[selectedType?.parentIndex]?.categories[
                        selectedType?.childIndex
                      ]?.preferences?.splice(
                        type[selectedType?.parentIndex]?.categories[
                          selectedType?.childIndex
                        ]?.preferences?.findIndex(
                          data1 => data1?.id == item?.id,
                        ),
                        1,
                      ),
                    );
                  } else {
                    setTypes(
                      prev => [...prev],
                      type[selectedType?.parentIndex]?.categories[
                        selectedType?.childIndex
                      ]?.preferences.push(item),
                    );
                  }
                }}
                item={item}
              />
            </View>
          )}
           {isLoading && item === null && (
              <ActivityIndicator color={Color.themeColor} size={moderateScale(29, 0.8)} />
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
  //   listComponent:{
  //     flexDirection:'row',
  //     alignItems:"center",
  //     justifyContent:'space-between',
  //     gap:moderateScale(24,0.6),
  //     paddingHorizontal:moderateScale(18,0.9),
  //     marginVertical:moderateScale(7,0.9),
  //     paddingVertical:moderateScale(4,0.9),
  //     borderBottomWidth:1 /2,
  //     borderBottomColor:Color.veryLightGray

  //   },
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
