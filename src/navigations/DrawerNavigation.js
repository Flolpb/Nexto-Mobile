import React from 'react';
import {Button, Text, View} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Navigation from './Navigation';
import {NavigationContainer} from '@react-navigation/native';


const Drawer = createDrawerNavigator();

const DrawerContent = (props) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Drawer content</Text>
      <Button title="LogOut" onPress={props.onLogOut} />
    </View>
  );
}

const DrawerNavigation = ({ onLogOut }) => {
  return(
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} onLogOut={onLogOut} />}>
        <Drawer.Screen name="Navigation" component={Navigation} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default DrawerNavigation;
