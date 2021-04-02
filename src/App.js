import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux'
import { Provider as PaperProvider } from 'react-native-paper';
import Store from './store/configureStore'
import SwitchLogInForm from './components/LogIn/SwitchLogInForm'
import {Dimensions, ImageBackground, SafeAreaView, StatusBar} from 'react-native';
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
      await changeNavigationBarColor(colors.purple, true, true);
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
          <PaperProvider>
            <SwitchLogInForm />
          </PaperProvider>
        </Provider>
      </SafeAreaView>
    );
  }
}

export default App;
