const INITIAL_STATE = {
    codNF: '',
    listNF: [],
    listItemsNF: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'modifica_codnf_consultanf':
            return { 
                ...state, 
                codNF: action.payload 
            };
        case 'modifica_listnf_consultanf':
            return { 
                ...state, 
                listNF: [...action.payload]
            };
        case 'modifica_listitemnf_consultanf':
            return { 
                ...state, 
                listItemsNF: [...action.payload]
            };
        case 'modifica_clean_consultanf':
            return { 
                codNF: '',
                listNF: [],
                listItemsNF: []
            };
        default:
            return state;
    }
};
