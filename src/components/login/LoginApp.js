import React from 'react';
import { 
    View, 
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Keyboard,
    AsyncStorage
} from 'react-native';

import { connect } from 'react-redux';

import { Actions } from 'react-native-router-flux';
import Login from './Login';
import { doChangeUrlService } from '../utils/AxiosAux';

import {
    modificaAmbiente,
    modificaEmpresa
} from '../../actions/VersionActions';

const imgCentelha = require('../../../resources/imgs/centelhaLogo.jpg');
const imgDw = require('../../../resources/imgs/dwLogo.jpg');

class LoginApp extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = { showImg: true };
    }

    componentDidMount = () => {
        AsyncStorage.getItem('empresa')
            .then((empresa) => {
                if (empresa) {
                    AsyncStorage.getItem('ambiente')
                        .then((ambiente) => {
                            if (ambiente) {
                                // Atualiza a base URL com base na empresa e ambiente
                                doChangeUrlService(empresa, ambiente);
                            }
                        });
                }
        });
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

    componentWillUnmount = () => {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    onPressVersion = () => {
        Actions.versionApp();
    }

    keyboardShow = () => {
        this.setState({ showImg: false });
    }
    
    keyboardHide = () => {
        this.setState({ showImg: true });
    }

    renderImgLogo = () => {
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
            case '3': // Unif
                return (
                    <Image 
                        style={styles.logoCentelha}
                        source={imgCentelha}
                    />
                );
            default:
                return (<View />);
        }
    }

    renderTextVersion = () => {
        switch (this.props.empresa) {
            case '1': // Centelha
                return (
                    <Text style={styles.infoBot}>
                        Coletor de Dados <Text style={{ fontWeight: 'bold' }}>Centelha</Text>
                    </Text>
                );
            case '2': // Dw
                return (
                    <Text style={styles.infoBot}>
                        Coletor de Dados <Text style={{ fontWeight: 'bold' }}>DW</Text>
                    </Text>
                );
            default:
                return (<View />);
        }
    }

    render = () => (
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
                { this.state.showImg && 
                    <View style={styles.viewBot}>
                        <TouchableOpacity 
                            onPress={this.onPressVersion}
                            underlayColor={'#2a4d69'}
                        >
                            {this.renderTextVersion()}
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </KeyboardAvoidingView>
    )
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
