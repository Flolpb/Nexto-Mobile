import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  SafeAreaView, FlatList, Button,
} from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';
import colors from '../../../config/colors';
import {Icon} from 'react-native-elements';
import Contacts from 'react-native-contacts';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modalbox';
import { Keyboard } from 'react-native';
import CustomLabel from '../../../components/CustomLabel/CustomLabel';
import fonts from '../../../config/fonts';
import CustomTextInputWithButton
  from '../../../components/CustomTextInputs/CustomTextInputWithButton/CustomTextInputWithButton';
import CustomMediumGradientAvatar
  from '../../../components/CustomAvatars/CustomMediumGradientAvatar/CustomMediumGradientAvatar';
import LinearGradient from 'react-native-linear-gradient';
import CustomTextModal from '../../../components/CustomModals/CustomTextModal/CustomTextModal';
import CustomDropdownModal from '../../../components/CustomModals/CustomDropdownModal/CustomDropdownModal';
import connect from 'react-redux/lib/connect/connect';
import CustomGradientTextButton
  from '../../../components/CustomButtons/CustomGradientTextButton/CustomGradientTextButton';

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
    phoneNumber: '',
    phoneNumbers: [],
    isLoaded: false,
    message: '',
    modalVisible: false,
    modalTitle: '',
    contactVisible: false
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

  setTags = (tag) => {
    if (tag) {
      this.setState({
        phoneNumbers: [...this.state.phoneNumbers, tag],
        phoneNumber: '',
      })
    } else {
      this.showErrorModal('Champ numéro de téléphone incomplet.')
    }
  };

  mergePhoneNumbers = () => {
    if (this.state.phoneNumber) {
      this.setState({
        phoneNumbers: [...this.state.phoneNumbers, this.state.phoneNumber],
        phoneNumber: '',
      });
    }
  };


  deleteTag = (index) => {
    let array = this.state.phoneNumbers;
    array.splice(index, 1);
    this.setKeyValue('phoneNumbers', array);
  };

  sendSms = () => {
    this.mergePhoneNumbers();
    const { phoneNumbers, message } = this.state
    if (!message) {
      this.showErrorModal('Champ message incomplet.')
    } else if (phoneNumbers.length) {
          this.state.phoneNumbers.map(phoneNumber => {
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
                    Keyboard.dismiss();
                    this.setState({
                      message: '',
                    });

                    this.refs.modal1.open();
                  },
              );
            }
            else{
              this.showErrorModal(`Mauvais format pour le numéro de téléphone: ${lastCaractere}`)
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
              this.showErrorModal(`Mauvais format pour le numéro de téléphone: ${phoneNumber}`)
            }
          }

        });
    } else {
      this.showErrorModal(`Informations incomplètes`)
    }
  };


  addContact = (contact) => {
    Contacts.getContactById(contact.recordID).then(contact => {
      this.setState({
        phoneNumbers: [...this.state.phoneNumbers, contact.phoneNumbers[0].number],
        contact: contact,
      });
    });
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

  showErrorModal = (title) => {
    this.setState({
      modalVisible: true,
      modalTitle: title,
    });
  };

  renderHeader = () => {
    let contacts = [];

    for(let i = 0; i < this.props.contacts.length; i++){
      contacts.push({label: this.props.contacts[i].displayName, value: this.props.contacts[i]});
    }

    let { contactVisible } = this.state;

    return(
    <View style={styles.subContainer}>
      <CustomLabel text="Saisir un ou plusieurs numéros de téléphone" spaceBetween={3} position="left" size={16}
                   fontType="bold"/>
      <CustomTextInputWithButton
          value={this.state.phoneNumber}
          onChangeTextInput={(phoneNumber) => this.setKeyValue('phoneNumber', phoneNumber)}
          icon={{type: 'material', name: 'add'}} onPressButton={() => this.setTags(this.state.phoneNumber)}
          placeholder="Numéro de téléphone ..."/>

      <CustomGradientTextButton title="Ajouter un contact" onPressButton={() => this.setKeyValue('contactVisible', true)} />
      <CustomDropdownModal
          visible={contactVisible}
          attributeModal={"contactVisible"}
          setKeyValue={this.setKeyValue}
          title="Ajouter un contact"
          vars={contacts}
          onSelectOption={this.addContact}
      />
    </View>
    )
  };

  renderFooter = () => (
    <>
      <View style={styles.subContainer}>
        <CustomLabel text="Saisir le message à envoyer" spaceBetween={3} position="left" size={16} fontType="bold" />
        <CustomTextInputWithButton
          value={this.state.message} onChangeTextInput={(message) => this.setKeyValue('message', message)}
          icon={{ type: 'material', name: 'send' }} onPressButton={this.sendSms} placeholder="Votre message ..." />
      </View>

      <View style={styles.subContainer}>
        <View style={styles.button}>
          <CustomMediumGradientAvatar titleOrIcon={{ type: 'icon', value:{ type: 'material', name: 'camera' }}} onPressAvatar={this.openCameraPicker} />
        </View>
      </View>
    </>
  );


  render() {
    const { modalVisible, modalTitle } = this.state;
    return(
      <SafeAreaView style={styles.container}>
        <CustomTextModal visible={modalVisible} setKeyValue={this.setKeyValue} title={modalTitle} icon={'error-outline'} />
        <FlatList
          numColumns={2}
          columnWrapperStyle={styles.flatListColumns}
          data={this.state.phoneNumbers}
          contentContainerStyle={styles.flatList}
          keyExtractor={(item, index) => index}
          removeClippedSubviews={false}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          renderItem={({item, index}) => (
            <LinearGradient
              key={index}
              colors={[colors.lightpurple, colors.purple]}
              start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
              style={styles.tagStructure}>
              <Text style={styles.tag}>{item}</Text>
              <TouchableOpacity onPress={() => this.deleteTag(index)} style={styles.insideButton}>
                <Icon type="material" name="close" color={colors.white} size={16}/>
              </TouchableOpacity>
            </LinearGradient>
          )}
        />
        <Modal ref={"modal1"} style={styles.modal1} position={"bottom"}>
          <Text style={styles.modalText}>Message envoyé !</Text>
        </Modal>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backGrey,
    flexGrow: 1,
    justifyContent: 'center'
  },
  flatList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  flatListColumns: {
    alignSelf: 'center'
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
  tagStructure: {
    flexDirection:'row',
    borderRadius: 30,
    fontSize: 20,
    margin: 5,
    paddingHorizontal: 20,
  },
  tag: {
    marginVertical: 5,
    paddingVertical: 5,
    color: colors.white,
    fontFamily: fonts.medium,
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
  insideButton: {
    marginLeft: 5,
    alignItems:'center',
    justifyContent:'center',
  },
});

const mapStateToProps = (state) => {
  return {
    contacts: state.manageContacts.contacts,
  }
};

export default connect(mapStateToProps)(DirectMessage);
