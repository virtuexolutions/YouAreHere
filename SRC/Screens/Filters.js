import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenBoiler from '../Components/ScreenBoiler'
import Header from '../Components/Header'
import Color from '../Assets/Utilities/Color'
import { moderateScale } from 'react-native-size-matters'
import { SectionList } from 'react-native'
import { windowHeight, windowWidth } from '../Utillity/utils';
import {Icon} from 'native-base';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import CustomText from '../Components/CustomText';


const Filters = () => {
const categories=[
    { id:"c1", name: "Food & Drink", isActive:false },
    { id:"c2", name: "Things to do", isActive:false },
    { id:"c3", name: "Shopping", isActive:false },
    { id:"c4", name: "Services", isActive:false },
];

const foodDrinkArray = [
    { id: 'f1', name: "Restaurants", icon: "restaurant", as: MaterialIcons },
    { id: 'f2', name: "Coffee", icon: "coffee-outline", as: MaterialCommunityIcons },
    { id: 'f3', name: "Takeout", icon: "food-takeout-box-outline", as: MaterialCommunityIcons },
    { id: 'f4', name: "Delivery", icon: "delivery-dining", as: MaterialIcons },
];

const shoppingArray = [
    { id: 's1', name: "Groceries", icon: "local-grocery-store", as: MaterialIcons },
    { id: 's2', name: "Beauty Supplies", icon: "spa", as: MaterialIcons },
    { id: 's3', name: "Car Dealers", icon: "directions-car", as: MaterialIcons },
    { id: 's4', name: "Home & Garden", icon: "home", as: MaterialIcons },
    { id: 's5', name: "Apparel", icon: "tshirt-crew-outline", as: MaterialCommunityIcons },
    { id: 's6', name: "Shopping Centers", icon: "local-mall", as: MaterialIcons },
    { id: 's7', name: "Electronics", icon: "devices", as: MaterialIcons },
    { id: 's8', name: "Sporting Goods", icon: "football", as: Ionicons },
    { id: 's9', name: "Convenience Stores", icon: "local-convenience-store", as: MaterialIcons },
];

const servicesArray = [
    { id: 's1', name: "Hotels", icon: "local-hotel", as: MaterialIcons },
    { id: 's2', name: "ATMs", icon: "atm", as: MaterialIcons },
    { id: 's3', name: "Beauty Supplies", icon: "spa", as: MaterialIcons },
    { id: 's4', name: "Car Rental", icon: "car-rental", as: MaterialIcons },
    { id: 's5', name: "Car Wash", icon: "local-car-wash", as: MaterialIcons },
    { id: 's6', name: "Gas", icon: "local-gas-station", as: MaterialIcons },
    { id: 's7', name: "Hospitals & Clinics", icon: "local-hospital", as: MaterialIcons },
    { id: 's8', name: "Libraries", icon: "local-library", as: MaterialIcons },
    { id: 's9', name: "Mail & Shipping", icon: "local-shipping", as: MaterialIcons },
    { id: 's10', name: "Parking", icon: "local-parking", as: MaterialIcons },
    { id: 's10', name: "Pharmacies", icon: "local-pharmacy", as: MaterialIcons },
    { id: 's10', name: "Dry cleaning", icon: "dry-cleaning", as: MaterialIcons },
    { id: 's10', name: "Charging Stations", icon: "flash", as: Fontisto },
];

const thingsToDoArray = [
    { id: 't1', name: "Parks", icon: "park", as: MaterialIcons },
    { id: 't2', name: "Gyms", icon: "fitness-center",  as: MaterialIcons },
    { id: 't3', name: "Art", icon: "palette-outline",  as: MaterialCommunityIcons },
    { id: 't4', name: "Attractions", icon: "attractions",  as: MaterialIcons },
    { id: 't5', name: "Nightlife", icon: "nightlife",  as: MaterialIcons },
    { id: 't6', name: "Live Music", icon: "music-note",  as: MaterialIcons },
    { id: 't7', name: "Movies", icon: "movie-outline",  as: MaterialCommunityIcons },
    { id: 't8', name: "Museums", icon: "museum",  as: MaterialIcons },
    { id: 't9', name: "Libraries", icon: "local-library",  as: MaterialIcons },
    // { id: 't10', name: "Parking", icon: "local-parking",  as: MaterialIcons },
];
// const foodDrinkArray=[
//     {id:'f1', name:"Restaurants",icon:""},
//     {id:'f2', name:"Coffee",icon:""},
//     {id:'f3', name:"Takeout",icon:""},
//     {id:'f4', name:"Delievry",icon:""},
// ];

// // console.log(thingsToDoArray[0]);
// const shoppingArray=[
//     {id:'s1', name:"Groceries",icon:""},
//     {id:'s2', name:"Beauty Supplies",icon:""},
//     {id:'s3', name:"Car Dealers",icon:""},
//     {id:'s4', name:"Home & garder",icon:""},
//     {id:'s5', name:"Apparel",icon:""},
//     {id:'s6', name:"Shopping Centers",icon:""},
//     {id:'s7', name:"Electronics",icon:""},
//     {id:'s8', name:"Sporting goods",icon:""},
//     {id:'s9', name:"Convenience Stores",icon:""},
// ];
// const servicesArray=[
//     {id:'s1', name:"Hotels",icon:""},
//     {id:'s2', name:"ATMs",icon:""},
//     {id:'s3', name:"Beauty Salons",icon:""},
//     {id:'s4', name:"Car Rental",icon:""},
//     {id:'s5', name:"Car Wash",icon:""},
//     {id:'s6', name:"Gas",icon:""},
//     {id:'s7', name:"Hospitals & Clinics",icon:""},
//     {id:'s8', name:"Libraries",icon:""},
//     {id:'s9', name:"Mail & Shipping",icon:""},
//     {id:'s10', name:"Parking",icon:""}
// ];
// const thingsToDoArray=[
//     {id:'t1', name:"Parks",icon:""},
//     {id:'t2', name:"Gyms",icon:""},
//     {id:'t33', name:"Art",icon:""},
//     {id:'t4', name:"Attractive",icon:""},
//     {id:'t5', name:"Nightlife",icon:""},
//     {id:'t6', name:"Live Music",icon:""},
//     {id:'t7', name:"Movies",icon:""},
//     {id:'t8', name:"Museums",icon:""},
//     {id:'t9', name:"Libraries",icon:""},
//     {id:'t10', name:"Parking",icon:""}
// ];
const categoryDetails=[ 
    {title:"Food & Drink", data:foodDrinkArray},
    {title:"Things to do", data:thingsToDoArray},
    {title:"Shopping", data:shoppingArray},
    {title:"Services", data:servicesArray},

];

  return (
   <ScreenBoiler>
    <Header
    headerColor={[Color.white, Color.white]}
    title={"More Categories"}
    b
    showBack={true}
    hideUser={true}
    />
    <View
    style={styles.categories}>

    <FlatList
    horizontal={true}
    data={categories}
    keyExtractor={item => item.id}
    renderItem={function({item})
    {
        return (    
            <View style={styles.category}>
            {/* <Icon as={item.} name={data.icon} size={moderateScale(14,  0.1)} color={Color.Darkblue}/> */}
            <CustomText style={{color:Color.Darkblue, fontSize: moderateScale(12,  0.1)}}>{item.name}</CustomText>
            </View>)}
}
/>
</View>
<View style={{height:windowHeight * 0.85}}>
 <FlatList
 data={categoryDetails}
 keyExtractor={item => item.title}
 renderItem={({item})=> {
    return(
        <View style={styles.section}>
            <CustomText style={{paddingHorizontal:12}}>{item.title}</CustomText>
            <View style={styles.sectionItems}>
            {item.data.map((catData, index )=>{
                // console.log(data)
                return(
                    <View key={index} style={styles.sectionInnerItem}>
                        <Icon as={catData.as} name={catData.icon} size={moderateScale(14,  0.1)} color={Color.Darkblue}/>
                        <CustomText style={{color:Color.Darkblue, fontSize: moderateScale(12,  0.1)}}>{catData.name}</CustomText>
                        </View>
                );
            } )}

            </View>
        </View>
    )
 }}
 />
 </View>
   </ScreenBoiler>
  )
}

export default Filters

const styles = StyleSheet.create({
  categories:{
    justifyContent:'space-between',
    height:windowHeight * 0.05,
    paddingTop:moderateScale(7,0.5)
  },
    category:{
   

    paddingHorizontal:moderateScale(12,0.9),
    marginHorizontal: moderateScale(12,0.5)
    },
    section:{width:windowWidth, marginTop:moderateScale(11,0.5)},
    sectionItems:{ justifyContent:'space-between',  alignItems:"center",flexDirection:'row', flexWrap:"wrap", paddingHorizontal: moderateScale(33, 0.6)},
    sectionInnerItem:{width:"45%",flexDirection:'row',alignItems:"center", justifyContent:"flex-start", gap:4, margin:moderateScale(4,0.2), 
    padding: moderateScale(6,0.5),
    borderWidth:0.5, borderColor: Color.black, borderRadius: moderateScale(25,0.2), overflow:'hidden', paddingHorizontal:12}
})