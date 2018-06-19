const INITIAL_STATE = {
    codEAN: '',
    codItem: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'modifica_codean_relean':
            return { 
                ...state, 
                codEAN: action.payload 
            };
        case 'modifica_coditem_relean':
            return { 
                ...state, 
                codItem: action.payload
            };
        case 'modifica_clean_relean':
            return { 
                username: '',
                codLocal: ''
            };
        default:
            return state;
    }
};
