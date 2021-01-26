import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import colors from '../../config/colors';

class ListeBibliotheque extends React.Component {

  render() {
    return(
      <>
        <SafeAreaView
          style={styles.container}>
          <Text> Liste Bibliothèques </Text>
        </SafeAreaView>
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
});

export default ListeBibliotheque;

