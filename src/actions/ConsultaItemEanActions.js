
import Axios from 'axios';
import { Alert } from 'react-native';

export const modificaItCode = (value) => ({
    type: 'modifica_itcod_consultaitemean',
    payload: value
});

export const modificaClean = () => ({
    type: 'modifica_clean_consultaitemean'
});

export const modificaEan1 = (value) => ({
    type: 'modifica_ean1_consultaitemean',
    payload: value
});

export const modificaEan2 = (value) => ({
    type: 'modifica_ean2_consultaitemean',
    payload: value
});

export const modificaEan3 = (value) => ({
    type: 'modifica_ean3_consultaitemean',
    payload: value
});

export const modificaEan4 = (value) => ({
    type: 'modifica_ean4_consultaitemean',
    payload: value
});

export const modificaEan5 = (value) => ({
    type: 'modifica_ean5_consultaitemean',
    payload: value
});

export const doFetchEan = (params, notShowAlerts = false) => dispatch => {
    if (!notShowAlerts) {
        dispatch({ type: 'modifica_visible_loadingspin', payload: true });
    }
    Axios.get('/coletor/getEanItem.p', {
        params: {
            itCode: params.itCode
        },
        transformResponse: (data) => {
            let dataParsed = '';
            try {
                dataParsed = JSON.parse(data.replace(/\r?\n|\r/g, ''));
            } catch (e) {
                return undefined;
            }
            return dataParsed;
        }
    })
    .then(res => onSuccess(dispatch, res, notShowAlerts))
    .catch(() => onError(dispatch, notShowAlerts));
};

const onSuccess = (dispatch, res, notShowAlerts) => {
    const bodyOk = res && res.data;

    if (!notShowAlerts) {
        dispatch({ type: 'modifica_visible_loadingspin', payload: false });
    }

    if (bodyOk) {
        if (res.data.success === 'true') {
            doDispatches(dispatch, res.data);
            return;
        } else if (res.data.success === 'false') {
            if (!notShowAlerts) {
                Alert.alert('Erro', res.data.message);
            }
        } else if (!notShowAlerts) {
            Alert.alert('Erro', 'Ocorreu uma falha interna no servidor. Verifique a conexão');
        }
    } else if (!notShowAlerts) {
        Alert.alert('Erro', 'Ocorreu uma falha interna no servidor. Verifique a conexão');
    }

    if (!notShowAlerts) {
        dispatch({ type: 'modifica_cleanerror_consultaitemean' });
        dispatch({
            type: 'modifica_eanfetched_consultaitemean',
            payload: [1, 2, 3, 4, 5]
        });
    }
};

const onError = (dispatch, notShowAlerts) => {
    if (!notShowAlerts) {
        dispatch({ type: 'modifica_visible_loadingspin', payload: false });
        Alert.alert('Erro', 'Falha de comunicação com o servidor. Verifique a conexão!');
        dispatch({ type: 'modifica_cleanerror_consultaitemean' });
        dispatch({
            type: 'modifica_eanfetched_consultaitemean',
            payload: [1, 2, 3, 4, 5]
        });
    }
};

const doDispatches = (dispatch, data) => {
    const eanFetched = [];

    dispatch({ 
        type: 'modifica_un_consultaitemean', 
        payload: data.un
    });
    dispatch({ 
        type: 'modifica_itdesc_consultaitemean', 
        payload: data.itDesc
    });
    dispatch({ 
        type: 'modifica_ean1_consultaitemean', 
        payload: data.ean1
    });
    dispatch({ 
        type: 'modifica_ean2_consultaitemean', 
        payload: data.ean2
    });
    dispatch({ 
        type: 'modifica_ean3_consultaitemean', 
        payload: data.ean3
    });
    dispatch({ 
        type: 'modifica_ean4_consultaitemean', 
        payload: data.ean4
    });
    dispatch({ 
        type: 'modifica_ean5_consultaitemean', 
        payload: data.ean5
    });
    
    if (!data.ean1) {
        eanFetched.push(1);
    }
    if (!data.ean2) {
        eanFetched.push(2);
    }
    if (!data.ean3) {
        eanFetched.push(3);
    }
    if (!data.ean4) {
        eanFetched.push(4);
    }
    if (!data.ean5) {
        eanFetched.push(5);
    }

    dispatch({
        type: 'modifica_eanfetched_consultaitemean',
        payload: eanFetched
    });
};

