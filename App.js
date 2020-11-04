import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Message" component={Message} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

function Home({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nexto</Text>
      <Button
        title="Go to Message..."
        onPress={() => navigation.navigate('Message')}
      />
    </View>
  );
}

class Message extends React.Component {
  render() {
    return (
      <View>
        <Text>Message</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
    marginVertical: 20,
  },
  container: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    height: '100%',
  },
});

export default App;
