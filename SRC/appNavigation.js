import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import navigationService from './navigationService';
import {useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import LoginScreen from './Screens/loginScreen';
import EnterPhone from './Screens/EnterPhone';
import VerifyNumber from './Screens/VerifyNumber';
import ResetPassword from './Screens/ResetPassword';
import Signup from './Screens/Signup';
import ChangePassword from './Screens/ChangePassword';
import Support from './Screens/Support';
import AssetScreen from './Screens/AssetScreen';
import SearchScreen from './Screens/SearchScreen';
import WalkThroughScreen from './Screens/WalkThroughScreen';
import HomeScreen from './Screens/HomeScreen';
import LogoScreen from './Screens/LogoScreen';
import PaymentScreen from './Screens/PaymentScreen';
import SubscriptionScreen from './Screens/SubscriptionScreen';
import GetStarted from './Screens/GetStarted';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Drawer from './drawer/Drawer';
import Color from './Assets/Utilities/Color';
import NotePad from './Screens/NotePad';
import Files from './Screens/Files';
import HighLights from './Screens/HighLights';
import WhishListScreen from './Screens/WhishListScreen';
import NotepadDesign from './Screens/NotepadDesign';
import LoginScreen from './Screens/LoginScreen';
 

const AppNavigator = () => {
  // const isLogin = false;
  const isGoalCreated = useSelector(state => state.authReducer.isGoalCreated);
  const preferencesSet = useSelector(state => state.authReducer.preferencesSet);
  console.log("🚀 ~ file: appNavigation.js:37 ~ AppNavigator ~ preferencesSet:", preferencesSet)
  const walkThrough = useSelector(state => state.authReducer.userWalkThrough);
  console.log(
    '🚀 ~ file: appNavigation.js:27 ~ AppNavigator ~ walkThrough:',
    walkThrough,
  );
  

  const isVerified = useSelector(state => state.authReducer.isVerified);
  const token = useSelector(state => state.authReducer.token);
  console.log('🚀 ~ file: appNavigation.js:33 ~ AppNavigator ~ token:', token);

  const RootNav = createNativeStackNavigator();
  const RootNavLogged = createNativeStackNavigator();

  const AppNavigatorContainer = () => {
    const firstScreen =
      token != null ?
      preferencesSet == false?
      'AssetScreen'
      :
         'MyDrawer'
        : walkThrough == true
        ? 'GetStarted'
        : 'WalkThroughScreen';

    return (
      <NavigationContainer ref={navigationService.navigationRef}>
        <RootNav.Navigator
          initialRouteName={firstScreen}
          screenOptions={{headerShown: false}}>
          <RootNav.Screen
            name="WalkThroughScreen"
            component={WalkThroughScreen}
          />
          <RootNav.Screen name="LoginScreen" component={LoginScreen} />
          {/* <RootNav.Screen name="HomeScreen" component={HomeScreen} /> */}
          <RootNav.Screen name="GetStarted" component={GetStarted} />
          <RootNav.Screen name="EnterPhone" component={EnterPhone} />
          <RootNav.Screen name="VerifyNumber" component={VerifyNumber} />
          <RootNav.Screen name="ResetPassword" component={ResetPassword} />
          <RootNav.Screen name="Signup" component={Signup} />
          {/* <RootNav.Screen name="ChangePassword" component={ChangePassword} /> */}
          <RootNav.Screen name="Support" component={Support} />
          <RootNav.Screen name="MyDrawer" component={MyDrawer} />
          <RootNav.Screen name="Files" component={Files} />
          <RootNav.Screen name="NotePad" component={NotePad} />
          <RootNav.Screen name="AssetScreen" component={AssetScreen} />
          {/* <RootNav.Screen name="WhishListScreen" component={WhishListScreen} /> */}


        </RootNav.Navigator>
      </NavigationContainer>
    );
  };

  return <AppNavigatorContainer />;
};

export const MyDrawer = () => {
  const DrawerNavigation = createDrawerNavigator();
  const firstScreen = 'HomeScreen';
  return (
    <DrawerNavigation.Navigator
      drawerContent={props => <Drawer {...props} />}
      initialRouteName={'HomeScreen'}
      screenOptions={{
        headerShown: false,
      }}>
      <DrawerNavigation.Screen name="HomeScreen" component={HomeScreen} />
      <DrawerNavigation.Screen
        name="SubscriptionScreen"
        component={SubscriptionScreen}
      />

      {/* <DrawerNavigation.Screen name="AssetScreen" component={AssetScreen} /> */}
      <DrawerNavigation.Screen name="SearchScreen" component={SearchScreen} />
      <DrawerNavigation.Screen name="HighLights" component={HighLights} />
      <DrawerNavigation.Screen name="ChangePassword" component={ChangePassword} />
      <DrawerNavigation.Screen
        name="WhishListScreen"
        component={WhishListScreen}
      />

      <DrawerNavigation.Screen
        name="NotepadDesign"
        component={NotepadDesign}
      />
    </DrawerNavigation.Navigator>
  );
};

export default AppNavigator;
