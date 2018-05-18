import React, { Component } from 'react';
import { 
    View, 
    StyleSheet,
    Button,
    TextInput,
    Text,
    Keyboard,
    ActivityIndicator
} from 'react-native';

import { connect } from 'react-redux';
import { 
    modificaUsuario, 
    modificaSenha,
    doLogin,
    iniciaPermissao,
    modificaLoadingLogin
} from '../../actions/LoginActions';

class Login extends Component {
    componentWillMount() {
        this.props.iniciaPermissao();
    }
    pressLogin() {
        const { usuario, senha } = this.props;

        Keyboard.dismiss();

        this.props.modificaLoadingLogin();
        this.props.doLogin({ usuario, senha });
    }
    renderBotao() {
        if (this.props.loadingLogin) {
            return (
                <ActivityIndicator size="large" />
            );
        }
        return (
            <Button 
                title='LOGIN'
                onPress={() => this.pressLogin()}
            />
        );
    }
    render() {
        return (
            <View style={styles.viewLogin}>
                <View>
                    <TextInput
                        placeholder="Usuário"
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholderTextColor='rgba(255,255,255,0.7)'
                        returnKeyType="next"
                        style={styles.input}
                        onChangeText={usuario => this.props.modificaUsuario(usuario)}
                        value={this.props.usuario}
                        onSubmitEditing={() => { this.txtSenha.focus(); }}
                    />
                    <TextInput 
                        ref={(input) => { this.txtSenha = input; }}
                        placeholder="Senha"
                        placeholderTextColor='rgba(255,255,255,0.7)'
                        returnKeyType="go"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry
                        style={styles.input}
                        onChangeText={senha => this.props.modificaSenha(senha)}
                        value={this.props.senha}
                        onSubmitEditing={() => { this.pressLogin(); }}
                    />
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
        );
    }
}

const mapStateToProps = state => (
    {
        usuario: state.LoginReducer.usuario,
        senha: state.LoginReducer.senha,
        erroLogin: state.LoginReducer.erroLogin,
        logConfReceb: state.LoginReducer.logConfReceb,
        logEstoque: state.LoginReducer.logEstoque,
        logDespacho: state.LoginReducer.logDespacho,
        logSeparacao: state.LoginReducer.logSeparacao,
        logConfSeparacao: state.LoginReducer.logConfSeparacao,
        logTransferencia: state.LoginReducer.logTransferencia,
        logArmazenamento: state.LoginReducer.logArmazenamento,
        logTodos: state.LoginReducer.logTodos,
        loadingLogin: state.LoginReducer.loadingLogin
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
        justifyContent: 'center'
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
