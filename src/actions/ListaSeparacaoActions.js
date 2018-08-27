
import Axios from 'axios';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';


export const modificaEmbarque = (value) => ({
    type: 'modifica_embarque_listaseparacao',
    payload: value
});

export const modificaPedido = (value) => ({
    type: 'modifica_pedido_listaseparacao',
    payload: value
});

export const modificaNomeAbrev = (value) => ({
    type: 'modifica_nomeabrev_listaseparacao',
    payload: value
});

export const modificaBatismo = (value) => ({
    type: 'modifica_batismo_listaseparacao',
    payload: value
});

export const modificaCodEAN = (value) => ({
    type: 'modifica_codean_listaseparacao',
    payload: value
});

export const modificaLocalizacao = (value) => ({
    type: 'modifica_localizacao_listaseparacao',
    payload: value
});

export const modificaUm = (value) => ({
    type: 'modifica_um_listaseparacao',
    payload: value
});

export const modificaQtdItem = (value) => ({
    type: 'modifica_qtditem_listaseparacao',
    payload: value
});

export const modificaQtdSep = (value) => ({
    type: 'modifica_qtdsep_listaseparacao',
    payload: value
});

export const modificaCodItem = (value) => ({
    type: 'modifica_coditem_listaseparacao',
    payload: value
});

export const modificaLote = (value) => ({
    type: 'modifica_lote_listaseparacao',
    payload: value
});

export const modificaQuantidade = (value) => ({
    type: 'modifica_quantidade_listaseparacao',
    payload: value
});

export const modificaDesItem = (value) => ({
    type: 'modifica_desitem_listaseparacao',
    payload: value
});

export const modificaQtdEtiq = (value) => ({
    type: 'modifica_qtetiq_listaseparacao',
    payload: value
});

export const modificaItemSelected = (value) => ({
    type: 'modifica_itemselected_listaseparacao',
    payload: value
});

export const modificaValidEan = (value) => ({
    type: 'modifica_validean_listaseparacao',
    payload: value
});
export const modificaValidQtd = (value) => ({
    type: 'modifica_validqtd_listaseparacao',
    payload: value
});

export const modificaClean = () => ({
    type: 'modifica_clean_listaseparacao'
});

export const fetchListItensSep = (userName) => dispatch => {
    dispatch({
        type: 'modifica_loadinglistsep_listaseparacao',
        payload: true
    });

    Axios.get('/coletor/getPickingPriorNew.p', {
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
    if (response && response.data) {
        const data = response.data;
        if (data.success === 'true' && data.prioridades.length > 0) {
            const isUrgent = data.prioridades[0].urg.toLowerCase() === 'true';
            dispatch({
                type: 'modifica_loadinglistsep_listaseparacao',
                payload: false
            });
            dispatchChanges(dispatch, data.prioridades[0]);
            Actions.listaSeparacaoSaida({ isUrgent });
            return;
        } 
        dispatch({
            type: 'modifica_loadinglistsep_listaseparacao',
            payload: false
        });
        Alert.alert('Aviso', response.data.message);
        return;
    }
    dispatch({
        type: 'modifica_loadinglistsep_listaseparacao',
        payload: false
    });
    Alert.alert('Erro', 'Ocorreu uma falha interna no servidor.');
};

const onFetchError = (dispatch) => {
    dispatch({
        type: 'modifica_loadinglistsep_listaseparacao',
        payload: false
    });
    Alert.alert('Erro', 'Ocorreu uma falha de comunicação com o servidor.');
};

export const doSep = (params, newItemList) => dispatch => {
    Axios.get('/coletor/doPickingNew.p', { params })
        .then((res) => onSepSuccess(dispatch, res, newItemList))
        .catch(() => onSepError()); 
};

const onSepSuccess = (dispatch, res, newItemList) => {
    if (res.data) {
        if (res.data.success === 'true') {
            doSepDispatch(dispatch, newItemList);
            setTimeout(() => Alert.alert(
                'Separação',
                'Separação efetuada com sucesso.'
            ), 500);
        } else if (res.data.message) {
            Alert.alert(
                'Erro Separação',
                res.data.message
            );
        } else {
            Alert.alert('Erro', 'Ocorreu uma falha interna no servidor.');
        }
    }
};

const onSepError = () => {
    Alert.alert(
        'Erro Separação',
        'Erro Conexão!'
    );
};

const doSepDispatch = (dispatch, newItemList) => {
    if (newItemList && newItemList.length > 0) {
        dispatch({
            type: 'modifica_listaitensseppc_listaseparacao',
            payload: newItemList
        });
        dispatch({
            type: 'modifica_um_listaseparacao',
            payload: newItemList[0].un
        });
        dispatch({
            type: 'modifica_codean_listaseparacao',
            payload: ''
        });
        dispatch({
            type: 'modifica_qtdsep_listaseparacao',
            payload: newItemList[0].qtdItem
        });
        dispatch({
            type: 'modifica_coditem_listaseparacao',
            payload: newItemList[0].itCode
        });
        dispatch({
            type: 'modifica_desitem_listaseparacao',
            payload: newItemList[0].itDescAbrev
        });
        dispatch({
            type: 'modifica_localizacao_listaseparacao',
            payload: newItemList[0].local
        });
        dispatch({
            type: 'modifica_lote_listaseparacao',
            payload: newItemList[0].lote
        });
        dispatch({
            type: 'modifica_quantidade_listaseparacao',
            payload: ''
        });
        dispatch({
            type: 'modifica_itemselected_listaseparacao',
            payload: 0
        });
        dispatch({
            type: 'modifica_validean_listaseparacao',
            payload: false
        });
        dispatch({
            type: 'modifica_validqtd_listaseparacao',
            payload: false
        });
    } else {
        // Limpa o formulário
        dispatch({
            type: 'modifica_clean_listaseparacao'
        });
    }
};

const dispatchChanges = (dispatch, data) => {
    // Embarque
    dispatch({
        type: 'modifica_embarque_listaseparacao',
        payload: data.embarq
    });
    // Resumo
    dispatch({
        type: 'modifica_resumo_listaseparacao',
        payload: data.resumo
    });
    // Pedido
    dispatch({
        type: 'modifica_pedido_listaseparacao',
        payload: data.pedcli
    });
    // Nome
    dispatch({
        type: 'modifica_nomeabrev_listaseparacao',
        payload: data.nome
    });
    // Range
    dispatch({
        type: 'modifica_range_listaseparacao',
        payload: data.range
    });
    // Qtd Item
    dispatch({
        type: 'modifica_qtditem_listaseparacao',
        payload: data.qtd
    });
    // Itens
    doSepDispatch(dispatch, data.itens);
};
