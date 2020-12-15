import React from 'react';
import {Button, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundTimer from 'react-native-background-timer';

class ListeMessage extends React.Component {
    constructor(props) {
        super(props);
        this.readData();
        this.onStart();
    }

    state = {
        messages: [],
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
                console.log('test wesh')
            },
            3000);
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

        const {navigate} = this.props.navigation;

        for(let m in this.state.messages){
            const date = this.state.messages[m].date.split('T');
            date[1] = date[1].split('.');
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

        }

        return(
            <View>
                {Messages}
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
    }
});


export default ListeMessage;
