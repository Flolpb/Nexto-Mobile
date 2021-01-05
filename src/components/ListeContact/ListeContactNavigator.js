import React from 'react'
import {useNavigation} from '@react-navigation/core';
import {createStackNavigator} from '@react-navigation/stack';
import MessageContainer from '../MessageContainer/MessageContainer';
import ListeContact from './ListeContact';
import colors from '../../config/colors';

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
        options={{
          title: 'Envoi d\'un message',
          headerStyle: {
            backgroundColor: colors.purple,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          }
        }} />
    </Stack.Navigator>
  )
}

export default ListeContactNavigator;
