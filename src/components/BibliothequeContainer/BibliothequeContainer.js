import React from 'react';
import { StyleSheet } from 'react-native';
import colors from '../../config/colors';
import {createStackNavigator} from '@react-navigation/stack';
import ListeBibliotheque from './ListeBibliotheque/ListeBibliotheque';
import CreateBibliotheque from './CreateBibliotheque/CreateBibliotheque';

const BibliothequeContainer = () => {
  const Stack = createStackNavigator();
  return(
    <Stack.Navigator
      initialRouteName="ListeBibliotheque">
      <Stack.Screen
        name="ListeBibliotheque"
        component={ListeBibliotheque}
        options={{ headerShown: false }} />
      <Stack.Screen
        name="CreateBibliotheque"
        component={CreateBibliotheque}
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

export default BibliothequeContainer;
