import React from 'react';
import {StyleSheet} from 'react-native';
import colors from '../../config/colors';
import {SearchBar} from 'react-native-elements';

class LinearGradient extends React.Component<{ colors: string[], start: { x: number, y: number }, style: { alignItems: string, width: number, justifyContent: string, height: number }, end: { x: number, y: number }, children: React.ReactNode }> {
  render() {
    return null;
  }
}

const CustomSearchBar = ({value, onSearch}) => (
    <SearchBar
      inputStyle={ styles.searchBar }
      searchIcon={{ name: 'search', color: colors.black }}
      clearIcon={{ name: 'clear', color: colors.black }}
      inputContainerStyle={ [styles.searchBar, styles.searchBarInput] }
      containerStyle={ styles.searchBar }
      placeholderTextColor={ colors.black }
      selectionColor={ colors.black }
      value={value}
      placeholder="Rechercher ..."
      onChangeText={(text) => { onSearch(text) }}
    />
)

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: colors.transparent,
    borderBottomWidth: 0,
    borderWidth: 0,
    borderColor: colors.transparent,
    paddingHorizontal: 10,
    color: colors.black
  },
  searchBarInput: {
    backgroundColor: colors.backGrey,
    borderRadius: 15,
    margin: 5,
    borderWidth: 0.3,
    borderBottomWidth: 0.3,
    borderColor: colors.purple,
  },
})

export default CustomSearchBar;
