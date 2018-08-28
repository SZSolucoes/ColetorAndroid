const INITIAL_STATE = {
    versao: '',
    conexao: '',
    servico: '',
    modalVisible: false,
    ambiente: '1',
    empresa: '1',
    desAmbiente: 'Produção',
    desEmpresa: 'Centelha',
    inputSelected: '',
    modalOptions: []
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
        case 'modifica_ambiente_log': {
            let desc = '';

            if (action.payload === '1') {
                desc = 'Produção';
            } else {
                desc = 'Homologação';
            }
            return { 
                ...state, 
                ambiente: action.payload,
                modalVisible: false,
                desAmbiente: desc
            };
        }
        case 'modifica_empresa_log': {
            let desc = '';

            if (action.payload === '1') {
                desc = 'Centelha';
            } else {
                desc = 'DW';
            }
            return { 
                ...state, 
                empresa: action.payload,
                modalVisible: false,
                desEmpresa: desc
            };
        }
        case 'modifica_inputselected_log': {
            return { 
                ...state, 
                inputSelected: action.payload
            };
        }
        case 'modifica_modaloptions_log': {
            return { 
                ...state, 
                modalOptions: [...action.payload]
            };
        }
        case 'modifica_modalvisible_log':
            return { 
                ...state, 
                modalVisible: action.payload 
            };
        case 'inicia_tela_vers':
            return { 
                ...state, 
                versao: '', 
                conexao: '', 
                servico: '',
            };
        default:
            return state;
    }
};
