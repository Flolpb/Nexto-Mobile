import React from 'react';
import {StyleSheet, View, Text, Button, TextInput, PermissionsAndroid} from 'react-native';
import SendSMS from 'react-native-sms';
import 'react-native-gesture-handler';

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
                message: 'Nexto needs access to sens sms',
            }
        );

        if( granted === PermissionsAndroid.RESULTS.GRANTED){
            this.proceed();
        }else{
            alert('You have denied Send SMS Permission')
        }
    };


    state = {
        mobileNumber: '',
        message: '',
    };

    setMobileNumber = (number) => {
        this.setState({
            mobileNumber: number,
        })
    };

    setMessage = (text) => {
        this.setState({
            message: text,
        })
    };

    sendSms = () => {
        if(this.state.mobileNumber.length !== 10) {
            alert('Please insert correct contact number');
            return;
        }

        SendSMS.send(
{
            body: this.state.message,
            recipients: this.state.mobileNumber,
            successTypes: ['sent', 'queued'],
        },
        (completed, cancelled, error) => {
            if(completed){
                alert('SMS Sent completed');
            } else if (cancelled) {
                alert('SMS Sent Cancelled');
            } else if (error) {
                alert('Some error occured');
            }else{
                alert('test');
            }
        },
    );
    };

  render() {
    return (
      <View>
        <Text>Test d'envoi de message</Text>
          <Text>Rentrer un numéro de téléphone</Text>
          <TextInput value={this.state.mobileNumber} onChangeText={(number) => this.setMobileNumber(number)} placeholder="Enter contact Number to send" keyboardType="numeric"/>
          <Text>Rentrer un message</Text>
          <TextInput value={this.state.message} onChangeText={(text) => this.setMessage(text)} placeholder="Enter Message to send"/>
          <Button title="Send SMS" onPress={this.sendSms}/>
          <Button title="Grant Permission" onPress={this.sendPermission}/>
      </View>
    );
  }
}

export default Message;
