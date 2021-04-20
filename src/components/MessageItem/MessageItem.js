import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import colors from '../../config/colors';
import fonts from '../../config/fonts';
import CustomGradientTextButton from '../CustomButtons/CustomGradientTextButton/CustomGradientTextButton';
import CustomLabel from '../CustomLabel/CustomLabel/CustomLabel';
import {connect} from 'react-redux';

import getDate from '../../utils/getDate';
class MessageItem extends React.Component {

  // Cherche si un contact existe selon le numéro de téléphone de la props item
  searchContact = () => {
    return this.props.contacts.find((item) => item.phoneNumbers[0].number === this.props.item.contact);
  };

  render() {
    const { item, index, last, deleteData } = this.props;
    let contact = this.searchContact();

    let separate = item.date.split('T');
    separate[1] = separate[1].split('.');
    separate[1] = separate[1][0].split(':');
    separate[0] = separate[0].split('-');
    let year = parseInt(separate[0][0]);
    let month = parseInt(separate[0][1]) - 1;
    let day = parseInt(separate[0][2]);
    let hours = parseInt(separate[1][0]);
    let minutes = parseInt(separate[1][1]);
    let dateM = new Date();
    dateM.setFullYear(year);
    dateM.setMonth(month);
    dateM.setDate(day);
    dateM.setHours(hours+2);
    dateM.setMinutes(minutes);
    dateM.setSeconds(0);
    dateM.setMilliseconds(0);


    return(
      <>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <View style={styles.textHeader}>
              { contact ? (
                <CustomLabel
                  text={`Message envoyé à ${contact.displayName} (${item.contact})`} fontType="light" size={16}
                  additionalStyle={{
                    fontStyle: 'italic', textDecorationLine: 'underline'
                  }}
                />
              ) : (
                <CustomLabel
                  text={`Message envoyé au ${item.contact}`} fontType="light" size={16}
                  additionalStyle={{
                    fontStyle: 'italic', textDecorationLine: 'underline'
                  }}
                />
              )
              }
            </View>
            <View style={styles.messageContainer}>
              <Text style={styles.message}>{item.message}</Text>
              <Text style={styles.insideText}>{getDate(dateM)[1]} {"\n"} {getDate(dateM)[0]}</Text>
            </View>

          </View>
          <View style={styles.buttonContainer}>
            <CustomGradientTextButton title="Supprimer" onPressButton={() => deleteData(index)} />
          </View>

          {
            !last && (
              <>
                <View
                  style={styles.verticalBar}
                />
                <View
                  style={styles.horizontalBar}
                />
              </>
            )
          }
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  textContainer: {
    flexDirection: 'column',
    backgroundColor: colors.lightgrey,
    borderColor: colors.lightgrey,
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  textHeader: {
    marginBottom: 5,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  buttonContainer: {
    width: '60%',
    height: '30%',
    alignSelf: 'center',
  },
  message: {
    flex: 4,
    fontSize: 16,
    fontFamily: fonts.light,
  },
  insideText: {
    flex: 2,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: fonts.light,
  },
  verticalBar: {
    alignSelf: 'center',
    height: 35,
    width: 1,
    backgroundColor: colors.black,
  },
  horizontalBar: {
    alignSelf: 'center',
    height: 7,
    width: 7,
    backgroundColor: colors.black,
    borderRadius: 30,
  }
})


// Récupération des contacts favoris stockées dans le store
const mapStateToProps = (state) => {
  return {
    contacts: state.manageContacts.contacts,
  }
};

export default connect(mapStateToProps)(MessageItem);
