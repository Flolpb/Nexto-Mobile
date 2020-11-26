import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import 'react-native-gesture-handler';
import Message from '../components/Message/Message';
import ListeMessage from '../components/ListeMessage/ListeMessage';
import Accueil from '../components/Accueil/Accueil';
import {Icon} from 'react-native-elements';

import colors from '../config/colors';

const Tab = createMaterialBottomTabNavigator();

class Navigation extends React.Component{
    render(){
        return(
            <>
                <NavigationContainer>
                    <Tab.Navigator
                    initialRouteName="Home"
                    barStyle={ styles.bottomBar }
                    activeColor={ colors.black }
                    inactiveColor={ colors.inactiveBlack }
                    labeled={false}
                    >
                        <Tab.Screen
                          name="Home"
                          component={Accueil}
                          options={{
                              tabBarColor: '#000',
                              tabBarIcon: ({color, size}) => (
                                <Icon name="home" color={color} size={size} />
                              )
                          }} />
                        <Tab.Screen
                          name="Liste des Messages"
                          component={ListeMessage}
                          options={{
                            tabBarColor: '#000',
                            tabBarIcon: ({color, size}) => (
                              <Icon name="list" color={color} size={size} />
                            )
                          }} />
                        <Tab.Screen
                          name="Message"
                          component={Message}
                          options={{
                            tabBarColor: '#000',
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
