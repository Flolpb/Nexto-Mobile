import React from 'react';
import Navigation from './Navigation';
import LogInContainer from '../containers/Logger/LogInContainer/LogInContainer';
import { connect } from 'react-redux'
import LoggerNavigation from './LoggerNavigation';
import UserHelper from '../helpers/UserHelper/UserHelper';
import AuthHelper from '../helpers/UserHelper/AuthHelper';
import StorageHelper from '../helpers/UserHelper/StorageHelper';
import API from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';


class LoggedSwitchNavigation extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
        }
    }

    async componentDidMount()
    {
      if(await API.VALID_TOKEN() !== null)
      {
        AuthHelper.remember()
        .then(async (data) => {
          if(data.type === "success")
          {
            this.toggleLogIn(data.mail)
            /* Keep User Id */
            StorageHelper._storeUserId(r.id)
          }
        })
      }
    }
    

    handleRegister = async (username, mail, firstname, name, phone_number, password) => {
      const registerRequest = {
        'username': username,
        'mail': mail,
        'firstname': firstname,
        'name': name,
        'phone_number': phone_number,
        'password': password,
      }

      AuthHelper.register(registerRequest)
      .then(async (res) => {

        if(res.registered)
          {
            /* Navigation */
            this.toggleLogIn(mail)

            /* Keep Token */
            StorageHelper._storeToken(res.token)

            /* Keep User Id */
            StorageHelper._storeUserId(res.id)
          }
        else{
          // Message d'erreur 
          console.log(res.message)
        }
      });
    }

    toggleLogIn = (mail) => {
      const action = { type: "TOGGLE_LOGIN", mail: mail }
      this.props.dispatch(action)
    }

    handleLogIn = async (mail, password) => {

        const loginRequest = {
          'mail': mail,
          'password': password,
        }

        AuthHelper.login(loginRequest)
        .then(async (r) => {

          if(r.logged)
          {
            /* Navigation */
            this.toggleLogIn(mail)

            /* Keep Token */
            StorageHelper._storeToken(r.token)

            /* Keep User Id */
            StorageHelper._storeUserId(r.id)
          }
          
        });
        
    }

    render(){
        return (
          <>
              { this.props.isLogged
                ? <Navigation onLogOut={this._clearToken} />
                : <LoggerNavigation onLogIn={this.handleLogIn} onRegister={this.handleRegister} />
              }
          </>
        )
    }
}

// Récupération du statut de connexion depuis le Store
const mapStateToProps = (state) => {
    return {
      isLogged: state.toggleLogIn.isLogged,
    }
}

export default connect(mapStateToProps)(LoggedSwitchNavigation);
