import React, {Component} from 'react';
import Navigation from '../../navigations/Navigation';
import LogInForm from './LogInForm';
import { connect } from 'react-redux'
import {View} from 'react-native';

class SwitchLogInForm extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    handleLogIn = (username) => {
        const action = { type: "TOGGLE_LOGIN", username: username }
        this.props.dispatch(action)
    }

    render(){
        return (
          <>
              { this.props.isLogged
                ? <Navigation />
                : <LogInForm onLogIn={this.handleLogIn} />
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

export default connect(mapStateToProps)(SwitchLogInForm);
