const INITIAL_STATE = {
    codEAN: '',
    codItem: '',
    unidMed: '',
    qtEtiq: '',
    descItem: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'modifica_codEAN_imp':
            return { 
                ...state, 
                codEAN: action.payload 
            };
        case 'modifica_codItem_imp':
            return { 
                ...state, 
                codItem: action.payload 
            };
        case 'modifica_unidMed_imp':
            return { 
                ...state, 
                unidMed: action.payload 
            };
        case 'modifica_descItem_imp':
            return { 
                ...state, 
                descItem: action.payload 
            };
        case 'modifica_qtEtiq_imp':
            return { 
                ...state, 
                qtEtiq: action.payload 
            };
        case 'inicia_tela_imp':
            return { 
                ...state, 
                codEAN: '', 
                codItem: '', 
                unidMed: '',
                qtEtiq: '',
                descItem: '' 
            };
        case 'limpa_tela_imp':
            return { 
                ...state, 
                codItem: '', 
                unidMed: '', 
                descItem: '',
                qtEtiq: ''
            };
        case 'busca_ok_imp':
            return { 
                ...state, 
                codItem: action.payload.codItem, 
                unidMed: action.payload.un, 
                descItem: action.payload.descItem,
                qtEtiq: '1'
            };
        default:
            return state;
    }
};
