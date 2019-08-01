const INITIAL_STATE = {
    codCorte: '',
    dtCorte: '',
    embarque: '',
    nomeAbrev: '',
    pedido: '',
    sequencia: '',
    codItem: '',
    desItem: '',
    lote: '',
    un: '',
    localizacao: '',
    qtdItem: '',
    obrigatorio: '',
    minimo: '',
    codEAN: '',
    listaCortes: [],
    loadingCortes: false,
    validEan: false,
    validQtd: false,
    itemSelected: 0,
    enableFetchBtn: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'modifica_codigo_corte':
            return { 
                ...state, 
                codCorte: action.payload 
            };
        case 'modifica_data_corte':
            return { 
                ...state, 
                dtCorte: action.payload 
            };
        case 'modifica_embarque_corte':
            return { 
                ...state, 
                embarque: action.payload 
            };
        case 'modifica_nomeabrev_corte':
            return { 
                ...state, 
                nomeAbrev: action.payload 
            };
        case 'modifica_pedido_corte':
            return { 
                ...state, 
                pedido: action.payload 
            };
        case 'modifica_sequencia_corte':
            return {
                ...state,
                sequencia: action.payload
            };
        case 'modifica_coditem_corte':
            return { 
                ...state, 
                codItem: action.payload 
            };
        case 'modifica_desitem_corte':
            return { 
                ...state, 
                desItem: action.payload 
            };
        case 'modifica_lote_corte':
            return { 
                ...state, 
                lote: action.payload 
            };
        case 'modifica_un_corte':
            return { 
                ...state, 
                un: action.payload 
            };
        case 'modifica_localizacao_corte':
            return { 
                ...state, 
                localizacao: action.payload 
            };
        case 'modifica_qtditem_corte':
            return { 
                ...state, 
                qtdItem: action.payload 
            };
        case 'modifica_codean_corte':
            return { 
                ...state, 
                codEAN: action.payload 
            };
        case 'modifica_obrigatorio_corte':
            return {
                ...state,
                obrigatorio: action.payload
            };
        case 'modifica_minimo_corte':
            return {
                ...state,
                minimo: action.payload
            };
        case 'modifica_validean_corte':
            return { 
                ...state, 
                validEan: action.payload 
            };
        case 'modifica_validqtd_corte':
            return { 
                ...state, 
                validQtd: action.payload 
            };
        case 'modifica_listaCortes_corte':
            console.log(action.payload);
            return { 
                ...state, 
                listaCortes: [...action.payload] 
            };
        case 'modifica_loadingCortes':
            return { 
                ...state, 
                loadingCortes: action.payload
            };
        case 'modifica_itemselected_corte':
            return { 
                ...state, 
                itemSelected: action.payload
            };
        case 'modifica_enablefetchbtn_corte':
            return { 
                ...state, 
                enableFetchBtn: action.payload
            };
        case 'modifica_clean_corte':
            return {
                ...state, 
                codCorte: '',
                dtCorte: '',
                embarque: '',
                nomeAbrev: '',
                pedido: '',
                sequencia: '',
                codItem: '',
                desItem: '',
                lote: '',
                un: '',
                localizacao: '',
                qtdItem: '',
                obrigatorio: '',
                minimo: '',
                codEAN: '',
                listaCortes: [],
                loadingCortes: false,
                validEan: false,
                validQtd: false,
                itemSelected: 0,
                enableFetchBtn: false
            };
        default:
            return state;
    }
};
