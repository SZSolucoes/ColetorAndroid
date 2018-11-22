
import Axios from 'axios';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { store } from '../App';

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

export const modificaLocalizacaoConf = (value) => ({
    type: 'modifica_localizacaoconf_listaseparacao',
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

export const modificaEnableFetchButton = (value) => ({
    type: 'modifica_enablefetchbtn_listaseparacao',
    payload: value
});

export const modificaClean = () => ({
    type: 'modifica_clean_listaseparacao'
});

export const fetchListItensSep = (userName, refreshTools = false) => dispatch => {
    dispatch({
        type: 'modifica_loadinglistsep_listaseparacao',
        payload: true
    });
    dispatch({ type: 'modifica_visible_loadingspin', payload: true });

    Axios.get('/coletor/getPickingPrior.p', {
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
    .then(response => onFetchSuccess(dispatch, response, refreshTools))
    .catch(() => onFetchError(dispatch));
};

const onFetchSuccess = (dispatch, response, refreshTools) => {
    dispatch({ type: 'modifica_visible_loadingspin', payload: false });
    
    if (response && response.data) {
        const data = response.data;
        if (data.success === 'true' && data.prioridades.length > 0) {
            const isUrgent = data.prioridades[0].urg.trim().toLowerCase() === 'true';
            dispatch({
                type: 'modifica_loadinglistsep_listaseparacao',
                payload: false
            });
            dispatch({
                type: 'modifica_isurgent_listaseparacao',
                payload: isUrgent
            });
            dispatch({
                type: 'modifica_enablefetchbtn_listaseparacao',
                payload: false
            });
            dispatchChanges(dispatch, data.prioridades[0]);
            if (refreshTools) {
                refreshTools(); // Ação do botão de atualizar
            } else {
                Actions.listaSeparacaoSaida();
            }
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
    dispatch({ type: 'modifica_visible_loadingspin', payload: false });
    dispatch({
        type: 'modifica_loadinglistsep_listaseparacao',
        payload: false
    });
    Alert.alert('Erro', 'Ocorreu uma falha de comunicação com o servidor.');
};

export const doSep = (params, newItemList, refreshTools) => dispatch => {
    dispatch({ type: 'modifica_visible_loadingspin', payload: true });

    Axios.get('/coletor/doPicking.p', { params: 
        { 
            ...params,
            usuario: store.getState().LoginReducer.usuario  
        } 
    })
    .then((res) => onSepSuccess(dispatch, res, newItemList, refreshTools))
    .catch((error) => onSepError(error, dispatch)); 
};

const onSepSuccess = (dispatch, res, newItemList, refreshTools) => {
    const bResOk = res && res.data;

    dispatch({ type: 'modifica_visible_loadingspin', payload: false });

    if (bResOk && typeof res.data === 'object') {
        if (res.data.success === 'true') {
            dispatch({
                type: 'modifica_qtditem_listaseparacao',
                payload: newItemList.length.toString()
            });
            doSepDispatch(dispatch, newItemList, refreshTools);
            setTimeout(() => Alert.alert(
                'Separação',
                'Separação efetuada com sucesso.'
            ), 500);
        } else {
            setTimeout(() => Alert.alert(
                'Erro Separação',
                res.data.message
            ), 500);
        }
    } else {
        setTimeout(() => Alert.alert('Erro', 'Ocorreu uma falha interna no servidor.'), 500);  
    }
};

const onSepError = (error, dispatch) => {
    dispatch({ type: 'modifica_visible_loadingspin', payload: false });

    setTimeout(() => Alert.alert(
        'Erro Separação',
        'Erro Conexão!'
    ), 500);
};

const doSepDispatch = (dispatch, newItemList, refreshTools = false) => {
    if (newItemList && newItemList.length > 0) {
        dispatch({
            type: 'modifica_itemselected_listaseparacao',
            payload: 0
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
            type: 'modifica_localizacaoconf_listaseparacao',
            payload: ''
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
            type: 'modifica_validean_listaseparacao',
            payload: false
        });
        dispatch({
            type: 'modifica_validqtd_listaseparacao',
            payload: false
        });
        dispatch({
            type: 'modifica_listaitensseppc_listaseparacao',
            payload: newItemList
        });
    } else {
        // Limpa o formulário
        dispatch({
            type: 'modifica_clean_listaseparacao'
        });
        if (refreshTools) {
            dispatch({
                type: 'modifica_enablefetchbtn_listaseparacao',
                payload: true
            });
            setTimeout(() => refreshTools(), 500);
        }
    }
};

const dispatchChanges = (dispatch, data) => {
    // Embarque
    dispatch({
        type: 'modifica_embarque_listaseparacao',
        payload: data.embarque
    });
    // Resumo
    dispatch({
        type: 'modifica_resumo_listaseparacao',
        payload: data.resumo
    });
    // Pedido
    dispatch({
        type: 'modifica_pedido_listaseparacao',
        payload: data.pedido
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
        payload: data.qtdLin
    });
    // Entrega
    dispatch({
        type: 'modifica_entrega_listaseparacao',
        payload: data.entrega
    });
    // Cond Pagamento
    dispatch({
        type: 'modifica_condpagto_listaseparacao',
        payload: data.condPagto
    });
    // Itens
    doSepDispatch(dispatch, data.itens);
};

export const doPrintEtiqEAN = (params, lote = 'false') => dispatch => {
    Axios.get('/coletor/doPrint.p', { params: 
        { 
            ...params,
            lote,
            usuario: store.getState().LoginReducer.usuario  
        } 
    })
    .then(res => doPrintEtiqEANSuccess(dispatch, res))
    .catch(() => doPrintEtiqEANError()); 
};

const doPrintEtiqEANSuccess = (dispatch, res) => {
    const bResOk = res && res.data;

    if (bResOk && typeof res.data === 'object') {
        if (res.data.success === 'true') {
            setTimeout(() => Alert.alert(
                'Impressão Etiqueta',
                res.data.message
            ), 500);
        } else {
            setTimeout(() => Alert.alert(
                'Erro Impressão Etiqueta',
                res.data.message
            ), 500);
        }
    } else {
        setTimeout(() => Alert.alert('Erro', 'Ocorreu uma falha interna no servidor.'), 500);
    }
};

const doPrintEtiqEANError = () => {
    setTimeout(() => Alert.alert('Erro Impressão', 'Erro Conexão!'), 500);
};
