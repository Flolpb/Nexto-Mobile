import React from 'react';
import {Button, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundTimer from 'react-native-background-timer';
import SmsAndroid from 'react-native-get-sms-android';

class ListeMessage extends React.Component {
    constructor(props) {
        super(props);
        this.readData();
        this.onStart();
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


    onStart = () => {
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
                        console.log('envoi du message: ' + this.state.messages[i].message);
                        SmsAndroid.autoSend(
                            this.state.messages[i].contact,
                            this.state.messages[i].message,
                            (fail) => {
                                alert('failed with this error: '+ fail);
                            },
                            (success) => {
                                console.log('SMS sent successfully');
                                this.changeStatus(i);
                            },
                        );
                    }else{
                        console.log(dateM + ' < ' + dateNow);
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
            console.log(this.state.messages);
            let joined = this.state.messages;
            joined.splice(index, 1);
            const jsonValue = JSON.stringify(joined);
            await AsyncStorage.setItem('message', jsonValue);
            this.readData();
            console.log(this.state.messages);
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

        const Messages = [];
        const MessagesSend = [];

        const {navigate} = this.props.navigation;

        for(let m in this.state.messages){
            const date = this.state.messages[m].date.split('T');
            date[1] = date[1].split('.');
            if(this.state.messages[m].status !== 'send'){
                Messages.push(
                    <TouchableOpacity onPress={() => navigate('Message')}>
                        <View style={styles.bloc}>
                            <Text>{this.state.messages[m].message}</Text>
                            <Text>{this.state.messages[m].contact}</Text>
                            <View style={styles.date}>
                                <Text>{date[1][0]}</Text>
                                <Text>{date[0]}</Text>
                            </View>
                            <Button title="supprimer" onPress={() => this.deleteData(m)}/>
                        </View>
                    </TouchableOpacity>
                );
            }else{
                MessagesSend.push(
                    <TouchableOpacity onPress={() => navigate('Message')}>
                        <View style={styles.bloc}>
                            <Text>{this.state.messages[m].message}</Text>
                            <Text>{this.state.messages[m].contact}</Text>
                            <View style={styles.date}>
                                <Text>{date[1][0]}</Text>
                                <Text>{date[0]}</Text>
                            </View>
                            <Button title="supprimer" onPress={() => this.deleteData(m)}/>
                        </View>
                    </TouchableOpacity>
                );
            }
        }

        return(
            <View>
                {Messages[0] &&
                <View><Text style={styles.titre}>Liste des messages programmés</Text></View>}
                {Messages}
                {MessagesSend[0] && <View><View style={styles.center}><View style={styles.border}/></View><Text style={styles.titre}>Historique des messages envoyés</Text></View>}
                {MessagesSend}
                <Button title="Programmer un nouveau message !" onPress={() => navigate('Message')}/>
            </View>
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
        textAlign: 'center',
        fontSize: 20,
        padding: 5
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
    }
});


export default ListeMessage;
