import {Text, TouchableOpacity, StyleSheet, View, Button} from 'react-native';
import React from 'react';
import colors from '../../config/colors';
import {connect} from 'react-redux';
import {Avatar, Icon} from 'react-native-elements';
import * as Contacts from 'react-native-contacts';

class ContactItem extends React.Component {

  state = {
    menu: false,
  };

  toggleFavorite = (id) => {
    const action = { type: "TOGGLE_FAVORITE", id: id };
    this.props.dispatch(action);
    this.setState({
      menu: !this.state.menu
    })
  };

  generateAvatarLabel = (contact) => {
    let label = '';
    if (contact.givenName !== '') label += contact.givenName[0].toUpperCase()
    if (contact.familyName !== '') label += contact.familyName[0].toUpperCase()
    return label;
  };

  displayFavorite = (id) => {
    return this.props.favoritesContact.findIndex(item => item === id) !== -1
  };

  displayContactInfo = (contact) => {
    return(
      <View style={ styles.infosContainer }>
        <Text style={[styles.text, {fontWeight: "bold"}]}> {contact.displayName} </Text>
        {contact.phoneNumbers[0] && <Text style={styles.text}>{contact.phoneNumbers[0].number}</Text>}
        { this.displayFavorite(contact.recordID) }
      </View>
    )
  };


  displayMenu = (contact) => {
    return(
      <View style={ styles.menuContainer }>
        <Icon
          type="font-awesome-5"
          name="heart"
          solid={ !this.displayFavorite(contact.recordID) }
          style={ styles.button }
          color="#e62552"
          size={30}
          onPress={() => {
            this.toggleFavorite(contact.recordID)
        }} />
        <Icon
            type="font-awesome-5"
            name="broom"
            solid={true}
            style={ styles.button }
            color={colors.black}
            size={30}
            onPress={() => {
              this.props.modContact(contact);
            }}
        />
        <Icon
          type="font-awesome-5"
          name="trash-alt"
          solid={ !this.displayFavorite(contact.recordID) }
          style={ styles.button }
          color={colors.grey}
          size={30}
          onPress={() => {
            this.props.deleteContact(contact.recordID);
        }} />

      </View>
    )
  };

  render() {
    const { navigation } = this.props;
    const contactItem = this.props.contactItem;
    let infosContainer = this.state.menu ? this.displayMenu(contactItem) : this.displayContactInfo(contactItem);
    return(
      <TouchableOpacity
        onPress={() => {
          // On navigue vers la fenêtre de message du StackNavigator de la liste des contacts
          navigation.navigate("ListeContactMessageScreen", {
            contactID: contactItem.recordID,
          })
        }}
        onLongPress={() => {
          this.setState({
            menu: !this.state.menu
          })
        }}
        style={styles.subContainer}>
        <Avatar
          size="medium"
          rounded
          title={ this.generateAvatarLabel(contactItem) }
          containerStyle={ styles.avatar }
          overlayContainerStyle={ styles.avatarBackground }
          activeOpacity={0.7}
        />
        { infosContainer }
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingLeft: 20,
  },
  infosContainer: {
    flex: 1,
    marginRight: 30,
    flexDirection: 'column',
  },
  menuContainer: {
    flex: 1,
    marginRight: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  avatar : {
    marginRight: 15,
  },
  avatarBackground: {
    backgroundColor: colors.black,
  },
  text: {
    color: colors.black,
    fontSize: 16,
  },
  button: {
    justifyContent: 'space-evenly',
  },
});

// Récupération des contacts favoris stockées dans le store
const mapStateToProps = (state) => {
  return {
    favoritesContact: state.toggleContactFavorite.favoritesContact,
  }
};

export default connect(mapStateToProps)(ContactItem);
