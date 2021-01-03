import React from 'react';
import {StyleSheet, TextInput, Text, View, TouchableOpacity, PermissionsAndroid} from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';
import colors from '../../../config/colors';
import {Icon} from 'react-native-elements';
import Contacts from 'react-native-contacts';

class DirectMessage extends React.Component {
  constructor(props) {
    super(props);
    if (props.contactID) this.getContact()
  }

  state = {
    phoneNumber: null
  }

  setKeyValue = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  sendSms = () => {
    if (this.state.phoneNumber && this.state.message) {
      SmsAndroid.autoSend(
        this.state.phoneNumber,
        this.state.message,
        (fail) => {
          alert('failed with this error: '+ fail);
        },
        (success) => {
          alert('SMS sent successfully');
        },
      );
    } else {
      alert('Informations incomplètes.')
    }
  };

  getContact = async () => {
    const granted =  await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);

    if (granted) {
      Contacts.getContactById(this.props.contactID.contactID).then(contact => {
        this.setState({
          phoneNumber: contact.phoneNumbers[0].number,
          contact: contact
        })
      })
    }
  }

  render() {
    return(
      <View
      style={ styles.subContainer }>
        <Text
        style={ styles.title }>
          Envoi d'un message instantané
        </Text>
        <View style={styles.input}>
          <TextInput
            value={this.state.phoneNumber}
            onChangeText={(phoneNumber) => this.setKeyValue('phoneNumber', phoneNumber)}
            placeholder="Saisissez un numéro de téléphone ..."
            keyboardType="numeric"/>
        </View>
        <View style={styles.input}>
          <TextInput
            style={{ flex: 4 }}
            multiline={true}
            value={this.state.message}
            onChangeText={(message) => this.setKeyValue('message', message)}
            placeholder="Message ..." />
          <TouchableOpacity
            style={ styles.sendButton }
            onPress={ ()=>{ this.sendSms() }}>
            <Icon name="send" color={colors.black} size={20} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    flexDirection:'row',
    borderWidth: 1,
    borderColor: 'rgba(20,20,20,0.2)',
    borderRadius: 30,
    marginVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(20,20,20,0.05)'
  },
  subContainer: {
    marginHorizontal: 30,
    marginVertical: 20,
  },
  sendButton: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  }
});
export default DirectMessage;
