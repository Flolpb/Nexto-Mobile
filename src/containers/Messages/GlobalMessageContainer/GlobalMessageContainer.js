import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DelayedMessageContainer from '../DelayedMessageContainer/DelayedMessageContainer';
import DirectMessage from '../DirectMessageContainer/DirectMessage';
import colors from '../../../config/colors';
import fonts from '../../../config/fonts';
import {createStackNavigator} from '@react-navigation/stack';
import ListLibraryContainer from '../../Library/ListLibraryContainer/ListLibraryContainer';


class GlobalMessageContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    chosenLibrary: null,
    fromLibrary: false,
  }

  setKeyValue = (key, value) => {
    console.log(value)
    this.setState({
      [key]: value,
    });
  }

  render() {
    const { route } = this.props;
    const Stack = createStackNavigator();
    const Tab = createMaterialTopTabNavigator();
    return(
      <Stack.Navigator
        initialRouteName="GlobalMessageContainer">
        <Stack.Screen
          name="GlobalMessageContainer"
          options={{ headerShown: false }}>
          {props =>
            <Tab.Navigator
              tabBarOptions={{
                style: {
                  backgroundColor: colors.backGrey,
                },
                labelStyle: {
                  fontFamily: fonts.medium,
                },
                activeTintColor: colors.black,
                inactiveTintColor: colors.inactiveBlack,
                indicatorStyle: {
                  borderBottomColor: colors.inactiveBlack,
                  borderBottomWidth: 2,
                },
              }}
              swipeEnabled={true}
              sceneContainerStyle={styles.screen}>
              <Tab.Screen
                name="Instantané">
                {props => <DirectMessage {...props} {...this.props} contactID={route.params}
                               setChosenLibrary={() => this.setKeyValue('chosenLibrary', null)} chosenLibrary={this.state.chosenLibrary}
                               setFromLibrary={() => this.setKeyValue('fromLibrary', !this.state.fromLibrary)} fromLibrary={this.state.fromLibrary}
                />}
              </Tab.Screen>
              <Tab.Screen
                name="Différé">
                {props => <DelayedMessageContainer {...props} {...this.props} contactID={route.params}
                               setChosenLibrary={() => this.setKeyValue('chosenLibrary', null)} chosenLibrary={this.state.chosenLibrary}
                               setFromLibrary={() => this.setKeyValue('fromLibrary', !this.state.fromLibrary)} fromLibrary={this.state.fromLibrary}
                />}
              </Tab.Screen>
            </Tab.Navigator>
          }
        </Stack.Screen>
        {/*Écran de création de message depuis la liste des contacts*/}
        <Stack.Screen
          name="ListLibraryContainerFromMessage"
          options={{
            title: 'Choisir une bibliothèque',
            headerTintColor: colors.black,
            headerTitleStyle: {
              color: colors.black,
              fontFamily: fonts.bold,
              fontSize: 20,
            },
            headerStyle: {
              backgroundColor: colors.backGrey,
              elevation: 0,
            },
          }}>
          {props => <ListLibraryContainer {...props} selectionFromMessage={true} setChosenLibrary={(library) => this.setKeyValue('chosenLibrary', library)} />}
        </Stack.Screen>
      </Stack.Navigator>
    )
  }

}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.backGrey,
  }
})

export default GlobalMessageContainer;
