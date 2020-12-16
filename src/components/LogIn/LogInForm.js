import React, {Component, useState} from 'react'
import {Button, StyleSheet, TextInput, View, Text} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

class LogInForm extends React.Component{

    constructor(props)
    {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }
    
    handleChangeUsername = (userName) => {       
        this.setState({username: userName})       
    }

    handleChangePassword = (passWord) => {
        this.setState({password: passWord})
    }

    render(){

        return(
            <View style={styles.main_container}>

                <Text style={styles.title}>Nexto</Text>

                <View style={styles.form_container}>
                    <TextInput
                        style={{height: 40}}
                        placeholder="Username"
                        onChangeText={text => this.handleChangeUsername(text)}
                        defaultValue={this.state.username}
                    />
                    <TextInput
                        style={{height: 40}}
                        placeholder="Password"
                        onChangeText={text =>this.handleChangePassword(text)}
                        defaultValue={this.state.password}
                    />
                    <TouchableOpacity
                        style={styles.form_button}
                        onPress={() => {this.props.onLogIn(this.state.username)}}
                    >

                        <Text style={styles.form_button_text}>Se connecter</Text>

                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        color: 'white',
        textAlign: 'center',
        fontSize: 40,
        fontWeight: "700",
        marginBottom: 50,
    },
    form_container: {
        backgroundColor: '#ffffff',
        width: '80%',
        height: '45%',
        shadowColor: 'rgba(0,0,0,.2)',
        shadowOffset: {width: 30, height: 15},
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    main_container: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    form_button: {
        backgroundColor: 'black',
        borderRadius: 40,
        width: 150,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    form_button_text: {
        color: '#fff',
    },
});

export default LogInForm
