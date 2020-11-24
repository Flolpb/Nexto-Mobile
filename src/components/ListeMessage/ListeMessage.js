import React from 'react';
import {Button, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ListeMessage extends React.Component {
    constructor(props) {
        super(props);
        this.readData();
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
            Messages.push(
                <View style={styles.bloc}>
                    <Text>{this.state.messages[m].message}</Text>
                    <Text>{this.state.messages[m].contact}</Text>
                    <Text>{this.state.messages[m].date}</Text>
                </View>
            );
        }


        return(
            <View>
                <TouchableOpacity onPress={() => navigate('Message')}>
                    <View style={styles.bloc}>
                        <Text>Description du message</Text>
                        <Text>Contact</Text>
                        <Text>Date/Heure</Text>
                    </View>
                </TouchableOpacity>
                {Messages}
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
    }
});


export default ListeMessage;
