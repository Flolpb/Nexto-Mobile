import React from 'react';
import { connect } from 'react-redux'
import LoggerNavigation from './LoggerNavigation';
import AuthHelper from '../helpers/UserHelper/AuthHelper';
import StorageHelper from '../helpers/UserHelper/StorageHelper';
import API from '../config/api';
import DrawerNavigation from './DrawerNavigation';


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
          if(data && data.type === "success")
          {
            /* Keep User Id */
            await StorageHelper._storeUserId(data.id).then(res => {
              let action = { type: "STORE_USER", userID: data.id.toString() }
              this.props.dispatch(action);
            });
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
            await StorageHelper._storeUserId(data.id).then(res => {
              let action = { type: "STORE_USER", userID: data.id.toString() }
              this.props.dispatch(action);
            });
          }
        else{
          // Message d'erreur
          console.log(res.message)
        }
      });
    }

    toggleLogIn = (mail) => {
      let action = { type: "TOGGLE_LOGIN", mail: mail }
      this.props.dispatch(action)
    }

    toggleLogOut = () => {
      StorageHelper._clearToken();
      let action = { type: "TOGGLE_LOGOUT" }
      this.props.dispatch(action);

      action = { type: "RESET_ON_LOGOUT" }
      this.props.dispatch(action);
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
            await StorageHelper._storeToken(r.token).then(r => console.log(r))

            /* Keep User Id */
            await StorageHelper._storeUserId(r.id).then(res => {
              let action = { type: "STORE_USER", userID: r.id }
              this.props.dispatch(action)
            });
          }

        });

    }

    render(){
        return (
          <>
              { this.props.isLogged
                ? <DrawerNavigation onLogOut={this.toggleLogOut} />
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
