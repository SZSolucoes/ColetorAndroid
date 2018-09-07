const INITIAL_STATE = {
    batismo: '',
    embarque: '',
    pedido: '',
    keyRet: {},
    listVolumes: [],
    listEmbalagens: [],
    embalagem: '',
    volume: '',
    sigla: '',
    keyEmb: '',
    pesoBruto: '',
    modalVisible: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'modifica_batismo_confvolume':
            return { 
                ...state, 
                batismo: action.payload 
            };
        case 'modifica_embarque_confvolume':
            return { 
                ...state, 
                embarque: action.payload 
            };
        case 'modifica_pedido_confvolume':
            return { 
                ...state, 
                pedido: action.payload 
            };
        case 'modifica_keyret_confvolume':
            return { 
                ...state, 
                keyRet: { ...action.payload } 
            };
        case 'modifica_listvolumes_confvolume':
            return { 
                ...state, 
                listVolumes: [...action.payload] 
            };
        case 'modifica_listembalagens_confvolume':
            return { 
                ...state, 
                listEmbalagens: [...action.payload] 
            };
        case 'modifica_embalagem_confvolume':
            return { 
                ...state, 
                embalagem: action.payload,
                modalVisible: false
            };
        case 'modifica_volume_confvolume':
            return { 
                ...state, 
                volume: action.payload
            };
        case 'modifica_sigla_confvolume':
            return { 
                ...state, 
                sigla: action.payload
            };
        case 'modifica_keyemb_confvolume':
            return { 
                ...state, 
                keyEmb: action.payload
            };
        case 'modifica_pesobruto_confvolume':
            return { 
                ...state, 
                pesoBruto: action.payload
            };
        case 'modifica_modalvisible_confvolume':
            return { 
                ...state, 
                modalVisible: action.payload
            };
        case 'modifica_clean_confvolume':
            return { 
                ...state, 
                batismo: '',
                embarque: '',
                pedido: '',
                keyRet: [],
                listVolumes: [],
                embalagem: '',
                volume: '',
                sigla: '',
                keyEmb: '',
                pesoBruto: '',
                modalVisible: false
            };
        default:
            return state;
    }
};
