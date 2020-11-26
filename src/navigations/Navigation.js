import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import 'react-native-gesture-handler';
import Message from '../components/Message/Message';
import ListeMessage from '../components/ListeMessage/ListeMessage';
import Accueil from '../components/Accueil/Accueil';
import {Icon} from 'react-native-elements';

import colors from '../config/colors';
import {color} from 'react-native-reanimated';

const Tab = createMaterialTopTabNavigator();

class Navigation extends React.Component{
    render(){
        return(
            <>
                <NavigationContainer>
                    <Tab.Navigator
                    initialRouteName="Home"
                    tabBarPosition="bottom"
                    tabBarOptions={{
                      showIcon: true,
                      showLabel: false,
                      activeTintColor: colors.black,
                      inactiveTintColor: colors.inactiveBlack,
                      indicatorStyle: {
                        borderBottomColor: colors.black,
                        borderBottomWidth: 2,
                      },
                    }} >
                        <Tab.Screen
                          name="Home"
                          component={Accueil}
                          options={{
                              tabBarColor: colors.white,
                              tabBarIcon: ({color, size}) => (
                                <Icon name="home" color={color} size={size} />
                              )
                          }} />
                        <Tab.Screen
                          name="Liste des Messages"
                          component={ListeMessage}
                          options={{
                            tabBarColor: colors.white,
                            tabBarIcon: ({color, size}) => (
                              <Icon name="list" color={color} size={size} />
                            )
                          }} />
                        <Tab.Screen
                          name="Message"
                          component={Message}
                          options={{
                            tabBarColor: colors.white,
                            tabBarIcon: ({color, size}) => (
                              <Icon name="message" color={color} size={size} />
                            )
                          }}
                        />
                    </Tab.Navigator>
                </NavigationContainer>
            </>
        )
    }
}

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: colors.white,
  },
});

export default Navigation;