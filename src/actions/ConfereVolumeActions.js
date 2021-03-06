import Axios from 'axios';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { store } from '../App';

export const modificaBatismo = (value) => ({
    type: 'modifica_batismo_confvolume',
    payload: value
});

export const modificaEmbalagem = (value) => ({
    type: 'modifica_embalagem_confvolume',
    payload: value
});

export const modificaVolume = (value) => ({
    type: 'modifica_volume_confvolume',
    payload: value
});

export const modificaSigla = (value) => ({
    type: 'modifica_sigla_confvolume',
    payload: value
});

export const modificaKeyEmb = (value) => ({
    type: 'modifica_keyemb_confvolume',
    payload: value
});

export const modificaPesoBruto = (value) => ({
    type: 'modifica_pesobruto_confvolume',
    payload: value
});

export const modificaListVolumes = (value) => ({
    type: 'modifica_listvolumes_confvolume',
    payload: value
});

export const modificaModalVisible = (value) => ({
    type: 'modifica_modalvisible_confvolume',
    payload: value
});

export const modificaClean = () => ({
    type: 'modifica_clean_confvolume'
});

export const doFetchInfoBatismo = (params, focusInField) => dispatch => {
    dispatch({ type: 'modifica_visible_loadingspin', payload: true });

    Axios.get('/coletor/getInfoBatismo.p', { params: 
        { 
            ...params,
            usuario: params.userName
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
            doFetchDispatch(dispatch, res.data.embarque);
        } else {
            setTimeout(() => Alert.alert(
                'Erro Conf - Volumes',
                res.data.message
            ), 500);
            focusInField('batismo');
        }
    } else {
        setTimeout(() => Alert.alert(
            'Erro Conf - Volumes',
            'Ocorreu uma falha interna no servidor, verifique a conexão!'
        ), 500);
        focusInField('batismo');
    }
};

const onFetchError = (dispatch, focusInField) => {
    dispatch({ type: 'modifica_visible_loadingspin', payload: false });

    setTimeout(() => Alert.alert(
        'Erro Conf - Volumes',
        'Erro Conexão!'
    ), 500);
    focusInField('batismo');
};

const doFetchDispatch = (dispatch, embarque) => {
    if (embarque && embarque.length > 0) {
        dispatch({
            type: 'modifica_embarque_confvolume',
            payload: embarque[0].embarque
        });
        dispatch({
            type: 'modifica_pedido_confvolume',
            payload: embarque[0].pedido
        });
        dispatch({
            type: 'modifica_keyret_confvolume',
            payload: embarque[0]
        });
    } else {
        dispatch({ type: 'modifica_clean_confvolume' });
    }
};

export const doFetchListEmbalagens = () => dispatch => {
    Axios.get('/coletor/getPackings.p', { params: 
        { 
            usuario: store.getState().LoginReducer.usuario  
        } 
    })
    .then(res => onFetchEmbSuccess(dispatch, res))
    .catch(() => onFetchEmbError());
};

const onFetchEmbSuccess = (dispatch, res) => {
    const bResOk = res && res.data;

    if (bResOk && typeof res.data === 'object') {
        if (res.data.success === 'true' && res.data.embalagem.length > 0) {
            const newListEmb = [];
            res.data.embalagem.forEach((item, index) => {
                newListEmb.push({ 
                    key: index.toString(), 
                    label: item.embalagem,
                    sigla: item.sigla
                 });
            });
            dispatch({
                type: 'modifica_listembalagens_confvolume',
                payload: newListEmb
            });
        } else {
            Alert.alert(
                'Erro Conf - Volumes',
                res.data.message
            );
        }
    } else {
        Alert.alert(
            'Erro Conf - Volumes',
            'Ocorreu uma falha interna no servidor, verifique a conexão!'
        );
    }
};

const onFetchEmbError = () => {
    Alert.alert(
        'Erro Conf - Volumes',
        'Erro Conexão!'
    );
};

export const doConfVol = (params, isMenu) => dispatch => {
    dispatch({ type: 'modifica_visible_loadingspin', payload: true });

    Axios.get('/coletor/doEndCheckPicking.p', { params: 
        { 
            ...params,
            usuario: params.userName
        } 
    })
    .then(res => onConfVolSuccess(dispatch, res, params, isMenu))
    .catch(() => onConfVolError(dispatch));
};

const onConfVolSuccess = (dispatch, res, params, isMenu) => {
    const bResOk = res && res.data;

    dispatch({ type: 'modifica_visible_loadingspin', payload: false });

    if (bResOk && typeof res.data === 'object') {
        if (res.data.success === 'true') {
            doPrint({
                usuario: params.userName,
                qtdEtiq: '1',
                embarque: params.embarque,
                range: params.range
            }, false)(dispatch);
            dispatch({
                type: 'modifica_clean_confvolume'
            });
            setTimeout(() => Alert.alert(
                'Conf - Volumes',
                res.data.message,
                [
                    { 
                        text: 'OK', 
                        onPress: () => {
                            if (!isMenu) {
                                dispatch({
                                    type: 'modifica_clean_confsaida'
                                });
                                Actions.pop();
                            }
                        } 
                    }
                ],
                { cancelable: false }
            ), 500);
        } else {
            setTimeout(() => Alert.alert(
                'Erro Conf - Volumes',
                res.data.message
            ), 500);
        }
    } else {
        setTimeout(() => Alert.alert(
            'Erro Conf - Volumes',
            'Ocorreu uma falha interna no servidor, verifique a conexão!'
        ), 500);
    }
};

const onConfVolError = (dispatch) => {
    dispatch({ type: 'modifica_visible_loadingspin', payload: false });

    setTimeout(() => Alert.alert(
        'Erro Conf - Volumes',
        'Erro Conexão!'
    ), 500);
};

export const doPrint = (params, doAlert = false) => dispatch => {
    Axios.get('/coletor/doPrint.p', { params: 
        { 
            ...params,
            usuario: store.getState().LoginReducer.usuario  
        } 
    })
    .then(res => onPrintSuccess(dispatch, res, doAlert))
    .catch(() => onPrintError(doAlert));
};

const onPrintSuccess = (dispatch, res, doAlert) => {
    const bResOk = res && res.data;
    if (doAlert) {
        if (bResOk && typeof res.data === 'object') {
            if (res.data.success === 'true') {
                setTimeout(() => Alert.alert(
                    'Conf - Volumes',
                    res.data.message
                ), 500);
            } else {
                setTimeout(() => Alert.alert(
                    'Erro Conf - Volumes',
                    res.data.message
                ), 500);
            }
        } else {
            setTimeout(() => Alert.alert(
                'Erro Conf - Volumes',
                'Ocorreu uma falha interna no servidor, verifique a conexão!'
            ), 500);
        }
    }
};

const onPrintError = (doAlert) => {
    if (doAlert) {
        setTimeout(() => Alert.alert(
            'Erro Conf - Volumes',
            'Erro Conexão!'
        ), 500);
    }
};

