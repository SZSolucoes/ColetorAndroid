
import { Alert } from 'react-native';
import Axios from 'axios';

export const modificaLocalizacao = (value) => ({
    type: 'modifica_localizacao_consultalocalizacao',
    payload: value
});

export const modificaCleanLocalizacao = () => ({
    type: 'modifica_clean_consultalocalizacao'
});

export const doFetchLocation = (params) => dispatch => {
    dispatch({ type: 'modifica_visible_loadingspin', payload: true });
    Axios.get('/coletor/getStockInfoByLocaliz.p', {
        params: {
            cod_localiz: params.localizacao
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
    .then(res => onSuccess(dispatch, res))
    .catch(() => onError(dispatch));
};

const onSuccess = (dispatch, res) => {
    const bodyOk = res && res.data;

    dispatch({ type: 'modifica_visible_loadingspin', payload: false });

    if (bodyOk) {
        if (res.data.success === 'true') {
            if (res.data.local) {
                dispatch({ 
                    type: 'modifica_desclocalizacao_consultalocalizacao', 
                    payload: res.data.local.descLocaliz 
                });
                dispatch({ 
                    type: 'modifica_listsaldo_consultalocalizacao', 
                    payload: res.data.local.saldo 
                });
            } else {
                Alert.alert('Erro', 'Localização não encontrada.');
            }
        } else if (res.data.success === 'false') {
            Alert.alert('Erro', res.data.message);
        } else {
            Alert.alert('Erro', 'Ocorreu uma falha interna no servidor. Verifique a conexão');
        }
    } else {
        console.log('sem data');
        Alert.alert('Erro', 'Ocorreu uma falha interna no servidor. Verifique a conexão');
    }
};

const onError = () => {
    dispatch({ type: 'modifica_visible_loadingspin', payload: false });
    Alert.alert('Erro', 'Falha de comunicação com o servidor. Verifique a conexão!');
};

