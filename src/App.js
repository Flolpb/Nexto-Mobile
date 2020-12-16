import React from 'react';
import 'react-native-gesture-handler';
import Navigation from './navigations/Navigation';
import { Provider } from 'react-redux'
import Store from './store/configureStore'
import SwitchLogInForm from './components/LogIn/SwitchLogInForm'


class App extends React.Component {
  render() {
    return (
      <Provider store={ Store }>
        <SwitchLogInForm />
      </Provider>
    );
  }
}

export default App;
