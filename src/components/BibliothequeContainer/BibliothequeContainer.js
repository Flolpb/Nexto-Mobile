import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import colors from '../../config/colors';

class BibliothequeContainer extends React.Component {
  render() {
    return(
      <>
        <SafeAreaView
          style={styles.container}>
          <Text> Container </Text>
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

export default BibliothequeContainer;
