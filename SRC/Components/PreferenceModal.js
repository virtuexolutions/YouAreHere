import { View, TouchableOpacity, StyleSheet,  FlatList } from 'react-native'
import React, { useState } from 'react';
import Modal from 'react-native-modal';
import CustomText from './CustomText';
import { moderateScale } from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Icon } from 'native-base';
import { windowHeight, windowWidth } from '../Utillity/utils'
import TextInputWithTitle from './TextInputWithTitle';
import Color from '../Assets/Utilities/Color';
import PreferenceModalListItem from './PreferenceModalListItem';

const PreferenceModal = ({
    listData,
    modalIsVisible,
    setModalIsVisible,
    setSelectModalItem,
    search,
    setSearch,
    onSearch,
    currentType,

}) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [isSelected, setIsSelected] = useState([{
        id:'',
        status:false
    }])

    const toggleSelection = (itemId,title) => {
        // const preference =[];
    

        if (selectedItems.some(item => item.id == itemId)) {
          setSelectedItems(prevItems => prevItems.filter(item => item !== itemId));
          setSelectModalItem(prevItems => prevItems.filter(item => item.id !== itemId));
            
        } else {
          setSelectedItems(prevItems => [...prevItems, {id:itemId, title:title}]);
          setSelectModalItem(prevItems => [...prevItems, { id: currentType.id,title:currentType.name ,preference: selectedItems,  }]);
 
        }
    }
    console.log('selecteditems ==> ', selectedItems);
  return (
    <Modal
    isVisible={modalIsVisible}
      hasBackdrop={true}
    onBackdropPress={()=>{
      setModalIsVisible(false)
    }}
    >
      <View style={styles.modal}>
          <View style={styles.modalHeader}>
              <CustomText
              style={{
                  color:'white',
                  fontSize:moderateScale(29,0.8),
                  fontWeight:'bold'
              }}
              >
                  {currentType.name}
              </CustomText>

          </View>
          <View style={styles.modalSearchBar}>
              <TextInputWithTitle
              //   iconName={'search'}
              //   iconType={MaterialCommunityIcons}
              //   LeftIcon={false}
              borderColor={Color.themeColor}
              backgroundColor={Color.white}
                titleText={'search'}
                placeholder={`Search ${currentType.name}.....`}
                setText={setSearch}
              paddingHorizontal={moderateScale(18,0.3)}
                value={search}
                viewHeight={0.06}
                viewWidth={0.7}
                inputWidth={0.79}
                border={0.5}
      
                marginTop={moderateScale(50, 0.3)}
                color={Color.black}
                placeholderColor={Color.veryLightGray}
                borderRadius={moderateScale(38,0.7)}

                  style={styles.input}
              />
              <TouchableOpacity
              style={{
                  backgroundColor:Color.veryLightGray,
                  borderRadius:moderateScale(39,0.9) /2,
                  alignItems:"center",
                  justifyContent:'center',
                  width:moderateScale(39,0.3),
                  height:moderateScale(39,0.3),
                  padding:moderateScale(20,0.8),
                  marginTop:moderateScale(48,0.8)
              }}
              onPress={onSearch}
              >
                  <Icon
                  name='search'
                  as={FontAwesome}
                  color={Color.lightGrey}
                  size={moderateScale(22,0.7)}
                  />
              </TouchableOpacity>
          
          </View>

          <View style={styles.list}>
              <FlatList
              data={listData}
              keyExtractor={item => item.id}
              renderItem={({item})=>{
                  return (
                    <PreferenceModalListItem isSelected={false} onToggle={toggleSelection} item={item}/>
                     );
              }}
              />
          </View>

      </View>

    </Modal>
  )
}

export default PreferenceModal;
const styles= StyleSheet.create({
    list:{
        paddingHorizontal:moderateScale(12,0.9)
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
          modal:{
            width: windowWidth *0.9 ,
            height: windowHeight * 0.6,
            backgroundColor: Color.white,
            overflow:'hidden',
            borderRadius: moderateScale(20,0.5)
          },
          modalHeader:{
            backgroundColor:Color.themeColor,
            height:windowHeight * 0.1,
            justifyContent:'center',
            paddingHorizontal:moderateScale(19,0.8)
        
          },
          modalSearchBar:{
            marginTop: moderateScale(-40,0.9),
            paddingHorizontal:moderateScale(19,0.5),
            flexDirection:'row',
            alignItems:'center',
            gap:10,
            justifyContent:'center'
          }
})