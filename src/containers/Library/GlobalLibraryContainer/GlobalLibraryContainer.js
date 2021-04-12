import React from 'react';
import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';
import {createStackNavigator} from '@react-navigation/stack';
import ListLibraryContainer from '../ListLibraryContainer/ListLibraryContainer';
import CreateLibraryContainer from '../CreateLibraryContainer/CreateLibraryContainer';
import fonts from '../../../config/fonts';

const GlobalLibraryContainer = () => {
  const Stack = createStackNavigator();
  return(
    <Stack.Navigator
      initialRouteName="ListLibraryContainer">
      <Stack.Screen
        name="ListeBibliotheque"
        component={ListLibraryContainer}
        options={{ headerShown: false }} />
      <Stack.Screen
        name="CreateBibliotheque"
        component={CreateLibraryContainer}
        options={{
          title: 'Nouvelle bibliothèque',
          headerTintColor: colors.black,
          headerTitleStyle: {
            color: colors.black,
            fontFamily: fonts.bold,
            fontSize: 20,
          },
          headerStyle: {
            backgroundColor: colors.backGrey,
            elevation: 0,
          },
        }} />
    </Stack.Navigator>
  )
}

export default GlobalLibraryContainer;
