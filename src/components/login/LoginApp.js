import React, { Component } from 'react';
import { 
    View, 
    StyleSheet,
    Image,
    Text,
    TouchableHighlight,
    KeyboardAvoidingView,
    Keyboard,
    AsyncStorage
} from 'react-native';

import { connect } from 'react-redux';

import { Actions } from 'react-native-router-flux';
import Login from './Login';

import {
    modificaAmbiente,
    modificaEmpresa
} from '../../actions/VersionActions';

const imgCentelha = require('../../../resources/imgs/centelhaLogo.jpg');
const imgDw = require('../../../resources/imgs/dwLogo.jpg');

class LoginApp extends Component {

    constructor(props) {
        super(props);

        this.keyboardShow = this.keyboardShow.bind(this);
        this.keyboardHide = this.keyboardHide.bind(this);
        this.state = { showImg: true };
    }

    componentDidMount() {
        AsyncStorage.getItem('empresa')
            .then((value) => {
                if (value) {
                    this.props.modificaEmpresa(value);
                }
            });
        AsyncStorage.getItem('ambiente')
            .then((value) => {
                if (value) {
                    this.props.modificaAmbiente(value);
                }
            });
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardHide);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    onPressVersion() {
        Actions.versionApp();
    }

    keyboardShow() {
        this.setState({ showImg: false });
    }
    
    keyboardHide() {
        this.setState({ showImg: true });
    }

    renderImgLogo() {
        switch (this.props.empresa) {
            case '1': // Centelha
                return (
                    <Image 
                        style={styles.logoCentelha}
                        source={imgCentelha}
                    />
                );
            case '2': // Dw
                return (
                    <Image 
                        style={styles.logoDw}
                        source={imgDw}
                    />
                );
            default:
                return (<View />);
        }
    }

    renderTextVersion() {
        switch (this.props.empresa) {
            case '1': // Centelha
                return (
                    <Text style={styles.infoBot}>
                        Coletor de Dados Centelha
                    </Text>
                );
            case '2': // Dw
                return (
                    <Text style={styles.infoBot}>
                        Coletor de Dados DW
                    </Text>
                );
            default:
                return (<View />);
        }
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
            >
                <View style={styles.viewPrinc}>
                    { this.state.showImg && 
                        <View style={styles.viewTop}>
                            {this.renderImgLogo()}
                        </View> 
                    }
                    <Login />
                    <View style={styles.viewBot}>
                        <TouchableHighlight 
                            onPress={this.onPressVersion}
                            underlayColor={'#2a4d69'}
                        >
                            {this.renderTextVersion()}
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
        backgroundColor: 'white',
        paddingBottom: 0.5,
        borderBottomColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoCentelha: {
        height: '95%',
        width: '85%',
        resizeMode: 'stretch'
    },
    logoDw: {
        height: '100%',
        width: '100%'
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

const mapStateToProps = (state) => ({
    empresa: state.VersionReducer.empresa
});

export default connect(mapStateToProps, {
    modificaAmbiente,
    modificaEmpresa
})(LoginApp);
