const INITIAL_STATE = {
    embarque: '',
    resumo: '',
    pedido: '',
    range: '',
    nomeAbrev: '',
    batismo: '',
    codEAN: '',
    localizacao: '',
    localizacaoConf: '',
    um: '',
    qtdItem: '',
    qtdSep: '',
    codItem: '',
    lote: '',
    quantidade: '',
    desItem: '',
    qtEtiq: '',
    entrega: '',
    condPagto: '',
    listaItensSepPc: [],
    loadingListSep: false,
    validEan: false,
    validQtd: false,
    itemSelected: 0,
    enableFetchBtn: false,
    isUrgent: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'modifica_embarque_listaseparacao':
            return { 
                ...state, 
                embarque: action.payload 
            };
        case 'modifica_pedido_listaseparacao':
            return { 
                ...state, 
                pedido: action.payload 
            };
        case 'modifica_nomeabrev_listaseparacao':
            return { 
                ...state, 
                nomeAbrev: action.payload 
            };
        case 'modifica_resumo_listaseparacao':
            return { 
                ...state, 
                resumo: action.payload 
            };
        case 'modifica_range_listaseparacao':
            return { 
                ...state, 
                range: action.payload 
            };
        case 'modifica_batismo_listaseparacao':
            return { 
                ...state, 
                batismo: action.payload 
            };
        case 'modifica_codean_listaseparacao':
            return { 
                ...state, 
                codEAN: action.payload 
            };
        case 'modifica_localizacao_listaseparacao':
            return { 
                ...state, 
                localizacao: action.payload 
            };
        case 'modifica_localizacaoconf_listaseparacao':
            return { 
                ...state, 
                localizacaoConf: action.payload 
            };
        case 'modifica_um_listaseparacao':
            return { 
                ...state, 
                um: action.payload 
            };
        case 'modifica_qtditem_listaseparacao':
            return { 
                ...state, 
                qtdItem: action.payload 
            };
        case 'modifica_qtdsep_listaseparacao':
            return { 
                ...state, 
                qtdSep: action.payload 
            };
        case 'modifica_coditem_listaseparacao':
            return { 
                ...state, 
                codItem: action.payload 
            };
        case 'modifica_lote_listaseparacao':
            return { 
                ...state, 
                lote: action.payload 
            };
        case 'modifica_quantidade_listaseparacao':
            return { 
                ...state, 
                quantidade: action.payload 
            };
        case 'modifica_desitem_listaseparacao':
            return { 
                ...state, 
                desItem: action.payload 
            };
        case 'modifica_qtetiq_listaseparacao':
            return { 
                ...state, 
                qtEtiq: action.payload 
            };
        case 'modifica_entrega_listaseparacao':
            return { 
                ...state, 
                entrega: action.payload 
            };
        case 'modifica_condpagto_listaseparacao':
            return { 
                ...state, 
                condPagto: action.payload
            };
        case 'modifica_validean_listaseparacao':
            return { 
                ...state, 
                validEan: action.payload 
            };
        case 'modifica_validqtd_listaseparacao':
            return { 
                ...state, 
                validQtd: action.payload 
            };
        case 'modifica_listaitensseppc_listaseparacao':
            return { 
                ...state, 
                listaItensSepPc: [...action.payload] 
            };
        case 'modifica_loadinglistsep_listaseparacao':
            return { 
                ...state, 
                loadingListSep: action.payload
            };
        case 'modifica_itemselected_listaseparacao':
            return { 
                ...state, 
                itemSelected: action.payload
            };
        case 'modifica_enablefetchbtn_listaseparacao':
            return { 
                ...state, 
                enableFetchBtn: action.payload
            };
        case 'modifica_isurgent_listaseparacao':
            return { 
                ...state, 
                isUrgent: action.payload
            };
        case 'modifica_clean_listaseparacao':
            return {
                ...state, 
                embarque: '',
                resumo: '',
                pedido: '',
                range: '',
                nomeAbrev: '',
                batismo: '',
                codEAN: '',
                localizacao: '',
                localizacaoConf: '',
                um: '',
                qtdItem: '',
                qtdSep: '',
                codItem: '',
                lote: '',
                quantidade: '',
                desItem: '',
                qtEtiq: '',
                entrega: '',
                condPagto: '',
                listaItensSepPc: [],
                loadingListSep: false,
                validEan: false,
                validQtd: false,
                itemSelected: 0,
                enableFetchBtn: false,
                isUrgent: false
            };
        default:
            return state;
    }
};
