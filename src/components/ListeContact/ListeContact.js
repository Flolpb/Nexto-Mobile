import React from 'react';
import { FlatList, PermissionsAndroid, SafeAreaView, StyleSheet, Text, View,} from 'react-native';
import {Icon, SearchBar} from 'react-native-elements';
import Contacts from 'react-native-contacts';
import colors from '../../config/colors';
import ContactItem from "./ContactItem"
import {connect} from 'react-redux';

class ListeContact extends React.Component {

  state = {
    contacts: [],
    search: '',
  }

  componentDidMount() {
    this.askPermission().then(
      this.getContacts
    )
  }

  askPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.getContacts()
      }
    } catch (err) {
      console.warn(err)
    }
  }

  getContacts = async () => {
    const granted =  await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);

    if (granted) {
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
        });
    }
  }

  createSeparator = () => {
    return (
      <View
        style={[
          styles.separator,
        ]}
      />
    )
  }

  createEmptyViewList = () => {
    return (
      <View style={ styles.emptyView }>
        <Icon name="search" size={75}/>
        <Text style={ styles.emptyTag }> Aucun contact trouvé </Text>
      </View>
    )
  }

  createListHeader = () => {
    return(
      <>
        { this.createSearchBar() }
        { this.createFavoriteTab() }
      </>
    )
  }

  createSearchBar = () => {
    return (
      <SearchBar
        inputStyle={ styles.searchBar }
        inputContainerStyle={ styles.searchBar }
        containerStyle={ styles.searchBar }
        placeholderTextColor={ colors.inactiveBlack }
        selectionColor={ colors.black }
        value = { this.state.search }
        placeholder="Rechercher ..."
        onChangeText={(text) => { this.searchFilter(text) }}
      />
    )
  }

  createFavoriteTab = () => {
    // A FAIRE
  }

  searchFilter = (text) => {
    if (text) {
      const contacts = this.state.contacts;
      let filteredContacts;
      // Par numéro
      if (!isNaN(parseInt(text[0]))) {
        filteredContacts = contacts.filter(item => {
          return item.phoneNumbers[0].number.toUpperCase().indexOf(text.toUpperCase()) > -1;
        });
        // Par lettre
      } else {
        filteredContacts = contacts.filter(item => {
          return item.displayName.toUpperCase().indexOf(text.toUpperCase()) > -1;
        });
      }
      this.setState({
        search: text,
        filteredContacts: filteredContacts
      });
    } else {
      this.setState({
        search: text,
        filteredContacts: undefined
      });
    }
  }

  render() {
    const { navigation } = this.props
    const contacts = this.state.filteredContacts ? this.state.filteredContacts : this.state.contacts;
    return (
      <>
        <SafeAreaView
          style={styles.container}>
          <FlatList
            contentContainerStyle={{minHeight: '100%'}}
            ListHeaderComponent={this.createListHeader}
            ItemSeparatorComponent={this.createSeparator}
            ListEmptyComponent={this.createEmptyViewList}
            data={contacts}
            keyExtractor={(item, index) => item.recordID}
            renderItem={({item}) => (
              <ContactItem contactItem={ item } navigation={navigation} />
            )}/>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexGrow: 1
  },
  separator: {
    flex: 1,
    marginRight: 30,
    marginLeft: 20,
    borderBottomColor: colors.inactiveBlack,
    borderBottomWidth: 0.2
  },
  emptyView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTag: {
    fontSize: 30,
    color: colors.black,
    marginTop: 20,
  },
  searchBar: {
    backgroundColor: colors.transparent,
    borderBottomWidth: 0,
    borderWidth: 0,
    borderColor: colors.transparent,
    paddingHorizontal: 10,
    color: colors.black
  },
});

// Récupération des contacts favoris stockées dans le store
const mapStateToProps = (state) => {
  return {
    favoritesContact: state.toggleContactFavorite.favoritesContact,
  }
}

export default connect(mapStateToProps)(ListeContact);
