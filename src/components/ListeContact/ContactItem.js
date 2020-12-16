import {Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import colors from '../../config/colors';
import {connect} from 'react-redux';

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

  render() {
    const contactItem = this.props.contactItem
    return(
      <TouchableOpacity
        onPress={() => {
          this.toggleFavorite(contactItem.rawContactId)
        }}
        style={styles.subContainer}>
        <Text style={[styles.text, {fontWeight: "bold"}]}> {contactItem.displayName} </Text>
        <Text style={styles.text}> {contactItem.phoneNumbers[0].number} </Text>
        { this.displayFavorite(contactItem.rawContactId) }
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    paddingVertical: 16,
    paddingLeft: 20,
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
