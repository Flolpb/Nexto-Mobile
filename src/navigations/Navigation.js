import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import ListeMessage from '../components/ListeMessage/ListeMessage';
import Accueil from '../components/Accueil/Accueil';
import MessageContainer from '../components/MessageContainer/MessageContainer';

const Stack = createStackNavigator();

class Navigation extends React.Component{
    render(){
        return(
            <>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="Home" component={Accueil} />
                        <Stack.Screen name="Liste des Messages" component={ListeMessage} />
                        <Stack.Screen name="Message" component={MessageContainer} />
                    </Stack.Navigator>
                </NavigationContainer>
            </>
        )
    }
}

export default Navigation;
