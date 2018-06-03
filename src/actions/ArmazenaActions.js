import { Alert } from 'react-native';
import Axios from 'axios';

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
export const modificaDesLocal = (desLocal) => {
    return {
        type: 'modifica_desLocal_arm',
        payload: desLocal    
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

export const buscaInfoEan = (codEAN) => {
    return dispatch => {
        Axios.get('/app/getEanInfoTransfNew.p', {
            params: {
                codEAN
            }
        })
        .then(response => buscaEANSuccess(dispatch, response))
        .catch(() => buscaEANError());
    };
};

const buscaEANSuccess = (dispatch, response) => {
    if (response.data.success === 'true') {
        dispatch({ type: 'modifica_info_item_arm', payload: response.data.item });
    } else {
        Alert.alert(
            'Erro ',
            response.data.message
        );
    }
};

const buscaEANError = () => {
    Alert.alert(
        'Erro Armazenamento',
        'Erro Conexão!'
    );
};

export const efetivaArmazena = ({ usuario, codEAN, batismo, qtItem, codLocal, lote }) => {
    return dispatch => {
        Axios.get('/app/doStockPlacementNew.p', {
            params: {
                usuario,
                batismo,
                codEAN,
                qtItem,
                codLocal,
                lote
            }
        })
        .then(response => armazenaSuccess(dispatch, response))
        .catch(() => armazenaError());
    };
};

const armazenaSuccess = (dispatch, response) => {
    if (response.data.success === 'true') {
        dispatch({ type: 'modifica_listaItem_conf', payload: response.data.prioridades });
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

const armazenaError = () => {
    Alert.alert(
        'Erro Armazenamento',
        'Erro Conexão!'
    );
};
