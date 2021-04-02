import React from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import colors from '../../../config/colors';
import VARS from '../../../config/vars';
import { Avatar } from 'react-native-elements';
import NewMessageContainer from '../../NewMessageContainer/NewMessageContainer';
import CustomTextButton from '../../CustomTextButton/CustomTextButton';

class CreateBibliotheque extends React.Component {

  state = {
    libraryName: '',
    message: '',
    messages: [
      'TEST TEST',
      'TEST <%FIRSTNAME%>',
      '<%LINK%> Regardez ce super lien',
      '<%LINK%> <%LINK%>',
    ],
  }

  setKeyValue = (key, value) => {
    this.setState({
      [key]: value,
    });
  }

  addMessageToLibrary = () => {
    this.setState({
      messages: [...this.state.messages, '']
    });
  }

  deleteMessageFromLibrary = (id) => {
    let array = [...this.state.messages];
    array.splice(id, 1);
    this.setKeyValue('messages', array);
  }

  modifyMessageFromLibrary = (id, text) => {
    let array = [...this.state.messages];
    console.log(array, id, text)
    if (text === '') {
      array.splice(id, 1);
      !array && (array = []);
    } else {
      array[id] = text;
    }
    this.setKeyValue('messages', array);
  }

  // addVarInMessage = (varType, id) => {
  //   if (VARS.filter(el => el.value === varType).length > 0) {
  //     let idInt = parseInt(id);
  //     let messages = this.state.messages;
  //     messages[idInt] += `<%${varType}%>`;
  //     this.setKeyValue('messages', messages);
  //   }
  // }

  // generateVarsCode = () => {
  //   let string = '';
  //   for (let i = 0; i < 3; i++) {
  //     string += Math.random().toString(36).slice(-8);
  //   }
  //   return string;
  // }

  createLibrary = () => {
    let voidMessage = false;
    this.state.messages.forEach((message) => {
      message === '' && (voidMessage = true);
    });
    voidMessage && (alert("La liste de messages contient des messages vides."));
    console.log(this.state.messages);
  }

  render() {
    return(
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
        )}/>
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
  flexOne: {
    flex: 1,
  },
  insideButton: {
    alignItems:'center',
    justifyContent:'center',
  },
  button: {
    alignItems: 'center',
    paddingVertical: 15,
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

export default CreateBibliotheque;
