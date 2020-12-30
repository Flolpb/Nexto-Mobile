import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import ListeMessage from '../components/ListeMessage/ListeMessage';
import Accueil from '../components/Accueil/Accueil';
import ListeContact from '../components/ListeContact/ListeContact';
import MessageContainer from '../components/MessageContainer/MessageContainer';
import colors from '../config/colors';


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
                        name="Liste des contacts"
                        component={ListeContact}
                        options={{
                          tabBarColor: colors.white,
                          tabBarIcon: ({color, size}) => (
                            <Icon name="contacts" color={color} size={size} />
                          )
                      }} />
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
