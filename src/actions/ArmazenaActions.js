import { Alert } from 'react-native';
import Axios from 'axios';

export const modificaOnEfetivar = (ativo) => {
    return {
        type: 'modifica_onArmazena_arm',
        payload: ativo
    };
};
export const modificaBatismo = (batismo) => {
    return {
        type: 'modifica_batismo_arm',
        payload: batismo    
    };
};
export const modificaQtTotal = (qtTotal) => {
    return {
        type: 'modifica_qtTotal_arm',
        payload: qtTotal    
    };
};
export const modificaQtArmazenado = (qtArmazenado) => {
    return {
        type: 'modifica_qtArmazenado_arm',
        payload: qtArmazenado    
    };
};
export const modificaCodEAN = (codEAN) => {
    return {
        type: 'modifica_codEAN_arm',
        payload: codEAN    
    };
};
export const modificaCodItem = (codItem) => {
    return {
        type: 'modifica_codItem_arm',
        payload: codItem    
    };
};
export const modificaCodDepos = (codDepos) => {
    return {
        type: 'modifica_codDepos_arm',
        payload: codDepos    
    };
};
export const modificaDesItem = (desItem) => {
    return {
        type: 'modifica_desItem_arm',
        payload: desItem    
    };
};
export const modificaUnidMed = (unidMed) => {
    return {
        type: 'modifica_unidMed_arm',
        payload: unidMed    
    };
};
export const modificaCodLocal = (codLocal) => {
    return {
        type: 'modifica_codLocal_arm',
        payload: codLocal    
    };
};
export const modificaQtItem = (qtItem) => {
    return {
        type: 'modifica_qtItem_arm',
        payload: qtItem    
    };
};
export const modificaLote = (lote) => {
    return {
        type: 'modifica_lote_arm',
        payload: lote    
    };
};
export const modificaListaItem = (listaItem) => {
    return {
        type: 'modifica_listaItem_arm',
        payload: listaItem    
    };
};
export const modificaItemArmazena = (itemArmazena) => {
    return {
        type: 'modifica_itemArmazena_arm',
        payload: itemArmazena    
    };
};
export const iniciaTela = () => {
    return {
        type: 'inicia_tela_arm'
    };
};
export const buscaInfoBastimo = (batismo) => {
    return dispatch => {
        Axios.get('/app/getLabelItems.p', {
            params: {
                codEtiqBatismo: batismo
            }
        })
        .then(response => buscaBatismoSuccess(dispatch, response))
        .catch(() => buscaBatismoError());
    };
};

const buscaBatismoSuccess = (dispatch, response) => {
    if (response.data.success === 'true') {
        dispatch({ type: 'modifica_info_batismo_arm', payload: response.data.etiqueta });
    } else {
        Alert.alert(
            'Erro ',
            response.data.message
        );
    }
};

const buscaBatismoError = () => {
    Alert.alert(
        'Erro Armazenamento',
        'Erro Conexão!'
    );
};

export const efetivaArmazena = (etiquetaArmazena, itemArmazena, armazenamento) => {
    return dispatch => {
        Axios.get('/app/doStockPlacement.p', {
            params: {
                usuario: armazenamento.usuario,
                batismo: armazenamento.batismo,
                codEAN: armazenamento.codEAN,
                qtItem: armazenamento.qtItem,
                codLocal: armazenamento.codLocal,
                lote: armazenamento.lote,
                serie: itemArmazena[0].serie,
                nroDocto: itemArmazena[0].nroDocto,
                codEmit: itemArmazena[0].codEmit,
                natOper: itemArmazena[0].natOper,
                sequencia: itemArmazena[0].sequencia,
                numSeq: itemArmazena[0].numSeq
            }
        })
        .then(response => armazenaSuccess(dispatch, response, etiquetaArmazena, itemArmazena, armazenamento.qtItem))
        .catch(() => armazenaError(dispatch));
    };
};

const armazenaSuccess = (dispatch, response, etiqueta, item, qtItem) => {
    const retorno = {
        etiqueta,
        item,
        qtItem
    };

    dispatch({ type: 'modifica_onArmazena_arm', payload: false });

    if (response.data.success === 'true') {
        dispatch({ type: 'efetiva_armazenamento', payload: retorno });
        Alert.alert(
            'Armazenamento',
            response.data.message
        );
    } else {
        Alert.alert(
            'Erro Armazenamento',
            response.data.message
        );
    }
};

const armazenaError = (dispatch) => {
    dispatch({ type: 'modifica_onArmazena_arm', payload: false });

    Alert.alert(
        'Erro Armazenamento',
        'Erro Conexão!'
    );
};
