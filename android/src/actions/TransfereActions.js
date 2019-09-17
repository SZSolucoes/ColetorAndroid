import { Alert } from 'react-native';
import Axios from 'axios';
import { store } from '../App';

export const modificaOnTransferencia = (ativo) => ({
    type: 'modifica_onTransferencia_trnf',
    payload: ativo    
});
export const modificaCodEAN = (codEAN) => ({
    type: 'modifica_codEAN_trnf',
    payload: codEAN    
});
export const modificaCodItem = (codItem) => ({
    type: 'modifica_codItem_trnf',
    payload: codItem    
});
export const modificaDescItem = (descItem) => ({
    type: 'modifica_descItem_trnf',
    payload: descItem    
});
export const modificaSaldoItem = (saldoItem) => ({
    type: 'modifica_saldoItem_trnf',
    payload: saldoItem    
});
export const modificaUnidMed = (unidMed) => ({
    type: 'modifica_unidMed_trnf',
    payload: unidMed    
});
export const modificaCodLocalOrig = (codLocalOrig) => ({
    type: 'modifica_codLocalOrig_trnf',
    payload: codLocalOrig    
});
export const modificaCodLocalDest = (codLocalDest) => ({
    type: 'modifica_codLocalDest_trnf',
    payload: codLocalDest    
});
export const modificaQtItem = (qtItem) => ({
    type: 'modifica_qtItem_trnf',
    payload: qtItem    
});
export const modificaCodLote = (codLote) => ({
    type: 'modifica_codLote_trnf',
    payload: codLote
});
export const iniciaTela = () => ({
    type: 'inicia_tela_trnf'
});

export const buscaInfoEANTransf = (codEAN) => dispatch => {
    Axios.get('/coletor/getEanInfoTransf.p', {
        params: {
            codEAN,
            usuario: store.getState().LoginReducer.usuario
        }
    })
    .then(response => buscaSuccess(dispatch, response))
    .catch(() => buscaError());
};

const buscaSuccess = (dispatch, response) => {
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

export const efetivaTransferencia = 
(usuario, codEAN, codLocalOrig, codLocalDest, qtItem, codLote) => {
    return dispatch => {
        Axios.get('/coletor/doTransfer.p', {
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
        .catch(() => efetivaError(dispatch));
    };
};

const efetivaSuccess = (dispatch, response) => {
    dispatch({ type: 'modifica_onTransferencia_trnf', payload: false });

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

const efetivaError = (dispatch) => {
    dispatch({ type: 'modifica_onTransferencia_trnf', payload: false });
    Alert.alert(
        'Erro Transferência',
        'Erro Conexão!'
    );
};
