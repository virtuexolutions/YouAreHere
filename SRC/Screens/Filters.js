import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import CustomText from '../Components/CustomText';
import Modal from 'react-native-modal';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import { color } from 'native-base/lib/typescript/theme/styled-system';
import CustomImage from '../Components/CustomImage';
import PreferenceModal from '../Components/PreferenceModal';
const Filters = () => {


    const [modalIsVisible, setModalIsVisible]=useState(false);
    const [search, setSearch] = useState('');
    
    

    const [counter , setCounter] = useState({
      id:'',
      prefTitle:'',
      numOfItems:0
    });
    const [currentType, setCurrentType] = useState({
      name:'',
      id:''
    })
    const[selectModalItem, setSelectModalItem] =  useState([]);
    // const [prefState, setPrefState] =useState({
    //   name:'',
    //   selected: false
    // });

    function selectTypesHandler(name, id){
        setCurrentType({
          name: name,
          id:id
        });
  
console.log(name,id)

    }
 
 
console.log("Modal Selected Items ==> ", JSON.stringify(selectModalItem, null, 2));
 

const renderBadge = (prefId) => {
  const preferenceItems = selectModalItem.filter(item => item.id === prefId);
  const numOfItems = preferenceItems.length;
  if (numOfItems > 0) {
    return (
      <View style={{
        alignItems:'center',
        justifyContent:'center',
        width:windowWidth * 0.04,
        height: windowWidth * 0.04,
        position:'absolute', 
        
        left:130, backgroundColor:'red', top:-5, padding:moderateScale(2,0.7), borderRadius:moderateScale(8,0.9)}}>
        <CustomText style={{color:'white', fontSize:moderateScale(7,0.9),textAlign:'center'}}>{numOfItems}</CustomText>
    </View>
    );
  }
  return null;
};

function ModalSearchHandler(){}

const DATA=[
    { id:'d1', ímage:"https://www.travelandleisure.com/thmb/6LKBcNi2iFSiBdTpp_4xTqHenfg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-banff-national-park-BEAUTYCANADA0623-fc3b0496f842412f9a8299f8ffd18499.jpg", name:'abc', },
    { id:'d2', ímage:'https://www.travelandleisure.com/thmb/6LKBcNi2iFSiBdTpp_4xTqHenfg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-banff-national-park-BEAUTYCANADA0623-fc3b0496f842412f9a8299f8ffd18499.jpg', name:'abc', },
    { id:'d3', ímage:'https://www.travelandleisure.com/thmb/6LKBcNi2iFSiBdTpp_4xTqHenfg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-banff-national-park-BEAUTYCANADA0623-fc3b0496f842412f9a8299f8ffd18499.jpg', name:'abc', },
    { id:'d4', ímage:"https://www.travelandleisure.com/thmb/6LKBcNi2iFSiBdTpp_4xTqHenfg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-banff-national-park-BEAUTYCANADA0623-fc3b0496f842412f9a8299f8ffd18499.jpg", name:'abc', },
    { id:'d5', ímage:"https://www.travelandleisure.com/thmb/6LKBcNi2iFSiBdTpp_4xTqHenfg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-banff-national-park-BEAUTYCANADA0623-fc3b0496f842412f9a8299f8ffd18499.jpg", name:'abc', },
];
const DATA2=[
    { id:'d1', ímage:"https://www.travelandleisure.com/thmb/6LKBcNi2iFSiBdTpp_4xTqHenfg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-banff-national-park-BEAUTYCANADA0623-fc3b0496f842412f9a8299f8ffd18499.jpg", name:'abc', },
    { id:'d2', ímage:'https://www.travelandleisure.com/thmb/6LKBcNi2iFSiBdTpp_4xTqHenfg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-banff-national-park-BEAUTYCANADA0623-fc3b0496f842412f9a8299f8ffd18499.jpg', name:'abc', },
    { id:'d3', ímage:'https://www.travelandleisure.com/thmb/6LKBcNi2iFSiBdTpp_4xTqHenfg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-banff-national-park-BEAUTYCANADA0623-fc3b0496f842412f9a8299f8ffd18499.jpg', name:'abc', },
    { id:'d4', ímage:"https://www.travelandleisure.com/thmb/6LKBcNi2iFSiBdTpp_4xTqHenfg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-banff-national-park-BEAUTYCANADA0623-fc3b0496f842412f9a8299f8ffd18499.jpg", name:'abc', },
    { id:'d5', ímage:"https://www.travelandleisure.com/thmb/6LKBcNi2iFSiBdTpp_4xTqHenfg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-banff-national-park-BEAUTYCANADA0623-fc3b0496f842412f9a8299f8ffd18499.jpg", name:'abc', },
];
const DATA3=[
    { id:'d1', ímage:"https://www.travelandleisure.com/thmb/6LKBcNi2iFSiBdTpp_4xTqHenfg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-banff-national-park-BEAUTYCANADA0623-fc3b0496f842412f9a8299f8ffd18499.jpg", name:'abc', },
    { id:'d2', ímage:'https://www.travelandleisure.com/thmb/6LKBcNi2iFSiBdTpp_4xTqHenfg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-banff-national-park-BEAUTYCANADA0623-fc3b0496f842412f9a8299f8ffd18499.jpg', name:'abc', },
    { id:'d3', ímage:'https://www.travelandleisure.com/thmb/6LKBcNi2iFSiBdTpp_4xTqHenfg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-banff-national-park-BEAUTYCANADA0623-fc3b0496f842412f9a8299f8ffd18499.jpg', name:'abc', },
    { id:'d4', ímage:"https://www.travelandleisure.com/thmb/6LKBcNi2iFSiBdTpp_4xTqHenfg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-banff-national-park-BEAUTYCANADA0623-fc3b0496f842412f9a8299f8ffd18499.jpg", name:'abc', },
    { id:'d5', ímage:"https://www.travelandleisure.com/thmb/6LKBcNi2iFSiBdTpp_4xTqHenfg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-banff-national-park-BEAUTYCANADA0623-fc3b0496f842412f9a8299f8ffd18499.jpg", name:'abc', },
];



  const categories = [
    {id: 'c1', name: 'Food & Drink', isActive: false},
    {id: 'c2', name: 'Things to do', isActive: false},
    {id: 'c3', name: 'Shopping', isActive: false},
    {id: 'c4', name: 'Services', isActive: false},
  ];

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
    {id: 'sa1', name: 'Hotels', icon: 'local-hotel', as: MaterialIcons},
    {id: 'sa2', name: 'ATMs', icon: 'atm', as: MaterialIcons},
    {id: 'sa3', name: 'Beauty Supplies', icon: 'spa', as: MaterialIcons},
    {id: 'sa4', name: 'Car Rental', icon: 'car-rental', as: MaterialIcons},
    {id: 'sa5', name: 'Car Wash', icon: 'local-car-wash', as: MaterialIcons},
    {id: 'sa6', name: 'Gas', icon: 'local-gas-station', as: MaterialIcons},
    {
      id: 'sa7',
      name: 'Hospitals & Clinics',
      icon: 'local-hospital',
      as: MaterialIcons,
    },
    {id: 'sa8', name: 'Libraries', icon: 'local-library', as: MaterialIcons},
    {
      id: 'sa9',
      name: 'Mail & Shipping',
      icon: 'local-shipping',
      as: MaterialIcons,
    },
    {id: 'sa10', name: 'Parking', icon: 'local-parking', as: MaterialIcons},
    {id: 'sa11', name: 'Pharmacies', icon: 'local-pharmacy', as: MaterialIcons},
    {id: 'sa12', name: 'Dry cleaning', icon: 'dry-cleaning', as: MaterialIcons},
    {id: 'sa13', name: 'Charging Stations', icon: 'flash', as: Fontisto},
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
    {id: 't9', name: 'Libraries', icon: 'local-library', as: MaterialIcons},
    // { id: 't10', name: "Parking", icon: "local-parking",  as: MaterialIcons },
  ];
  
  const categoryDetails = [
    {id:'cat1', title: 'Food & Drink', data: foodDrinkArray},
    {id:'cat2',title: 'Things to do', data: thingsToDoArray},
    {id:'cat3',title: 'Shopping', data: shoppingArray},
    {id:'cat4',title: 'Services', data: servicesArray},
  ];

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
        titleSize={moderateScale(18,0.9)}
      />
      {/* <View style={styles.categories}>
        <FlatList
          horizontal={true}
          data={categories}
          keyExtractor={item => item.id}
          renderItem={function ({item}) {
            return (
              <View style={styles.category}>
                {/* <Icon as={item.} name={data.icon} size={moderateScale(14,  0.1)} color={Color.Darkblue}/> 
                
                <CustomText
                  style={{
                      color: Color.Darkblue,
                    fontSize: moderateScale(12, 0.1),
                  }}>
                  {item.name}
                </CustomText>
              </View>
            );
          }}
        />
      </View> 
                */}

      <View style={{height: windowHeight * 0.85}}>
        <FlatList
          data={categoryDetails}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <View style={styles.section}>
                <CustomText style={{paddingHorizontal: 12}}>
                  {item.title}
                </CustomText>
                <View style={styles.sectionItems}>
                  {item.data.map((catData, index) => {
                    // console.log(catData, index)
                  
                    return (
                        <>
                        <TouchableOpacity
                        onPress={
                            () =>{
                                setModalIsVisible(true)
                                selectTypesHandler(catData.name, catData.id)
                                
                            }
                        }
                        key={index} style={[styles.sectionInnerItem,]}
                        >
                          {renderBadge(catData.id)}
                   
                      
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
listData={DATA}
modalIsVisible={modalIsVisible}
onSearch={ModalSearchHandler}
search={search}
setSearch={setSearch}
setModalIsVisible={setModalIsVisible}
setCounter={setCounter}
setSelectModalItem={setSelectModalItem}
currentType={currentType}



/>
      {/* <Modal
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
                    {currentPreference.name}
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
                  placeholder={'Search Your Place...'}
                  setText={setSearch}
                paddingHorizontal={moderateScale(18,0.9)}
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
                data={DATA}
                keyExtractor={item => item.id}
                renderItem={({item})=>{
                    return (
                        <TouchableOpacity
                        style={styles.listComponent}
                        onPress={() =>{
                          
                          
                          setSelectModalItem((prevItems)=> [...prevItems, {id:item.id, preference:currentPreference,title: item.name}])


                          setCounter(prevCounter => ({
                            ...prevCounter,
                            numOfItems:0
                          }));

                          console.log(counter);
                          console.log(selectModalItem);
                        }}
                        >
                            <View
                            style={{width:windowWidth * 0.11, height: windowWidth * 0.11,
                                borderRadius:(windowWidth * 0.11) / 2,
                            overflow:'hidden'}}
                            >
                            <CustomImage
                            style={{width:'100%', height:"100%"}}
                            source={{uri:item.ímage}}
                            resizeMode={"cover"}
                            />
                            </View>
                            <View>
                            <CustomText>
                                {item.name}
                            </CustomText>
                            </View>
                        </TouchableOpacity>
                    );
                }}
                />
            </View>

        </View>

      </Modal> */}
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
  

//   category: {
//     paddingHorizontal: moderateScale(12, 0.9),
//     marginHorizontal: moderateScale(12, 0.5),
//   },
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
    // overflow: 'hidden',
    paddingHorizontal: 12,
  },
  
});
