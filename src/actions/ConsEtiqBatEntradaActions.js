import { Alert } from 'react-native';
import Axios from 'axios';

export const modificaBatismo = codEtiqBatismo => ({
    type: 'modifica_batismo_consbatentrada',
    payload: codEtiqBatismo
});

export const doConsBatismo = codEtiqBatismo => dispatch => {
        dispatch({ type: 'modifica_clean_consbatentrada' });

        Axios.get('/app/getConsEtiqBatismo.p', {
            params: {
                codEtiqBatismo
            }
        })
        .then(response => buscaSuccess(dispatch, response))
        .catch(() => buscaError());
    };

const buscaSuccess = (dispatch, response) => {
    console.log(response);
    if (response.data.success === 'true') {
        dispatch({ type: 'modifica_listitem_consbatentrada', payload: response.data.item });
    } else {
        Alert.alert(
            'Erro Estoque',
            response.data.message
        );
    }
};

const buscaError = () => {
    Alert.alert(
        'Erro Consulta',
        'Erro Conexão!'
    );
};

export const modificaClean = () => ({
    type: 'modifica_clean_consbatentrada'
});
