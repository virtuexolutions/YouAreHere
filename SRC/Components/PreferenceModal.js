import {View, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
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
  console.log('🚀 ~ types:', JSON.stringify(type , null ,2));
  console.log('🚀 ~ selectedType:', selectedType);

  const listData = [
    {
      id: 'd1',
      ímage:
        'https://www.travelandleisure.com/thmb/6LKBcNi2iFSiBdTpp_4xTqHenfg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-banff-national-park-BEAUTYCANADA0623-fc3b0496f842412f9a8299f8ffd18499.jpg',
      name: 'abc',
    },
    {
      id: 'd2',
      ímage:
        'https://www.travelandleisure.com/thmb/6LKBcNi2iFSiBdTpp_4xTqHenfg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-banff-national-park-BEAUTYCANADA0623-fc3b0496f842412f9a8299f8ffd18499.jpg',
      name: 'cde',
    },
    {
      id: 'd3',
      ímage:
        'https://www.travelandleisure.com/thmb/6LKBcNi2iFSiBdTpp_4xTqHenfg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-banff-national-park-BEAUTYCANADA0623-fc3b0496f842412f9a8299f8ffd18499.jpg',
      name: 'abc',
    },
    {
      id: 'd4',
      ímage:
        'https://www.travelandleisure.com/thmb/6LKBcNi2iFSiBdTpp_4xTqHenfg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-banff-national-park-BEAUTYCANADA0623-fc3b0496f842412f9a8299f8ffd18499.jpg',
      name: 'abc',
    },
    {
      id: 'd5',
      ímage:
        'https://www.travelandleisure.com/thmb/6LKBcNi2iFSiBdTpp_4xTqHenfg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-banff-national-park-BEAUTYCANADA0623-fc3b0496f842412f9a8299f8ffd18499.jpg',
      name: 'abc',
    },
  ];

  function onCloseModal() {
    setModalIsVisible(false);
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
              fontSize: moderateScale(29, 0.8),
              fontWeight: 'bold',
            }}>
            {selectedType?.name}
          </CustomText>
        </View>
        <View style={styles.modalSearchBar}>
          <TextInputWithTitle
            borderColor={Color.themeColor}
            backgroundColor={Color.white}
            titleText={'search'}
            placeholder={`Search in ${selectedType?.name}.....`}
            setText={setSearch}
            paddingHorizontal={moderateScale(18, 0.3)}
            value={search}
            viewHeight={0.06}
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
              borderRadius: moderateScale(39, 0.9) / 2,
              alignItems: 'center',
              justifyContent: 'center',
              width: moderateScale(39, 0.3),
              height: moderateScale(39, 0.3),
              padding: moderateScale(20, 0.8),
              marginTop: moderateScale(48, 0.8),
            }}
            onPress={onSearch}>
            <Icon
              name="search"
              as={FontAwesome}
              color={Color.lightGrey}
              size={moderateScale(22, 0.7)}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.list}>
          <FlatList
            data={listData}
            keyExtractor={item => item.id}
            renderItem={({item , itemIndex}) => {
              // console.log("🚀 ~ item:", item)
              return (
                <PreferenceModalListItem
                  isSelected={type[selectedType?.parentIndex]?.categories[
                    selectedType?.childIndex
                  ]?.preferences?.some((data, index) => data?.id == item?.id)}
                  onToggle={() => {
                    if (
                      type[selectedType?.parentIndex]?.categories[
                        selectedType?.childIndex
                      ]?.preferences?.some(
                        (data, index) => data?.id == item?.id,
                      )
                    ) {
                      setTypes(
                        prev => [...prev],
                        (type[selectedType?.parentIndex]?.categories[
                          selectedType?.childIndex
                        ]?.preferences?.splice(type[selectedType?.parentIndex]?.categories[
                          selectedType?.childIndex
                        ]?.preferences?.findIndex((data1) => data1?.id == item?.id) , 1)));

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
              );
            }}
          />
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
    height: windowHeight * 0.1,
    justifyContent: 'center',
    paddingHorizontal: moderateScale(19, 0.8),
  },
  modalSearchBar: {
    marginTop: moderateScale(-40, 0.9),
    paddingHorizontal: moderateScale(19, 0.5),
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
  },
});
