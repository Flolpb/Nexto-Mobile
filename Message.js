import React from 'react';
import {StyleSheet, View, Text, Button, TextInput, PermissionsAndroid} from 'react-native';
import SendSMS from 'react-native-sms';
import SmsAndroid from 'react-native-get-sms-android';
import 'react-native-gesture-handler';

import { AppRegistry } from 'react-native';
AppRegistry.registerHeadlessTask('SendMessage', () =>
    require('./SendMessage')
);

class Message extends React.Component {
    constructor(props) {
        super(props);
    }

    proceed = () => {
        alert('You can now send sms')
    };

    sendPermission = async () => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.SEND_SMS,
            {
                title: 'Nexto Send SMS Permission',
                message: 'Nexto needs access to send sms',
            }
        );

        if( granted === PermissionsAndroid.RESULTS.GRANTED){
            this.proceed();
        }else{
            alert('You have denied Send SMS Permission');
        }
    };


    state = {
        mobileNumber: [],
        numberText: '',
        message: '',
    };

    setMobileNumber = (number) => {
        this.setState({
            mobileNumber: [number],
            numberText: number
        })
    };

    setMessage = (text) => {
        this.setState({
            message: text,
        })
    };

    sendSms = () => {
        SmsAndroid.autoSend(
            this.state.numberText,
            this.state.message,
            (fail) => {
                alert('failed with this error: '+ fail);
            },
            (success) => {
                alert('SMS sent successfully');
            },
        );

    };


  render() {
    return (
      <View>
          <Text style={styles.label}>Rentrer un numéro de téléphone</Text>
          <TextInput style={styles.input} value={this.state.numberText} onChangeText={(number) => this.setMobileNumber(number)} placeholder="Enter contact Number to send" keyboardType="numeric"/>
          <Text style={styles.label}>Rentrer un message</Text>
          <TextInput style={styles.input} value={this.state.message} onChangeText={(text) => this.setMessage(text)} placeholder="Enter Message to send"/>
          <Button title="Send SMS" onPress={this.sendSms}/>
          <Button title="Grant Permission" onPress={this.sendPermission}/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    label: {
        textAlign: 'center',
        margin: 10,
    },
    input: {
        textAlign: 'center',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1,
    }
});



export default Message;
