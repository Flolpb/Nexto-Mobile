import React from 'react';
import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';
import {createStackNavigator} from '@react-navigation/stack';
import ListLibraryContainer from '../ListLibraryContainer/ListLibraryContainer';
import CreateLibraryContainer from '../CreateLibraryContainer/CreateLibraryContainer';

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
          headerStyle: {
            backgroundColor: colors.purple,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backGrey,
    flexGrow: 1
  },
});

export default GlobalLibraryContainer;
