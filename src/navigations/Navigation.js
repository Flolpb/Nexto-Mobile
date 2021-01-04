import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import ListeMessage from '../components/ListeMessage/ListeMessage';
import Accueil from '../components/Accueil/Accueil';
import MessageContainer from '../components/MessageContainer/MessageContainer';
import ListeContactNavigator from '../components/ListeContact/ListeContactNavigator';
import colors from '../config/colors';

const Tab = createMaterialTopTabNavigator();

class Navigation extends React.Component{
    render(){
        return(
            <>
                <NavigationContainer>
                    <Tab.Navigator
                      initialRouteName="Accueil"
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
                        name="ListeContact"
                        component={ListeContactNavigator}
                        options={{
                          tabBarColor: colors.white,
                          tabBarIcon: ({color, size}) => (
                            <Icon name="contacts" color={color} size={size} />
                          )
                      }} />
                      <Tab.Screen
                        name="Accueil"
                        component={Accueil}
                        options={{
                            tabBarColor: colors.white,
                            tabBarIcon: ({color, size}) => (
                              <Icon name="home" color={color} size={size} />
                            )
                        }} />
                      <Tab.Screen
                        name="ListeMessage"
                        component={ListeMessage}
                        options={{
                          tabBarColor: colors.white,
                          tabBarIcon: ({color, size}) => (
                            <Icon name="list" color={color} size={size} />
                          )
                        }} />
                      <Tab.Screen
                        name="MessageContainer"
                        component={MessageContainer}
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

export default Navigation;
