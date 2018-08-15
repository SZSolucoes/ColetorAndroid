import { Alert } from 'react-native';
import Axios from 'axios';

export const iniciaTela = () => {
    return {
        type: 'inicia_tela_imp'
    };
};

export const limpaTela = () => {
    return {
        type: 'limpa_tela_imp'
    };
};

export const modificaQtEtiq = (qtEtiq) => {
    return {
        type: 'modifica_qtEtiq_imp',
        payload: qtEtiq    
    };
};

export const modificaCodEAN = (codEAN) => {
    return {
        type: 'modifica_codEAN_imp',
        payload: codEAN    
    };
};

export const modificaCodItem = (codItem) => {
    return {
        type: 'modifica_codItem_imp',
        payload: codItem    
    };
};

export const modificaUnidMed = (unidMed) => {
    return {
        type: 'modifica_unidMed_imp',
        payload: unidMed    
    };
};

export const modificaDescItem = (descItem) => {
    return {
        type: 'modifica_descItem_imp',
        payload: descItem    
    };
};

export const imprimeEtiquetaEAN = (usuario, codEAN, qtdEtiq) => {
    return dispatch => {
        Axios.get('/app/doPrint.p', {
            params: {
                usuario,
                codEAN,
                qtdEtiq
            }
        })
        .then(response => imprimeSuccess(dispatch, response))
        .catch(() => imprimeError());
    };
};

const imprimeSuccess = (dispatch, response) => {
    if (response.data.success === 'true') {
        Alert.alert(
            'Impressão Etiqueta',
            response.data.message
        );
    } else {
        Alert.alert(
            'Erro Impressão Etiqueta',
            response.data.message
        );
    }
};

const imprimeError = () => {
    Alert.alert(
        'Erro Impressão Etiqueta',
        'Erro Conexão!'
    );
};

export const buscaInfoEAN = (codEAN) => {
    return dispatch => {
        Axios.get('/app/getStockInfoByEan.p', {
            params: {
                cod_ean: codEAN
            }
        })
        .then(response => buscaSuccess(dispatch, response))
        .catch(() => buscaError());
    };
};

const buscaSuccess = (dispatch, response) => {
    if (response.data.success === 'true') {
        dispatch({ type: 'busca_ok_imp', payload: response.data.item });
    } else {
        Alert.alert(
            'Erro Estoque',
            response.data.message
        );
    }
};

const buscaError = () => {
    Alert.alert(
        'Erro Estoque',
        'Erro Conexão!'
    );
};