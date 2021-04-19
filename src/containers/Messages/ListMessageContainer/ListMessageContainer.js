import React from 'react';
import {StyleSheet, View, SafeAreaView, SectionList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundTimer from 'react-native-background-timer';
import SmsAndroid from 'react-native-get-sms-android';
import colors from '../../../config/colors';
import {delayedMessageNotification} from '../../../notification.android';
import CustomLabel from '../../../components/CustomLabel/CustomLabel';
import MessageItem from '../../../components/MessageItem/MessageItem';
import CustomMediumGradientAvatar
    from '../../../components/CustomAvatars/CustomMediumGradientAvatar/CustomMediumGradientAvatar';

class ListeMessageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.readData().then();
        this.onStart().then();
    }

    state = {
        messages: [],
    };

    changeStatus = async (index) => {
        try{
            let joined = this.state.messages;
            joined[index].status = "send";
            const jsonValue = JSON.stringify(joined);
            await AsyncStorage.setItem('message', jsonValue);
            this.readData();
        }catch(e){
            console.log(e);
        }
    };


    //Storer un message en JSON
    storeData = async (value) => {
        console.log(value);
        try{
            let joined = this.state.messages;
            joined.push(value);
            const jsonValue = JSON.stringify(joined);
            await AsyncStorage.setItem('message', jsonValue);
            this.readData();
        }catch (e) {
            console.log(e);
        }
    };


    //Messages Programmés
    onStart = async () => {
        BackgroundTimer.runBackgroundTimer(() => {
            for (let i  = 0; i < this.state.messages.length; i++){
                if(this.state.messages[i].status !== "send"){
                    let separate = this.state.messages[i].date.split('T');
                    separate[1] = separate[1].split('.');
                    separate[1] = separate[1][0].split(':');
                    separate[0] = separate[0].split('-');
                    let year = parseInt(separate[0][0]);
                    let month = parseInt(separate[0][1]) - 1;
                    let day = parseInt(separate[0][2]);
                    let hours = parseInt(separate[1][0]);
                    let minutes = parseInt(separate[1][1]);
                    let dateM = new Date();
                    dateM.setFullYear(year);
                    dateM.setMonth(month);
                    dateM.setDate(day);
                    dateM.setHours(hours);
                    dateM.setMinutes(minutes);
                    dateM.setSeconds(0);
                    dateM.setMilliseconds(0);
                    let dateNow = new Date();
                    let monthNow = dateNow.getMonth();
                    dateNow.setMonth(monthNow);
                    if(dateM.valueOf() < dateNow.valueOf()){
                        this.changeStatus(i);
                        SmsAndroid.autoSend(
                            this.state.messages[i].contact,
                            this.state.messages[i].message,
                            (fail) => {
                                alert('failed with this error: '+ fail);
                            },
                            (success) => {
                                delayedMessageNotification(this.state.messages[i].message, this.state.messages[i].contact);
                            },
                        );
                    }
                }
            }
        },
        60000);
    };

    //supprimer tous les messages stockés dans le téléphone
    clearMessages = async() => {
        try{
            await AsyncStorage.removeItem('message');
            console.log('All messages cleared');
        }catch(e){
            console.log('failed: ' + e);
        }
    };

    //supprimer le message en question
    deleteData = async(index) => {
        try{
            let joined = this.state.messages;
            joined.splice(index, 1);
            const jsonValue = JSON.stringify(joined);
            await AsyncStorage.setItem('message', jsonValue);
            this.readData();
        }catch(e){
            console.log('failed: ' + e);
        }
    };

    //lire les messages
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

    render(){
        const messages = [];
        const messagesSend = [];
        const { navigate } = this.props.navigation;
        this.state.messages.map(message => {
            message.status !== 'send' ? messages.push(message) : messagesSend.push(message);
        });

        const DATASET = [
            {
                type: 'programmed',
                title: 'Messages programmés',
                emptyTitle: 'Aucun message programmé',
                data: messages,
            },
            {
                type: 'sent',
                title: 'Historique des messages programmés',
                emptyTitle: 'Aucun message dans l\'historique',
                data: messagesSend,
            }
        ];

        return(
          <SafeAreaView style={styles.container}>
              <SectionList
                sections={DATASET}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item, index, section }) =>
                  <MessageItem type={section.type} item={item} index={index} last={index === section.data.length - 1} deleteData={this.deleteData}/>
                }
                renderSectionHeader={({ section: { title } }) => (
                  <View style={{ margin: 20 }}>
                      <CustomLabel text={title} position="left" />
                  </View>
                )}
                renderSectionFooter={({ section}) => {
                    if (section.data.length === 0) {
                        return <CustomLabel text={section.emptyTitle} size={18} fontType="light"/>
                    }
                }}
                contentContainerStyle={{ paddingVertical: 20}}
              />

              <View style={ styles.createButton }>
                  <CustomMediumGradientAvatar titleOrIcon={{ type: 'icon', value: { name: 'refresh', type: 'material' }}} onPressAvatar={() => this.readData()} />
              </View>
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
    createButton: {
        position: 'absolute',
        bottom: 30,
        right: 20,
    },
});


export default ListeMessageContainer;
