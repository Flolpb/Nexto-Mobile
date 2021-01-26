import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import colors from '../../../config/colors';
import {connect} from 'react-redux';
import {Avatar, Icon} from 'react-native-elements';
import Swipeable from 'react-native-gesture-handler/Swipeable';

class ContactItem extends React.Component {

  constructor(props){
    super(props);
  }

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
    if (contact.givenName) label += contact.givenName[0].toUpperCase();
    if (contact.familyName) label += contact.familyName[0].toUpperCase();
    return label;
  };

  displayFavorite = (id) => {
    return this.props.favoritesContact.findIndex(item => item === id) !== -1;
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
        <View style={styles.menuSuperContainer}>
          <View style={ styles.menuContainer }>
            <Icon
                type="font-awesome-5"
                name="star"
                solid={ this.displayFavorite(contact.recordID) }
                style={ styles.button }
                color={colors.favorites}
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
                solid={true}
                style={ styles.button }
                color={colors.grey}
                size={30}
                onPress={() => {
                  this.props.deleteContact(contact.recordID);
                }} />

          </View>
        </View>
    )
  };

  shouldComponentUpdate(nextProps, nextState){
    const { isSelected } = nextProps;
    const { isSelected: prevIsSelected } = this.props;

    const isSameSelectedState = isSelected === prevIsSelected;

    return !isSameSelectedState;
  }

  render() {
    const { navigation } = this.props;
    const contactItem = this.props.contactItem;
    let infosContainer = this.displayContactInfo(contactItem);
    const infosMenu = () => {
      return this.displayMenu(contactItem);
    };
    return(
        <Swipeable
          renderRightActions={infosMenu}
        >
          <TouchableOpacity
              onPress={() => {
                // On navigue vers la fenêtre de message du StackNavigator de la liste des contacts
                navigation.navigate("ListeContactMessageScreen", {
                  contactID: contactItem.recordID,
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
        </Swipeable>

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
    backgroundColor: colors.backGrey,
    opacity: 1,
  },
  infosContainer: {
    flex: 1,
    marginRight: 30,
    flexDirection: 'column',
    zIndex: 1,
  },
  menuSuperContainer:{
    justifyContent: 'center',
    backgroundColor: colors.inactiveBlack,
    flex: 1,
    zIndex: -1,
  },
  menuContainer: {
    flex: 1,
    marginTop: 20,
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
