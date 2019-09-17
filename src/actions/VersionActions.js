import NetInfo from '@react-native-community/netinfo';

import Axios from 'axios';

export const iniciaTela = () => ({
        type: 'inicia_tela_vers'
});
export const modificaVersao = (versao) => ({
        type: 'modifica_versao_vers',
        payload: versao    
});
export const modificaConexao = (conexao) => ({
        type: 'modifica_conexao_vers',
        payload: conexao    
});
export const modificaServico = (servico) => ({
        type: 'modifica_servico_vers',
        payload: servico    
});
export const modificaAmbiente = (ambiente) => ({
        type: 'modifica_ambiente_log',
        payload: ambiente    
});
export const modificaEmpresa = (empresa) => ({
        type: 'modifica_empresa_log',
        payload: empresa    
});
export const modificaInputSelected = (input) => ({
        type: 'modifica_inputselected_log',
        payload: input    
});
export const modificaModalOptions = (options) => ({
        type: 'modifica_modaloptions_log',
        payload: options    
});
export const modificaModalVisible = (modalVisible) => ({
        type: 'modifica_modalvisible_log', 
        payload: modalVisible
});

export const verificaServico = () => dispatch => {
        Axios.get('/coletor/getService.p')
        .then(response => serviceSuccess(dispatch, response))
        .catch(error => serviceError(dispatch, error));
};

export const verificaConexao = () => dispatch => {
        NetInfo.isConnected.fetch()
        .then(isConnected => statusConexao(dispatch, isConnected));
};

const statusConexao = (dispatch, isConnected) => {
    NetInfo.getConnectionInfo()
    .then(connectionInfo => infoConexao(dispatch, isConnected, connectionInfo));
};

const infoConexao = (dispatch, isConnected) => {
    const connected = (isConnected ? 'Online' : 'Offline');
    const desConexao = `${connected}`;
    
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

const serviceError = (dispatch) => {
    dispatch({ type: 'modifica_servico_vers', payload: 'Problema Conexão!' });
};
