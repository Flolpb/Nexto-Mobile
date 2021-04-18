import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import 'react-native-gesture-handler';
import colors from '../config/colors';
import {Icon} from 'react-native-elements';
import ListMessageContainer from '../containers/Messages/ListMessageContainer/ListMessageContainer';
import MainPage from '../containers/MainPage/MainPage';
import GlobalMessageContainer from '../containers/Messages/GlobalMessageContainer/GlobalMessageContainer';
import GlobalLibraryContainer from '../containers/Library/GlobalLibraryContainer/GlobalLibraryContainer';
import GlobalContactContainer from '../containers/Contacts/GlobalContactContainer/GlobalContactContainer';

const Tab = createMaterialTopTabNavigator();

class Navigation extends React.Component{

    state = {
      tabHeight: 50,
    };

    setTabHeight = (value) => {
      this.setState({
        tabHeight: value,
      })
    };

    render(){
        return(
            <>
                <NavigationContainer>
                    <Tab.Navigator
                      swipeEnabled={false}
                      initialRouteName="MainPage"
                      tabBarPosition="bottom"
                      tabBarOptions={{
                        showIcon: true,
                        showLabel: false,
                        activeTintColor: colors.white,
                        inactiveTintColor: colors.lightpurple,
                        indicatorStyle: {
                          borderBottomColor: colors.white,
                          borderBottomWidth: 2,
                        },
                        style: {
                          backgroundColor: colors.backGrey,
                          height: this.state.tabHeight,
                          borderTopColor: "transparent",
                          elevation: 0,
                        }
                    }} >
                      <Tab.Screen
                        name="GlobalLibraryContainer"
                        component={GlobalLibraryContainer}
                        options={{
                          tabBarColor: colors.white,
                          tabBarIcon: ({color, size}) => (
                            <Icon type="material-community" name="bookshelf" color={color} size={size} />
                          )
                        }} />
                      <Tab.Screen
                        name="GlobalContactContainer"
                        component={GlobalContactContainer}
                        options={{
                          tabBarColor: colors.white,
                          tabBarIcon: ({color, size}) => (
                            <Icon name="contacts" color={color} size={size} />
                          )
                      }} />
                      <Tab.Screen
                        name="MainPage"
                        component={MainPage}
                        options={{
                            tabBarColor: colors.white,
                            tabBarIcon: ({color, size}) => (
                              <Icon name="home" color={color} size={size} />
                            )
                        }} />
                      <Tab.Screen
                        name="ListMessageContainer"
                        component={ListMessageContainer}
                        options={{
                          tabBarColor: colors.white,
                          tabBarIcon: ({color, size}) => (
                            <Icon name="list" color={color} size={size} />
                          )
                        }} />
                      <Tab.Screen
                        name="GlobalMessageContainer"
                        options={{
                          tabBarColor: colors.white,
                          tabBarIcon: ({color, size}) => (
                            <Icon name="message" color={color} size={size} />
                          )
                        }}
                      >
                        {props => <GlobalMessageContainer {...props} setTabHeight={this.setTabHeight} /> }
                      </Tab.Screen>
                    </Tab.Navigator>
                </NavigationContainer>
            </>
        )
    }
}

export default Navigation;
