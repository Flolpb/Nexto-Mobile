import React from 'react'
import {
    StyleSheet,
    View,
    Image,
    Dimensions, Text,
} from 'react-native';
import colors from '../../config/colors';
import CustomGradientTextButton from '../../components/CustomButtons/CustomGradientTextButton/CustomGradientTextButton';
import CustomTextInput from '../../components/CustomTextInputs/CustomTextInput/CustomTextInput';

class LogInForm extends React.Component{

    constructor(props)
    {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChangeUsername = (userName) => {
        this.setState({username: userName})
    }

    handleChangePassword = (passWord) => {
        this.setState({password: passWord})
    }

    render(){

        return(
          // <ImageBackground
          //   style={{ width: Dimensions.get('window').width, }}
          //   imageStyle={{ opacity: 0.80 }}
          //   source={require('../../assets/images/fond.png')}>
            <View style={styles.mainContainer}>
                <View style={styles.imageContainer}>
                    <Image
                      source={require('../../assets/images/logov2.png')}
                      style={[styles.image, { width: Dimensions.get('window').width - 50 }]} />
                </View>

                <View style={styles.subContainer}>
                    <CustomTextInput value={this.state.username} placeholder="Identifiant" isMultiline="false" onChangeTextInput={this.handleChangeUsername} />
                    <CustomTextInput value={this.state.password} placeholder="Mot de passe" isMultiline="false" onChangeTextInput={this.handleChangePassword}
                                     isPassword={this.state.password ? 'true' : 'false'} />
                    <View style={{marginVertical: 20}}>
                        <CustomGradientTextButton title="Connexion" onPressButton={() => this.props.onLogIn(this.state.username)} />
                    </View>
                </View>
            </View>
          // </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexGrow: 1,
        justifyContent: 'space-evenly',
        backgroundColor: colors.backGrey,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
    },
    subContainer: {
        flex: 1,
        paddingHorizontal: 30,
        marginVertical: 20,
    },
});

export default LogInForm
