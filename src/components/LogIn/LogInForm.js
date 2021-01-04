import React, {Component, useState} from 'react'
import {
    Button,
    StyleSheet,
    TextInput,
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageBackground,
    Dimensions,
} from 'react-native';
import colors from '../../config/colors';

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
                <View style={styles.imageContainer}>
                    <Image
                      source={require('../../assets/images/bulle.png')}
                      style={[styles.image, { width: Dimensions.get('window').width - 100 }]} />

                    <Text style={ styles.titleContainer }>
                        <Text style={[styles.title, { fontWeight: 'bold', fontSize: 80 }]}>N</Text>
                        <Text style={styles.title}>exto</Text>
                    </Text>
                </View>

                <View style={styles.imageContainer}>
                    <Image
                      source={require('../../assets/images/logoNormal.png')}
                      style={[styles.image, { width: Dimensions.get('window').width - 220 }]} />
                </View>

                <View style={styles.form_container}>
                    <TextInput
                        style={[styles.formShape, styles.formInput, {letterSpacing: 1}]}
                        placeholder="Identifiant"
                        onChangeText={text => this.handleChangeUsername(text)}
                        defaultValue={this.state.username}/>
                    <TextInput
                        style={[styles.formShape, styles.formInput, {letterSpacing: 0}]}
                        textContentType='password'
                        secureTextEntry={true}
                        placeholder="Mot de passe"
                        onChangeText={text =>this.handleChangePassword(text)}
                        defaultValue={this.state.password}/>
                    <TouchableOpacity
                        style={[styles.formShape, styles.formButton]}
                        onPress={() => {this.props.onLogIn(this.state.username)}}>
                        <Text style={styles.formButtonText}>Se connecter</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
    },
    titleContainer: {
        position: 'absolute',
        paddingBottom: 25
    },
    title: {
        color: 'white',
        textAlign: 'center',
        fontSize: 70,
    },
    formShape: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        paddingVertical: 13,
        elevation: 8,
    },
    formInput: {
        textAlign: 'center',
        backgroundColor: colors.white,
        color: colors.backGrey,
        width: '100%',
        fontSize: 18,

    },
    formButton: {
        backgroundColor: colors.purple,
        width: '75%',
    },
    formButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    form_container: {
        width: '80%',
        height: '45%',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        elevation: 5,
    },
    main_container: {
        backgroundColor: colors.backGrey,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
});

export default LogInForm
