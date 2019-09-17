const INITIAL_STATE = {
    localizacao: '',
    descLocaliz: '',
    listSaldo: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'modifica_localizacao_consultalocalizacao':
            return { 
                ...state, 
                localizacao: action.payload 
            };
        case 'modifica_desclocalizacao_consultalocalizacao':
            return { 
                ...state, 
                descLocaliz: action.payload 
            };
        case 'modifica_listsaldo_consultalocalizacao':
            return { 
                ...state, 
                listSaldo: [...action.payload]
            };
        case 'modifica_clean_consultalocalizacao':
            return { 
                ...state, 
                localizacao: '',
                descLocaliz: '',
                listSaldo: []
            };
        default:
            return state;
    }
};
