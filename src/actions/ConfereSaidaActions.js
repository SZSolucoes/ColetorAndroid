/* eslint-disable max-len */
import Axios from 'axios';
import { Actions } from 'react-native-router-flux';

import { doFetchInfoBatismo } from './ConfereVolumeActions';
import { doAlertWithTimeout } from '../components/utils/Alerts';

export const modificaBatismo = (value) => ({
        type: 'modifica_batismo_confsaida',
        payload: value
});

export const modificaQtdConfItens = (value) => ({
        type: 'modifica_qtdconfitens_confsaida',
        payload: value
});

export const modificaCodEAN = (value) => ({
        type: 'modifica_codean_confsaida',
        payload: value
});

export const modificaLote = (value) => ({
        type: 'modifica_lote_confsaida',
        payload: value
});

export const modificaQtde = (value) => ({
        type: 'modifica_quantidade_confsaida',
        payload: value
});

export const modificaCodItem = (value) => ({
        type: 'modifica_coditem_confsaida',
        payload: value
});

export const modificaUm = (value) => ({
        type: 'modifica_um_confsaida',
        payload: value
});

export const modificaItemDesc = (value) => ({
        type: 'modifica_itemdesc_confsaida',
        payload: value
});

export const modificaLocalizacao = (value) => ({
        type: 'modifica_localizacao_confsaida',
        payload: value
});

export const modificaItemSelected = (value) => ({
        type: 'modifica_itemselected_confsaida',
        payload: value
});

export const modificaClean = () => ({
        type: 'modifica_clean_confsaida'
});

export const doFetchBatismo = (params, focusInField, checkIfUrgent) => dispatch => {
    dispatch({ type: 'modifica_visible_loadingspin', payload: true });

    Axios.get('/coletor/getPickingList.p', { params: 
        { 
            ...params,
            usuario: params.userName 
        } 
    })
    .then(res => onFetchBatismoSuccess(dispatch, res, focusInField, checkIfUrgent))
    .catch(() => onFetchBatismoError(dispatch, focusInField, checkIfUrgent));
};

const onFetchBatismoSuccess = (dispatch, res, focusInField, checkIfUrgent) => {
    const bResOk = res && res.data;

    dispatch({ type: 'modifica_visible_loadingspin', payload: false });

    if (bResOk && typeof res.data === 'object') {
        if (res.data.success === 'true') {
            const isUrgent = res.data.prioridades[0].urg.trim().toLowerCase() === 'true';
            dispatch({
                type: 'modifica_isurgent_confsaida',
                payload: isUrgent
            });
            doFetchDispatches(dispatch, res.data.prioridades);
            focusInField('qtdconfitens'); // foco no campo especifico
        } else {
            doAlertWithTimeout('Erro Conferência', res.data.message, 500);
            focusInField('batismo'); // foco no campo especifico
        }
    } else {
        doAlertWithTimeout('Conferência', 'Ocorreu uma falha interna no servidor, verifique a conexão!', 500);
        focusInField('batismo'); // foco no campo especifico
    }
    checkIfUrgent();
};

const onFetchBatismoError = (dispatch, focusInField, checkIfUrgent) => {
    dispatch({ type: 'modifica_visible_loadingspin', payload: false });

    doAlertWithTimeout('Erro Conferência', 'Erro Conexão!', 500);

    focusInField('batismo');
    checkIfUrgent();
};

export const doConfSaida = (params, newItemList, listEmpty) => dispatch => {
    dispatch({ type: 'modifica_visible_loadingspin', payload: true });

    Axios.get('/coletor/doCheckPicking.p', { params: 
        { 
            ...params,
            usuario: params.userName
        } 
    })
    .then(res => onConfSuccess(dispatch, res, newItemList, listEmpty, params))
    .catch(() => onConfError(dispatch));
};

const onConfSuccess = (dispatch, res, newItemList, listEmpty, params) => {
    const bResOk = res && res.data;

    dispatch({ type: 'modifica_visible_loadingspin', payload: false });

    if (bResOk && typeof res.data === 'object') {
        if (res.data.success === 'true') {
            doItemDispatches(dispatch, newItemList);
            doAlertWithTimeout(
                'Conferência',
                res.data.message,
                500,
                [
                    { text: 'OK', onPress: () => checkLastItem(dispatch, listEmpty, params) },
                ],
                { cancelable: false }
            );
        } else {
            doAlertWithTimeout(
                'Erro Conferência',
                res.data.message,
                500
            );
        }
    } else {
        doAlertWithTimeout(
            'Conferência',
            'Ocorreu uma falha interna no servidor, verifique a conexão!',
            500
        );
    }
};

const onConfError = (dispatch) => {
    dispatch({ type: 'modifica_visible_loadingspin', payload: false });
    
    doAlertWithTimeout(
        'Erro Conferência',
        'Erro Conexão!',
        500
    );
};

const doFetchDispatches = (dispatch, prioridades) => {
    if (prioridades.length > 0) {
        dispatch({
            type: 'modifica_cleanonfetch_confsaida'
        });
        dispatch({
            type: 'modifica_embarque_confsaida',
            payload: prioridades[0].embarque
        });
        dispatch({
            type: 'modifica_resumo_confsaida',
            payload: prioridades[0].resumo
        });
        dispatch({
            type: 'modifica_cidade_confsaida',
            payload: prioridades[0].cidade
        });
        dispatch({
            type: 'modifica_entrega_confsaida',
            payload: prioridades[0].entrega
        });
        dispatch({
            type: 'modifica_nome_confsaida',
            payload: prioridades[0].nome
        });
        dispatch({
            type: 'modifica_range_confsaida',
            payload: prioridades[0].range
        });
        dispatch({
            type: 'modifica_pedido_confsaida',
            payload: prioridades[0].pedido
        });
        dispatch({
            type: 'modifica_qtdtotitens_confsaida',
            payload: prioridades[0].qtdLin
        });
        dispatch({
            type: 'modifica_separador_confsaida',
            payload: prioridades[0].separador
        });
        doItemDispatches(dispatch, prioridades[0].itens);
    }
};

const doItemDispatches = (dispatch, itens) => {
    if (itens && itens.length > 0) {
        dispatch({
            type: 'modifica_itemselected_confsaida',
            payload: 0
        });
        dispatch({
            type: 'modifica_qtdconfitens_confsaida',
            payload: itens.length
        });
        dispatch({
            type: 'modifica_codean_confsaida',
            payload: ''
        });
        dispatch({
            type: 'modifica_coditem_confsaida',
            payload: itens[0].itCode
        });
        dispatch({
            type: 'modifica_um_confsaida',
            payload: itens[0].un
        });
        dispatch({
            type: 'modifica_quantidade_confsaida',
            payload: ''
        });
        dispatch({
            type: 'modifica_itemdesc_confsaida',
            payload: itens[0].itDesc
        });
        dispatch({
            type: 'modifica_localizacao_confsaida',
            payload: itens[0].local
        });
        dispatch({
            type: 'modifica_lote_confsaida',
            payload: ''
        });
        dispatch({
            type: 'modifica_listitems_confsaida',
            payload: itens
        });
    } else {
        // Limpa o formulário
        dispatch({
            type: 'modifica_clean_confsaida'
        });
    }
};

const checkLastItem = (dispatch, listEmpty, params) => {
    if (listEmpty) {
        dispatch({
            type: 'modifica_batismo_confvolume',
            payload: params.etiqueta
        });
        doFetchInfoBatismo({ 
            userName: params.userName, 
            etiqueta: params.etiqueta })(dispatch);
        Actions.conferenciaVolumeSaida({ isMenu: false });
    }        
};

