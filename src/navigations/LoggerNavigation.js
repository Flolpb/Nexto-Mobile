import React from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import LogInContainer from '../containers/Logger/LogInContainer/LogInContainer';
import {NavigationContainer} from '@react-navigation/native';
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
