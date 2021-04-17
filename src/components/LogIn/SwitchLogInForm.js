import React, {Component} from 'react';
import Navigation from '../../navigations/Navigation';
import LogInForm from './LogInForm';
import {connect} from 'react-redux';
import {View} from 'react-native';
import axios from 'axios';

class SwitchLogInForm extends React.Component {
  constructor(props) {
    super(props);
  }

  changeLogInStatus = (username) => {
    const action = {type: 'TOGGLE_LOGIN', username: username};
    this.props.dispatch(action);
  }

  handleLogIn = (username, password) => {

    const changeLogIn = this.changeLogInStatus;

    axios.post('https://api.app-nexto.com/login', {
      username: username,
      password: password
    })
    .then(function (response) {
      console.log(response);
      changeLogIn(username);
    })
    .catch(function (error) {
      console.log(error);
    });

  };

  render() {
    return (
      <>
        {this.props.isLogged ? (
          <Navigation />
        ) : (
          <LogInForm onLogIn={this.handleLogIn} toggleLogIn={this.changeLogInStatus} />
        )}
      </>
    );
  }
}

// Récupération du statut de connexion depuis le Store
const mapStateToProps = (state) => {
  return {
    isLogged: state.toggleLogIn.isLogged,
  };
};

export default connect(mapStateToProps)(SwitchLogInForm);
