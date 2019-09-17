const INITIAL_STATE = {
    etiqueta: '',
    listaItens: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'modifica_batismo_consbatsaida':
            return { 
                ...state, 
                etiqueta: action.payload 
            };
        case 'modifica_listitem_consbatsaida':
            return { 
                ...state,
                listaItens: [...action.payload]
            };
        case 'modifica_clean_consbatsaida':
            return {
                ...state,
                etiqueta: '',
                listaItens: []
            };
        default:
            return state;
    }
};
