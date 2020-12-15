import React from 'react';
import {FlatList, PermissionsAndroid, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Contacts from 'react-native-contacts';
import colors from '../../config/colors';

class ListeContact extends React.Component {

  state = {
    contacts: []
  }

  componentDidMount() {
    this.askPermission()
    const granted = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
    if (granted) {
      this.getContacts()
    }
  }

  askPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS
      )
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        alert("Location permission denied");
      }
    } catch (err) {
      console.warn(err)
    }
  }

  getContacts = async () => {
    // On récupère les contacts
    Contacts.getAll()
      .then(contacts => {
        // On les trie par ordre alphabétique
        contacts.sort(function (a, b) {
          return a.displayName.localeCompare(b.displayName);
        });
        // On les enregistre dans le state
        this.setState({
          contacts: contacts
        });
        console.log(this.state.contacts)
      });
  }

  modifyContact = (id) => {
    console.log(id)
  }

  render() {
    const contacts = this.state.contacts
    return (
      <>
        <SafeAreaView
        style={ styles.container }>
          <FlatList
            ItemSeparatorComponent={
              (() => (
                <View
                  style={[
                    styles.separator,
                  ]}
                />
              ))
            }
            data={ contacts }
            keyExtractor={(item, index) => item.rawContactId}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => { this.modifyContact(item.rawContactId) }}
                style={ styles.subContainer }>
                  <Text style={[ styles.text, { fontWeight: "bold" } ]}> { item.displayName } </Text>
                  <Text style={ styles.text }> { item.phoneNumbers[0].number } </Text>
              </TouchableOpacity>
            )} />
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    backgroundColor: "white"
  },
  subContainer: {
    flex: 1,
    paddingVertical: 16,
  },
  text: {
    color: colors.black,
    fontSize: 16,
  },
  separator: {
    flex: 1,
    marginRight: 30,
    borderBottomColor: colors.inactiveBlack,
    borderBottomWidth: 0.2
  }
});

export default ListeContact
