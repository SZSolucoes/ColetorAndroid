import Axios from 'axios';
import { Actions } from 'react-native-router-flux';

export const modificaUsuario = (usuario) => {
    return {
        type: 'modifica_usuario_log',
        payload: usuario    
    };
};

export const modificaSenha = (senha) => {
    return {
        type: 'modifica_senha_log',
        payload: senha    
    };
};

export const modificaLoadingLogin = () => {
    return {
        type: 'modifica_loading_log'
    };
};

export const modificaLoadingConferencia = () => {
    return {
        type: 'modifica_loading_conf'
    };
};

export const iniciaPermissao = () => {
    return {
        type: 'inicia_permissao_log'
    };
};

export const doLogin = ({ usuario, senha }) => {
    return dispatch => {
        Axios.get('/app/doLoginNew.p', {
            params: {
                username: usuario,
                password: senha
            }
        })
        .then(response => loginSuccess(dispatch, response))
        .catch(error => loginError(dispatch, error));
    };
};

const loginSuccess = (dispatch, response) => {
    if (response.data.success === 'true') {
        dispatch({ type: 'login_ok_log' });
        dispatch({ type: 'atualiza_permissao_log', payload: response.data.parameters[0] });
        Actions.menuApp();
    } else if (response.data.message !== undefined) {
        dispatch({ type: 'login_erro_log', payload: response.data.message });
    } else {
        dispatch({ type: 'login_erro_log', payload: 'Erro Conexão!' });
    }
};

const loginError = (dispatch, error) => {
    dispatch({ type: 'login_erro_log', payload: 'Erro Conexão!' });
};
