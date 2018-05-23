const INITIAL_STATE = {
    versao: '',
    conexao: '',
    servico: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'modifica_versao_vers':
            return { 
                ...state, 
                versao: action.payload
            };
        case 'modifica_conexao_vers':
            return { 
                ...state, 
                conexao: action.payload
            };
        case 'modifica_servico_vers':
            return { 
                ...state, 
                servico: action.payload
            };
        case 'inicia_tela_vers':
            return { 
                ...state, 
                versao: '', 
                conexao: '', 
                servico: ''
            };
        default:
            return state;
    }
};
