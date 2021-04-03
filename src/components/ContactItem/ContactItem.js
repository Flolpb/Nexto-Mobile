import { StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';
import React from 'react';
import colors from '../../config/colors';
import {connect} from 'react-redux';
import {Icon} from 'react-native-elements';
import Interactable from 'react-native-interactable';
import CustomMediumAvatar from '../CustomAvatars/CustomMediumAvatar/CustomMediumAvatar';
import favoriteContactReducer from '../../store/reducers/favoriteContactReducer';

class ContactItem extends React.Component {

  constructor(props){
    super(props);
    this._deltaX = new Animated.Value(0);
    this._deltaY = new Animated.Value(0);
  }

  state = {
    swiped: false,
  };

  toggleFavorite = (id) => {
    const action = { type: "TOGGLE_FAVORITE", id: id };
    this.props.dispatch(action);
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
      <View style={styles.swipedContainer}>
        <Animated.View style={
          [styles.button, {
            opacity: this._deltaX.interpolate({
              inputRange: [-230, -230, -180, -180],
              outputRange: [1, 1, 0, 0]
            }),
            transform: [{
              scale: this._deltaX.interpolate({
                inputRange: [-230, -230, -180, -180],
                outputRange: [1, 1, 0.8, 0.8]
              })
            }]
          }
          ]}>
          <Icon
            type="font-awesome-5"
            name="star"
            solid={this.displayFavorite(contact.recordID)}
            style={styles.button}
            color={colors.favorites}
            size={30}
            onPress={() => {this.toggleFavorite(contact.recordID)}} />
        </Animated.View>
        <Animated.View style={
          [styles.button, {
            opacity: this._deltaX.interpolate({
              inputRange: [-165, -165, -115, -115],
              outputRange: [1, 1, 0, 0]
            }),
            transform: [{
              scale: this._deltaX.interpolate({
                inputRange: [-165, -165, -115, -115],
                outputRange: [1, 1, 0.8, 0.8]
              })
            }]
          }
          ]}>
          <Icon
            type="font-awesome-5"
            name="broom"
            solid={true}
            style={ styles.button }
            color={colors.black}
            size={30}
            onPress={() => {this.props.modContact(contact)}}/>
        </Animated.View>
        <Animated.View style={
          [styles.button, {
            opacity: this._deltaX.interpolate({
              inputRange: [-100, -100, -50, -50],
              outputRange: [1, 1, 0, 0]
            }),
            transform: [{
              scale: this._deltaX.interpolate({
                inputRange: [-100, -100, -50, -50],
                outputRange: [1, 1, 0.8, 0.8]
              })
            }]
          }
          ]}>
          <Icon
            type="font-awesome-5"
            name="trash-alt"
            solid={true}
            style={ styles.button }
            color={colors.grey}
            size={30}
            onPress={() => {this.props.deleteContact(contact.recordID)}} />
        </Animated.View>
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
    const { navigation, contactItem } = this.props;
    let infosContainer = this.displayContactInfo(contactItem);
    let infosMenu = this.displayMenu(contactItem)
    return(
      <View style={styles.container}>
        { infosMenu }
        <Interactable.View
          horizontalOnly={true}
          snapPoints={[{x: 0}, {x: -225}]}
          animatedValueX={this._deltaX}
          animatedValueY={this._deltaY}>
          <TouchableOpacity
            onPress={() => {
              // On navigue vers la fenêtre de message du StackNavigator de la liste des contacts
              navigation.navigate("ListeContactMessageScreen", {
                contactID: contactItem.recordID,
              })
            }}
            style={styles.subContainer}>
            <View style={styles.avatar}>
              <CustomMediumAvatar titleOrIcon={{type: 'string', value: this.generateAvatarLabel(contactItem)}} />
            </View>
            { infosContainer }
          </TouchableOpacity>
        </Interactable.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.backGrey,
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingLeft: 20,
    backgroundColor: colors.backGrey,
    opacity: 1,
    width: '100%',
    borderRightColor: colors.black,
    borderRightWidth: 0.35,
  },
  infosContainer: {
    flex: 1,
    marginRight: 30,
    flexDirection: 'column',
    zIndex: 1,
  },
  menuContainer: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  swipedContainer: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    marginRight: 15,
  },
  text: {
    color: colors.black,
    fontSize: 16,
  },
  button: {
    width: 40,
    height: 40,
    marginRight: 25,
    justifyContent: 'center',
  }
});

// Récupération des contacts favoris stockées dans le store
const mapStateToProps = (state) => {
  return {
    favoritesContact: state.toggleContactFavorite.favoritesContact,
  }
};

export default connect(mapStateToProps)(ContactItem);
