const INITIAL_STATE = {
    codLocal: '',
    nrContagem: '',
    codEAN: '',
    codItem: '',
    unidMed: '',
    descItem: '',
    tpCont: '',
    codLote: '',
    dtInventario: '',
    qtItem: '',
    modalVisible: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'modifica_codlocal_invent':
            return { 
                ...state, 
                codLocal: action.payload 
            };
        case 'modifica_nrcontagem_invent':
            return { 
                ...state, 
                nrContagem: action.payload,
                modalVisible: false 
            };
        case 'modifica_codean_invent':
            return { 
                ...state, 
                codEAN: action.payload 
            };
        case 'modifica_coditem_invent':
            return { 
                ...state, 
                codItem: action.payload 
            };
        case 'modifica_unidmed_invent':
            return { 
                ...state, 
                unidMed: action.payload 
            };
        case 'modifica_descitem_invent':
            return { 
                ...state, 
                descItem: action.payload 
            };
        case 'modifica_tpcont_invent':
            return { 
                ...state, 
                tpCont: action.payload 
            };
        case 'modifica_codlote_invent':
            return { 
                ...state, 
                codLote: action.payload 
            };
        case 'modifica_dtinventario_invent':
            return { 
                ...state, 
                dtInventario: action.payload 
            };
        case 'modifica_qtitem_invent':
            return { 
                ...state, 
                qtItem: action.payload 
            };
        case 'modifica_modalvisible_invent':
            return { 
                ...state, 
                modalVisible: action.payload 
            };
        case 'modifica_clean_invent':
            return {
                ...state, 
                codLocal: '',
                nrContagem: '',
                codEAN: '',
                codItem: '',
                unidMed: '',
                descItem: '',
                tpCont: '',
                codLote: '',
                dtInventario: '',
                qtItem: '',
                modalVisible: false
            };
        case 'modifica_cleanwdt_invent':
            return {
                ...state, 
                codLocal: '',
                nrContagem: '',
                codEAN: '',
                codItem: '',
                unidMed: '',
                descItem: '',
                tpCont: '',
                codLote: '',
                qtItem: '',
                modalVisible: false
            };
        default:
            return state;
    }
};
