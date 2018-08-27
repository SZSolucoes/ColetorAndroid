import { Alert } from 'react-native';
import Axios from 'axios';

export const iniciaTela = () => {
    return {
        type: 'inicia_tela_est'
    };
};

export const limpaTela = () => {
    return {
        type: 'limpa_tela_est'
    };
};

export const modificaCodEAN = (codEAN) => {
    return {
        type: 'modifica_codEAN_est',
        payload: codEAN    
    };
};

export const modificaCodItem = (codItem) => {
    return {
        type: 'modifica_codItem_est',
        payload: codItem    
    };
};

export const modificaUnidMed = (unidMed) => {
    return {
        type: 'modifica_unidMed_est',
        payload: unidMed    
    };
};

export const modificaDescItem = (descItem) => {
    return {
        type: 'modifica_descItem_est',
        payload: descItem    
    };
};

export const modificaListaItem = (listaItem) => {
    return {
        type: 'modifica_listaItem_est',
        payload: listaItem    
    };
};

export const buscaEstoque = (codEAN) => {
    return dispatch => {
        Axios.get('/coletor/getStockInfoByEan.p', {
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
        dispatch({ type: 'busca_ok_est', payload: response.data.item });
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
