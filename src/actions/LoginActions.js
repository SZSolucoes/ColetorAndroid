import { Alert } from 'react-native';
import Axios from 'axios';
import { Actions } from 'react-native-router-flux';

export const modificaUsuario = (usuario) => ({
        type: 'modifica_usuario_log',
        payload: usuario    
});
export const modificaSenha = (senha) => ({
        type: 'modifica_senha_log',
        payload: senha    
});
export const modificaLoadingLogin = () => ({
        type: 'modifica_loading_log'
});
export const modificaLoadingConferencia = () => ({
        type: 'modifica_loading_conf'
});
export const iniciaPermissao = () => ({
        type: 'inicia_permissao_log'
});
export const doLogin = ({ usuario, senha, ambiente }) => dispatch => {
        Axios.get('/coletor/doLogin.p', {
            params: {
                username: usuario,
                password: senha
            }
        })
        .then(response => loginSuccess(dispatch, response, ambiente))
        .catch(() => loginError(dispatch));
};

const loginSuccess = (dispatch, response, ambiente) => {
    if (response.data.success === 'true') {
        if (ambiente === '2') {
            Alert.alert(
                'HOMOLOGAÇÃO',
                'LOGIN NO AMBIENTE DE HOMOLOGAÇÃO'
            );
        }
        dispatch({ type: 'login_ok_log' });
        dispatch({ type: 'modifica_refreshsenha_log', payload: false });
        dispatch({ type: 'modifica_refreshsenha_log', payload: true });
        dispatch({ type: 'atualiza_permissao_log', payload: response.data.parameters[0] });
        Actions.menuApp();
    } else if (response.data.message !== undefined) {
        dispatch({ type: 'login_erro_log', payload: response.data.message });
    } else {
        dispatch({ type: 'login_erro_log', payload: 'Erro Conexão!' });
    }
};

const loginError = (dispatch) => {
    dispatch({ type: 'login_erro_log', payload: 'Erro Conexão!' });
};
