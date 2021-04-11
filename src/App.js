import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import 'react-native-gesture-handler';
import Store from './store/configureStore';
import {SafeAreaView, StatusBar} from 'react-native';
import colors from './config/colors';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import LoggedSwitchNavigation from './navigations/LoggedSwitchNavigation';


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
            <LoggedSwitchNavigation />
          </PaperProvider>
        </Provider>
      </SafeAreaView>
    );
  }
}

export default App;
