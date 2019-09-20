import { Alert } from 'react-native';
import Axios from 'axios';
import { store } from '../App';
import { doAlertWithTimeout } from '../components/utils/Alerts';

export const modificaBatismo = codEtiqBatismo => ({
    type: 'modifica_batismo_consbatentrada',
    payload: codEtiqBatismo
});

export const modificaClean = () => ({
    type: 'modifica_clean_consbatentrada'
});

export const doConsBatismo = codEtiqBatismo => dispatch => {
    dispatch({ type: 'modifica_visible_loadingspin', payload: true });

    Axios.get('/coletor/getConsEtiqBatismo.p', {
        params: {
            codEtiqBatismo,
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
            dispatch({ type: 'modifica_listitem_consbatentrada', payload: res.data.item });
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

