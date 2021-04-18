import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DelayedMessageContainer from '../DelayedMessageContainer/DelayedMessageContainer';
import DirectMessage from '../DirectMessageContainer/DirectMessage';
import { PermissionsAndroid } from 'react-native';
import colors from '../../../config/colors';
import fonts from '../../../config/fonts';


class GlobalMessageContainer extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    const { route } = this.props;
    const Tab = createMaterialTopTabNavigator();
    return(
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
          {props => <DirectMessage {...props} {...this.props} contactID={route.params} />}
        </Tab.Screen>
        <Tab.Screen
          name="Différé">
          {props => <DelayedMessageContainer {...props} {...this.props} contactID={route.params} />}
        </Tab.Screen>
      </Tab.Navigator>
    )
  }

}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.backGrey,
  }
});

export default GlobalMessageContainer;
