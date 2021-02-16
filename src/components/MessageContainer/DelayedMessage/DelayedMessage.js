import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    PermissionsAndroid,
    TouchableOpacity,
    Dimensions, Image,
} from 'react-native';
import 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import getDate from '../../../utils/getDate';
import { AppRegistry } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon} from 'react-native-elements';
import colors from '../../../config/colors';
import Tags from 'react-native-tags';
import Contacts from 'react-native-contacts';
AppRegistry.registerHeadlessTask('SendMessage', () =>
    require('../SendMessage/SendMessage')
);

class DelayedMessage extends React.Component {
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
        phoneNumbers: [],
        message: '',
        date: new Date(),
        displayDate: false,
        displayTime: false,
        messages: [],
        isLoaded: false,
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
            console.log('test');
            this.state.phoneNumbers.map(phoneNumber => {
                // Test si le numéro de téléphone est bien composé seulement de numéros
                let isnum = /^\d+$/.test(phoneNumber);
                if (isnum) {
                    this.programSms(phoneNumber);
                }
            })
        }
    };

    programSms = async (phoneNumber) => {
        try{
            let value = {};
            value.date = this.state.date;
            value.message = this.state.message;
            value.contact = phoneNumber;
            let joined = this.state.messages;
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
            alert('Message programmé !');
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

    renderComponent = () => {
        const { date } = this.state;
        let dateString = date ? getDate(date) : 'Aucune';

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

              <View style={{ marginBottom: 10 }}>
                  <Text style={[ styles.title, { fontSize: 20 }]}> Date d'envoi : {dateString[0]} </Text>
                  <Text style={[ styles.title, { fontSize: 20 }]}> Heure d'envoi : {dateString[1]} </Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TouchableOpacity
                    style={[styles.field, { flexDirection: 'column', width: '45%',}]}
                    onPress={() => { this.setKeyValue('displayDate', true) }}>
                      <Text style={[styles.input, { textAlign: 'center' }]}> Date </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.field, { flexDirection: 'column', width: '45%',}]}
                    onPress={() => { this.setKeyValue('displayTime', true) }}>
                      <Text style={[styles.input, { textAlign: 'center' }]}> Heure </Text>
                  </TouchableOpacity>
              </View>

              <View style={[styles.field, styles.input]}>
                  <TextInput
                    style={{flex: 4, fontSize: 15}}
                    multiline={true}
                    value={this.state.message}
                    onChangeText={(text) => this.setKeyValue('message', text)}
                    placeholder="Message ..."/>
                  <TouchableOpacity
                    style={styles.sendButton}
                    onPress={() => { this.verifyPhoneNumbers() }}>
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

    render() {
        // Si on charge depuis la liste des contacts, on diffère le rendu du composant (car problème avec la librarie Tags)
        return this.state.isLoaded ? this.renderComponent() : null;
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
