import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ScreenBoiler from '../Components/ScreenBoiler'
import LinearGradient from 'react-native-linear-gradient'
import { windowHeight, windowWidth } from '../Utillity/utils'
import Color from '../Assets/Utilities/Color'
import { Icon } from 'native-base'
import CustomText from '../Components/CustomText'
import { moderateScale } from 'react-native-size-matters'
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useNavigation } from '@react-navigation/native'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Explore = () => {
    const navigation = useNavigation();
    const tripList = [
        {
            id: 1,
            name: "New York",
            ratings: 4.5,
            image: require('../Assets/Images/8.jpeg')
        },
        {
            id: 1,
            name: "New York",
            ratings: 4.5,
            image: require('../Assets/Images/8.jpeg')
        },
        {
            id: 1,
            name: "New York",
            ratings: 4.5,
            image: require('../Assets/Images/8.jpeg')
        },
        {
            id: 1,
            name: "New York",
            ratings: 4.5,
            image: require('../Assets/Images/8.jpeg')
        },
        {
            id: 1,
            name: "New York",
            ratings: 4.5,
            image: require('../Assets/Images/8.jpeg')
        },
        {
            id: 1,
            name: "New York",
            ratings: 4.5,
            image: require('../Assets/Images/8.jpeg')
        },
    ]
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
                    }}>Explore</CustomText>
                </View>
                <View style={styles.main_View}>
                    <View style={[styles.text_view, {
                        marginTop: moderateScale(8, 0.6)
                    }]}>
                        <CustomText isBold style={styles.heading}>Beautiful old building</CustomText>
                        <View style={styles.text_view}>
                            <Icon name='star' as={AntDesign} size={moderateScale(14, 0.6)} color={Color.yellow} />
                            <CustomText style={styles.rating_text}>5.9</CustomText>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </ScreenBoiler>
    )
}

export default Explore

const styles = StyleSheet.create({
    main_View: {
        paddingHorizontal: moderateScale(15, 0.6),
        paddingVertical: moderateScale(15, 0.6),
        width: windowWidth,
        height: windowHeight
    },
    text_view: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
    },
})