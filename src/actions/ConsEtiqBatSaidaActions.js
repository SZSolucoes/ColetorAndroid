import { Alert } from 'react-native';
import Axios from 'axios';
import { store } from '../App';
import { doAlertWithTimeout } from '../components/utils/Alerts';

export const modificaBatismo = value => ({
    type: 'modifica_batismo_consbatsaida',
    payload: value
});

export const modificaClean = () => ({
    type: 'modifica_clean_consbatsaida'
});

export const doConsBatismo = params => dispatch => {
    dispatch({ type: 'modifica_visible_loadingspin', payload: true });

    Axios.get('/coletor/getBatismoSaida.p', { params: 
        { 
            ...params,
            usuario: store.getState().LoginReducer.usuario  
        } 
    })
    .then(res => buscaSuccess(dispatch, res))
    .catch(() => buscaError(dispatch));
};

const buscaSuccess = (dispatch, res) => {
    dispatch({ type: 'modifica_visible_loadingspin', payload: false });

    const bResOk = res && res.data;

    if (bResOk && typeof res.data === 'object') {
        if (res.data.success === 'true') {
            dispatch({ type: 'modifica_listitem_consbatsaida', payload: res.data.etiquetas });
        } else {
            doAlertWithTimeout(
                'Erro Consulta',
                res.data.message,
                500
            );
        }
    } else {
        doAlertWithTimeout('Erro', 'Ocorreu uma falha interna no servidor.', 500);  
    }
};

const buscaError = (dispatch) => {
    dispatch({ type: 'modifica_visible_loadingspin', payload: false });

    Alert.alert(
        'Erro Consulta',
        'Erro Conexão!'
    );
};

