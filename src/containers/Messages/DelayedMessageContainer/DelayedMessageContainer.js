import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    PermissionsAndroid,
    TouchableOpacity,
} from 'react-native';
import 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import getDate from '../../../utils/getDate';
import { AppRegistry } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../../config/colors';
import Tags from 'react-native-tags';
import Contacts from 'react-native-contacts';
import Modal from 'react-native-modalbox';
import { Keyboard } from 'react-native';
import CustomLabel from '../../../components/CustomLabel/CustomLabel';
import CustomTextInputWithButton
    from '../../../components/CustomTextInputs/CustomTextInputWithButton/CustomTextInputWithButton';
import CustomGradientTextButton
    from '../../../components/CustomButtons/CustomGradientTextButton/CustomGradientTextButton';
import fonts from '../../../config/fonts';
import LinearGradient from 'react-native-linear-gradient';


AppRegistry.registerHeadlessTask('SendMessage', () =>
    require('../SendMessage/SendMessageContainer')
);

class DelayedMessageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.readData();
    }

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
        phoneNumbers: ["Test"],
        message: '',
        date: new Date(),
        displayDate: false,
        displayTime: false,
        messages: [],
        isLoaded: false,
        toggleSwipeToClose: true,
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

    verifyPhoneNumbers = () => {
        console.log(this.state.phoneNumbers);
        console.log(this.state.message);
        if (this.state.phoneNumbers.length && this.state.message) {
            this.state.phoneNumbers.map(phoneNumber => {
                //test si le premier caractère est un "+"
                const firstCaractere = phoneNumber.slice(0, 1);
                if(firstCaractere === "+"){
                    let lastCaractere = phoneNumber.slice(1, phoneNumber.length);
                    if(isNaN(lastCaractere)){
                        this.programSms(phoneNumber).then();
                    }
                    else{
                        alert("Mauvais format pour le numéro de tel: " + lastCaractere);
                    }

                }
                // Test si le numéro de téléphone est bien composé seulement de numéros
                else{
                    let isNum = /^\d+$/.test(phoneNumber);
                    if (isNum) {
                    this.programSms(phoneNumber).then();
                    }else{
                        alert("Mauvais format pour le numéro de téléphone: " + phoneNumber);
                    }
                }


            })
        }else{
            console.log(this.state.phoneNumbers + " || " + this.state.message);
        }
    };

    programSms = async (phoneNumber) => {
        try{
            let value = {};
            value.date = this.state.date;
            value.message = this.state.message;
            const theNowValue = await AsyncStorage.getItem('message');
            const joined = JSON.parse(theNowValue);
            value.contact = phoneNumber;
            joined.push(value);
            const jsonValue = JSON.stringify(joined);
            await AsyncStorage.setItem('message', jsonValue);
            this.setState({
                phoneNumbers: [],
                message: '',
                date: new Date(),
                displayDate: false,
                displayTime: false,
                messages: []
            });
            this.readData();
            Keyboard.dismiss();
            //alert('Message programmé !');
            this.refs.modal1.open();

        }catch (e) {
            console.log(e);
        }
    };

    setKeyValue = (key, value) => {
        this.setState({
            [key]: value
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

    setTags = (tags) => {
        this.setState({
            phoneNumbers: tags
        })
    };

    openModal = () => {
      this.refs.modal1.open();
    };

    renderComponent = () => {
        const { date } = this.state;
        let dateString = date ? getDate(date) : 'Aucune';

        return (
          <View
            style={styles.container}>
              <View style={styles.subContainer}>
                  <CustomLabel text="1. Saisir un ou plusieurs numéros de téléphone" spaceBetween={3} position="left" size={16} fontType="bold" />
                  <Tags
                    initialText=""
                    initialTags={ this.state.phoneNumbers }
                    textInputProps={{
                        placeholder: "Saisissez un numéro de téléphone ..."
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
                  <CustomLabel text="2. Sélectionner une date et une heure d'envoi" spaceBetween={3} position="left" size={16} />
                  <CustomLabel text={`Date d'envoi : ${dateString[0]}`} spaceBetween={3} position="left" size={16} fontType="light" />
                  <CustomLabel text={`Heure d'envoi : ${dateString[1]}`} spaceBetween={3} position="left" size={16} fontType="light" />
              </View>

              <View style={[styles.subContainer, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                  <View style={{width: '45%'}}>
                      <CustomGradientTextButton title="Date" onPressButton={() => this.setKeyValue('displayDate', true)} />
                  </View>
                  <View style={{width: '45%'}}>
                      <CustomGradientTextButton title="Heure" onPressButton={() => this.setKeyValue('displayTime', true)} />
                  </View>
              </View>

              <View style={styles.subContainer}>
                  <CustomLabel text="3. Saisir le message à envoyer" spaceBetween={3} position="left" size={16} />
                  <CustomTextInputWithButton
                    value={this.state.message} onChangeTextInput={(message) => this.setKeyValue('message', message)}
                    icon={{ type: 'material', name: 'send' }} onPressButton={this.verifyPhoneNumbers} placeholder="Votre message ..." />
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

                <Modal ref={"modal1"} style={styles.modal1} position={"bottom"}>
                    <Text style={styles.modalText}>Message programmé !</Text>
                </Modal>
          </View>
        );
    };

    render() {
        // Si on charge depuis la liste des contacts, on diffère le rendu du composant (car problème avec la librarie Tags)
        return this.state.isLoaded ? this.renderComponent() : null
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
    datePickerStyle: {
        width: 200,
        marginTop: 20,
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

export default DelayedMessageContainer;
