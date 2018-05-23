import { Alert } from 'react-native';
import Axios from 'axios';

export const modificaCodEAN = (codEAN) => {
    return {
        type: 'modifica_codEAN_trnf',
        payload: codEAN    
    };
};
export const modificaCodItem = (codItem) => {
    return {
        type: 'modifica_codItem_trnf',
        payload: codItem    
    };
};
export const modificaDescItem = (descItem) => {
    return {
        type: 'modifica_descItem_trnf',
        payload: descItem    
    };
};
export const modificaUnidMed = (unidMed) => {
    return {
        type: 'modifica_unidMed_trnf',
        payload: unidMed    
    };
};
export const modificaCodLocalOrig = (codLocalOrig) => {
    return {
        type: 'modifica_codLocalOrig_trnf',
        payload: codLocalOrig    
    };
};
export const modificaCodLocalDest = (codLocalDest) => {
    return {
        type: 'modifica_codLocalDest_trnf',
        payload: codLocalDest    
    };
};
export const modificaQtItem = (qtItem) => {
    return {
        type: 'modifica_qtItem_trnf',
        payload: qtItem    
    };
};
export const iniciaTela = () => {
    return {
        type: 'inicia_tela_conf'
    };
};

export const buscaNotaConferencia = (usuario) => {
    return dispatch => {
        Axios.get('/app/getReceptPriorNew.p', {
            params: {
                username: usuario
            }
        })
        .then(response => buscaSuccess(dispatch, response))
        .catch(() => buscaError());
    };
};

const buscaSuccess = (dispatch, response) => {
    if (response.data.success === 'true') {
        dispatch({ type: 'modifica_listaNF_conf', payload: response.data.prioridades });
    } else {
        Alert.alert(
            'Erro Conferência',
            response.data.message
        );
    }
};

const buscaError = () => {
    Alert.alert(
        'Erro Conferência',
        'Erro Conexão!'
    );
};
