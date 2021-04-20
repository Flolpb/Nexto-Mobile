import React from 'react'
import {
    StyleSheet,
    View,
    Image,
    Dimensions, Text, ImageBackground,
} from 'react-native';
import colors from '../../../config/colors';
import CustomGradientTextButton from '../../../components/CustomButtons/CustomGradientTextButton/CustomGradientTextButton';
import CustomTextInput from '../../../components/CustomTextInputs/CustomTextInput/CustomTextInput';
import CustomLabel from '../../../components/CustomLabel/CustomLabel';

class NewAccountContainer extends React.Component{

    constructor(props)
    {
        super(props)
        this.state = {
            username: '',
            mail: '',
            password: '',
            passwordConfirm: '',
        }
    }

    setKeyValue = (key, value) => {
        this.setState({
            [key]: value,
        });
    }

    render(){
        const { navigation } = this.props;
        return(
            <ImageBackground
                style={{ width: Dimensions.get('window').width, flex: 1, height: Dimensions.get('window').height}}
                imageStyle={{ opacity: 1.0 }}
                source={require('../../../assets/images/fond.png')}>
            <View style={styles.mainContainer}>
                <View style={styles.imageContainer}>
                    <Image
                      source={require('../../../assets/images/logov2.png')}
                      style={[styles.image, { width: Dimensions.get('window').width - 50 }]} />
                </View>

                <View style={styles.subContainer}>
                    <CustomTextInput value={this.state.username} placeholder="Identifiant" isMultiline="false"
                                     onChangeTextInput={(text) => this.setKeyValue('username', text)} />

                    <CustomTextInput value={this.state.mail} placeholder="Adresse-mail" isMultiline="false"
                                     onChangeTextInput={(text) => this.setKeyValue('mail', text)} />

                    <CustomTextInput value={this.state.password} placeholder="Mot de passe" isMultiline="false"
                                     onChangeTextInput={(text) => this.setKeyValue('password', text)}
                                     isPassword={this.state.password ? 'true' : 'false'} />

                    <CustomTextInput value={this.state.passwordConfirm} placeholder="Confirmation du mot de passe" isMultiline="false"
                                     onChangeTextInput={(text) => this.setKeyValue('passwordAgain', text)}
                                     isPassword={this.state.passwordConfirm ? 'true' : 'false'} />

                    <View style={{marginTop: 20}}>
                        <CustomGradientTextButton title="Inscription"
                                                  // onPressButton={() => this.props.onLogIn(this.state.username)}
                        />
                    </View>

                    <CustomLabel
                      text="Déjà un compte ? Connectez-vous"
                      fontType="light"
                      size={16}
                      additionalStyle={{
                          fontStyle: 'italic', textDecorationLine: 'underline'
                      }}
                      onPressLabel={() => navigation.navigate('LogInContainer')} />
                </View>
            </View>
          </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexGrow: 1,
        justifyContent: 'space-evenly',
        //backgroundColor: colors.backGrey,
    },
    imageContainer: {
        flex: 0.35,
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

export default NewAccountContainer;
