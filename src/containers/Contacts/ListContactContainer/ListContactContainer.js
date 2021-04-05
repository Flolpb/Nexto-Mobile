import React from 'react';
import {
  FlatList,
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Icon, SearchBar} from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Contacts from 'react-native-contacts';
import colors from '../../../config/colors';
import ContactItem from "../../../components/ContactItem/ContactItem"
import {connect} from 'react-redux';
import CustomMediumAvatar from '../../../components/CustomAvatars/CustomMediumAvatar/CustomMediumAvatar';
import CustomSearchBar from '../../../components/CustomSearchBar/CustomSearchBar';

class ListContactContainer extends React.Component {

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
      let newPerson = {};
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
      <View style={styles.separator} />
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

  createSearchBar = () => (
      <CustomSearchBar value={this.state.search} onSearch={this.searchFilter} />
  )


  generateAvatarLabel = (contact) => {
    let label = '';
    if (contact.givenName !== '') label += contact.givenName[0].toUpperCase();
    if (contact.familyName !== '') label += contact.familyName[0].toUpperCase();
    return label;
  };

  createFavoriteTab = () => {
    const { navigation, contacts } = this.props;
    const favContactsID = this.props.favoritesContact;
    let favoritesContacts = [];
    let content = [];
    if(favContactsID != null){
      favContactsID.forEach((favID) => {
        let fav = contacts.filter(item => item.recordID === favID);
        favoritesContacts.push(fav);
      });

      favoritesContacts.map((fav) => {
        content.push(
          <TouchableOpacity
            key={fav[0].recordID}
            onPress={() => {
              // On navigue vers la fenêtre de message du StackNavigator de la liste des contacts
              navigation.navigate("ListeContactMessageScreen", {
                contactID: fav[0].recordID,
              })
            }}
            style={styles.favContainer}>
            <CustomMediumAvatar
              titleOrIcon={{type: 'string', value: this.generateAvatarLabel(fav[0])}}
              background={styles.avatarBackgroundFav}
            />
            <Text style={styles.favContact}>{fav[0].displayName.length > 10 ? fav[0].displayName.slice(0, 8)+ '...' : fav[0].displayName}</Text>
          </TouchableOpacity>
        )
      });
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
          <FlatList
            initialNumToRender="10"
            maxToRenderPerBatch="10"
            removeClippedSubviews={true}
            contentContainerStyle={styles.flatList}
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
          <View style={ styles.createButton }>
            <CustomMediumAvatar titleOrIcon={{ type: 'icon', value: { name: 'add', type: 'material' }}} onPressAvatar={this.newContact} />
          </View>
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
  flatList: {
    minHeight: '100%',
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
  avatarBackgroundFav: {
    backgroundColor: colors.favorites,
  },
  createButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
});

// Récupération des contacts favoris stockées dans le store
const mapStateToProps = (state) => {
  return {
    contacts: state.manageContacts.contacts,
    favoritesContact: state.toggleContactFavorite.favoritesContact,
  }
};

export default connect(mapStateToProps)(ListContactContainer);
