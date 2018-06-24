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
export const modificaCodEtiq = (codEtiq) => ({ 
        type: 'modifica_codetiq_invent', 
        payload: codEtiq
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
export const doConfirm = (propparams) => dispatch => {
        Axios.get('/app/doInventoryCounting.p', {
            params: {
                username: propparams.username,
                codLocal: propparams.codLocal,
                nrContagem: propparams.nrContagem,
                codEtiq: propparams.codEtiq,
                dtInventario: propparams.dtInventario,
                qtItem: propparams.qtItem,
            }
        })
        .then(response => onConfSuccess(dispatch, response))
        .catch(error => alertConfError(dispatch, error));
    };
export const doConfirmEst = (propparams) => dispatch => {
    Axios.get('/app/undoInventoryCounting.p', {
        params: {
            username: propparams.username,
            codLocal: propparams.codLocal,
            nrContagem: propparams.nrContagem,
            codEtiq: propparams.codEtiq,
            dtInventario: propparams.dtInventario
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
        Alert.alert('Aviso', response.data.message);
    } else {
        Alert.alert('Erro', 'Erro ao Confirmar');
    }
};
