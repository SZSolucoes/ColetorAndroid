import { Alert } from 'react-native';
import Axios from 'axios';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';

import { store } from '../App';

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
export const modificaItemSelected = (index) => ({ 
        type: 'modifica_itemselected_invent', 
        payload: index
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
export const modificaLoadingInvent = () => ({
        type: 'modifica_loading_invent'
});

export const doConfirm = (propparams, newList) => dispatch => {
    dispatch({ type: 'modifica_visible_loadingspin', payload: true });
    Axios.get('/coletor/doInventoryCounting.p', {
        params: { ...propparams }
    })
    .then(res => {
        const validRes = res && res.data && res.data.success;
        if (validRes) {
            if (res.data.success === 'true') {
                dispatch({
                    type: 'modifica_cleanwdt_invent'
                });
                dispatch({
                    type: 'modifica_listitems_invent',
                    payload: newList
                });
                dispatch({ type: 'modifica_visible_loadingspin', payload: false });
                setTimeout(() => {                    
                    Alert.alert('Inventário', res.data.message);
                }, 500);
                buscaInventario(propparams.username);
            } else {
                dispatch({ type: 'modifica_visible_loadingspin', payload: false });
                setTimeout(() => {
                    Alert.alert('Erro', res.data.message);
                }, 500);
            }
        } else {
            dispatch({ type: 'modifica_visible_loadingspin', payload: false });
            setTimeout(() => {
                Alert.alert(
                    'Erro',
                    'Ocorreu uma falha interna no servidor, verifique a conexão!'
                );
            }, 500);
        }
    })
    .catch(() => {
        dispatch({ type: 'modifica_visible_loadingspin', payload: false });
        setTimeout(() => {
            Alert.alert(
                'Erro',
                'Ocorreu uma falha interna no servidor, verifique a conexão!'
            );
        }, 500);
    });
};

const buscaInventario = usuario => {
    buscaContInventario(usuario, false);
};

/* export const doConfirmEst = (propparams) => dispatch => {
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

const alertConfError = () => {
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
*/
export const getInventoryLocal = (local) => dispatch => {
    Axios.get('/coletor/getInventoryLocal.p', {
        params: {
            local,
            usuario: store.getState().LoginReducer.usuario
        }
    })
    .then(res => {
        const validRet = res && res.data && res.data.success;
        if (validRet && res.data.success === 'true' && res.data.fichas) {
            dispatch({
                type: 'modifica_listitems_invent',
                payload: res.data.fichas
            });
        } else if (validRet && res.data.success === 'false') {
            setTimeout(() => {
                Alert.alert(
                    'Erro',
                    res.data.message
                );
            }, 500);
            cleanInventarioReducerLessLocal(dispatch);
        } else {
            setTimeout(() => {
                Alert.alert(
                    'Erro',
                    'Ocorreu uma falha interna no servidor, verifique a conexão!'
                );
            }, 500);
            cleanInventarioReducerLessLocal(dispatch);
        }
    })
    .catch(() => setTimeout(() => {
        Alert.alert(
            'Erro',
            'Ocorreu uma falha interna no servidor, verifique a conexão!'
        );
    }, 500));
    cleanInventarioReducerLessLocal(dispatch);
};

const cleanInventarioReducerLessLocal = dispatch => {
    dispatch({
        type: 'modifica_cleanlesslocal_invent'
    });
};

export const buscaContInventario = (usuario, open) => dispatch => {
    dispatch({ type: 'modifica_visible_loadingspin', payload: true });
    Axios.get('/coletor/getInventoryCount.p', {
        params: {
            usuario
        },
        timeout: 30000,
        headers: {
            'Content-Type': 'application/json'
        },
        transformResponse: [(data) => {
            try {
                return JSON.parse(data);
            } catch (e) {
                return data;
            }
        }]
    })
    .then(response => buscaSuccess(dispatch, response, open))
    .catch(() => buscaError(dispatch));
};

const buscaSuccess = (dispatch, response, open) => {
    dispatch({ type: 'modifica_visible_loadingspin', payload: false });
    dispatch({ type: 'busca_invent_ok' });
    const resposta = _(response.data).value();

    if (response.data.success === 'true') {
        dispatch({ 
            type: 'modifica_listitems_invent',
            payload: response.data.fichas 
        });
        if (open === true) {
            Actions.inventario({ estorno: false });
        } 
    } else {
        Alert.alert(
            'Erro Inventário',
            resposta.message ? 
            resposta.message : 
            'Ocorreu uma falha interna no servidor, verifique a conexão!'
        );
    }
};

const buscaError = (dispatch) => {
    dispatch({ type: 'modifica_visible_loadingspin', payload: false });
    dispatch({ type: 'busca_invent_ok' });
    Alert.alert(
        'Erro Inventário',
        'Erro Conexão!'
    );
};
