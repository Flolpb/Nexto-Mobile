import React from 'react'
import {useNavigation} from '@react-navigation/core';
import {createStackNavigator} from '@react-navigation/stack';
import MessageContainer from '../MessageContainer/MessageContainer';
import ListeContact from './ListeContact';

const ListeContactNavigator = () => {
  const navigation = useNavigation();
  const Stack = createStackNavigator();
  return(
    <Stack.Navigator
      initialRouteName="ListeContactScreen">
      {/*Liste des contacts*/}
      <Stack.Screen
        name="ListeContactScreen"
        options={{ headerShown: false }}>
        {props => <ListeContact {...props} navigation={navigation} />}
      </Stack.Screen>
      {/*Écran de création de message depuis la liste des contacts*/}
      <Stack.Screen
        name="ListeContactMessageScreen"
        component={MessageContainer}
        options={{ title: 'Envoi d\'un message' }} />
    </Stack.Navigator>
  )
}

export default ListeContactNavigator;
