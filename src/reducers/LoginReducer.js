const INITIAL_STATE = {
    usuario: '',
    senha: '',
    erroLogin: '',
    logConfPlaca: '',
    logConfReceb: '',
    logEstoque: '',
    logDespacho: '',
    logSeparacao: '',
    logConfSeparacao: '',
    logTransferencia: '',
    logArmazenamento: '',
    logTodos: '',
    loadingLogin: false,
    loadingConf: false,
    refreshSenha: true
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'modifica_usuario_log':
            return { 
                ...state, 
                usuario: action.payload 
            };
        case 'modifica_senha_log':
            return { 
                ...state, 
                senha: action.payload 
            };
        case 'modifica_refreshsenha_log':
            return { 
                ...state, 
                refreshSenha: action.payload 
            };
        case 'modifica_loading_log':
            return { 
                ...state, 
                loadingLogin: true 
            };
        case 'modifica_loading_conf_placa':
                return { 
                    ...state, 
                    loadingConfPlaca: true 
                };
        case 'modifica_loading_conf':
            return { 
                ...state, 
                loadingConf: true 
            };
        case 'busca_conf_ok':
            return { 
                ...state, 
                loadingConf: false
            };
        case 'login_ok_log':
            return { 
                ...state, 
                senha: '', 
                erroLogin: '',
                loadingLogin: false
            };
        case 'login_erro_log':
            return { 
                ...state, 
                erroLogin: action.payload,
                loadingLogin: false
            };
        case 'inicia_permissao_log':
            return { 
                ...state,
                logConfPlaca: false, 
                logConfReceb: false,
                logEstoque: false,
                logDespacho: false,
                logSeparacao: false,
                logConfSeparacao: false,
                logTransferencia: false,
                logArmazenamento: false,
                logTodos: false                
            };
        case 'atualiza_permissao_log': {
            if (action.payload.logTodos === true) {
                return { 
                    ...state,
                    logConfPlaca: true, 
                    logConfReceb: true,
                    logEstoque: true,
                    logDespacho: true,
                    logSeparacao: true,
                    logConfSeparacao: true,
                    logTransferencia: true,
                    logArmazenamento: true,
                    logTodos: true
                };
            } 
            return { 
                ...state,
                logConfPlaca: action.payload.logConfPlaca, 
                logConfReceb: action.payload.logConfReceb,
                logEstoque: action.payload.logEstoque,
                logDespacho: action.payload.logDespacho,
                logSeparacao: action.payload.logSeparacao,
                logConfSeparacao: action.payload.logConfSeparacao,
                logTransferencia: action.payload.logTransferencia,
                logArmazenamento: action.payload.logArmazenamento,
                logTodos: action.payload.logTodos
            };
        }
        default:
            return state;
    }
};
