const INITIAL_STATE = {
    codEAN: '',
    codItem: '',
    unidMed: '',
    descItem: '',
    listaItem: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'modifica_codEAN_est':
            return { 
                ...state, 
                codEAN: action.payload 
            };
        case 'modifica_codItem_est':
            return { 
                ...state, 
                codItem: action.payload 
            };
        case 'modifica_unidMed_est':
            return { 
                ...state, 
                unidMed: action.payload 
            };
        case 'modifica_descItem_est':
            return { 
                ...state, 
                descItem: action.payload 
            };
        case 'modifica_listaItem_est':
            return { 
                ...state, 
                listaItem: action.payload 
            };
        case 'inicia_tela_est':
            return { 
                ...state, 
                codEAN: '', 
                codItem: '', 
                unidMed: '', 
                descItem: '', 
                listaItem: '' 
            };
        case 'limpa_tela_est':
            return { 
                ...state, 
                codItem: '', 
                unidMed: '', 
                descItem: '', 
                listaItem: '' 
            };
        case 'busca_ok_est':
            return { 
                ...state, 
                codItem: action.payload.codItem, 
                unidMed: action.payload.un, 
                descItem: action.payload.descItem, 
                listaItem: action.payload.saldo
            };
        default:
            return state;
    }
};
