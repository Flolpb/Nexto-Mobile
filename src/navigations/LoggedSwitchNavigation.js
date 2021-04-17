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

    handleLogIn = (mail) => {
        console.log("test")
        const action = { type: "TOGGLE_LOGIN", mail: mail }
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
