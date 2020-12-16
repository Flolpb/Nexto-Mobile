import React from 'react';
import 'react-native-gesture-handler';
import Navigation from './navigations/Navigation';
import { Provider } from 'react-redux'
import Store from './store/configureStore'

class App extends React.Component {
  render() {
    return (
      <Provider store={ Store }>
        <Navigation />
      </Provider>
    );
  }
}

export default App;
