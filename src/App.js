import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux'
import Store from './store/configureStore'
import SwitchLogInForm from './components/LogIn/SwitchLogInForm'
import {SafeAreaView, StatusBar} from 'react-native';
import colors from './config/colors';
import changeNavigationBarColor from 'react-native-navigation-bar-color'


class App extends React.Component {

  constructor() {
    super();
    this.changeNavBarColor()
  }

  // Couleur de la barre du bas
  changeNavBarColor = async () => {
    try{
      await changeNavigationBarColor('#431D60', true, true);
    }catch(e){
      console.log(e)// {success: false}
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/*Couleur de la barre du haut*/}
        <StatusBar backgroundColor={ colors.purple } />
        <Provider store={ Store }>
          <SwitchLogInForm />
        </Provider>
      </SafeAreaView>
    );
  }
}

export default App;
