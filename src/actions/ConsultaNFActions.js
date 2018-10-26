
import Axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import _ from 'lodash';
import { store } from '../App';

export const modificaCodNF = (value) => (
    {
        type: 'modifica_codnf_consultanf',
        payload: value
    }
);

export const modificaListItemsNF = (value) => (
    {
        type: 'modifica_listitemnf_consultanf',
        payload: value
    }
);

export const modificaClean = () => (
    {
        type: 'modifica_clean_consultanf'
    }
);

export const buscaItemsNF = (usuario, codNF) => dispatch => {
        Axios.get('/coletor/getInvoiceInfo.p', {
            params: {
                nrodocto: codNF,
                usuario: store.getState().LoginReducer.usuario
            },
            headers: {
                'Content-Type': 'application/json'
            },
            transformResponse: [(data) => {
                try {
                    return JSON.parse(decodeURIComponent(data));
                } catch (e) {
                    return data;
                }
            }]
        })
        .then(response => buscaSuccess(dispatch, response))
        .catch(() => buscaError());
};

const buscaSuccess = (dispatch, response) => {
    if (response.data.success === 'true') {
        const nfs = _.values(response.data.notas);

        if (nfs) {
            const nNotas = nfs.length;
            if (nNotas > 1) {
                dispatch({
                    type: 'modifica_listnf_consultanf',
                    payload: nfs
                });
                setTimeout(() => Actions.consultaNFPush(), 200);
            } else if (nNotas === 1) {
                dispatch({
                    type: 'modifica_listitemnf_consultanf',
                    payload: nfs[0].itens
                });
            } else {
                dispatch({
                    type: 'modifica_listnf_consultanf',
                    payload: []
                });
                dispatch({
                    type: 'modifica_listitemnf_consultanf',
                    payload: []
                });
            }
        }
    } else {
        dispatch({
            type: 'modifica_listnf_consultanf',
            payload: []
        });
        dispatch({
            type: 'modifica_listitemnf_consultanf',
            payload: []
        });
        Alert.alert(
            'Erro Consulta NF',
            response.data.message
        );
    }
};

const buscaError = () => {
    Alert.alert(
        'Erro Consulta NF',
        'Erro Conexão!'
    );
};
