import React from 'react';
import {Button, Text, View} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Navigation from './Navigation';
import {NavigationContainer} from '@react-navigation/native';


const Drawer = createDrawerNavigator();

const DrawerContent = ({ onLogOut }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Drawer content</Text>
      <Button title="LogOut" onPress={() => onLogOut} />
    </View>
  );
}

const DrawerNavigation = ({ onLogOut }) => (
  <NavigationContainer>
    <Drawer.Navigator drawerContent={() => <DrawerContent onLogOut={onLogOut} />}>
      <Drawer.Screen name="Navigation" component={Navigation} />
    </Drawer.Navigator>
  </NavigationContainer>
)

export default DrawerNavigation;
