import _ from 'lodash';

const INITIAL_STATE = {
    codCorte: '',
    equipamento: '',
    dtCorte: '',
    embarque: '',
    nomeAbrev: '',
    pedido: '',
    sequencia: '',
    codItem: '',
    descItem: '',
    lote: '',
    un: '',
    localizacao: '',
    qtdItem: '',
    obrigatorio: '',
    minimo: '',
    codEAN: '',
    listaItem: [],
    listaCortes: [],
    loadingCortes: false,
    validEan: false,
    validQtd: false,
    enableFetchBtn: false,
    corteSelec: '',
    itemSelec: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'efetiva_corte': {
            const { listaCortes, listaItem } = state;
            const { corteSelec, itemCorte } = action.payload;

            _.remove(corteSelec.itens, {
                sequencia: itemCorte.sequencia
            });

            _.remove(listaItem, {
                sequencia: itemCorte.sequencia
            });
            
            if (corteSelec.itens.length === 0) {
                _.remove(listaCortes, {
                    codCorte: corteSelec.codCorte
                });
                return {
                    ...state,
                    listaCortes,
                    listaItem,
                    itemSelec: '',
                    corteSelec: '',
                    codCorte: '',
                    equipamento: '',
                    dtCorte: '',
                    embarque: '',
                    nomeAbrev: '',
                    pedido: '',
                    sequencia: '',
                    codItem: '',
                    descItem: '',
                    lote: '',
                    un: '',
                    localizacao: '',
                    qtdItem: '',
                    obrigatorio: '',
                    minimo: '',
                    codEAN: ''
                };
            }
            return {
                ...state,
                listaCortes,
                listaItem,
                itemSelec: '',
                corteSelec,
                codCorte: '',
                equipamento: '',
                dtCorte: '',
                embarque: '',
                nomeAbrev: '',
                pedido: '',
                sequencia: '',
                codItem: '',
                descItem: '',
                lote: '',
                un: '',
                localizacao: '',
                qtdItem: '',
                obrigatorio: '',
                minimo: '',
                codEAN: ''
            };
        }
        case 'modifica_codigo_corte':
            return { 
                ...state, 
                codCorte: action.payload 
            };
        case 'modifica_equipamento_corte':
            return { 
                ...state, 
                equipamento: action.payload 
            };
        case 'modifica_data_corte':
            return { 
                ...state, 
                dtCorte: action.payload 
            };
        case 'modifica_embarque_corte':
            return { 
                ...state, 
                embarque: action.payload 
            };
        case 'modifica_nomeabrev_corte':
            return { 
                ...state, 
                nomeAbrev: action.payload 
            };
        case 'modifica_pedido_corte':
            return { 
                ...state, 
                pedido: action.payload 
            };
        case 'modifica_sequencia_corte':
            return {
                ...state,
                sequencia: action.payload
            };
        case 'modifica_coditem_corte':
            return { 
                ...state, 
                codItem: action.payload 
            };
        case 'modifica_descitem_corte':
            return { 
                ...state, 
                descItem: action.payload 
            };
        case 'modifica_lote_corte':
            return { 
                ...state, 
                lote: action.payload 
            };
        case 'modifica_un_corte':
            return { 
                ...state, 
                un: action.payload 
            };
        case 'modifica_localizacao_corte':
            return { 
                ...state, 
                localizacao: action.payload 
            };
        case 'modifica_qtditem_corte':
            return { 
                ...state, 
                qtdItem: action.payload 
            };
        case 'modifica_codean_corte':
            return { 
                ...state, 
                codEAN: action.payload 
            };
        case 'modifica_obrigatorio_corte':
            return {
                ...state,
                obrigatorio: action.payload
            };
        case 'modifica_minimo_corte':
            return {
                ...state,
                minimo: action.payload
            };
        case 'modifica_validean_corte':
            return { 
                ...state, 
                validEan: action.payload 
            };
        case 'modifica_validqtd_corte':
            return { 
                ...state, 
                validQtd: action.payload 
            };
        case 'modifica_listaCortes_corte':
            return { 
                ...state, 
                listaCortes: [...action.payload] 
            };
        case 'modifica_listaItem_corte':
            return { 
                ...state, 
                listaItem: [...action.payload] 
            };
        case 'modifica_loadingCortes':
            return { 
                ...state, 
                loadingCortes: action.payload
            };
       case 'modifica_enablefetchbtn_corte':
            return { 
                ...state, 
                enableFetchBtn: action.payload
            };
        case 'modifica_corte_selec':
            return { 
                ...state, 
                corteSelec: action.payload
            };
        case 'modifica_item_corte_selec':
            return { 
                ...state, 
                itemSelec: action.payload
            };
        case 'modifica_clean_corte':
            return {
                ...state, 
                codCorte: '',
                equipamento: '',
                dtCorte: '',
                embarque: '',
                nomeAbrev: '',
                pedido: '',
                sequencia: '',
                codItem: '',
                descItem: '',
                lote: '',
                un: '',
                localizacao: '',
                qtdItem: '',
                obrigatorio: '',
                minimo: '',
                codEAN: '',
                listaItem: [],
                loadingCortes: false,
                validEan: false,
                validQtd: false,
                enableFetchBtn: false,
                corteSelec: '',
                itemSelec: ''
            };
        case 'modifica_cortecabos_clear':
            return { ...INITIAL_STATE };
        default:
            return state;
    }
};
