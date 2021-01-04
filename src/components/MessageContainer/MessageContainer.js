import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DelayedMessage from './DelayedMessage/DelayedMessage';
import DirectMessage from './DirectMessage/DirectMessage';
import { PermissionsAndroid } from 'react-native';


class MessageContainer extends React.Component {

  constructor(props) {
    super(props);
    this.sendPermission();
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
    const Tab = createMaterialTopTabNavigator();
    return(
      <Tab.Navigator
        swipeEnabled={false}>
        <Tab.Screen name="Instantané">
          {props => <DirectMessage {...props} contactID={route.params} />}
        </Tab.Screen>
        <Tab.Screen {...this.props} name="Différé" component={DelayedMessage} />
      </Tab.Navigator>
    )
  }

}

export default MessageContainer;
