import Axios from 'axios';
import { Alert } from 'react-native';
import { store } from '../App';

export const modificaConf = codConf => ({
        type: 'modifica_conf_consolid',
        payload: codConf    
});
export const modificaEmb = codEmb => ({
        type: 'modifica_emb_consolid',
        payload: codEmb    
});
export const modificaVol = codVol => ({
        type: 'modifica_vol_consolid',
        payload: codVol    
});
export const addList = codVol => ({
        type: 'modifica_addlist_consolid',
        payload: codVol    
});
export const modificaClean = () => ({
        type: 'modifica_clean_consolid'  
});

export const doFetchEtiqConf = (params, focusInField) => dispatch => {
    dispatch({ type: 'modifica_visible_loadingspin', payload: true });

    Axios.get('/coletor/getCheckLabel.p', { params: 
        { 
            ...params,
            usuario: store.getState().LoginReducer.usuario  
        } 
    })
    .then(res => onFetchSuccess(dispatch, res, focusInField))
    .catch(() => onFetchError(dispatch, focusInField));
};

const onFetchSuccess = (dispatch, res, focusInField) => {
    const bResOk = res && res.data;

    dispatch({ type: 'modifica_visible_loadingspin', payload: false });

    if (bResOk && typeof res.data === 'object') {
        if (res.data.success === 'true') {
            focusInField('etiqvolume');
            doFetchDispatch(dispatch, res.data);
        } else {
            dispatch({ type: 'modifica_emb_consolid', payload: '' });
            dispatch({ type: 'modifica_cleanlist_consolid' });
            setTimeout(() => Alert.alert(
                'Consolidação',
                res.data.message
            ), 500);
            focusInField('etiqconf');
        }
    } else {
        dispatch({ type: 'modifica_emb_consolid', payload: '' });
        dispatch({ type: 'modifica_cleanlist_consolid' });
        setTimeout(() => Alert.alert(
            'Consolidação',
            'Ocorreu uma falha interna no servidor, verifique a conexão!'
        ), 500);
        focusInField('etiqconf');
    }
};

const onFetchError = (dispatch, focusInField) => {
    dispatch({ type: 'modifica_visible_loadingspin', payload: false });
    dispatch({ type: 'modifica_emb_consolid', payload: '' });
    dispatch({ type: 'modifica_cleanlist_consolid' });

    setTimeout(() => Alert.alert(
        'Consolidação',
        'Erro Conexão!'
    ), 500);
    focusInField('etiqconf');
};

const doFetchDispatch = (dispatch, data) => {
    const { etiquetas } = data;
    dispatch({ 
        type: 'modifica_emb_consolid',
        payload: data.embarque 
    });
    dispatch({ 
        type: 'modifica_keyret_consolid',
        payload: {
            resumo: data.resumo,
            nome: data.nome,
            pedido: data.pedido,
            range: data.range
        } 
    });
    if (etiquetas && etiquetas.length > 0) {
        dispatch({ type: 'modifica_cleanlist_consolid' });
        const newList = [];
        etiquetas.forEach((item, index) => {
            newList.push({ 
                seq: index + 1,
                vol: item.etiqVol.trim()
            });
        });
        dispatch({
            type: 'modifica_listitens_consolid',
            payload: newList
        });
        dispatch({
            type: 'modifica_seq_consolid',
            payload: newList.length
        });
    } else {
        dispatch({ type: 'modifica_cleanlist_consolid' });
    }
};

export const doConsolidation = (params, focusInField) => dispatch => {
    dispatch({ type: 'modifica_visible_loadingspin', payload: true });

    Axios.get('/coletor/doConsolidation.p', { params: 
        { 
            ...params,
            usuario: store.getState().LoginReducer.usuario  
        } 
    })
    .then(res => onConsSuccess(dispatch, res, params, focusInField))
    .catch(() => onConsError(dispatch, focusInField));
};

const onConsSuccess = (dispatch, res, params, focusInField) => {
    const bResOk = res && res.data;

    dispatch({ type: 'modifica_visible_loadingspin', payload: false });

    if (bResOk && typeof res.data === 'object') {
        if (res.data.success === 'true') {
            if (res.data.concluido && res.data.concluido === 'true') {
                dispatch({
                    type: 'modifica_clean_consolid'
                });
            } else {
                dispatch({
                    type: 'modifica_addlist_consolid',
                    payload: params.etiqCons
                });
                dispatch({
                    type: 'modifica_conf_consolid',
                    payload: ''
                });
                dispatch({
                    type: 'modifica_vol_consolid',
                    payload: ''
                });
            }
        } else {
            setTimeout(() => Alert.alert(
                'Consolidação',
                res.data.message
            ), 500);
        }
    } else {
        setTimeout(() => Alert.alert(
            'Consolidação',
            'Ocorreu uma falha interna no servidor, verifique a conexão!'
        ), 500);
    }
    focusInField('etiqvolume');
};

const onConsError = (dispatch, focusInField) => {
    dispatch({ type: 'modifica_visible_loadingspin', payload: false });
    
    setTimeout(() => Alert.alert(
        'Consolidação',
        'Erro Conexão!'
    ), 500);
    focusInField('etiqvolume');
};

