import _ from 'lodash';

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
    altura: '',
    largura: '',
    comprimento: '',
    isInfoVisible: false,
    listaItemLote: '',
    qtdLote: '',
    seqLote: '',
    codLote: '',
    qtdItemLote: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'efetiva_conferencia': {
            const { listaNF, listaItem } = state;
            const { notaConfere, itemConfere } = action.payload;
            _.remove(notaConfere.itens, {
                seq: itemConfere.seq
            });
            _.remove(listaItem, {
                seq: itemConfere.seq
            });
            if (notaConfere.itens.length === 0) {
                _.remove(listaNF, {
                    nroDocto: notaConfere.nroDocto
                });
                return {
                    ...state,
                    listaNF,
                    listaItem,
                    itemConfere: '',
                    notaConfere: '',
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
                    pesoItem: '',
                    altura: '',
                    largura: '',
                    comprimento: '',
                    listaItemLote: ''
                };
            }
            return {
                ...state,
                listaNF,
                listaItem,
                itemConfere: '',
                notaConfere,
                qtConferir: _.toString(notaConfere.itens.length),
                codEAN: '',
                qtItem: '',
                localPad: '',
                codItem: '',
                unidMed: '',
                batismo: '',
                desItem: '',
                qtEtiq: '',
                pesoItem: '',
                altura: '',
                largura: '',
                comprimento: '',
                listaItemLote: ''
            };
        }
        case 'modifica_qtdLote_conf':
            return {
                ...state,
                qtdLote: action.payload
            };
        case 'modifica_seqLote_conf':
            return {
                ...state,
                seqLote: action.payload
            };
        case 'modifica_codLote_conf':
            return {
                ...state,
                codLote: action.payload
            };
        case 'modifica_qtdItemLote_conf':
            return {
                ...state,
                qtdItemLote: action.payload
            };
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
                altura: action.payload 
            };
        case 'modifica_comprimentoItem_conf':
            return { 
                ...state, 
                comprimento: action.payload 
            };
        case 'modifica_larguraItem_conf':
            return { 
                ...state, 
                largura: action.payload 
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
        case 'modifica_listaItemLote_conf': {
            return {
                ...state,
                listaItemLote: action.payload
            };
        }
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
                notaConfere: '',
                itemConfere: '',
                isInfoVisible: false,
                listaItemLote: ''
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
                listaItem: '',
                isInfoVisible: false,
                listaItemLote: ''
            };
        case 'inicia_conf_lote': {
            return {
                ...state,
                listaItemLote: '',
                codLote: '',
                qtdItemLote: '',
                qtdLote: '',
                seqLote: ''
            };
        }
        default:
            return state; 
    }
};
