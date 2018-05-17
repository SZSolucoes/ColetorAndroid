import { 
    NetInfo } from 'react-native';

import Axios from 'axios';

export const iniciaTela = () => {
    return {
        type: 'inicia_tela_vers'
    };
};

export const modificaVersao = (versao) => {
    return {
        type: 'modifica_versao_vers',
        payload: versao    
    };
};

export const modificaConexao = (conexao) => {
    return {
        type: 'modifica_conexao_vers',
        payload: conexao    
    };
};

export const modificaServico = (servico) => {
    return {
        type: 'modifica_servico_vers',
        payload: servico    
    };
};

export const verificaServico = () => {
    return dispatch => {
        Axios.get('/app/getService.p')
        .then(response => serviceSuccess(dispatch, response))
        .catch(error => serviceError(dispatch, error));
    };
};

export const verificaConexao = () => {
    return dispatch => {
        NetInfo.isConnected.fetch()
        .then(isConnected => statusConexao(dispatch, isConnected));
    };
};

const statusConexao = (dispatch, isConnected) => {
    NetInfo.getConnectionInfo()
    .then(connectionInfo => infoConexao(dispatch, isConnected, connectionInfo));
};

const infoConexao = (dispatch, isConnected, connectionInfo) => {
    const connected = (isConnected ? 'Online' : 'Offline');
    const effectiveType = `(${connectionInfo.effectiveType})`;
    const desConexao = `${connected}  ${effectiveType}`;
    
    dispatch({ type: 'modifica_conexao_vers', payload: desConexao });
};

const serviceSuccess = (dispatch, response) => {
    if (response.data.success !== undefined && response.data.success === 'true') {
        dispatch({ type: 'modifica_servico_vers', payload: response.data.message });
    } else if (response.data.message !== undefined) {
        dispatch({ type: 'modifica_servico_vers', payload: response.data.message });
    } else {
        dispatch({ type: 'modifica_servico_vers', payload: 'Erro Integração!' });
    }
};

const serviceError = (dispatch, error) => {
    dispatch({ type: 'modifica_servico_vers', payload: 'Problema Conexão!' });
};
