const INITIAL_STATE = {
    batismo: '',
    embarque: '',
    resumo: '',
    nome: '',
    range: '',
    pedido: '',
    qtdTotItens: '0',
    qtdConfItens: 0,
    codEAN: '',
    quantidade: '',
    itemDesc: '',
    codItem: '',
    um: '',
    lote: '',
    separador: '',
    localizacao: '',
    cidade: '',
    entrega: '',
    listItems: [],
    itemSelected: 0,
    isUrgent: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'modifica_batismo_confsaida':
            return { 
                ...state, 
                batismo: action.payload 
            };
        case 'modifica_resumo_confsaida':
            return { 
                ...state, 
                resumo: action.payload 
            };
        case 'modifica_nome_confsaida':
            return { 
                ...state, 
                nome: action.payload 
            };
        case 'modifica_range_confsaida':
            return { 
                ...state, 
                range: action.payload 
            };
        case 'modifica_embarque_confsaida':
            return { 
                ...state, 
                embarque: action.payload 
            };
        case 'modifica_pedido_confsaida':
            return { 
                ...state, 
                pedido: action.payload 
            };
        case 'modifica_qtdtotitens_confsaida':
            return { 
                ...state, 
                qtdTotItens: action.payload 
            };
        case 'modifica_qtdconfitens_confsaida':
            return { 
                ...state, 
                qtdConfItens: action.payload 
            };
        case 'modifica_codean_confsaida':
            return { 
                ...state, 
                codEAN: action.payload 
            };
        case 'modifica_quantidade_confsaida':
            return { 
                ...state, 
                quantidade: action.payload 
            };
        case 'modifica_itemdesc_confsaida':
            return { 
                ...state, 
                itemDesc: action.payload 
            };
        case 'modifica_coditem_confsaida':
            return { 
                ...state, 
                codItem: action.payload 
            };
        case 'modifica_um_confsaida':
            return { 
                ...state, 
                um: action.payload 
            };
        case 'modifica_lote_confsaida':
            return { 
                ...state, 
                lote: action.payload 
            };
        case 'modifica_separador_confsaida':
            return { 
                ...state, 
                separador: action.payload 
            };
        case 'modifica_localizacao_confsaida':
            return { 
                ...state, 
                localizacao: action.payload 
            };
        case 'modifica_cidade_confsaida':
            return { 
                ...state, 
                cidade: action.payload 
            };
        case 'modifica_entrega_confsaida':
            return { 
                ...state, 
                entrega: action.payload 
            };
        case 'modifica_listitems_confsaida':
            return { 
                ...state, 
                listItems: [...action.payload] 
            };
        case 'modifica_itemselected_confsaida':
            return { 
                ...state, 
                itemSelected: action.payload
            };
        case 'modifica_isurgent_confsaida':
            return { 
                ...state, 
                isUrgent: action.payload
            };
        case 'modifica_clean_confsaida':
            return {
                ...state,
                batismo: '',
                embarque: '',
                resumo: '',
                nome: '',
                range: '',
                pedido: '',
                qtdTotItens: '0',
                qtdConfItens: 0,
                codEAN: '',
                quantidade: '',
                itemDesc: '',
                codItem: '',
                um: '',
                lote: '',
                separador: '',
                localizacao: '',
                cidade: '',
                entrega: '',
                listItems: [],
                itemSelected: 0,
                isUrgent: false
            };
        case 'modifica_cleanonfetch_confsaida':
            return {
                ...state,
                embarque: '',
                resumo: '',
                nome: '',
                range: '',
                pedido: '',
                qtdTotItens: '0',
                qtdConfItens: 0,
                codEAN: '',
                quantidade: '',
                itemDesc: '',
                codItem: '',
                um: '',
                lote: '',
                localizacao: '',
                cidade: '',
                entrega: '',
                listItems: [],
                itemSelected: 0
            };
        default:
            return state; 
    }
};
