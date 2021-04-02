import React from 'react';
import { StyleSheet, Text, TextInput, View} from 'react-native';
import CustomDropdownButton from '../CustomButtons/CustomDropdownButton/CustomDropdownButton';
import CustomDropdownModal from '../CustomModals/CustomDropdownModal/CustomDropdownModal';
import VARS from '../../config/vars';
import colors from '../../config/colors';

class NewMessageContainer extends React.Component {

  state = {
    message: this.props.item,
    modalVisible: false,
    onEdit: false,
  }

  vars = [
    { label: 'Ajouter une variable', value: 'ADD'},
    { label: 'Supprimer', value: 'DELETE'},
  ]

  setKeyValue = (key, value) => {
    this.setState({
      [key]: value,
    });
  }

  // Gestion des options du dropdown
  manageOptionSelected = (index, value) => {
    switch (value) {
      case 'ADD':
        this.setKeyValue('modalVisible', true);
        break;
      case 'DELETE':
        this.props.deleteMessageFromLibrary(index);
        break;
    }
  }

  // Ajouter une variable au message sélectionné
  addVarInMessage = (varType) => {
    if (VARS.filter(el => el.value === varType).length > 0) {
      let message = this.props.item;
      message += `<%${varType}%>`;
      this.props.modifyMessageFromLibrary(this.props.index, message);
    }
  }

  // Convertit la chaîne du message avec les valeurs des variables personalisées en brutes
  userFriendlyString = (string, jsxElements = [], count = 0) => {
    let str = string.toString();
    let array = [str.indexOf("<%"), str.indexOf("%>")];
    let selectedVar = VARS.find((v) => v.value === str.substring(array[0] + 2, array[1]))
    if (array.every((v) => v !== -1)) {
      count++;
      jsxElements.push(<Text key={count}>{str.substring(0, array[0])}</Text>);
      if (selectedVar) {
        count++;
        jsxElements.push(<Text key={count} style={styles.textVar}>{selectedVar.label}</Text>);
      } else {
        count++;
        jsxElements.push(<Text key={count}>{str.substring(array[0], array[1] + 2)}</Text>);
      }
      return this.userFriendlyString(str.substring(array[1] + 2, string.length), jsxElements, count);
    } else {
      count++;
      return [...jsxElements, <Text key={count}>{string}</Text>]
    }
  }

  render() {
    const { modalVisible, onEdit } = this.state;
    const { item, index, modifyMessageFromLibrary } = this.props;
    return(
      <>
        {
          <View style={[styles.field, styles.input]}>
            {/* Modal d'ajout de variable */}
            <CustomDropdownModal
              visible={modalVisible}
              setKeyValue={this.setKeyValue}
              title="Ajouter une variable"
              vars={VARS}
              onSelectOption={this.addVarInMessage}
            />

            {/* Input de messages modifiables */}
            {
              onEdit ? (
                  <TextInput
                    style={styles.textInput}
                    multiline={true}
                    value={item}
                    onBlur={() => this.setKeyValue('onEdit', false)}
                    onChangeText={(text) => modifyMessageFromLibrary(index, text)}
                  />
              ) : (
                <TextInput
                  onFocus={() => this.setKeyValue('onEdit', true)}
                  style={styles.textInput}
                  multiline={true}
                >
                  <Text>
                    { this.userFriendlyString(item).map((itm) => itm) }
                  </Text>
                </TextInput>
              )
            }
            {/* Dropdown d'options de gestion de messages */}
            <CustomDropdownButton index={index} vars={this.vars} onPressOption={this.manageOptionSelected}/>
           </View>
        }
      </>
    )
  }
}

const styles = StyleSheet.create({
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
    backgroundColor: '#E6E4E2'
  },
  input: {
    fontSize: 20,
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  textInput: {
    flex: 4,
    fontSize: 15
  },
  textVar: {
    color: colors.purple,
    fontStyle: 'italic',
    fontWeight: 'bold',
  }
});

export default NewMessageContainer;
