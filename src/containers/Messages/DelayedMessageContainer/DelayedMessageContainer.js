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
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../../config/colors';
import Contacts from 'react-native-contacts';
import Modal from 'react-native-modalbox';
import { Keyboard } from 'react-native';
import CustomLabel from '../../../components/CustomLabel/CustomLabel/CustomLabel';
import CustomTextInputWithButton
    from '../../../components/CustomTextInputs/CustomTextInputWithButton/CustomTextInputWithButton';
import CustomGradientTextButton
    from '../../../components/CustomButtons/CustomGradientTextButton/CustomGradientTextButton';
import fonts from '../../../config/fonts';
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from 'react-native-elements';
import CustomTextModal from '../../../components/CustomModals/CustomTextModal/CustomTextModal';
import VARS from '../../../config/vars';
import CustomDropdownModal from '../../../components/CustomModals/CustomDropdownModal/CustomDropdownModal';
import connect from 'react-redux/lib/connect/connect';
import CustomTextInput from '../../../components/CustomTextInputs/CustomTextInput/CustomTextInput';
import CustomMediumGradientAvatar
    from '../../../components/CustomAvatars/CustomMediumGradientAvatar/CustomMediumGradientAvatar';
import CustomMediumAvatar from '../../../components/CustomAvatars/CustomMediumAvatar/CustomMediumAvatar';
import CustomLabelBackgroundButton
    from '../../../components/CustomLabel/CustomLabelBackgroundButton/CustomLabelBackgroundButton';


class DelayedMessageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.readData();
    }

    componentDidMount() {
        if (this.props.contactID) {
            this.getContact();
        } else if (this.props.chosenLibrary) {
            this.whichVarToFill();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.chosenLibrary !== this.props.chosenLibrary) {
            this.setState({
                varsList: [],
                vars: {},
            }, (() => {
                if (this.props.chosenLibrary) {
                    this.whichVarToFill(this.props.chosenLibrary.messages);
                } else {
                    this.resetChosenLibrary();
                }
            }));
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
        contactVisible: false,
        fromLibrary: true,
        varsList: [],
        vars: {},
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

    mergePhoneNumbers = async () => {
        if (this.state.phoneNumber) {
            await(this.setState({
                phoneNumbers: [...this.state.phoneNumbers, this.state.phoneNumber],
                phoneNumber: '',
            }));
        }
    };

    verifyPhoneNumbers = () => {
        this.mergePhoneNumbers().then(r => {
            const { phoneNumbers, message } = this.state;
            if (!message) {
                this.showErrorModal('Champ message incomplet.')
            }
            else if (phoneNumbers.length) {
                phoneNumbers.map(phoneNumber => {
                    //test si le premier caractère est un "+"
                    if (phoneNumber.slice(0, 1) === "+") {
                        if(phoneNumber.slice(1, phoneNumber.length) != null){
                            if (isNaN(phoneNumber.slice(1, phoneNumber.length))) {
                                this.programSms(phoneNumber)
                            } else {
                                this.showErrorModal(`Mauvais format pour le numéro de téléphone: ${phoneNumber.slice(1, phoneNumber.length)}`)
                            }
                        }
                    }
                    // Test si le numéro de téléphone est bien composé seulement de numéros
                    else {
                        let isNum = /^\d+$/.test(phoneNumber);
                        if (isNum) {
                            this.programSms(phoneNumber).then();
                        } else {
                            this.showErrorModal(`Mauvais format pour le numéro de téléphone: ${phoneNumber.slice(1, phoneNumber.length)}`)
                        }
                    }
                });
            } else {
                this.showErrorModal(`Informations incomplètes`);
            }
        });
    };

    verifyPhoneNumbersRandomMessage = (messages) => {
        this.mergePhoneNumbers().then(r => {
            const { phoneNumbers } = this.state;
            if (!messages.length) {
                this.showErrorModal('Champ message incomplet.')
            }
            else if (phoneNumbers.length) {
                phoneNumbers.map(phoneNumber => {
                    //test si le premier caractère est un "+"
                    if (phoneNumber.slice(0, 1) === "+") {
                        if(phoneNumber.slice(1, phoneNumber.length) != null){
                            if (isNaN(phoneNumber.slice(1, phoneNumber.length))) {
                                this.programSms(phoneNumber, messages[Math.floor(Math.random() * messages.length)]);
                            } else {
                                this.showErrorModal(`Mauvais format pour le numéro de téléphone: ${phoneNumber.slice(1, phoneNumber.length)}`);
                            }
                        }
                    }
                    // Test si le numéro de téléphone est bien composé seulement de numéros
                    else {
                        let isNum = /^\d+$/.test(phoneNumber);
                        if (isNum) {
                            this.programSms(phoneNumber, messages[Math.floor(Math.random() * messages.length)]);
                        } else {
                            this.showErrorModal(`Mauvais format pour le numéro de téléphone: ${phoneNumber.slice(1, phoneNumber.length)}`)
                        }
                    }
                });
            } else {
                this.showErrorModal(`Informations incomplètes`);
            }
        });
    };

    programSms = async (phoneNumber, message = this.state.message) => {
        try{
            let value = {};
            value.date = this.state.date;
            value.message = message;
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
            this.setState({date: date});
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

    addContact = (contact) => {
        Contacts.getContactById(contact.recordID).then(contact => {
            this.setState({
                phoneNumbers: [...this.state.phoneNumbers, contact.phoneNumbers[0].number],
                contact: contact,
            });
        });
    };

    // Convertit la chaîne du message avec les valeurs des variables personalisées en brutes
    userFriendlyString = (string, jsxElements = [], count = 0) => {
        let str = string.toString();
        let array = [str.indexOf("<%"), str.indexOf("%>")];
        let selectedVar = VARS.find((v) => v.value === str.substring(array[0] + 2, array[1]))
        if (array.every((v) => v !== -1)) {
            count++;
            jsxElements.push(<Text key={count}>{str.substring(0, array[0])}</Text>);
            if (selectedVar) {
                count++;
                jsxElements.push(<Text key={count} style={styles.textVar}>{selectedVar.label}</Text>);
            } else {
                count++;
                jsxElements.push(<Text key={count}>{str.substring(array[0], array[1] + 2)}</Text>);
            }
            return this.userFriendlyString(str.substring(array[1] + 2, string.length), jsxElements, count);
        } else {
            count++;
            return [...jsxElements, <Text key={count}>{string}</Text>]
        }
    }

    whichVarToFill = () => {
        const { messages } = this.props.chosenLibrary;
        const { varsList } = this.state;
        messages.map(message => {
            this.checkVarInMessage(message, varsList)
        });
        this.setKeyValue('varsList', varsList);
    }

    checkVarInMessage = (message, varsList = []) => {
        let array = [message.indexOf("<%"), message.indexOf("%>")];
        if (array.every((v) => v !== -1)) {
            let foundVar = message.substring(array[0], array[1] + 2)
            !varsList.includes(foundVar) && (varsList.push(foundVar));
            return this.checkVarInMessage(message.substring(array[1] + 2, message.length), varsList);
        } else {
            return varsList;
        }
    }

    resetChosenLibrary = () => {
        this.setKeyValue('varsList', []);
        this.setKeyValue('vars', {});
        this.props.setChosenLibrary();
    }

    varToLabelConverter = (value) => {
        return VARS.find(v => v.value === value.substring(2, value.length - 2)).label;
    }

    constructMessage = () => {
        // Vérification de toutes les variables nécéssaires
        let result = this.state.varsList.map(v => {
            if (!this.state.vars[v]) {
                this.showErrorModal('Variables incomplètes.')
                return false;
            }
            return true;
        });

        if (result.every(r => r === true)) {
            let { varsList } = this.state;
            let { messages } = this.props.chosenLibrary;
            let array = [];
            messages.forEach(message => {
                varsList.map(v => {
                    return message = message.replace(v, this.state.vars[v]);
                });
                array.push(message)
            });
            console.log(array)
            this.verifyPhoneNumbersRandomMessage(array);
        }
    }

    renderHeader = () => {
        let contacts = [];

        for(let i = 0; i < this.props.contacts.length; i++){
            contacts.push({label: this.props.contacts[i].displayName, value: this.props.contacts[i]});
        }

        let { contactVisible } = this.state;

        return(
        <>
            <View style={styles.subContainer}>
                <CustomLabel text={"Message différé"} position="left" size={20} />
                {
                    this.state.phoneNumber ? (
                      <CustomTextInputWithButton
                        value={this.state.phoneNumber} onChangeTextInput={(phoneNumber) => this.setKeyValue('phoneNumber', phoneNumber)}
                        icon={{type: 'material', name: 'add'}} onPressButton={() => this.setTags(this.state.phoneNumber)}
                        placeholder="Numéro de téléphone ..."/>
                    ) : (
                      <CustomTextInputWithButton
                        value={this.state.phoneNumber} onChangeTextInput={(phoneNumber) => this.setKeyValue('phoneNumber', phoneNumber)}
                        icon={{type: 'material', name: 'search'}} onPressButton={() => this.setKeyValue('contactVisible', true)}
                        placeholder="Numéro de téléphone ..."/>
                    )
                }

                <CustomDropdownModal
                visible={contactVisible}
                attributeModal={"contactVisible"}
                setKeyValue={this.setKeyValue}
                title="Ajouter un contact"
                vars={contacts}
                onSelectOption={this.addContact}
                />
            </View>
         </>
        )
    };

    renderFooter = () => {
        const { navigation, chosenLibrary } = this.props;
        const { fromLibrary, message, varsList, date, displayDate, displayTime } = this.state;
        let dateString = date ? getDate(date) : 'Aucune';

        return (
          <>
              <>
                  <View style={styles.subContainer}>
                      <CustomLabel text={"Date & heure"} position="left" size={20} />
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

                  {displayDate &&
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
                  {displayTime && (
                    <DateTimePicker
                      style={styles.datePickerStyle}
                      value={date}
                      mode="time"
                      onChange={this.setTime}/>)
                  }
              </>
              {
                  fromLibrary ? (
                    <>
                        {
                            chosenLibrary ? (
                              <>
                                  <View style={styles.subContainer}>
                                      <CustomLabel text={"Bibliothèque sélectionnée"} position="left" size={20} />
                                      <CustomLabelBackgroundButton text={chosenLibrary.name} onPressLabel={() => navigation.navigate('ListLibraryContainerFromMessage')} onPressButton={() => this.resetChosenLibrary()} icon={{ name: 'close', type: 'material' }} />
                                  </View>
                                  <View style={styles.subContainer}>
                                      {
                                          varsList.length ? (
                                            <>
                                                <CustomLabel text={"Variables à compléter"} position="left" size={20} />
                                                { varsList.map((v, index) =>
                                                  <CustomTextInput
                                                    key={index}
                                                    value={this.state.vars[v]}
                                                    spaceBetween={10}
                                                    placeholder={this.varToLabelConverter(v)}
                                                    onChangeTextInput={(text) => {
                                                        this.setState({
                                                            vars: {
                                                                ...this.state.vars,
                                                                [v]: text,
                                                            },
                                                        });
                                                    }}
                                                  /> )}
                                            </>
                                          ) : (
                                            <>
                                                <CustomLabel text={"Variables à compléter"} position="left" size={20} />
                                                <CustomLabel text="Aucune variable à compléter" size={14} fontType="light" />
                                            </>
                                          )
                                      }
                                  </View>
                              </>
                            ) : (
                              <View style={styles.subContainer}>
                                  <CustomGradientTextButton
                                    title="Sélectionner une bibliothèque"
                                    onPressButton={() => navigation.navigate('ListLibraryContainerFromMessage')}
                                  />
                              </View>
                            )
                        }
                    </>
                  ) : (
                    <>
                        <View style={styles.subContainer}>
                            <CustomTextInput
                              value={message} onChangeTextInput={(message) => this.setKeyValue('message', message)} placeholder="Votre message ..." />
                        </View>

                        {/*<View style={styles.subContainer}>*/}
                        {/*  <View style={styles.button}>*/}
                        {/*    <CustomMediumGradientAvatar titleOrIcon={{ type: 'icon', value:{ type: 'material', name: 'camera' }}} onPressAvatar={this.openCameraPicker} />*/}
                        {/*  </View>*/}
                        {/*</View>*/}
                    </>
                  )
              }
          </>
        )
    };

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

              <View style={styles.switchButton}>
                  {
                      this.state.fromLibrary ? (
                        <CustomMediumGradientAvatar
                          titleOrIcon={{ type: 'icon', value: { type: 'material-community', name: 'bookshelf' }}}
                          onPressAvatar={() => this.setKeyValue('fromLibrary', !this.state.fromLibrary)} />
                      ) : (
                        <CustomMediumAvatar
                          background={{backgroundColor: colors.grey}}
                          color={{ color: colors.white }}
                          titleOrIcon={{ type: 'icon', value: { type: 'material-community', name: 'bookshelf', color: colors.backGrey }}}
                          onPressAvatar={() => this.setKeyValue('fromLibrary', !this.state.fromLibrary)} />
                      )
                  }
              </View>

              <View style={styles.sendButton}>
                  <CustomMediumGradientAvatar
                    titleOrIcon={{ type: 'icon', value:{ type: 'material', name: 'send' }}}
                    onPressAvatar={this.state.fromLibrary ? () => this.constructMessage() : () => this.verifyPhoneNumbers()} />
              </View>

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
    sendButton: {
        position: 'absolute',
        bottom: 30,
        right: 20,
    },
    switchButton: {
        position: 'absolute',
        bottom: 100,
        right: 20,
    },
});

const mapStateToProps = (state) => {
    return {
        contacts: state.manageContacts.contacts,
    }
};

export default connect(mapStateToProps)(DelayedMessageContainer);
