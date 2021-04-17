import React from 'react';
import {View, StyleSheet, SafeAreaView, FlatList, Text, Button} from 'react-native';
import {Avatar, Icon, SearchBar} from 'react-native-elements';
import colors from '../../../config/colors';
import CustomSearchBar from '../../../components/CustomSearchBar/CustomSearchBar';
import CustomMediumGradientAvatar
  from '../../../components/CustomAvatars/CustomMediumGradientAvatar/CustomMediumGradientAvatar';
import fonts from '../../../config/fonts';
import UserHelper from '../../../helpers/UserHelper/UserHelper';

class ListLibraryContainer extends React.Component {

  state = {
    search: '',
  }

  createSeparator = () => {
    return (
      <View
        style={[
          styles.separator,
        ]}
      />
    )
  };

  createEmptyViewList = () => {
    return (
      <View style={ styles.emptyView }>
        <Icon type="material-community" name="bookshelf" size={75}/>
        <Text style={ styles.emptyTag }> Aucune bibliothèque </Text>
      </View>
    )
  };

  createListHeader = () => {
    return(
      <>
        { this.createSearchBar() }
      </>
    )
  };

  createSearchBar = () => {
    return (
      <CustomSearchBar value={this.state.search} onSearch={this.searchFilter} />
    )
  };

  searchFilter = () => {
    return '';
  }

  getAllUsers = () => {
    console.log(UserHelper.getUserById(1));
  }

  render() {
    const { navigation } = this.props;
    let libraries = [
      {
        name: 'Anniversaires',
        isPublic: false,
        messages: [
          'TEST TEST',
          'TEST <%FIRSTNAME%>',
          '<%LINK%> Regardez ce super lien',
          '<%LINK%> <%LINK%>',
        ],
        user: 1,
      }
    ]

    return (
      <>
        <SafeAreaView
          style={styles.container}>
          <Button onPress={this.getAllUsers}  title="get"/>
          <FlatList
            initialNumToRender="10"
            maxToRenderPerBatch="10"
            contentContainerStyle={styles.flatList}
            ListHeaderComponent={this.createListHeader}
            ItemSeparatorComponent={this.createSeparator}
            ListEmptyComponent={this.createEmptyViewList}
            data={libraries}
            keyExtractor={(item, index) => item.id}
            renderItem={({item}) => (
              <Text> {item.name} </Text>
            )}/>
          <View style={ styles.createButton }>
            <CustomMediumGradientAvatar titleOrIcon={{ type: 'icon', value: { name: 'add', type: 'material' }}} onPressAvatar={() => navigation.navigate("CreateBibliotheque")} />
          </View>
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
  flatList: {
    minHeight: '100%',
  },
  createButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
  separator: {
    flex: 1,
    marginRight: 30,
    marginLeft: 20,
    borderBottomColor: colors.black,
    borderBottomWidth: 0.35,
  },
  emptyView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTag: {
    fontSize: 30,
    color: colors.black,
    marginTop: 20,
    fontFamily: fonts.medium,
  },
  searchBar: {
    backgroundColor: colors.transparent,
    borderBottomWidth: 0,
    borderWidth: 0,
    borderColor: colors.transparent,
    paddingHorizontal: 10,
    color: colors.black
  },
  searchBarInput: {
    backgroundColor: '#E6E4E2',
    borderRadius: 30,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})

export default ListLibraryContainer;

