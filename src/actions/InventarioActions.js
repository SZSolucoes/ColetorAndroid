import { Alert } from 'react-native';
import Axios from 'axios';

export const modificaCodLocal = (codLocal) => ({ 
        type: 'modifica_codlocal_invent', 
        payload: codLocal
    });
export const modificaNrContagem = (nrContagem) => ({ 
        type: 'modifica_nrcontagem_invent', 
        payload: nrContagem
    });
export const modificaCodEAN = (codEAN) => ({ 
        type: 'modifica_codean_invent', 
        payload: codEAN
    });
export const modificaCodItem = (codItem) => ({ 
        type: 'modifica_coditem_invent', 
        payload: codItem
    });
export const modificaUnidMed = (unidMed) => ({ 
        type: 'modifica_unidmed_invent', 
        payload: unidMed
    });
export const modificaDescItem = (descItem) => ({ 
        type: 'modifica_descitem_invent', 
        payload: descItem
    });
export const modificaCodLote = (codLote) => ({ 
        type: 'modifica_codlote_invent', 
        payload: codLote
    });
export const modificaDtInventario = (dtInventario) => ({ 
        type: 'modifica_dtinventario_invent', 
        payload: dtInventario
    });
export const modificaQtItem = (qtItem) => ({ 
        type: 'modifica_qtitem_invent', 
        payload: qtItem
    });
export const modificaModalVisible = (modalVisible) => ({ 
        type: 'modifica_modalvisible_invent', 
        payload: modalVisible
    });
export const cleanInventarioReducer = () => ({ 
        type: 'modifica_clean_invent'
    });
export const cleanInventarioReducerWDT = () => ({ 
        type: 'modifica_cleanwdt_invent'
    });
export const doConfirm = (propparams) => dispatch => {
        Axios.get('/coletor/doInventoryCounting.p', {
            params: {
                username: propparams.username,
                codLocal: propparams.codLocal,
                nrContagem: propparams.nrContagem,
                codEtiq: propparams.codEAN,
                dtInventario: propparams.dtInventario,
                codLote: propparams.codLote,
                qtItem: propparams.qtItem
            }
        })
        .then(response => onConfSuccess(dispatch, response))
        .catch(error => alertConfError(dispatch, error));
    };
export const doConfirmEst = (propparams) => dispatch => {
    Axios.get('/coletor/undoInventoryCounting.p', {
        params: {
            username: propparams.username,
            codLocal: propparams.codLocal,
            nrContagem: propparams.nrContagem,
            codEtiq: propparams.codEAN,
            dtInventario: propparams.dtInventario,
            codLote: propparams.codLote
        }
    })
    .then(response => onConfSuccess(dispatch, response))
    .catch(error => alertConfError(dispatch, error));
};

const alertConfError = (dispatch, error) => {
    Alert.alert('Erro', 'Erro ao Confirmar');
};

const onConfSuccess = (dispatch, response) => {
    if (response.data.success === 'true') {
        dispatch({ type: 'modifica_cleanwdt_invent' });
        Alert.alert('Aviso', response.data.message);
    } else {
        Alert.alert('Erro', response.data.message);
    }
};

export const buscaInfoEAN = (codEAN) => dispatch => {
    Axios.get('/coletor/getStockInfoByEan.p', {
        params: {
            cod_ean: codEAN
        }
    })
    .then(response => buscaSuccess(dispatch, response))
    .catch(() => buscaError());
};

const buscaSuccess = (dispatch, response) => {
    const responseDataOk = response && response.data;
    if (responseDataOk && response.data.success === 'true') {
        dispatch({ type: 'modifica_coditem_invent', payload: response.data.item.codItem });
        dispatch({ type: 'modifica_unidmed_invent', payload: response.data.item.un });
        dispatch({ type: 'modifica_descitem_invent', payload: response.data.item.descItem });
        dispatch({ type: 'modifica_tpcont_invent', payload: response.data.item.tpCont });
    } else if (responseDataOk && response.data.success === 'false') {
        Alert.alert(
            'Erro Estoque',
            response.data.message
        );
    } else {
        Alert.alert(
            'Erro Estoque',
            'Ocorreu uma falha interna no servidor, verifique a conexão!'
        );
    }
};

const buscaError = () => {
    Alert.alert(
        'Erro Estoque',
        'Erro Conexão!'
    );
};
