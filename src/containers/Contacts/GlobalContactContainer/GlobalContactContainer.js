import React from 'react'
import {useNavigation} from '@react-navigation/core';
import {createStackNavigator} from '@react-navigation/stack';
import GlobalMessageContainer from '../../Messages/GlobalMessageContainer/GlobalMessageContainer';
import ListeContact from '../ListContactContainer/ListContactContainer';
import colors from '../../../config/colors';
import fonts from '../../../config/fonts';

const GlobalContactContainer = () => {
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
      {/*<Stack.Screen*/}
      {/*  name="ListeContactMessageScreen"*/}
      {/*  component={GlobalMessageContainer}*/}
      {/*  options={{*/}
      {/*    title: 'Envoi d\'un message',*/}
      {/*    headerTintColor: colors.black,*/}
      {/*    headerTitleStyle: {*/}
      {/*      color: colors.black,*/}
      {/*      fontFamily: fonts.bold,*/}
      {/*      fontSize: 20,*/}
      {/*    },*/}
      {/*    headerStyle: {*/}
      {/*      backgroundColor: colors.backGrey,*/}
      {/*      elevation: 0,*/}
      {/*    },*/}
      {/*  }} />*/}
    </Stack.Navigator>
  )
}

export default GlobalContactContainer;
