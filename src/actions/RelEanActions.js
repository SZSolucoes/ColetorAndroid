import { Alert } from 'react-native';
import Axios from 'axios';

export const modificaCodEan = (codEAN) => ({ 
        type: 'modifica_codean_relean', 
        payload: codEAN
    });
export const modificaCodItem = (codItem) => ({ 
        type: 'modifica_coditem_relean', 
        payload: codItem
    });
export const cleanRelEanReducer = () => ({ 
        type: 'modifica_clean_relean'
    });
export const doConfirm = (propparams) => dispatch => {
        Axios.get('app/doListItemEan.p', {
            params: {
                codEAN: propparams.codEAN,
                codItem: propparams.codItem
            }
        })
        .then(response => onRelSuccess(dispatch, response))
        .catch(() => alertRelError());
    };
const alertRelError = () => {
    Alert.alert('Erro', 'Erro ao Confirmar');
};
const onRelSuccess = (dispatch, response) => {
    if (response.data.success === 'true') {
        Alert.alert('Aviso', response.data.message);
    } else if (response.data.message) {
        Alert.alert('Aviso', response.data.message); 
    } else {
        Alert.alert('Erro', 'Erro ao Confirmar');
    }
};
