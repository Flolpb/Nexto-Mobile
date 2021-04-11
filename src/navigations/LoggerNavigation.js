import React from 'react'
import {useNavigation} from '@react-navigation/core';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import GlobalMessageContainer from '../containers/Messages/GlobalMessageContainer/GlobalMessageContainer';
import colors from '../config/colors';
import fonts from '../config/fonts';
import LogInContainer from '../containers/Logger/LogInContainer/LogInContainer';
import {NavigationContainer} from '@react-navigation/native';
import GlobalLibraryContainer from '../containers/Library/GlobalLibraryContainer/GlobalLibraryContainer';
import {Icon} from 'react-native-elements';
import GlobalContactContainer from '../containers/Contacts/GlobalContactContainer/GlobalContactContainer';
import MainPage from '../containers/MainPage/MainPage';
import ListMessageContainer from '../containers/Messages/ListMessageContainer/ListMessageContainer';
import NewAccountContainer from '../containers/Logger/NewAcounntContainer/NewAccountContainer';


const LoggerNavigation = ({ onLogIn }) => {
  const Tab = createMaterialTopTabNavigator();
  return(
    <>
      <NavigationContainer>
        <Tab.Navigator
          swipeEnabled={false}
          initialRouteName="LogInContainer"
          tabBarOptions={{
            style: {
              height: 0,
            }
          }} >
          <Tab.Screen name="LogInContainer">
            {props => <LogInContainer {...props} onLogIn={onLogIn} />}
          </Tab.Screen>
          <Tab.Screen
            name="NewAccountContainer"
            component={NewAccountContainer}/>
        </Tab.Navigator>
      </NavigationContainer>
    </>
  )
}

export default LoggerNavigation;
