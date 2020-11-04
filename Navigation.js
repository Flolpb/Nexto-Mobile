import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Message from './Message';
import Accueil from './Accueil';

const Stack = createStackNavigator();

class Navigation extends React.Component{
    render(){
        return(
            <>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="Home" component={Accueil} />
                        <Stack.Screen name="Message" component={Message} />
                    </Stack.Navigator>
                </NavigationContainer>
            </>
        )
    }
}

export default Navigation;
