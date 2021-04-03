import React from 'react';
import {
  FlatList,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import colors from '../../../config/colors';
import { Avatar } from 'react-native-elements';
import NewMessageContainer from '../NewMessageContainer/NewMessageContainer';
import CustomTextButton from '../../../components/CustomButtons/CustomTextButton/CustomTextButton';
import CustomTextModal from '../../../components/CustomModals/CustomTextModal/CustomTextModal';

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
    /*
    *
    TODO Set le nombre de messages MAX par bibliothèque dans une fichier de config
    *
    */
    if (this.state.messages.length <= 9) {
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
            <>
              <View style={styles.subContainer}>
                <View style={styles.field}>
                  <TextInput
                    style={styles.textInput}
                    multiline={true}
                    value={this.state.libraryName}
                    onChangeText={(text) => this.setKeyValue('libraryName', text)}
                    placeholder="Nom de la bibliothèque"/>
                </View>
                <CustomTextButton title="Créer la bibliothèque" onPressButton={this.createLibrary} />
              </View>
            </>
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
                <Avatar
                  size="medium"
                  rounded
                  onPress={() => { this.addMessageToLibrary() }}
                  icon={{ name: 'add', type: 'material' }}
                  overlayContainerStyle={styles.avatar}
                  activeOpacity={0.7}
                />
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
    borderColor: '#E6E4E2',
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#E6E4E2',
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
