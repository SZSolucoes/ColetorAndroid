import { Alert } from 'react-native';
import Axios from 'axios';

export const modificaNrNotaFis = (nrNotaFis) => {
    return {
        type: 'modifica_nrNotaFis_conf',
        payload: nrNotaFis    
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
export const modificaAlturaItem = (alturaItem) => {
    return {
        type: 'modifica_alturaItem_conf',
        payload: alturaItem    
    };
};
export const modificaComprimentoItem = (comprimentoItem) => {
    return {
        type: 'modifica_comprimentoItem_conf',
        payload: comprimentoItem    
    };
};
export const modificaLarguraItem = (larguraItem) => {
    return {
        type: 'modifica_larguraItem_conf',
        payload: larguraItem    
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
                username: usuario
            }
        })
        .then(response => buscaSuccess(dispatch, response))
        .catch(() => buscaError());
    };
};

const buscaSuccess = (dispatch, response) => {
    if (response.data.success === 'true') {
        dispatch({ type: 'modifica_listaNF_conf', payload: response.data.prioridades });
    } else {
        Alert.alert(
            'Erro Conferência',
            response.data.message
        );
    }
};

const buscaError = () => {
    Alert.alert(
        'Erro Conferência',
        'Erro Conexão!'
    );
};

export const imprimeEtiquetaEAN = ({ usuario, codEAN, qtdEtiq }) => {
    return dispatch => {
        Axios.get('/app/doPrintNew.p', {
            params: {
                usuario,
                codEAN,
                qtdEtiq
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

export const efetivaConfere = ({ usuario, notaConfere, itemConfere, conferencia }) => {
    console.log(notaConfere);
    console.log(itemConfere);

    return dispatch => {
        Axios.get('/app/doCheckARNew.p', {
            params: {
                usuario,
                etiqBatismo: conferencia.batismo,
                codEmitente: notaConfere.codEmit,
                nroDocto: notaConfere.nroDocto,
                serieDocto: notaConfere.serie,
                codEAN: notaConfere.codEAN,
                seqItem: itemConfere.seq,
                itCodigo: itemConfere.itCode,
                qtdItemNF: itemConfere.qtdItem,
                qtdItemConf: conferencia.qtItem,
                pesoItem: conferencia.pesoItem,
                alturaItem: conferencia.alturaItem,
                larguraItem: conferencia.larguraItem,
                comprimentoItem: conferencia.comprimentoItem
            }
        })
        .then(response => confereSuccess(dispatch, response, itemConfere))
        .catch(() => confereError());
    };
};

const confereSuccess = (dispatch, response, itemConfere) => {
    if (response.data.success === 'true') {
        dispatch({ type: 'modifica_listaItem_conf', payload: response.data.prioridades });
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
