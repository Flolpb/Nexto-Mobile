import React from 'react';
import Navigation from './Navigation';
import LogInContainer from '../containers/Logger/LogInContainer/LogInContainer';
import { connect } from 'react-redux'
import LoggerNavigation from './LoggerNavigation';
import UserHelper from '../helpers/UserHelper/UserHelper';
import AuthHelper from '../helpers/UserHelper/AuthHelper';
import API from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

class LoggedSwitchNavigation extends React.Component
{
    constructor(props)
    {
        super(props)
    }
    

    _storeToken = async (token) => {
      try {
        await AsyncStorage.setItem('AUTH_TOKEN', token).then(async () => {

        })
      } catch (error) {
        // Error saving data
        return false
      }
    };

    toggleLogIn = (mail) => {
      const action = { type: "TOGGLE_LOGIN", mail: mail }
      this.props.dispatch(action)
    }

    handleLogIn = async (mail, password) => {

        const loginRequest = {
          'mail': mail,
          'password': password
        }


        AuthHelper.login(loginRequest)
        .then(async (r) => {

          

          if(r.logged)
          {
            /* Navigation */
            this.toggleLogIn(mail)

            /* Keep Token */
            this._storeToken(r.token)
          }
          
        });
        
    }

    render(){
        return (
          <>
              { this.props.isLogged
                ? <Navigation />
                : <LoggerNavigation onLogIn={this.handleLogIn} />
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
