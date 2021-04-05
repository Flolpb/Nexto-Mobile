import React from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  Dimensions,
} from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';
import colors from '../../../config/colors';
import {Icon} from 'react-native-elements';
import Contacts from 'react-native-contacts';
import Tags from 'react-native-tags';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modalbox';
import { Keyboard } from 'react-native';
import CustomLabel from '../../../components/CustomLabel/CustomLabel';
import CustomIconButton from '../../../components/CustomButtons/CustomIconButton/CustomIconButton';

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
  };

  askPermissions = async () => {
    try{
      const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA
      );
    }catch(e){
      console.log(e);
    }
  };

  openCameraPicker = async () => {
    const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
    if(granted){
      ImagePicker.openCamera({
        width: 200,
        height: 200,
        cropping: true,
      }).then(image => {
        console.log(image);
      });
    }else{
      const grant = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA
      );
      if(grant){
        ImagePicker.openCamera({
          width: 200,
          height: 200,
          cropping: true,
        }).then(image => {
          console.log(image);
        });
      }
    }
  };

  setKeyValue = (key, value) => {
    this.setState({
      [key]: value
    })
  };

  setTags = (tags) => {
    this.setState({
      phoneNumbers: tags
    })
  }

  sendSms = () => {
    if (this.state.phoneNumbers.length && this.state.message) {
      this.state.phoneNumbers.map(phoneNumber => {
        // Test si le numéro de téléphone est bien composé seulement de numéros
        if (this.state.phoneNumbers.length && this.state.message) {
          this.state.phoneNumbers.map(phoneNumber => {
            //test si le premier caractère est un "+"
            const firstCaractere = phoneNumber.slice(0, 1);
            if(firstCaractere === "+"){
              let lastCaractere = phoneNumber.slice(1, phoneNumber.length);
              if(isNaN(lastCaractere)){
                SmsAndroid.autoSend(
                    phoneNumber,
                    this.state.message,
                    (fail) => {
                      alert('failed with this error: '+ fail);
                    },
                    (success) => {
                      //alert('SMS sent successfully');
                      Keyboard.dismiss();
                      this.setState({
                        message: '',
                      });

                      this.refs.modal1.open();
                    },
                );
              }
              else{
                alert("Mauvais format pour le numéro de tel: " + lastCaractere);
              }

            }
            // Test si le numéro de téléphone est bien composé seulement de numéros
            else{
              let isNum = /^\d+$/.test(phoneNumber);
              if (isNum) {
                SmsAndroid.autoSend(
                    phoneNumber,
                    this.state.message,
                    (fail) => {
                      alert('failed with this error: '+ fail);
                    },
                    (success) => {

                      Keyboard.dismiss();
                      this.setState({
                        message: '',
                      });

                      this.refs.modal1.open();
                    },
                );
              }else{
                alert("Mauvais format pour le numéro de téléphone: " + phoneNumber);
              }
            }

          });
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
        <Image
          source={require('../../../assets/images/Illustration_mobile.png')}
          style={[styles.image, { width: Dimensions.get('window').width - 150 }]} />
        <CustomLabel text="Envoi d'un message instantané" />
        <Tags
          initialText=""
          initialTags={ this.state.phoneNumbers }
          textInputProps={{
            placeholder: "Saisissez un numéro de téléphone ..."
          }}
          onChangeTags={tags => this.setTags(tags)}
          inputContainerStyle={{ backgroundColor: 'rgba(0,0,0,0)', marginVertical: 10 }}
          containerStyle={[styles.field, styles.tagContainer]}
          inputStyle={{ fontSize: 15 }}
          renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
            <TouchableOpacity key={`${tag}-${index}`} onPress={onPress}>
              <Text style={styles.tag}>{tag}</Text>
            </TouchableOpacity>
          )}/>

        <View style={[styles.field, styles.input]}>
          <TextInput
            style={{ flex: 4, fontSize: 15 }}
            multiline={true}
            value={this.state.message}
            onChangeText={(message) => this.setKeyValue('message', message)}
            placeholder="Message ..." />
          <CustomIconButton icon={{ type: 'material', name: 'send' }} onPressButton={this.sendSms} />
        </View>

        <View style={{flex: 0.3}}>
          <CustomIconButton icon={{ type: 'material', name: 'camera' }} color={colors.favorites} size={50} onPressButton={this.openCameraPicker} />
        </View>


        <Modal ref={"modal1"} style={styles.modal1} position={"bottom"}>
          <Text style={styles.modalText}>Message envoyé !</Text>
        </Modal>

      </View>
    )
  }

  render() {
    // Si on charge depuis la liste des contacts, on diffère le rendu du composant (car problème avec la librarie Tags)
    return this.state.isLoaded ? this.renderComponent() : null;
  }
}

const styles = StyleSheet.create({
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
  tagContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
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
    paddingHorizontal: 30,
    marginVertical: 0,
    height: '100%',
  },
  modal1: {
    backgroundColor: colors.purple,
    height: 80,
    justifyContent: 'center',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  modalText: {
    color: colors.white,
    fontSize: 32,
    textAlign: 'center'
  },
});
export default DirectMessage;
