import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    PermissionsAndroid,
    TouchableOpacity,
    SafeAreaView, FlatList,
} from 'react-native';
import 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import getDate from '../../../utils/getDate';
import { AppRegistry } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../../config/colors';
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
import {Icon} from 'react-native-elements';
import CustomTextModal from '../../../components/CustomModals/CustomTextModal/CustomTextModal';


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
            this.getContact();
        }
    }

    state = {
        phoneNumber: '',
        phoneNumbers: [],
        message: '',
        messages: [],
        date: new Date(),
        displayDate: false,
        displayTime: false,
        toggleSwipeToClose: true,
        modalVisible: false,
        modalTitle: '',
    };



    getContact = async () => {
        const granted =  await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);
        if (granted) {
            Contacts.getContactById(this.props.contactID.contactID).then(contact => {
                this.setState({
                    phoneNumbers: [...this.state.phoneNumbers, contact.phoneNumbers[0].number],
                    contact: contact,
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

    showErrorModal = (title) => {
        this.setState({
            modalVisible: true,
            modalTitle: title,
        });
    };

    mergePhoneNumbers = () => {
        if (this.state.phoneNumber) {
            this.setState({
                phoneNumbers: [...this.state.phoneNumbers, this.state.phoneNumber],
                phoneNumber: '',
            });
        }
    };

    verifyPhoneNumbers = () => {
        this.mergePhoneNumbers();
        const { phoneNumbers, message } = this.state;
        if (!message) {
            this.showErrorModal('Champ message incomplet.')
        }
        else if (phoneNumbers.length) {
            phoneNumbers.map(phoneNumber => {
                //test si le premier caractère est un "+"
                const firstCaractere = phoneNumber.slice(0, 1);
                if (firstCaractere === "+") {
                    let lastCaractere = phoneNumber.slice(1, phoneNumber.length);
                    if (isNaN(lastCaractere)) {
                        this.programSms(phoneNumber).then();
                    } else {
                        this.showErrorModal(`Mauvais format pour le numéro de téléphone: ${lastCaractere}`)
                    }
                }
                // Test si le numéro de téléphone est bien composé seulement de numéros
                else {
                    let isNum = /^\d+$/.test(phoneNumber);
                    if (isNum) {
                        this.programSms(phoneNumber).then();
                    } else {
                        this.showErrorModal(`Mauvais format pour le numéro de téléphone: ${lastCaractere}`)
                    }
                }
            });
        }
    };

    programSms = async (phoneNumber) => {
        try{
            let value = {};
            value.date = this.state.date;
            value.message = this.state.message;
            const theNowValue = await AsyncStorage.getItem('message');
            let joined = JSON.parse(theNowValue);
            value.contact = phoneNumber;
            !joined && (joined = []);
            joined.push(value);
            const jsonValue = JSON.stringify(joined);
            await AsyncStorage.setItem('message', jsonValue);
            this.setState({
                message: '',
                messages: [],
                date: new Date(),
                displayDate: false,
                displayTime: false,
            });
            this.readData();
            Keyboard.dismiss();
            this.refs.modal1.open();

        }catch (e) {
            console.log(e);
        }
    };

    setKeyValue = (key, value) => {
        this.setState({
            [key]: value
        });
    };

    setDate = (event, date) => {
        if(date != null){
            this.setState({date: date});
        }
        this.setState({displayDate: false});
    };

    setTime = (event, date) => {
        this.setState({displayTime: false});
        if(date != null){
            const currentDate = date || this.state.date;
            this.setState({date: currentDate});
        }
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

    deleteTag = (index) => {
        let array = this.state.phoneNumbers;
        array.splice(index, 1);
        this.setKeyValue('phoneNumbers', array);
    };

    openModal = () => {
      this.refs.modal1.open();
    };

    renderHeader = () => (
      <View style={styles.subContainer}>
          <CustomLabel text="Saisir un ou plusieurs numéros de téléphone" spaceBetween={3} position="left" size={16} fontType="bold" />
          <CustomTextInputWithButton
            value={this.state.phoneNumber} onChangeTextInput={(phoneNumber) => this.setKeyValue('phoneNumber', phoneNumber)}
            icon={{ type: 'material', name: 'add' }} onPressButton={() => this.setTags(this.state.phoneNumber)} placeholder="Numéro de téléphone ..." />
      </View>
    );

    renderFooter = () => {
        const { date } = this.state;
        let dateString = date ? getDate(date) : 'Aucune';
        return (
          <>
              <View style={styles.subContainer}>
                  <CustomLabel text="Sélectionner une date et une heure d'envoi" spaceBetween={3} position="left" size={16} />
                  <CustomLabel text={`Envoi le ${dateString[0]} à ${dateString[1]}`} spaceBetween={3} position="center" size={16} fontType="light" />
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
                  <CustomLabel text="Saisir le message à envoyer" spaceBetween={3} position="left" size={16} />
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
              {this.state.displayTime && (
              <DateTimePicker
                style={styles.datePickerStyle}
                value={date}
                mode="time"
                onChange={this.setTime}/>)
              }
          </>
        )
    }

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
                  <Text style={styles.modalText}>Message programmé !</Text>
              </Modal>
          </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: colors.backGrey,
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
    datePickerStyle: {
        width: 200,
        marginTop: 20,
        backgroundColor: colors.purple,

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
    insideButton: {
        marginLeft: 5,
        alignItems:'center',
        justifyContent:'center',
    },
});

export default DelayedMessageContainer;
