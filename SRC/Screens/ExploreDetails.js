import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import ScreenBoiler from '../Components/ScreenBoiler'
import { windowHeight, windowWidth } from '../Utillity/utils'
import { moderateScale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import { Icon } from 'native-base'
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomText from '../Components/CustomText'

const ExploreDetails = () => {
    const navigation = useNavigation()
    return (
        <ScreenBoiler
            statusBarBackgroundColor={'white'}
            statusBarContentStyle={'dark-content'}
        >
            <LinearGradient
                style={{
                    width: windowWidth,
                    height: windowHeight,
                }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={Color.themeBgColor}>
                <View style={{ flexDirection: 'row', justifyContent: "flex-start", alignItems: "center", marginTop: moderateScale(15, 0.6) }}>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "flex-start", alignItems: "center", marginTop: moderateScale(15, 0.6) }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.Rounded}
                        onPress={() => {
                            console.log('Toggle drawer');
                            navigation.goBack();
                        }}>
                        <Icon
                            onPress={() => {
                                navigation.goBack()
                            }}
                            name="chevron-back"
                            as={Ionicons}
                            size={moderateScale(25, 0.6)}
                            color={Color.black}
                        />
                    </TouchableOpacity>
                    <CustomText isBold style={{
                        fontSize: moderateScale(20, 0.6),
                        textAlign: 'center',
                        width: '80%',
                    }}>Details</CustomText>
                </View>
                <View style={styles.main_view}>
                
                </View>
            </LinearGradient>
        </ScreenBoiler>
    )
}

export default ExploreDetails

const styles = StyleSheet.create({
    main_view: {
        paddingHorizontal: moderateScale(15, 0.6),
        paddingVertical: moderateScale(15, 0.6),
        width: windowWidth,
        height: windowHeight,
        marginTop: moderateScale(10, 0.6)
    }
})