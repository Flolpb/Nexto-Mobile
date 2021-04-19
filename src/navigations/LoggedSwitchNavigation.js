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
            this._storeUserId(r.id)
          }
        })
      }
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

    _storeUserId = async (id) => {
      try {
        await AsyncStorage.setItem('AUTH_USER_ID', id).then(async () => {

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

            /* Keep User Id */
            this._storeUserId(r.id)
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
