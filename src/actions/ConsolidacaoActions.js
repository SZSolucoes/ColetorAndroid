import Axios from 'axios';
import { Alert } from 'react-native';

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

    Axios.get('/coletor/getCheckLabel.p', { params })
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
            dispatch({ type: 'modifica_cleanlist_consolid' });
            setTimeout(() => Alert.alert(
                'Consolidação',
                res.data.message
            ), 500);
            focusInField('etiqconf');
        }
    } else {
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

// IMPLEMENTANDO MÉTODO DE RETORNO PARA CONSOLIDAR
/* export const doConsolidation = (params, focusInField) => dispatch => {
    dispatch({ type: 'modifica_visible_loadingspin', payload: true });

    Axios.get('/coletor/doConsolidation.p', { params })
    .then(res => onConsSuccess(dispatch, res, focusInField))
    .catch(() => onConsError(dispatch, focusInField));
};

const onConsSuccess = (dispatch, res, focusInField) => {
    const bResOk = res && res.data;

    dispatch({ type: 'modifica_visible_loadingspin', payload: false });

    if (bResOk && typeof res.data === 'object') {
        if (res.data.success === 'true') {
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
};

const onConsError = (dispatch, focusInField) => {
    dispatch({ type: 'modifica_visible_loadingspin', payload: false });
    setTimeout(() => Alert.alert(
        'Consolidação',
        'Erro Conexão!'
    ), 500);
}; */
