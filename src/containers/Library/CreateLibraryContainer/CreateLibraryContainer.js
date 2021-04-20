import React from 'react';
import {
  FlatList,
  StyleSheet, Switch,
  View,
} from 'react-native';
import colors from '../../../config/colors';
import NewMessageContainer from '../NewMessageContainer/NewMessageContainer';
import CustomTextModal from '../../../components/CustomModals/CustomTextModal/CustomTextModal';
import CustomGradientTextButton from '../../../components/CustomButtons/CustomGradientTextButton/CustomGradientTextButton';
import CustomMediumGradientAvatar from '../../../components/CustomAvatars/CustomMediumGradientAvatar/CustomMediumGradientAvatar';
import CustomTextInput from '../../../components/CustomTextInputs/CustomTextInput/CustomTextInput';
import settings from '../../../config/settings';
import CustomLabel from '../../../components/CustomLabel/CustomLabel/CustomLabel';
import LibraryHelper from '../../../helpers/LibraryHelper/LibraryHelper';
import connect from 'react-redux/lib/connect/connect';

class CreateLibraryContainer extends React.Component {

  state = {
    libraryName: '',
    isPublic: false,
    message: '',
    messages: [],
    modalVisible: false,
    modalTitle: '',
  }

  setKeyValue = (key, value) => {
    this.setState({
      [key]: value,
    });
  }

  showModal = (title) => {
    this.setState({
      modalVisible: true,
      modalTitle: title,
    });
  }

  addMessageToLibrary = () => {
    if (this.state.messages.length < settings.maxMessagesPerLibrary) {
      this.setState({
        messages: [...this.state.messages, '']
      });
    } else {
      this.setState({
        modalVisible: true,
        modalTitle: 'Nombre maximal de messages par bibliothèque atteint.',
      });
    }
  }

  deleteMessageFromLibrary = (id) => {
    let array = [...this.state.messages];
    array.splice(id, 1);
    this.setKeyValue('messages', array);
  }

  modifyMessageFromLibrary = (id, text) => {
    let array = [...this.state.messages];
    if (text === '') {
      array.splice(id, 1);
      !array && (array = []);
    } else {
      array[id] = text;
    }
    this.setKeyValue('messages', array);
  }

  // generateVarsCode = () => {
  //   let string = '';
  //   for (let i = 0; i < 3; i++) {
  //     string += Math.random().toString(36).slice(-8);
  //   }
  //   return string;
  // }

  createLibrary = () => {
    // Vérification du nom de la librairie
    if (this.state.libraryName === '') {
      this.showModal('Le nom de la bibliothèque n\'est pas renseignée.');
      return false;
    }

    // Vérification d'une bibliothèque vide
    if (!this.state.messages.length) {
      this.showModal('La bibliothèque ne contient pas de message.');
      return false;
    }

    // Vérification des messages vides
    if (this.state.messages.some((message) => message === '')) {
      this.showModal('La liste de messages contient des messages vides.');
      return false;
    }

    this.setState({
      loading: true,
    });

    let library = {
      "name": this.state.libraryName,
      "user": "/api/users/1",
      "isPublic": this.state.isPublic,
      "messages": this.state.messages
    }
    LibraryHelper.createLibrary(library).then(r => {
      if (!r) {
        this.showModal('Erreur lors de la création de la bibliothèque. Veuillez réessayer.');
      } else {
        const action = { type: 'ADD_LIBRARY', library: r }
        this.props.dispatch(action);
        this.props.navigation.navigate('ListeBibliotheque');
      }
    });
  }

  render() {
    const { modalVisible, modalTitle } = this.state;
    return(
      <>
        <CustomTextModal visible={modalVisible} setKeyValue={this.setKeyValue} title={modalTitle} icon={'error-outline'} />
        <FlatList
          style={styles.container}
          removeClippedSubviews={false}
          ListHeaderComponent={
            <View style={styles.subContainer}>
              <CustomTextInput value={this.state.libraryName} onChangeTextInput={(text) => this.setKeyValue('libraryName', text)} placeholder="Nom de la bibliothèque"/>

              <View style={styles.switch}>
                <CustomLabel text="Privée" fontType="light" size={16} />
                <Switch
                  trackColor={{ false: colors.lightgrey, true: colors.lightpurple }}
                  thumbColor={colors.lightgrey}
                  onValueChange={(value) => this.setKeyValue('isPublic', value)}
                  value={this.state.isPublic}
                />
                <CustomLabel text="Publique" fontType="light" size={16} />
              </View>

              <CustomGradientTextButton title="Créer la bibliothèque" onPressButton={this.createLibrary} />
            </View>
          }
          data={this.state.messages}
          keyExtractor={(item, index) => index.toString() }
          renderItem={({item, index}) => (
            <View style={styles.item}>
              <NewMessageContainer
                item={item} index={index}
                deleteMessageFromLibrary={this.deleteMessageFromLibrary}
                modifyMessageFromLibrary={this.modifyMessageFromLibrary}
              />
            </View>
          )}
          ListFooterComponent={
            <View style={styles.subContainer}>
              <View style={styles.button}>
                <CustomMediumGradientAvatar titleOrIcon={{ type: 'icon', value: { name: 'add', type: 'material' }}} onPressAvatar={this.addMessageToLibrary} />
              </View>
            </View>
          }
        />
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backGrey,
    flexGrow: 1
  },
  subContainer: {
    paddingHorizontal: 30,
    marginVertical: 20,
  },
  field: {
    flexDirection:'row',
    borderWidth: 1,
    borderColor: colors.lightgrey,
    borderRadius: 20,
    backgroundColor: colors.lightgrey,
    fontSize: 20,
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent:'center',
  },
  avatar: {
    backgroundColor: colors.purple,
    color: colors.white
  },
  textInput: {
    flex: 4,
    fontSize: 15
  },
  item: {
    width: '90%',
    alignSelf:'center',
  },
  switch: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
});


export default connect()(CreateLibraryContainer);
