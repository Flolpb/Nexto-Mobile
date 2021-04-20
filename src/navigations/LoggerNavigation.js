import React from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import LogInContainer from '../containers/Logger/LogInContainer/LogInContainer';
import {NavigationContainer} from '@react-navigation/native';
import NewAccountContainer from '../containers/Logger/NewAcounntContainer/NewAccountContainer';

const labels = {
  username: 'Identifiant',
  firstname: 'Prénom',
  name: 'Nom',
  mail: 'Adresse mail',
  number: 'Numéro de téléphone',
  password: 'Mot de passe',
  passwordConfirm: 'Confirmation du mot de passe'
};

const LoggerNavigation = ({ onLogIn, onRegister }) => {
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
            name="NewAccountContainer">
            {props => <NewAccountContainer {...props} onRegister={onRegister} deviceLocale="fr" labels={labels} />}
            </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </>
  )
}

export default LoggerNavigation;
