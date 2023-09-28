import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StatusBar,
  ImageBackground,
  Platform,
} from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import { Icon } from "native-base";
import navigationService from "../navigationService";
import { useDispatch, useSelector } from "react-redux";
import Color from "../Assets/Utilities/Color";
import CustomText from "./CustomText";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { setUserLogout } from "../Store/slices/auth";
import { setUserLogOut } from "../Store/slices/common";
import { imageUrl } from "../Config";
// import { imageUrl } from "../Config/apiUrl";
// import { LogoutUser } from "../Store/Actions/authAction";

// const userImage = require("../Assets/Image/user.jpg");

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const CustomSidebarMenu = (props) => {
  const user = useSelector((state) => state.commonReducer.userData);
  const token = useSelector((state) => state.authReducer.token);

  // const fcmToken = useSelector((state) => state.authReducer.fcmToken);
  // const wallet = useSelector((state) => state.commonReducer.wallet);

  // const socket = useSelector((state) => state.socketReducer.socketRef);

  //   const langReduxData = useSelector(state => state.languageReducer.data);
  //   const userData = useSelector(state => state.commonReducer?.user);

  const dispatch = useDispatch();

  return (
    <>
      <View
        style={[
          styles.header,
          Platform.OS == "android" && { height: height * 0.28 },
        ]}
      >
        {token != null && (
          <View style={styles.userProfileView}>
            <View
              style={{
                width: width * 0.23,
                height: width * 0.23,
                borderRadius: moderateScale((width * 0.22) / 2, 0.3),
                marginTop: moderateScale(60, 0.3),
                // marginBottom: moderateScale(5, 0.3),
                backgroundColor: Color.white,
                justifyContent: "center",
                alignItem: "center",
              }}
            >
              <Image
                source={
                  user?.photo
                    ? { uri: `${imageUrl}${user?.photo}` }
                    : require("../Assets/Images/profilepic.png")
                }
                style={{
                  width: width * 0.22,
                  height: width * 0.22,
                  borderRadius: moderateScale((width * 0.22) / 2, 0.3),
                  marginLeft: moderateScale(2, 0.3),
                }}
              />
              <View
                style={{
                  position: "absolute",
                  padding: moderateScale(3, 0.3),
                  backgroundColor: Color.white,
                  bottom: moderateScale(2, 0.3),
                  right: moderateScale(5, 0.3),
                  borderRadius: moderateScale(10, 0.3),
                }}
              >
                <Icon
                  name={"pen"}
                  as={FontAwesome5}
                  size={moderateScale(13, 0.3)}
                  color={Color.black}
                  style={{ marginTop: moderateScale(2, 0.3) }}
                  onPress={() => navigationService.navigate("Profile")}
                />
              </View>
            </View>
            <CustomText style={styles.userText} numberOfLines={1}>
              {user?.firstName} {user?.lastName}
            </CustomText>
          </View>
        )}
        {token == null && (
          <View style={styles.labels}>
            <CustomText
              style={styles.labelText}
              onPress={() => {
                navigationService.navigate("LoginScreen");
              }}
            >
              Log In /
            </CustomText>
            <CustomText
              style={[{ marginLeft: moderateScale(5, 0.3) }, styles.labelText]}
              onPress={() => {
                navigationService.navigate("SignupScreen");
              }}
            >
              Sign Up
            </CustomText>
          </View>
        )}
      </View>

      <DrawerContentScrollView {...props}>
        <View
          style={[
            Platform.OS == "ios"
              ? { height: height * 0.71 }
              : { height: height * 0.73 },
            {
              paddingLeft: moderateScale(10, 0.3),
            },
          ]}
        >
          <DrawerItem
            label={"Home"}
            labelStyle={[styles.labelStyle]}
            onPress={() => {
              navigationService.navigate("HomeScreen");
            }}
            icon={() => (
              <Icon
                name="home"
                as={FontAwesome}
                size={moderateScale(20, 0.3)}
                style={styles.iconStyle}
              />
            )}
          />
          {token != null && (
            <>
              <DrawerItem
                label={"Messages"}
                labelStyle={[styles.labelStyle]}
                onPress={() => {
                  navigationService.navigate("ChatListings");
                }}
                icon={() => (
                  <Icon
                    name="message-processing"
                    as={MaterialCommunityIcons}
                    size={moderateScale(20, 0.3)}
                    style={styles.iconStyle}
                  />
                )}
              />
              <DrawerItem
                label={"Reservations"}
                labelStyle={[styles.labelStyle]}
                onPress={() => {
                  navigationService.navigate("Reservations");
                }}
                icon={() => (
                  <Icon
                    name="hand-point-up"
                    as={FontAwesome5}
                    size={moderateScale(20, 0.3)}
                    style={styles.iconStyle}
                  />
                )}
              />
            </>
          )}
          <DrawerItem
            label={"Other Services"}
            labelStyle={[styles.labelStyle]}
            onPress={() => {
              navigationService.navigate("OtherServices");
            }}
            icon={() => (
              <Icon
                name="user-circle"
                as={FontAwesome}
                size={moderateScale(20, 0.3)}
                style={styles.iconStyle}
              />
            )}
          />
          {token != null && (
            <>
              <DrawerItem
                label={"Password Change"}
                labelStyle={[styles.labelStyle]}
                onPress={() => {
                  navigationService.navigate("PasswordChange");
                }}
                icon={() => (
                  <Icon
                    name="message-processing"
                    as={MaterialCommunityIcons}
                    size={moderateScale(20, 0.3)}
                    style={styles.iconStyle}
                  />
                )}
              />
              <DrawerItem
                label={"Profile"}
                labelStyle={[styles.labelStyle]}
                onPress={() => {
                  navigationService.navigate("Profile");
                }}
                icon={() => (
                  <Icon
                    name="user-circle"
                    as={FontAwesome}
                    size={moderateScale(20, 0.3)}
                    style={styles.iconStyle}
                  />
                )}
              />
            </>
          )}
          <DrawerItem
            label={"Support"}
            labelStyle={[styles.labelStyle]}
            onPress={() => {
              navigationService.navigate("Support");
            }}
            icon={() => (
              <Icon
                name="support-agent"
                as={MaterialIcons}
                size={moderateScale(20, 0.3)}
                style={styles.iconStyle}
              />
            )}
          />
          <DrawerItem
            label={"Terms And condition"}
            labelStyle={[styles.labelStyle]}
            onPress={() => {
              navigationService.navigate("TermsAndConditions");
            }}
            icon={() => (
              <Icon
                name="file-signature"
                as={FontAwesome5}
                size={moderateScale(20, 0.3)}
                style={styles.iconStyle}
              />
            )}
          />
          <DrawerItem
            label={"Privacy Policy"}
            labelStyle={[styles.labelStyle]}
            onPress={() => {
              navigationService.navigate("PrivacyPolicy");
            }}
            icon={() => (
              <Icon
                name="file-lock"
                as={MaterialCommunityIcons}
                size={moderateScale(20, 0.3)}
                style={styles.iconStyle}
              />
            )}
          />
        </View>
        {token != null && (
          <View style={styles.footer}>
            <DrawerItem
              label={"Log out"}
              labelStyle={[styles.labelStyle]}
              onPress={() => {
                dispatch(setUserLogOut(), dispatch(setUserLogout()));
              }}
              icon={() => (
                <Icon
                  name="log-out"
                  as={Entypo}
                  size={moderateScale(20, 0.3)}
                  style={styles.iconStyle}
                />
              )}
            />
          </View>
        )}
      </DrawerContentScrollView>
    </>
  );
};

