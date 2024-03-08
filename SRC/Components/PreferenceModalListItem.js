import { StyleSheet , View, TouchableOpacity} from "react-native";
import { moderateScale } from "react-native-size-matters";
import Color from "../Assets/Utilities/Color";
import { Icon } from "native-base";
import CustomImage from "./CustomImage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CustomText from "./CustomText";
import { windowWidth } from "../Utillity/utils";

function PreferenceModalListItem({isSelected, item, onToggle }){
    return(
        <TouchableOpacity
        style={[styles.listComponent,  isSelected &&  {
          opacity: 0.5,
          borderRadius:moderateScale(12,0.9),
          backgroundColor: Color.veryLightGray
        }]}
        onPress={() =>{
          onToggle(item.id,item.name)
         }}
        >
          <View style={{flexDirection:'row', alignItems:'center', gap:moderateScale(18,0.6)}}>

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
            </View>
            
            <View>
              <Icon
              name={isSelected ? 'circle' : 'circle-o'}
              as={FontAwesome}
              color={Color.themeColor}
              />
            </View>
        </TouchableOpacity>
    );
}
export default PreferenceModalListItem;

const styles = StyleSheet.create({
    listComponent:{
        flexDirection:'row',
        alignItems:"center",
        justifyContent:'space-between',
        gap:moderateScale(24,0.6),
        paddingHorizontal:moderateScale(18,0.9),
        marginVertical:moderateScale(7,0.9),
        paddingVertical:moderateScale(4,0.9),
        borderBottomWidth:1 /2,
        borderBottomColor:Color.veryLightGray
    
      },
})