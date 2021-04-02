import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import CustomDropdownButton from '../CustomDropdownButton/CustomDropdownButton';
import CustomIconButton from '../CustomIconButton/CustomIconButton';
import VARS from '../../config/vars';
import colors from '../../config/colors';

class NewMessageContainer extends React.Component {

  state = {
    editing: false,
    message: this.props.item,
  }

  setKeyValue = (key, value) => {
    this.setState({
      [key]: value,
    });
  }

  addVarInMessage = (varType) => {
    if (VARS.filter(el => el.value === varType).length > 0) {
      let message = this.state.message;
      console.log(varType, message)
      message += `<%${varType}%>`;
      this.setKeyValue('message', message);
    }
  }

  userFriendlyString = (string, jsxElements = []) => {
    let str = string.toString();
    let array = [str.indexOf("<%"), str.indexOf("%>")];
    let selectedVar = VARS.find((v) => v.value === str.substring(array[0] + 2, array[1]))
    if (array.every((v) => v !== -1)) {
      jsxElements.push(<Text>{str.substring(0, array[0])}</Text>);
      if (selectedVar) {
        jsxElements.push(<Text style={{color: colors.purple, fontStyle: 'italic', fontWeight: 'bold'}}>{selectedVar.label}</Text>);
      } else {
        jsxElements.push(<Text>{str.substring(array[0], array[1] + 2)}</Text>);
      }

      return this.userFriendlyString(str.substring(array[1] + 2, string.length), jsxElements);
    } else {
      return [...jsxElements, <Text>{string}</Text>]
    }
  }

  render() {
    const { index, modifyMessageFromLibrary, deleteMessageFromLibrary } = this.props;
    const message = this.state.message;
    return(
      <>
        {
          <View style={[styles.field, styles.input]}>
            {
              this.state.editing ? (
                  <TextInput
                    style={styles.textInput}
                    multiline={true}
                    value={message}
                    onChangeText={(text) => this.setKeyValue('message', text)}
                  />
              ) : (
                <TextInput
                  onFocus={() => this.setKeyValue('editing', true)}
                  style={styles.textInput}
                  multiline={true}
                >
                  <Text>
                    { this.userFriendlyString(this.state.message).map((itm) => itm) }
                  </Text>
                </TextInput>
              )
            }

            {
              this.state.editing ? (
                <>
                  <CustomDropdownButton index={index} onPressOption={this.addVarInMessage} />
                  <CustomIconButton index={index} onPressButton={() => {
                    modifyMessageFromLibrary(index, message);
                    this.setKeyValue('editing', false);
                  }} icon={{ type: 'material', name: 'check' }} />
                </>
              ) : (
                <CustomIconButton index={index} onPressButton={deleteMessageFromLibrary} icon={{ type: 'material', name: 'close' }} />
              )
            }

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
    color: 'red',
  }
});

export default NewMessageContainer;
