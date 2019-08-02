import { Alert } from 'react-native';
import Axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { store } from '../App';

export const modificaCodCorte = (value) => ({
    type: 'modifica_codigo_corte',
    payload: value
});

export const modificaEquipamento = (value) => ({
    type: 'modifica_equipamento_corte',
    payload: value
});

export const modificaDtCorte = (value) => ({
    type: 'modifica_data_corte',
    payload: value
});

export const modificaEmbarque = (value) => ({
    type: 'modifica_embarque_corte',
    payload: value
});

export const modificaNomeAbrev = (value) => ({
    type: 'modifica_nomeabrev_corte',
    payload: value
});

export const modificaPedido = (value) => ({
    type: 'modifica_pedido_corte',
    payload: value
});

export const modificaSequencia = (value) => ({
    type: 'modifica_sequencia_corte',
    payload: value
});

export const modificaCodItem = (value) => ({
    type: 'modifica_coditem_corte',
    payload: value
});

export const modificaDescItem = (value) => ({
    type: 'modifica_descitem_corte',
    payload: value
});

export const modificaLote = (value) => ({
    type: 'modifica_lote_corte',
    payload: value
});

export const modificaUn = (value) => ({
    type: 'modifica_un_corte',
    payload: value
});

export const modificaLocalizacao = (value) => ({
    type: 'modifica_localizacao_corte',
    payload: value
});

export const modificaQtdItem = (value) => ({
    type: 'modifica_qtditem_corte',
    payload: value
});

export const modificaCodEAN = (value) => ({
    type: 'modifica_codean_corte',
    payload: value
});

export const modificaObrigatorio = (value) => ({
    type: 'modifica_obrigatorio_corte',
    payload: value
});

export const modificaListaItem = (listaItem) => ({
    type: 'modifica_listaItem_corte',
    payload: listaItem
});

export const modificaValidEan = (value) => ({
    type: 'modifica_validean_corte',
    payload: value
});

export const modificaValidQtd = (value) => ({
    type: 'modifica_validqtd_corte',
    payload: value
});

export const modificaEnableFetchButton = (value) => ({
    type: 'modifica_enablefetchbtn_corte',
    payload: value
});

export const modificaCorteSelec = (value) => ({
    type: 'modifica_corte_selec',
    payload: value
});

export const modificaItemCorteSelec = (value) => ({
    type: 'modifica_item_corte_selec',
    payload: value
});

export const modificaClean = () => ({
    type: 'modifica_clean_corte'
});

export const iniciaTela = () => ({
    type: 'modifica_clean_corte'
});

export const fetchListCortes = (userName) => dispatch => {
    dispatch({
        type: 'modifica_loadingCortes',
        payload: true
    });
    dispatch({ type: 'modifica_visible_loadingspin', payload: true });

    Axios.get('/coletor/getPrePicking.p', {
        params: {
            userName
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
    .then(response => onFetchSuccess(dispatch, response))
    .catch(() => onFetchError(dispatch));
};

const onFetchSuccess = (dispatch, response) => {
    dispatch({ type: 'modifica_visible_loadingspin', payload: false });

    console.log(response);
    
    if (response && response.data) {
        const data = response.data;
        if (data.success === 'true' && data.cortes.length > 0) {
            console.log(data.cortes);
            dispatch({
                type: 'modifica_loadingCortes',
                payload: false
            });
            dispatch({
                type: 'modifica_listaCortes_corte',
                payload: data.cortes
            });
            Actions.corteCabos();
            return;
        } 
        dispatch({
            type: 'modifica_loadingCortes',
            payload: false
        });
        Alert.alert('Aviso', response.data.message);
        return;
    }
    dispatch({
        type: 'modifica_loadingCortes',
        payload: false
    });
    Alert.alert('Erro', 'Ocorreu uma falha interna no servidor.');
};

const onFetchError = (dispatch) => {
    dispatch({ type: 'modifica_visible_loadingspin', payload: false });
    dispatch({
        type: 'modifica_loadingCortes',
        payload: false
    });
    Alert.alert('Erro', 'Ocorreu uma falha de comunicação com o servidor.');
};

export const efetivaCorteCabos = (usuario, corteSelec, itemCorte, corte) => dispatch => {
    dispatch({ type: 'modifica_visible_loadingspin', payload: true });
    Axios.get('/coletor/doPrePicking.p', {
        params: {
            usuario,
            codCorte: corteSelec.codCorte,
            embarque: itemCorte.embarque,
            nomeAbrev: itemCorte.nomeAbrev,
            pedido: itemCorte.pedido,
            sequencia: itemCorte.sequencia,
            codItem: itemCorte.codItem,
            qtdItem: corte.qtdItem,
            eqpto: corte.equipamento
        }
    })
    .then(response => corteSuccess(dispatch, response, corteSelec, itemCorte))
    .catch(() => corteError(dispatch));
};

const corteSuccess = (dispatch, response, corteSelec, itemCorte) => {
    const retorno = {
        corteSelec,
        itemCorte
    };
    dispatch({ type: 'modifica_visible_loadingspin', payload: false });
    if (response.data.success === 'true') {
        dispatch({ type: 'efetiva_corte', payload: retorno });
        Alert.alert(
            'Corte de Cabos',
            response.data.message
        );
    } else {
        Alert.alert(
            'Corte de Cabos',
            response.data.message
        );
    }
};

const corteError = (dispatch) => {
    dispatch({ type: 'modifica_visible_loadingspin', payload: false });
    Alert.alert(
        'Erro Corte de Cabos',
        'Erro Conexão!'
    );
};

export const imprimeEtiquetaCorte = (usuario, codCorte) => {
    return dispatch => {
        Axios.get('/coletor/doPrint.p', {
            params: {
                usuario,
                codCorte
            }
        })
        .then(response => imprimeSuccess(dispatch, response))
        .catch(() => imprimeError());
    };
};

const imprimeSuccess = (dispatch, response) => {
    if (response.data.success === 'true') {
        Alert.alert(
            'Impressão Etiqueta',
            response.data.message
        );
    } else {
        Alert.alert(
            'Erro Impressão Etiqueta',
            response.data.message
        );
    }
};

const imprimeError = () => {
    Alert.alert(
        'Erro Impressão Etiqueta',
        'Erro Conexão!'
    );
};
