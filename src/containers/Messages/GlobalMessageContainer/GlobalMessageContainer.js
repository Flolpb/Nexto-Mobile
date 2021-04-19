import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DelayedMessageContainer from '../DelayedMessageContainer/DelayedMessageContainer';
import DirectMessage from '../DirectMessageContainer/DirectMessage';
import { PermissionsAndroid } from 'react-native';
import colors from '../../../config/colors';
import fonts from '../../../config/fonts';
import {createStackNavigator} from '@react-navigation/stack';
import ListLibraryContainer from '../../Library/ListLibraryContainer/ListLibraryContainer';
import {List} from 'react-native-paper';


class GlobalMessageContainer extends React.Component {

  constructor(props) {
    super(props);
    this.sendPermission();
  }

  state = {
    chosenLibrary: null
  }

  setKeyValue = (key, value) => {
    this.setState({
      [key]: value,
    });
  }

  sendPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.SEND_SMS,
      {
        title: 'Nexto Send SMS Permission',
        message: 'Nexto needs access to send sms',
      }
    );

    if(granted === PermissionsAndroid.RESULTS.GRANTED){
      console.log('You can now send sms')
    }else{
      alert('You have denied Send SMS Permission');
    }
  };

  render() {
    const { route } = this.props
    const Stack = createStackNavigator();
    const Tab = createMaterialTopTabNavigator();
    console.log(this.state.chosenLibrary)
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
                {props => <DirectMessage {...props} {...this.props} contactID={route.params} setChosenLibrary={() => this.setKeyValue('chosenLibrary', null)} chosenLibrary={this.state.chosenLibrary} />}
              </Tab.Screen>
              <Tab.Screen
                name="Différé">
                {props => <DelayedMessageContainer {...props} {...this.props} contactID={route.params} setChosenLibrary={() => this.setKeyValue('chosenLibrary', null)} chosenLibrary={this.state.chosenLibrary} />}
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
