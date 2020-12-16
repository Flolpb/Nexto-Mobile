import React, {Component} from 'react'
import {Button, StyleSheet, Text, View} from 'react-native'

class LogInForm extends React.Component{

    constructor(props)
    {
        super(props)
        this.state = {
            username: "testname",
            password: "passwtest"
        }
    }

    
    render(){
        return(
            <View>
                <Button
                    title="Tester"
                    onPress={() => {this.props.onLogIn(this.state.username)}}
                />
            </View>
        )
    }
}

export default LogInForm