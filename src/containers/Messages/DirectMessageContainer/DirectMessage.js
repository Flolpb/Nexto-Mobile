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
import fonts from '../../../config/fonts';
import CustomTextInput from '../../../components/CustomTextInputs/CustomTextInput/CustomTextInput';
import CustomTextInputWithButton
  from '../../../components/CustomTextInputs/CustomTextInputWithButton/CustomTextInputWithButton';
import CustomMediumGradientAvatar
  from '../../../components/CustomAvatars/CustomMediumGradientAvatar/CustomMediumGradientAvatar';
import LinearGradient from 'react-native-linear-gradient';

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
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <CustomLabel text="1. Saisir un ou plusieurs numéros de téléphone" spaceBetween={3} position="left" size={16} fontType="bold" />
          <Tags
            initialText=""
            initialTags={this.state.phoneNumbers}
            textInputProps={{
              placeholder: "Numéro(s) de téléphone ..."
            }}
            onChangeTags={tags => this.setTags(tags)}
            inputContainerStyle={{ backgroundColor: 'rgba(0,0,0,0)', marginVertical: 10 }}
            containerStyle={[styles.field, styles.tagContainer]}
            inputStyle={styles.tagInput}
            renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
              <LinearGradient
                colors={[colors.lightpurple, colors.purple]}
                start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                style={styles.tagStructure}>
                <TouchableOpacity key={`${tag}-${index}`} onPress={onPress}>
                  <Text style={styles.tag}>{tag}</Text>
                </TouchableOpacity>
              </LinearGradient>
            )}/>
        </View>


        <View style={styles.subContainer}>
          <CustomLabel text="2. Saisir le message à envoyer" spaceBetween={3} position="left" size={16} fontType="bold" />
          <CustomTextInputWithButton
            value={this.state.message} onChangeTextInput={(message) => this.setKeyValue('message', message)}
            icon={{ type: 'material', name: 'send' }} onPressButton={this.sendSms} placeholder="Votre message ..." />
        </View>

        <View style={styles.subContainer}>
          <View style={styles.button}>
            <CustomMediumGradientAvatar titleOrIcon={{ type: 'icon', value:{ type: 'material', name: 'camera' }}} onPressAvatar={this.openCameraPicker} />
          </View>
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
  container: {
    flex: 1,
    backgroundColor: colors.backGrey,
    flexGrow: 1,
    justifyContent: 'center'
  },
  subContainer: {
    paddingHorizontal: 30,
    marginVertical: 5,
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
    borderColor: colors.lightgrey,
    borderRadius: 20,
    backgroundColor: colors.lightgrey,
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
  tagStructure: {
    flexDirection:'row',
    borderRadius: 30,
    fontSize: 20,
    marginVertical: 10,
    paddingHorizontal: 20,
    marginRight: 5
  },
  tag: {
    marginVertical: 5,
    paddingVertical: 5,
    color: colors.white,
    fontFamily: fonts.medium,
  },
  tagInput: {
    fontSize: 15,
    fontFamily: fonts.light,
  },
  modal1: {
    backgroundColor: colors.purple,
    height: 80,
    justifyContent: 'center',
  },
  modalText: {
    color: colors.white,
    fontSize: 32,
    textAlign: 'center'
  },
  button: {
    alignItems: 'center',
    justifyContent:'center',
  },
});
export default DirectMessage;
