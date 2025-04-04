import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenBoiler from '../Components/ScreenBoiler'
import LinearGradient from 'react-native-linear-gradient'
import { windowHeight, windowWidth } from '../Utillity/utils'
import { moderateScale } from 'react-native-size-matters'
import Color from '../Assets/Utilities/Color'
import { TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomText from '../Components/CustomText'
import { Get } from '../Axios/AxiosInterceptorFunction'
import { useSelector } from 'react-redux'
import NearPlacesCard from '../Components/NearPlacesCard'
import { useNavigation } from '@react-navigation/native'

const TripDetailsLocation = props => {
    const { id } = props?.route?.params
    const navigation = useNavigation()
    console.log("🚀 ~ id:", id)
    const [playListDataLoading, setplayListDataLoading] = useState(false);
    const [playListData, setplayListData] = useState([]);
    console.log("🚀 ~ playListData:", playListData)
    const token = useSelector(state => state.authReducer.token);

    useEffect(() => {
        getPlayListData()
    }, [id])


    const getPlayListData = async () => {
        console.log("🚀 ~ getPlayListData ~ id:", id)
        const url = `auth/playlists_detail/${id}`
        setplayListDataLoading(true)
        const response = await Get(url, token)
        setplayListDataLoading(false)
        console.log("responseeeeeeeeeeeeeeeeeeeeeeee", response?.data)
        if (response?.data != undefined) {
            setplayListDataLoading(false)
            setplayListData(response?.data?.data)
        }
    }

    return (
        <ScreenBoiler
            statusBarBackgroundColor={'#ffffff'}
            statusBarContentStyle={'dark-content'}>
            <LinearGradient
                style={{
                    width: windowWidth,
                    height: windowHeight,
                }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={Color.themeBgColor}>
                <View
                    style={{
                        width: windowWidth,
                        height: windowHeight * 0.07,
                        alignItems: 'center',
                        paddingVertical: moderateScale(10, 0.6),
                    }}>
                    <CustomText
                        style={{ fontSize: moderateScale(18, 0.6), color: Color.black }}
                        isBold>
                        Trips
                    </CustomText>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.Rounded}
                        onPress={() => {
                            navigation.toggleDrawer();
                        }}>
                        <Icon
                            onPress={() => {
                                navigation.toggleDrawer();
                            }}
                            name="menu"
                            as={Ionicons}
                            size={moderateScale(25)}
                            color={Color.black}
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    {playListDataLoading ? (
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <ActivityIndicator size={'large'} color={Color.themeColor} />
                        </View>
                    ) : (
                        <>
                            {playListData.map((item) => {
                                console.log("🚀 ~ {playListData.map ~ item:", item)
                                return (
                                    <FlatList
                                        data={item?.detail}
                                        keyExtractor={(item, index) => index.toString()}
                                        ListEmptyComponent={<CustomText style={{
                                            fontSize: moderateScale(15, 0.6),
                                            color: Color.red,
                                            textAlign: "center"
                                        }}>No Data Found</CustomText>}
                                        renderItem={({ item }) => (
                                            <NearPlacesCard
                                                isshownSave={false}
                                                item={item}
                                                style={styles.card}
                                                fromHome={true}
                                                onPressSave={() => saveCard(item)}
                                            />
                                        )}
                                    />
                                )
                            })}
                        </>
                    )}
                </View>
            </LinearGradient>
        </ScreenBoiler>
    )
}

export default TripDetailsLocation

const styles = StyleSheet.create({
    Rounded: {
        width: windowWidth * 0.09,
        height: windowWidth * 0.09,
        borderRadius: (windowWidth * 0.09) / 2,
        backgroundColor: Color.white,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        position: 'absolute',
        top: 10,
        right: 10,
    },
    card: {
        height: windowHeight * 0.10,
    }
})