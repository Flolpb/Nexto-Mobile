import React from 'react';
import {Button, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundTimer from 'react-native-background-timer';
import SmsAndroid from 'react-native-get-sms-android';

class ListeMessage extends React.Component {
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
                                console.log('SMS sent successfully');
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
        })

        return(
          <>
              <SafeAreaView
                style={styles.container}>
                  <View>
                      <Text style={styles.titre}>Liste des messages programmés</Text>
                  </View>
                  { messages.length ? (
                    <FlatList
                      data={messages}
                      keyExtractor={(item, index) => index + 'SEND'}
                      renderItem={({item, index}) => (
                        <TouchableOpacity style={styles.bloc} onPress={() => navigate('Différé')}>
                            <Text>{ item.message }</Text>
                            <Text>{ item.contact }</Text>
                            <View style={styles.date}>
                                <Text>{item.date.split('T')[1].slice(0,5)}</Text>
                                <Text>{item.date.split('T')[0]}</Text>
                            </View>
                            <Button title="supprimer" onPress={() => this.deleteData(index)}/>
                        </TouchableOpacity>
                      )}/>
                  ) : (
                    <Text style={styles.emptyListText}> Aucun message prêt à envoyer </Text>
                  )}

                  <View>
                      <Text style={styles.titre}>Historique des messages envoyés</Text>
                  </View>

                  { messagesSend.length ? (
                    <FlatList
                      data={messagesSend}
                      keyExtractor={(item, index) => index + 'SENT'}
                      renderItem={({item, index}) => (
                        <TouchableOpacity style={styles.bloc} onPress={() => navigate('Différé')}>
                            <Text>{ item.message }</Text>
                            <Text>{ item.contact }</Text>
                            <View style={styles.date}>
                                <Text>{item.date.split('T')[1].slice(0,5)}</Text>
                                <Text>{item.date.split('T')[0]}</Text>
                            </View>
                            <Button title="supprimer" onPress={() => this.deleteData(index)}/>
                        </TouchableOpacity>
                      )}/>
                  ) : (
                    <Text style={styles.emptyListText}> Aucun message envoyé récemment </Text>
                  )}

                  <Button title="Programmer un nouveau message !" onPress={() => navigate('Différé')}/>
                  <Button title="Actualiser" onPress={() => this.readData()}/>
              </SafeAreaView>
          </>
        )
    }

}

const styles = StyleSheet.create({
    bloc: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        margin: 5
    },
    date: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    titre: {
        fontSize: 20,
        marginVertical: 10,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    border: {
        backgroundColor: 'black',
        width: '90%',
        height: 2,
    },
    center: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    emptyListText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500'
    }
});


export default ListeMessage;
