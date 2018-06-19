import { Alert } from 'react-native';
import Axios from 'axios';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';

export const iniciaConfLote = () => {
    return {
        type: 'inicia_conf_lote'
    };
};
export const modificaNrNotaFis = (nrNotaFis) => {
    return {
        type: 'modifica_nrNotaFis_conf',
        payload: nrNotaFis    
    };
};
export const modificaQtdLote = (qtdLote) => {
    return {
        type: 'modifica_qtdLote_conf',
        payload: qtdLote    
    };
};
export const modificaSeqLote = (seqLote) => {
    return {
        type: 'modifica_seqLote_conf',
        payload: seqLote    
    };
};
export const modificaCodLote = (codLote) => {
    return {
        type: 'modifica_codLote_conf',
        payload: codLote    
    };
};
export const modificaQtdItemLote = (qtdItemLote) => {
    return {
        type: 'modifica_qtdItemLote_conf',
        payload: qtdItemLote    
    };
};
export const modificaFornec = (fornec) => {
    return {
        type: 'modifica_fornec_conf',
        payload: fornec    
    };
};
export const modificaNotaConfere = (notaConfere) => {
    return {
        type: 'modifica_notaConfere_conf',
        payload: notaConfere    
    };
};
export const modificaItemConfere = (itemConfere) => {
    return {
        type: 'modifica_itemConfere_conf',
        payload: itemConfere    
    };
};
export const modificaQtTotal = (qtTotal) => {
    return {
        type: 'modifica_qtTotal_conf',
        payload: qtTotal    
    };
};
export const modificaQtConferir = (qtConferir) => {
    return {
        type: 'modifica_qtConferir_conf',
        payload: qtConferir    
    };
};
export const modificaCodEAN = (codEAN) => {
    return {
        type: 'modifica_codEAN_conf',
        payload: codEAN    
    };
};
export const modificaQtItem = (qtItem) => {
    return {
        type: 'modifica_qtItem_conf',
        payload: qtItem    
    };
};
export const modificaLocalPad = (localPad) => {
    return {
        type: 'modifica_localPad_conf',
        payload: localPad    
    };
};
export const modificaCodItem = (codItem) => {
    return {
        type: 'modifica_codItem_conf',
        payload: codItem    
    };
};
export const modificaUnidMed = (unidMed) => {
    return {
        type: 'modifica_unidMed_conf',
        payload: unidMed    
    };
};
export const modificaBatismo = (batismo) => {
    return {
        type: 'modifica_batismo_conf',
        payload: batismo    
    };
};
export const modificaDesItem = (desItem) => {
    return {
        type: 'modifica_desItem_conf',
        payload: desItem    
    };
};
export const modificaQtEtiq = (qtEtiq) => {
    return {
        type: 'modifica_qtEtiq_conf',
        payload: qtEtiq    
    };
};
export const modificaPesoItem = (pesoItem) => {
    return {
        type: 'modifica_pesoItem_conf',
        payload: pesoItem    
    };
};
export const modificaAlturaItem = (altura) => {
    return {
        type: 'modifica_alturaItem_conf',
        payload: altura
    };
};
export const modificaComprimentoItem = (comprimento) => {
    return {
        type: 'modifica_comprimentoItem_conf',
        payload: comprimento
    };
};
export const modificaLarguraItem = (largura) => {
    return {
        type: 'modifica_larguraItem_conf',
        payload: largura
    };
};
export const modificaInfoVisible = (visible) => {
    return {
        type: 'modifica_isInfoVisible_conf',
        payload: visible
    };
};
export const modificaListaItem = (listaItem) => {
    return {
        type: 'modifica_listaItem_conf',
        payload: listaItem    
    };
};

export const modificaListaNF = (listaNF) => {
    return {
        type: 'modifica_listaNF_conf',
        payload: listaNF    
    };
};

export const modificaListaItemLote = (listaItemLote) => {
    return {
        type: 'modifica_listaItemLote_conf',
        payload: listaItemLote
    };
};

export const iniciaTela = () => {
    return {
        type: 'inicia_tela_conf'
    };
};

export const limpaTela = () => {
    return {
        type: 'limpa_tela_conf'
    };
};

export const buscaNotaConferencia = (usuario) => {
    return dispatch => {
        Axios.get('/app/getReceptPriorNew.p', {
            params: {
                usuario
            },
            responseType: 'json'
        })
        .then(response => buscaSuccess(dispatch, response))
        .catch(() => buscaError(dispatch));
    };
};

const buscaSuccess = (dispatch, response) => {
    dispatch({ type: 'busca_conf_ok' });
    const resposta = _(response.data).value();

    if (response.data.success === 'true') {
        dispatch({ type: 'modifica_listaNF_conf', payload: resposta.prioridades });
        Actions.conferencia();
    } else {
        Alert.alert(
            'Erro Conferência',
            resposta.message
        );
    }
};

const buscaError = (dispatch) => {
    dispatch({ type: 'busca_conf_ok' });
    Alert.alert(
        'Erro Conferência',
        'Erro Conexão!'
    );
};

export const efetivaConfere = ({ usuario, notaConfere, itemConfere, conferencia }) => {
    return dispatch => {
        Axios.get('/app/doCheckARNew.p', {
            params: {
                usuario,
                etiqBatismo: conferencia.batismo,
                codEmitente: notaConfere.codEmit,
                nroDocto: notaConfere.nroDocto,
                serieDocto: notaConfere.serie,
                codEAN: conferencia.codEAN,
                seqItem: itemConfere.seq,
                itCodigo: itemConfere.itCode,
                qtdItemNF: itemConfere.qtdItem,
                qtdItemConf: conferencia.qtItem,
                pesoItem: conferencia.peso,
                altura: conferencia.altura,
                largura: conferencia.largura,
                comprimento: conferencia.comprimento,
                listaItemLote: conferencia.listaItemLote
            }
        })
        .then(response => confereSuccess(dispatch, response, notaConfere, itemConfere))
        .catch(() => confereError());
    };
};

const confereSuccess = (dispatch, response, notaConfere, itemConfere) => {
    const retorno = {
        notaConfere,
        itemConfere
    };

    if (response.data.success === 'true') {
        dispatch({ type: 'efetiva_conferencia', payload: retorno });
        Alert.alert(
            'Conferência',
            response.data.message
        );
    } else {
        Alert.alert(
            'Erro Conferência',
            response.data.message
        );
    }
};

const confereError = () => {
    Alert.alert(
        'Erro Conferência',
        'Erro Conexão!'
    );
};
