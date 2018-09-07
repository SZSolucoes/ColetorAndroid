const INITIAL_STATE = {
    codConf: '',
    codEmb: '',
    codVol: '',
    seqItem: 0,
    listaItens: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'modifica_conf_consolid':
            return { 
                ...state, 
                codConf: action.payload 
            };
        case 'modifica_emb_consolid':
            return { 
                ...state, 
                codEmb: action.payload
            };
        case 'modifica_vol_consolid':
            return { 
                ...state, 
                codVol: action.payload
            };
        case 'modifica_seq_consolid':
            return { 
                ...state, 
                seqItem: action.payload
            };
        case 'modifica_listitens_consolid':
            return { 
                ...state, 
                listaItens: [...action.payload]
            };
        case 'modifica_addlist_consolid':
            return { 
                ...state,
                seqItem: state.seqItem + 1, 
                listaItens: [...state.listaItens, { seq: state.seqItem + 1, vol: action.payload }]
            };
        case 'modifica_cleanlist_consolid':
            return { 
                ...state,
                seqItem: 0,
                listaItens: []
            };
        case 'modifica_clean_consolid':
            return { 
                codConf: '',
                codEmb: '',
                codVol: '',
                seqItem: 0,
                listaItens: []
            };
        default:
            return state;
    }
};
