import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    TextInput,
    PermissionsAndroid,
    TouchableOpacity,
    Dimensions, Image,
} from 'react-native';
import SendSMS from 'react-native-sms';
import SmsAndroid from 'react-native-get-sms-android';
import 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import getDate from '../../../utils/getDate';

import { AppRegistry } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon} from 'react-native-elements';
import colors from '../../../config/colors';
AppRegistry.registerHeadlessTask('SendMessage', () =>
    require('../SendMessage/SendMessage')
);

class DelayedMessage extends React.Component {
    constructor(props) {
        super(props);
        this.readData();
    }

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
            this.setState({
                mobileNumber: [],
                numberText: '',
                message: '',
                date: new Date(),
                displayDate: false,
                displayTime: false,
                messages: []
            });
            this.readData();
            alert('Message envoyé !');
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
          dateString = getDate(date);
      }else{
          dateString = 'Aucune';
      }

      return (
        <View
          style={styles.subContainer}>
            <Image
              source={require('../../../assets/images/Illustration_mobile.png')}
              style={[styles.image, { width: Dimensions.get('window').width - 150 }]} />
            <Text
              style={styles.title}>
                Envoi d'un message en différé
            </Text>
            <View style={[styles.field, styles.input]}>
                <TextInput
                  style={{flex: 4, fontSize: 15}}
                  value={this.state.numberText}
                  onChangeText={(number) => this.setMobileNumber(number)}
                  placeholder="Saisissez un numéro de téléphone"
                  keyboardType="numeric"/>
            </View>

            <View style={{ marginBottom: 10 }}>
                <Text style={[ styles.title, { fontSize: 20 }]}> Date d'envoi : {dateString[0]} </Text>
                <Text style={[ styles.title, { fontSize: 20 }]}> Heure d'envoi : {dateString[1]} </Text>
            </View>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity
                  style={[styles.field, { flexDirection: 'column', width: '45%',}]}
                  onPress={this.displayDate}>
                    <Text style={[styles.input, { textAlign: 'center' }]}> Date </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.field, { flexDirection: 'column', width: '45%',}]}
                  onPress={this.displayTime}>
                    <Text style={[styles.input, { textAlign: 'center' }]}> Heure </Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.field, styles.input]}>
                <TextInput
                  style={{flex: 4, fontSize: 15}}
                  multiline={true}
                  value={this.state.message}
                  onChangeText={(text) => this.setMessage(text)}
                  placeholder="Message ..."/>
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={() => { this.programSms() }}>
                    <Icon name="send" color={colors.black} size={20}/>
                </TouchableOpacity>
            </View>

            {this.state.displayDate &&
            <DateTimePicker
              style={styles.datePickerStyle}
              value={date}
              mode="date"
              confirmBtnText="Confirm"
              customStyles={{
                  dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0,
                  },
                  dateInput: {
                      marginLeft: 36,
                  },
              }}
              onChange={this.setDate}
            />
            }
            {this.state.displayTime &&
                <DateTimePicker
                  style={styles.datePickerStyle}
                  value={date}
                  mode="time"
                  onChange={this.setTime}/>
            }
        </View>
      );
  }
}


const styles = StyleSheet.create({
    subContainer: {
        paddingHorizontal: 30,
        marginVertical: 20,
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
        position: 'absolute',
        right: 0,
    },
    field: {
        flexDirection:'row',
        borderWidth: 1,
        borderColor: '#E6E4E2',
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: '#E6E4E2'
    },
    input: {
        fontSize: 20,
        marginVertical: 10,
        paddingHorizontal: 20,
    },
    sendButton: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
    },
    title: {
        fontSize: 25,
        marginVertical: 10,
        fontWeight: 'bold'
    },
    datePickerStyle: {
        width: 200,
        marginTop: 20,
    },
});

export default DelayedMessage;
