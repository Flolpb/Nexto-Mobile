import React from 'react';
import {
  FlatList,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Avatar, Icon, SearchBar} from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Contacts from 'react-native-contacts';
import colors from '../../config/colors';
import ContactItem from "./ContactItem"
import {connect} from 'react-redux';

class ListeContact extends React.Component {

  constructor(props){
    super(props);
    const action = { type: "READ_FAVORITES", id: null};
    this.props.dispatch(action);
  }

  state = {
    contacts: [],
    search: '',
  };

  componentDidMount() {
    this.askPermission().then(
      this.getContacts
    )
  }

  askPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS
      );
      const grantedWrite = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.getContacts()
      }
    } catch (err) {
      console.warn(err)
    }
  };

  //delete contact
  deleteContactId = async (recordID) => {
    const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS);
    if(granted){
      Contacts.deleteContact({recordID: recordID}).then(recordID => {
        //contact deleted
        this.setState({
          contacts: this.state.contacts.filter(item => item.recordID !== recordID)
        });
        this.getContacts();
      });
    }
  };

  modifyContact = async (person) => {
    const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS);
    if(granted){
      Contacts.editExistingContact(person).then(contact => {
        //contact updated
        this.getContacts();
      })
    }
  };

  newContact = async () => {
    const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS);
    if(granted){
      let newPerson = {
        displayName: "Florent Chabin",
        phoneNumber: "0623256356"
      };
      await Contacts.openContactForm(newPerson).then(contact => {
        //Contact created
        this.getContacts();
      });
    }
  };

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
          const action = { type: "STORE_CONTACTS", contacts: contacts };
          this.props.dispatch(action);
        });
    }
  };

  createSeparator = () => {
    return (
      <View
        style={[
          styles.separator,
        ]}
      />
    )
  };

  createEmptyViewList = () => {
    return (
      <View style={ styles.emptyView }>
        <Icon name="search" size={75}/>
        <Text style={ styles.emptyTag }> Aucun contact trouvé </Text>
      </View>
    )
  };

  createListHeader = () => {
    return(
      <>
        { this.createSearchBar() }
        { this.createFavoriteTab() }
      </>
    )
  };

  createSearchBar = () => {
    return (
      <SearchBar
        inputStyle={ styles.searchBar }
        searchIcon={{ name: 'search', color: colors.black }}
        clearIcon={{ name: 'clear', color: colors.black }}
        inputContainerStyle={ [styles.searchBar, styles.searchBarInput] }
        containerStyle={ styles.searchBar }
        placeholderTextColor={ colors.black }
        selectionColor={ colors.black }
        value = { this.state.search }
        placeholder="Rechercher ..."
        onChangeText={(text) => { this.searchFilter(text) }}
      />
    )
  };


  generateAvatarLabel = (contact) => {
    let label = '';
    if (contact.givenName !== '') label += contact.givenName[0].toUpperCase();
    if (contact.familyName !== '') label += contact.familyName[0].toUpperCase();
    return label;
  };

  createFavoriteTab = () => {
    const contacts = this.props.contacts;
    const favContactsID = this.props.favoritesContact;
    let favoritesContacts = [];
    let content = [];
    if(favContactsID != null){
      favContactsID.forEach((favID) => {
        let fav = contacts.filter(item => item.recordID === favID);
        favoritesContacts.push(fav);
      });
      if(favoritesContacts[0] !== undefined){
        for(let i = 0; i < favoritesContacts.length; i++){
          content.push(
              <View style={styles.favContainer}>
                <Avatar
                    size="medium"
                    rounded
                    title={ this.generateAvatarLabel(favoritesContacts[i][0]) }
                    containerStyle={ styles.avatar }
                    overlayContainerStyle={ styles.avatarBackground }
                    titleStyle={styles.avatarTitle}
                    activeOpacity={0.7}
                />
                <Text style={styles.favContact}>{favoritesContacts[i][0].displayName.length > 10 ? favoritesContacts[i][0].displayName.slice(0, 8)+ '...' : favoritesContacts[i][0].displayName}</Text>
              </View>
          )
        }
      }
    }

    return (
      <View style={styles.favorites}>
        {content}
      </View>
    )
  };

  searchFilter = (text) => {
    if (text) {
      const contacts = this.props.contacts;
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
  };

  render() {
    const { navigation } = this.props;
    const contacts = this.state.filteredContacts ? this.state.filteredContacts : this.props.contacts;
    return (
      <>
        <SafeAreaView
          style={styles.container}>
          <ScrollView style={styles.addPerson}>
            <TouchableOpacity onPress={() => this.newContact()}>
              <Icon
                  type="font-awesome-5"
                  name="plus"
                  color={colors.white}
                  style={styles.blackBg}
                  size={30} />
            </TouchableOpacity>
          </ScrollView>
          <FlatList
            contentContainerStyle={{minHeight: '100%'}}
            ListHeaderComponent={this.createListHeader}
            ItemSeparatorComponent={this.createSeparator}
            ListEmptyComponent={this.createEmptyViewList}
            data={contacts}
            keyExtractor={(item, index) => item.recordID}
            renderItem={({item}) => (
              <ContactItem
                  contactItem={ item }
                  navigation={navigation}
                  deleteContact={this.deleteContactId}
                  modContact={this.modifyContact}/>
            )}/>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backGrey,
    flexGrow: 1
  },
  separator: {
    flex: 1,
    marginRight: 30,
    marginLeft: 20,
    borderBottomColor: colors.black,
    borderBottomWidth: 0.35,
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
  searchBarInput: {
    backgroundColor: '#E6E4E2',
    borderRadius: 30,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addPerson: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  blackBg: {
    backgroundColor: colors.black,
    padding: 20,
    borderRadius: 40
  },
  favorites: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  favContainer: {
    marginHorizontal: 10
  },
  favContact:{
    textAlign: 'left',
    fontSize: 12,
  },
  avatar : {
    marginRight: 15,
  },
  avatarTitle: {
    color: colors.white
  },
  avatarBackground: {
    backgroundColor: colors.favorites,
  },
});

// Récupération des contacts favoris stockées dans le store
const mapStateToProps = (state) => {
  return {
    contacts: state.manageContacts.contacts,
    favoritesContact: state.toggleContactFavorite.favoritesContact,
  }
};

export default connect(mapStateToProps)(ListeContact);
