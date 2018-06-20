const INITIAL_STATE = {
    codEAN: '', 
    codItem: '',
    descItem: '',
    unidMed: '',
    codLocalOrig: '',
    codLocalDest: '',
    qtItem: '',
    usuario: '',
    codLote: '',
    saldoItem: '',
    tpCont: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'modifica_codEAN_trnf':
            return { 
                ...state, 
                codEAN: action.payload 
            };
        case 'modifica_codItem_trnf':
            return { 
                ...state, 
                codItem: action.payload 
            };
        case 'modifica_descItem_trnf':
            return { 
                ...state, 
                descItem: action.payload 
            };
        case 'modifica_unidMed_trnf':
            return { 
                ...state, 
                unidMed: action.payload 
            };
        case 'modifica_codLocalOrig_trnf':
            return { 
                ...state, 
                codLocalOrig: action.payload 
            };
        case 'modifica_codLocalDest_trnf':
            return { 
                ...state, 
                codLocalDest: action.payload 
            };
        case 'modifica_qtItem_trnf':
            return { 
                ...state, 
                qtItem: action.payload 
            };
        case 'modifica_codLote_trnf':
            return { 
                ...state, 
                codLote: action.payload 
            };
        case 'modifica_saldoItem_trnf':
            return { 
                ...state, 
                saldoItem: action.payload 
            };
        case 'inicia_tela_trnf':
            return {
                ...state,
                codEAN: '', 
                codItem: '',
                descItem: '',
                unidMed: '',
                codLocalOrig: '',
                codLocalDest: '',
                codLote: '',
                tpCont: '',
                qtItem: '',
                saldo: ''
            };
        case 'modifica_item_trnf':
            return {
                ...state,
                codItem: action.payload.itCode,
                descItem: action.payload.itDesc,
                unidMed: action.payload.un,
                saldoItem: action.payload.saldo,
                codLote: action.payload.codLote,
                tpCont: action.payload.tpCont
            };
        default:
            return state;
    }
};
