import React from 'react';
import Navigation from './Navigation';
import LogInContainer from '../containers/Logger/LogInContainer/LogInContainer';
import { connect } from 'react-redux'
import LoggerNavigation from './LoggerNavigation';

class LoggedSwitchNavigation extends React.Component
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
