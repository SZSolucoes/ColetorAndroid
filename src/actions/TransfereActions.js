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
export const modificaSaldoItem = (saldoItem) => {
    return {
        type: 'modifica_saldoItem_trnf',
        payload: saldoItem    
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
export const modificaCodLote = (codLote) => {
    return {
        type: 'modifica_codLote_trnf',
        payload: codLote
    };
};
export const iniciaTela = () => {
    return {
        type: 'inicia_tela_trnf'
    };
};

export const buscaInfoEANTransf = (codEAN) => {
    return dispatch => {
        Axios.get('/app/getEanInfoTransfNew.p', {
            params: {
                codEAN
            }
        })
        .then(response => buscaSuccess(dispatch, response))
        .catch(() => buscaError());
    };
};

const buscaSuccess = (dispatch, response) => {
    console.log(response);
    if (response.data.success === 'true') {
        dispatch({ type: 'modifica_item_trnf', payload: response.data.item });
    } else {
        Alert.alert(
            'Erro Transferência',
            response.data.message
        );
    }
};

const buscaError = () => {
    Alert.alert(
        'Erro Transferência',
        'Erro Conexão!'
    );
};

export const efetivaTransferencia = (usuario, codEAN, codLocalOrig, codLocalDest, qtItem, codLote) => {
    console.log(codLote);
    return dispatch => {
        Axios.get('/app/doTransferNew.p', {
            params: {
                usuario,
                codEAN,
                codLocalOrig,
                codLocalDest,
                codLote,
                qtItem
            }
        })
        .then(response => efetivaSuccess(dispatch, response))
        .catch(() => efetivaError());
    };
};

const efetivaSuccess = (dispatch, response) => {
    if (response.data.success === 'true') {
        dispatch({ type: 'inicia_tela_trnf' });
        Alert.alert(
            'Transferência',
            response.data.message
        );
    } else {
        Alert.alert(
            'Erro Transferência',
            response.data.message
        );
    }
};

const efetivaError = () => {
    Alert.alert(
        'Erro Transferência',
        'Erro Conexão!'
    );
};
