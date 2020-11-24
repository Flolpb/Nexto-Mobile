import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Navigation from './navigations/Navigation';

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <Navigation />
    );
  }
}





export default App;
