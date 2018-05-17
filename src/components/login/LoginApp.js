import React, { Component } from 'react';
import { 
    View, 
    StyleSheet,
    Image,
    Text,
    TouchableHighlight,
    KeyboardAvoidingView
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Login from './Login';

const imgLogo = require('../../../resources/imgs/centelhaLogo.jpg');

export default class LoginApp extends Component {
    onPressVersion() {
        Actions.versionApp();
    }
    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
            >
                <View style={styles.viewPrinc}>
                    <View style={styles.viewTop}>
                        <Image 
                            style={styles.logo}
                            source={imgLogo}
                        />
                    </View>
                    <Login />
                    <View style={styles.viewBot}>
                        <TouchableHighlight 
                            onPress={this.onPressVersion}
                            underlayColor={'#2a4d69'}
                        >
                            <Text style={styles.infoBot}>
                                Coletor de Dados Centelha
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    viewPrinc: {
        flex: 1
    },
    viewTop: {
        flex: 2,
        backgroundColor: 'white'
    },
    logo: {
        width: 318,
        height: 120
    },
    viewBot: {
        flex: 1,
        backgroundColor: '#4b86b4',
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoBot: {
        fontSize: 12,
        color: 'white'
    },
    container: {
        //backgroundColor: '#4c69a5',
        flex: 1
    }
});