export default CustomSidebarMenu;

const styles = ScaledSheet.create({
  header: {
    height: height * 0.24,
    backgroundColor: Color.themeColor,
  },
  labels: {
    flexDirection: "row",
    marginLeft: moderateScale(20, 0.3),
    paddingTop: moderateScale(180, 0.3),
  },
  labelText: {
    color: "white",
    fontWeight: "bold",
    fontSize: moderateScale(15, 0.3),
  },
  labelStyle: {
    color: Color.black,
    fontSize: moderateScale(13, 0.3),
    position: "absolute",
    top: moderateScale(-8, 0.3),
    left: moderateScale(-15, 0.3),
    fontFamily: "PlusJakartaDisplay-bold",
    // fontWeight: "bold",
  },
  iconStyle: {
    color: Color.themeColor1,
    width: moderateScale(25, 0.3),
    // marginTop: moderateScale(-18, 0.3),

    // padding: moderateScale(5, 0.3),
  },
  userText: {
    color: "#fff",
    fontSize: moderateScale(16, 0.3),
    fontWeight: "bold",
    marginLeft: moderateScale(5, 0.3),
    marginTop: moderateScale(10, 0.3),
    // textTransform: "capitalize",
  },

  footer: {
    position: "absolute",
    bottom: moderateScale(40, 0.3),
    borderTopWidth: 1,
    width: "100%",
    borderColor: Color.themeLightGray,
    paddingLeft: moderateScale(20, 0.3),
    // marginLeft: moderateScale(20, 0.3),
  },

  closeIconStyle: {
    marginLeft: moderateScale(12, 0.3),
    marginTop:
      Platform.OS == "android"
        ? moderateScale(15, 0.3)
        : moderateScale(50, 0.3),
  },
  userProfileView: {
    backgroundColor: Color.themeColor,
    marginLeft: moderateScale(20, 0.3),
  },
});
