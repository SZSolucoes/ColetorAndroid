const INITIAL_STATE = {
    batismo: '', 
    qtTotal: '',
    qtArmazenado: '',
    codEAN: '',
    codItem: '',
    desItem: '',
    unidMed: '',
    codLocal: '',
    desLocal: '',
    qtItem: '',
    lote: ''
};

export default (state = INITIAL_STATE, action) => {
    console.log(action.type);
    switch (action.type) {
        case 'modifica_batismo_arm':
            return { 
                ...state, 
                batismo: action.payload 
            };
        case 'modifica_qtTotal_arm':
            return { 
                ...state, 
                qtTotal: action.payload 
            };
        case 'modifica_qtArmazenado_arm':
            return { 
                ...state, 
                qtArmazenado: action.payload 
            };
        case 'modifica_codEAN_arm':
            return { 
                ...state, 
                codEAN: action.payload 
            };
        case 'modifica_codItem_arm':
            return { 
                ...state, 
                codItem: action.payload 
            };
        case 'modifica_desItem_arm':
            return { 
                ...state, 
                desItem: action.payload 
            };
        case 'modifica_unidMed_arm':
            return { 
                ...state, 
                unidMed: action.payload 
            };
        case 'modifica_codLocal_arm':
            return { 
                ...state, 
                codLocal: action.payload 
            };
        case 'modifica_desLocal_arm':
            return { 
                ...state, 
                desLocal: action.payload 
            };
        case 'modifica_qtItem_arm':
            return { 
                ...state, 
                qtItem: action.payload 
            };
        case 'modifica_lote_arm':
            return { 
                ...state, 
                lote: action.payload 
            };
        default:
            return state; 
    }
};
