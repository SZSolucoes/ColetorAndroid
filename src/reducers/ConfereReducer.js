const INITIAL_STATE = {
    nrNotaFis: '', 
    fornec: '',
    qtTotal: '',
    qtConferir: '',
    codEAN: '',
    qtItem: '',
    localPad: '',
    codItem: '',
    unidMed: '',
    batismo: '',
    desItem: '',
    qtEtiq: '',
    listaItem: '',
    listaNF: '',
    itensNF: ''
};

export default (state = INITIAL_STATE, action) => {
    console.log(action.type);
    console.log(action.payload);
    switch (action.type) {
        case 'modifica_nrNotaFis_conf':
            return { 
                ...state, 
                nrNotaFis: action.payload 
            };
        case 'modifica_fornec_conf':
            return { 
                ...state, 
                fornec: action.payload 
            };
        case 'modifica_qtTotal_conf':
            return { 
                ...state, 
                qtTotal: action.payload 
            };
        case 'modifica_qtConferir_conf':
            return { 
                ...state, 
                qtConferir: action.payload 
            };
        case 'modifica_codEAN_conf':
            return { 
                ...state, 
                codEAN: action.payload 
            };
        case 'modifica_qtItem_conf':
            return { 
                ...state, 
                qtItem: action.payload 
            };
        case 'modifica_localPad_conf':
            return { 
                ...state, 
                localPad: action.payload 
            };
        case 'modifica_codItem_conf':
            return { 
                ...state, 
                codItem: action.payload 
            };
        case 'modifica_unidMed_conf':
            return { 
                ...state, 
                unidMed: action.payload 
            };
        case 'modifica_batismo_conf':
            return { 
                ...state, 
                batismo: action.payload 
            };
        case 'modifica_desItem_conf':
            return { 
                ...state, 
                desItem: action.payload 
            };
        case 'modifica_qtEtiq_conf':
            return { 
                ...state, 
                qtEtiq: action.payload 
            };
        case 'modifica_listaItem_conf':
            return { 
                ...state, 
                listaItem: action.payload 
            };
        case 'modifica_listaNF_conf':
            return { 
                ...state, 
                listaNF: action.payload 
            };
        case 'dados_nota_conf':
            return {
                ...state,
                fornec: '',
                qtTotal: '',
                qtConferir: '',
                itensNF: ''
            };
        case 'inicia_tela_conf':
            return { 
                ...state, 
                nrNotaFis: '', 
                fornec: '',
                qtTotal: '',
                qtConferir: '',
                codEAN: '',
                qtItem: '',
                localPad: '',
                codItem: '',
                unidMed: '',
                batismo: '',
                desItem: '',
                qtEtiq: '',
                listaItem: '',
                listaNF: ''
            };
        case 'limpa_tela_conf':
            return { 
                ...state, 
                fornec: '',
                qtTotal: '',
                qtConferir: '',
                codEAN: '',
                qtItem: '',
                localPad: '',
                codItem: '',
                unidMed: '',
                batismo: '',
                desItem: '',
                qtEtiq: '',
                listaItem: ''
            };
        default:
            return state; 
    }
};
