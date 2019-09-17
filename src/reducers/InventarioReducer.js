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
    itemSelected: -1,
    modalVisible: false,
    loadingInvent: false,
    listItems: []
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
        case 'modifica_itemselected_invent':
            return { 
                ...state, 
                itemSelected: action.payload 
            };
        case 'modifica_modalvisible_invent':
            return { 
                ...state, 
                modalVisible: action.payload 
            };
        case 'modifica_listitems_invent':
            return { 
                ...state, 
                listItems: action.payload 
            };
        case 'modifica_loading_invent':
            return {
                ...state,
                loadingInvent: true
            };
        case 'busca_invent_ok':
            return { 
                ...state, 
                loadingInvent: false
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
                itemSelected: -1,
                modalVisible: false,
                listItems: []
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
                itemSelected: -1,
                modalVisible: false,
                listItems: []
            };
        case 'modifica_cleanlesslocal_invent':
            return {
                ...state,
                nrContagem: '',
                codEAN: '',
                codItem: '',
                unidMed: '',
                descItem: '',
                tpCont: '',
                codLote: '',
                qtItem: '',
                itemSelected: -1,
                modalVisible: false,
                listItems: []
            };
        default:
            return state;
    }
};
