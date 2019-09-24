import React from 'react';
import { 
    View, 
    StyleSheet,
    Button,
    TextInput,
    Text,
    Keyboard,
    ActivityIndicator,
    Platform,
    TouchableWithoutFeedback
} from 'react-native';

import { connect } from 'react-redux';
import { 
    modificaUsuario, 
    modificaSenha,
    doLogin,
    iniciaPermissao,
    modificaLoadingLogin
} from '../../actions/LoginActions';

class Login extends React.PureComponent {
    componentDidMount = () => {
        this.props.iniciaPermissao();
    }

    onChangeUsuario = (value) => {
        this.props.modificaUsuario(value);
    }
    onChangeSenha = (value) => {
        this.props.modificaSenha(value);
    }

    onSubmitEditingUsuario = () => {
        this.txtSenha.focus();
    }
    onSubmitEditingSenha = () => {
        this.pressLogin();
    }

    onPressDismissKeyboard = () => {
        Keyboard.dismiss();
    }

    usuarioKeyPress = (e) => {
        if (e.nativeEvent.key.toLowerCase() === 'tab') {
            this.txtSenha.focus();
        }
    }

    pressLogin = () => {
        const { usuario, senha, ambiente } = this.props;

        Keyboard.dismiss();
        
        this.props.modificaLoadingLogin();
        this.props.doLogin({ usuario, senha, ambiente });
    }

    renderBotao = () => {
        if (this.props.loadingLogin) {
            return (
                <ActivityIndicator size="large" color={'white'} />
            );
        }
        return (
            <Button 
                title='LOGIN'
                onPress={this.pressLogin}
            />
        );
    }

    render = () => (
        <TouchableWithoutFeedback
            onPress={this.onPressDismissKeyboard}
        >
            <View style={styles.viewLogin}>
                <View>
                    { Platform.OS !== 'windows' ? (
                        <View>
                            <TextInput
                                placeholder="Usuário"
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                returnKeyType="next"
                                style={styles.input}
                                onChangeText={this.onChangeUsuario}
                                value={this.props.usuario}
                                onSubmitEditing={this.onSubmitEditingUsuario}
                                blurOnSubmit={false}
                            />
                            <TextInput 
                                ref={(input) => { this.txtSenha = input; }}
                                placeholder="Senha"
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                returnKeyType="next"
                                autoCapitalize="none"
                                autoCorrect={false}
                                secureTextEntry={this.props.refreshSenha}
                                style={styles.input}
                                onChangeText={this.onChangeSenha}
                                value={this.props.senha}
                                onSubmitEditing={this.onSubmitEditingSenha}
                            />
                        </View>
                    ) : (
                        <View>
                            <TextInput
                                placeholder="Usuário"
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                returnKeyType="next"
                                style={styles.input}
                                onKeyPress={this.usuarioKeyPress}
                                onChangeText={this.onChangeUsuario}
                                value={this.props.usuario}
                                onSubmitEditing={this.onSubmitEditingUsuario}
                                blurOnSubmit={false}
                            />
                            <TextInput 
                                ref={(input) => { this.txtSenha = input; }}
                                placeholder="Senha"
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                returnKeyType="go"
                                autoCorrect={false}
                                secureTextEntry={this.props.refreshSenha}
                                style={styles.input}
                                onChangeText={this.onChangeSenha}
                                value={this.props.senha}
                                onSubmitEditing={this.onSubmitEditingSenha}
                            />
                        </View>
                    ) }
                </View>
                <View style={styles.loginBtn}>
                    {this.renderBotao()}
                </View>
                <View style={styles.viewMsg}>
                    <Text style={styles.msgLogin}>
                        {this.props.erroLogin}
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const mapStateToProps = state => (
    {
        usuario: state.LoginReducer.usuario,
        senha: state.LoginReducer.senha,
        refreshSenha: state.LoginReducer.refreshSenha,
        erroLogin: state.LoginReducer.erroLogin,
        logConfReceb: state.LoginReducer.logConfReceb,
        logConfPlaca: state.LoginReducer.logConfPlaca,
        logEstoque: state.LoginReducer.logEstoque,
        logDespacho: state.LoginReducer.logDespacho,
        logSeparacao: state.LoginReducer.logSeparacao,
        logConfSeparacao: state.LoginReducer.logConfSeparacao,
        logTransferencia: state.LoginReducer.logTransferencia,
        logArmazenamento: state.LoginReducer.logArmazenamento,
        logCorteCabos: state.LoginReducer.logCorteCabos,
        logTodos: state.LoginReducer.logTodos,
        loadingLogin: state.LoginReducer.loadingLogin,
        ambiente: state.VersionReducer.ambiente,
        empresa: state.VersionReducer.empresa
    }
);

export default connect(mapStateToProps, { 
    modificaUsuario, 
    modificaSenha,
    doLogin,
    iniciaPermissao,
    modificaLoadingLogin
})(Login);

const styles = StyleSheet.create({
    viewLogin: {
        flex: 5,
        backgroundColor: '#4b86b4',
        justifyContent: 'center',
        paddingTop: 30
    },
    viewMsg: {
        backgroundColor: '#4b86b4',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    loginBtn: {
        marginLeft: 50,
        marginRight: 50,
        marginTop: 15
    },
    label: {
        fontSize: 16,
        marginLeft: 25,
        marginRight: 25,
        marginTop: 15,
        color: 'white'
    },
    input: {
		height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginHorizontal: 15,
		marginBottom: 20,
		color: 'white',
		paddingHorizontal: 10,
		borderRadius: 10
    },
    msgLogin: {
        fontSize: 18,
        color: 'red'
    }
});
