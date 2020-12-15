import React, {useState} from 'react';
import {StyleSheet, View, Text, Button, TextInput, PermissionsAndroid} from 'react-native';
import SendSMS from 'react-native-sms';
import SmsAndroid from 'react-native-get-sms-android';
import 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import getDate from '../../utils/getDate';

import { AppRegistry } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
AppRegistry.registerHeadlessTask('SendMessage', () =>
    require('../SendMessage/SendMessage')
);

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.readData();
        this.sendPermission();
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

        if(granted === PermissionsAndroid.RESULTS.GRANTED){
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
        displayTime: false,
        messages: []
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

    readData = async () => {
        try{
            const jsonValue = await AsyncStorage.getItem('message');
            const value = JSON.parse(jsonValue);
            if(jsonValue != null){
                this.setState({
                    messages: value
                });
            }else{
                this.setState({
                    messages: [],
                });
            }
        }catch(e){
            console.log(e);
        }
    };

    programSms = async () => {
        try{
            let value = {};
            value.date = this.state.date;
            value.message = this.state.message;
            value.contact = this.state.numberText;
            let joined = this.state.messages;
            joined.push(value);
            const jsonValue = JSON.stringify(joined);
            await AsyncStorage.setItem('message', jsonValue);
            this.readData();
            console.log('message enregistré');
        }catch (e) {
            console.log(e);
        }
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
        if(date != null){
            this.setState({date: date});
        }
        this.setState({displayDate: false});
    };

    setTime = (event, date) => {
        if(date != null){
            this.setState({date: date});
        }
        this.setState({displayTime: false});
    };


  render() {
      const {date} = this.state;
      let dateString;
      if(date != null){
          dateString = getDate(':', date);
      }else{
          dateString = 'Aucune';
      }

      return (
      <View>
          <Text style={styles.label}>Rentrer un numéro de téléphone</Text>
          <TextInput style={styles.input} value={this.state.numberText} onChangeText={(number) => this.setMobileNumber(number)} placeholder="Enter contact Number to send" keyboardType="numeric"/>
          <Text style={styles.label}>Rentrer un message</Text>
          <TextInput style={styles.input} value={this.state.message} onChangeText={(text) => this.setMessage(text)} placeholder="Enter Message to send"/>
          <Text style={styles.label}>Date programmée : {dateString}</Text>
          <Button title="Changer la date" onPress={this.displayDate}/>
          <Button title="Changer l'heure" onPress={this.displayTime}/>
          {this.state.displayDate &&
              <DateTimePicker style={styles.datePickerStyle} value={date} mode="date"
                 confirmBtnText="Confirm"
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


          <Button title="Programmer le SMS" onPress={this.programSms}/>
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
