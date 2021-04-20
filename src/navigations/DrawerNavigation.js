import React from 'react';
import {Button, View, StyleSheet} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Navigation from './Navigation';
import {NavigationContainer} from '@react-navigation/native';
import UserHelper from '../helpers/UserHelper/UserHelper';
import API from '../config/api';
import CustomLabel from '../components/CustomLabel/CustomLabel/CustomLabel';
import colors from '../config/colors';
import CustomLabelBackgroundButton
  from '../components/CustomLabel/CustomLabelBackgroundButton/CustomLabelBackgroundButton';


const Drawer = createDrawerNavigator();

class DrawerContent extends React.Component {

  state = {
    user: null,
  }

  getUser = async () => {
    return await UserHelper.getUserById(await API.USER_ID());
  }

  componentDidMount() {
    this.getUser().then(r => {
      this.setState({
        user: r
      })
    });
  }

  render(){
    const { user } = this.state;
    return(
      <View style={styles.globalContainer}>
        <View style={styles.containerStart}>
          {
            user ? (
              <View>
                <CustomLabel text="Bienvenue," position="left" fontType="bold" size={35} spaceBetween={0} />
                <CustomLabel text={user.firstname} position="left" size={30} spaceBetween={0} />
                <CustomLabel text={`@${user.username}`} position="left" fontType="light" size={20} />
              </View>
            ) : (
              <CustomLabel text="Chargement ..." />
            )
          }
        </View>
        <View style={styles.containerEnd}>
          <CustomLabelBackgroundButton
            text="Se déconnecter" onPressLabel={this.props.onLogOut}
            onPressButton={this.props.onLogOut} icon={{ name: 'logout', type: 'material' }}
          />
        </View>
      </View>
    );
  }
}

const DrawerNavigation = ({ onLogOut }) => {
  return(
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} onLogOut={onLogOut} />}>
        <Drawer.Screen name="Navigation" component={Navigation} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    backgroundColor: colors.backGrey,
    padding: 20
  },
  containerStart: {
    flex: 0.5,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  containerEnd: {
    flex: 0.5,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  }
})

export default DrawerNavigation;
