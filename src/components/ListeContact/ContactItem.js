import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import React from 'react';
import colors from '../../config/colors';
import {connect} from 'react-redux';
import { Avatar } from 'react-native-elements';

class ContactItem extends React.Component {

  toggleFavorite = (id) => {
    const action = { type: "TOGGLE_FAVORITE", id: id }
    this.props.dispatch(action)
  }

  displayFavorite = (id) => {
    return this.props.favoritesContact.findIndex(item => item === id) !== -1 ? (
      <Text style={{ color: "red" }}> Test </Text>
    ) : null
  }

  generateAvatarLabel = (contact) => {
    let label = '';
    if (contact.givenName !== '') label += contact.givenName[0].toUpperCase()
    if (contact.familyName !== '') label += contact.familyName[0].toUpperCase()
    return label;
  }

  render() {
    const contactItem = this.props.contactItem
    return(
      <TouchableOpacity
        onPress={() => {
          this.toggleFavorite(contactItem.rawContactId)
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
        <View style={{ flexDirection: 'column' }}>
          <Text style={[styles.text, {fontWeight: "bold"}]}> {contactItem.displayName} </Text>
          <Text style={styles.text}> {contactItem.phoneNumbers[0].number} </Text>
          { this.displayFavorite(contactItem.rawContactId) }
        </View>
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
})

// Récupération des contacts favoris stockées dans le store
const mapStateToProps = (state) => {
  return {
    favoritesContact: state.favoritesContact,
  }
}

export default connect(mapStateToProps)(ContactItem);
