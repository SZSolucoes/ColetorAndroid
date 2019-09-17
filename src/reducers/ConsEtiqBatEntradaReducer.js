const INITIAL_STATE = {
    codEtiqBatismo: '',
    listaItens: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'modifica_batismo_consbatentrada':
            return { 
                ...state, 
                codEtiqBatismo: action.payload 
            };
        case 'modifica_listitem_consbatentrada':
            return { 
                ...state,
                listaItens: [...action.payload]
            };
        case 'modifica_clean_consbatentrada':
            return { 
                codEtiqBatismo: '',
                listaItens: []
            };
        default:
            return state;
    }
};
