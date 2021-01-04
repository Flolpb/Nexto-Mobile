import React from 'react';
import {StyleSheet, TextInput, Text, View, TouchableOpacity, PermissionsAndroid, Button} from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';
import colors from '../../../config/colors';
import {Icon} from 'react-native-elements';
import Contacts from 'react-native-contacts';
import Tags from 'react-native-tags';

class DirectMessage extends React.Component {
  componentDidMount() {
    if (this.props.contactID) {
      this.getContact()
    } else {
      this.setState({
        isLoaded: true,
      })
    }
  }

  state = {
    phoneNumbers: [],
    isLoaded: false,
    message: '',
  }

  setKeyValue = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  setTags = (tags) => {
    this.setState({
      phoneNumbers: tags
    })
  }

  sendSms = () => {
    if (this.state.phoneNumbers.length && this.state.message) {
      this.state.phoneNumbers.map(phoneNumber => {
        // Test si le numéro de téléphone est bien composé seulement de numéros
        let isnum = /^\d+$/.test(phoneNumber);
        if (isnum) {
          SmsAndroid.autoSend(
            phoneNumber,
            this.state.message,
            (fail) => {
              alert('failed with this error: '+ fail);
            },
            (success) => {
              alert('SMS sent successfully');
              this.setState({
                message: '',
              })
            },
          );
        }
      })
    } else {
      alert('Informations incomplètes.')
    }
  };

  getContact = async () => {
    const granted =  await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);
    if (granted) {
      Contacts.getContactById(this.props.contactID.contactID).then(contact => {
        this.setState({
          phoneNumbers: [...this.state.phoneNumbers, contact.phoneNumbers[0].number],
          contact: contact,
          isLoaded: true,
        });
      });
    }
  }

  renderComponent = () => {
    return(
      <View
        style={ styles.subContainer }>
        <Text
          style={ styles.title }>
          Envoi d'un message instantané
        </Text>

        <Tags
          initialText=""
          initialTags={ this.state.phoneNumbers }
          textInputProps={{
            placeholder: "Saisissez un numéro de téléphone ..."
          }}
          onChangeTags={tags => this.setTags(tags)}
          inputContainerStyle={{ backgroundColor: 'rgba(0,0,0,0)', marginVertical: 10 }}
          containerStyle={styles.tagContainer}
          inputStyle={{ fontSize: 15 }}
          renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
            <TouchableOpacity key={`${tag}-${index}`} onPress={onPress}>
              <Text style={styles.tag}>{tag}</Text>
            </TouchableOpacity>
          )}/>

        <View style={styles.input}>
          <TextInput
            style={{ flex: 4, fontSize: 15 }}
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

  render() {
    // Si on charge depuis la liste des contacts, on diffère le rendu du composant (car problème avec la librarie Tags)
    return this.state.isLoaded ? this.renderComponent() : null;
  }
}

const styles = StyleSheet.create({
  input: {
    flexDirection:'row',
    fontSize: 20,
    borderWidth: 1,
    borderColor: 'rgba(20,20,20,0.2)',
    borderRadius: 30,
    marginVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(20,20,20,0.05)'
  },
  tagContainer: {
    flexDirection:'row',
    borderWidth: 1,
    borderColor: 'rgba(20,20,20,0.2)',
    borderRadius: 30,
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(20,20,20,0.05)'
  },
  tag: {
    borderWidth: 1,
    borderRadius: 30,
    marginVertical: 5,
    marginRight: 5,
    paddingVertical: 5,
    paddingHorizontal: 12,
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
    textAlign: 'center',
  }
});
export default DirectMessage;
