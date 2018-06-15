const INITIAL_STATE = {
    username: '',
    codLocal: '',
    nrContagem: '',
    codEtiq: '',
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
        case 'modifica_codetiq_invent':
            return { 
                ...state, 
                codEtiq: action.payload 
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
                username: '',
                codLocal: '',
                nrContagem: '',
                codEtiq: '',
                dtInventario: '',
                qtItem: '',
                modalVisible: false
            };
        default:
            return state;
    }
};
