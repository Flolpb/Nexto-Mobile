import React, {Component} from 'react';
import Navigation from '../../navigations/Navigation';
import LogInForm from './LogInForm';
import { connect } from 'react-redux'

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

    switchView = () => {
        return (this.props.isLogged ? (
            <Navigation />
        ) : (
            <LogInForm onLogIn={this.handleLogIn} />
        ))
    } 

    render(){
        
        return <>{this.switchView()}</>
    }
}

// Récupération du statut de connexion depuis le Store
const mapStateToProps = (state) => {
    return {
      isLogged: state.isLogged,
    }
  }

export default connect(mapStateToProps)(SwitchLogInForm);
