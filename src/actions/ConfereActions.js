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

export const imprimeEtiquetaEAM = ({ username, codEAN, qtdEtiq }) => {
    console.log(username);
    console.log(codEAN);
    console.log(qtdEtiq);
    return dispatch => {
        Axios.get('/app/doPrintNew.p', {
            params: {
                username,
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
