import React from 'react';
import {
  FlatList,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import colors from '../../../config/colors';
import NewMessageContainer from '../NewMessageContainer/NewMessageContainer';
import CustomTextModal from '../../../components/CustomModals/CustomTextModal/CustomTextModal';
import CustomGradientTextButton from '../../../components/CustomButtons/CustomGradientTextButton/CustomGradientTextButton';
import CustomMediumGradientAvatar from '../../../components/CustomAvatars/CustomMediumGradientAvatar/CustomMediumGradientAvatar';
import CustomTextInput from '../../../components/CustomTextInputs/CustomTextInput/CustomTextInput';
import settings from '../../../config/settings';

class CreateLibraryContainer extends React.Component {

  state = {
    libraryName: '',
    message: '',
    messages: [
      'TEST TEST',
      'TEST <%FIRSTNAME%>',
      '<%LINK%> Regardez ce super lien',
      '<%LINK%> <%LINK%>',
    ],
    modalVisible: false,
    modalTitle: '',
  }

  setKeyValue = (key, value) => {
    this.setState({
      [key]: value,
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
      this.setState({
        modalVisible: true,
        modalTitle: 'Le nom de la bibliothèque n\'est pas renseignée.',
      });
      return false;
    }

    // Vérification des messages vides
    if (this.state.messages.some((message) => message === '')) {
      this.setState({
        modalVisible: true,
        modalTitle: 'La liste de messages contient des messages vides.',
      });
      return false;
    }
    console.log(this.state.messages);
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
  }
});

export default CreateLibraryContainer;
