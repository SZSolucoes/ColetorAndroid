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
    itensNF: '',
    notaConfere: '',
    itemConfere: '',
    pesoItem: '',
    alturaItem: '',
    larguraItem: '',
    comprimentoItem: '',
    lote: '',
    validLote: '',
    qtLote: '',
    isInfoVisible: false
};

export default (state = INITIAL_STATE, action) => {
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
        case 'modifica_notaConfere_conf':
            return { 
                ...state, 
                notaConfere: action.payload 
            };
        case 'modifica_itemConfere_conf':
            return { 
                ...state, 
                itemConfere: action.payload 
            };
        case 'modifica_isInfoVisible_conf':
            return {
                ...state,
                isInfoVisible: action.payload
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
        case 'modifica_pesoItem_conf':
            return { 
                ...state, 
                pesoItem: action.payload 
            };
        case 'modifica_alturaItem_conf':
            return { 
                ...state, 
                alturaItem: action.payload 
            };
        case 'modifica_comprimentoItem_conf':
            return { 
                ...state, 
                comprimentoItem: action.payload 
            };
        case 'modifica_larguraItem_conf':
            return { 
                ...state, 
                larguraItem: action.payload 
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
                listaNF: '',
                notaConfere: '',
                itemConfere: '',
                lote: '',
                validLote: '',
                qtLote: '',
                isLoteVisible: false
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
