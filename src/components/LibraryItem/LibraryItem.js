import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../config/colors';
import CustomLabel from '../CustomLabel/CustomLabel';
import VARS from '../../config/vars';
import fonts from '../../config/fonts';

class LibraryItem extends React.Component {

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
    const { item } = this.props;
    return(
        <TouchableOpacity style={[styles.container, styles.textContainer]}
          // onPress={() => {
          //   // On navigue vers la fenêtre de message du StackNavigator de la liste des contacts
          //   navigation.navigate("ListeContactMessageScreen", {
          //     contactID: contactItem.recordID,
          //   })
          // }}
          >
          <CustomLabel text={item.name} position="left" fontType="medium" size={18} />
          {
            item.messages.slice(0,3).map((message) => (
              <Text>
                { this.userFriendlyString(message) }
              </Text>
            ))
          }
          {
            item.messages.length > 3 && (
              <CustomLabel text={`Autres messages (${item.messages.length - 3})`} position="center" fontType="medium" size={16} />
            )
          }
        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 7,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: colors.lightgrey,
    borderRadius: 20,
    paddingLeft: 20,
    paddingBottom: 15,
  },
  textVar: {
    color: colors.purple,
    fontFamily: fonts.boldItalic,
  },
});

export default LibraryItem;
