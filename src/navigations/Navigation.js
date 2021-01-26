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
import ListeBibliotheque from '../components/Bibliotheque/ListeBibliotheque';

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
                        activeTintColor: colors.white,
                        inactiveTintColor: colors.inactiveBlack,
                        indicatorStyle: {
                          borderBottomColor: colors.white,
                          borderBottomWidth: 2,
                        },
                        style: {
                          backgroundColor: colors.purple
                        }
                    }} >
                      <Tab.Screen
                        name="ListeBibliotheque"
                        component={ListeBibliotheque}
                        options={{
                          tabBarColor: colors.white,
                          tabBarIcon: ({color, size}) => (
                            <Icon type="material-community" name="bookshelf" color={color} size={size} />
                          )
                        }} />
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
