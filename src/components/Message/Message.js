import React, {useState} from 'react';
import {StyleSheet, View, Text, Button, TextInput, PermissionsAndroid} from 'react-native';
import SendSMS from 'react-native-sms';
import SmsAndroid from 'react-native-get-sms-android';
import 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import getCurrentDate from '../../utils/getDate';

import { AppRegistry } from 'react-native';
AppRegistry.registerHeadlessTask('SendMessage', () =>
    require('../SendMessage/SendMessage')
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
        date: new Date(),
        displayDate: false,
        displayTimme: false,
    };

    setDefaultDate = () => {
        this.setState({
            date: getCurrentDate('-'),
        });
        console.log('date initialized')
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

    displayDate = () => {
        this.setState({
            displayDate: true,
        })
    };
    displayTime = () => {
        this.setState({
            displayTime: true,
        })
    };

    setDate = (event, date) => {
        this.setState({date: date, displayDate: false});
    };

    setTime = (event, date) => {
        this.setState({date: date, displayTime: false});
    };


  render() {
      const {date} = this.state;
      let dateString;
      dateString = date.toString();
      console.log(date);
      return (
      <View>
          <Text style={styles.label}>Rentrer un numéro de téléphone</Text>
          <TextInput style={styles.input} value={this.state.numberText} onChangeText={(number) => this.setMobileNumber(number)} placeholder="Enter contact Number to send" keyboardType="numeric"/>
          <Text style={styles.label}>Rentrer un message</Text>
          <TextInput style={styles.input} value={this.state.message} onChangeText={(text) => this.setMessage(text)} placeholder="Enter Message to send"/>
          <Text style={styles.label}>Date programmée : {dateString}</Text>
          <Button title="Sélectionnez une date" onPress={this.displayDate}/>
          <Button title="Sélectionnez une heure" onPress={this.displayTime}/>
          {this.state.displayDate &&
              <DateTimePicker style={styles.datePickerStyle} value={date} mode="date"
                 confirmBtnText="Confirm" cancelBtnText="Cancel"
                 customStyles={{
                     dateIcon: {
                         position: 'absolute',
                         left: 0,
                         top: 4,
                         marginLeft: 0
                     },
                     dateInput: {
                         marginLeft: 36,
                     }
                 }}
                 onChange={this.setDate}
              />
         }
          {this.state.displayTime &&
            <DateTimePicker style={styles.datePickerStyle}
                value={date}
                mode="time"
                onChange={this.setTime}
            />
          }


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
    },
    datePickerStyle: {
        width: 200,
        marginTop: 20,
    },
});



export default Message;
