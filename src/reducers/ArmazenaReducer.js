import _ from 'lodash';

const INITIAL_STATE = {
    batismo: '', 
    qtTotal: '',
    qtArmazenado: '',
    codEAN: '',
    codItem: '',
    desItem: '',
    unidMed: '',
    codLocal: '',
    qtItem: '',
    lote: '',
    etiquetaArmazena: '',
    listaItem: '',
    itemArmazena: '',
    codDepos: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'efetiva_armazenamento': {
            const { etiquetaArmazena, listaItem, qtArmazenado } = state;
            const { item, qtItem } = action.payload;

            console.log(etiquetaArmazena.itens);
            _.remove(etiquetaArmazena.itens, function (itemObj) {
                console.log(itemObj);
                console.log(item[0]);
                console.log((itemObj.sequencia === item[0].sequencia && itemObj.numSeq === item[0].numSeq));
                return (itemObj.sequencia === item[0].sequencia && itemObj.numSeq === item[0].numSeq);
            });

            /*_.remove(etiquetaArmazena.itens, {
                sequencia: item.sequencia,
                numSeq: item.numSeq
            });*/

            console.log(etiquetaArmazena.itens);
            console.log(listaItem);
            _.remove(listaItem, function (itemObj) {
                console.log(itemObj);
                console.log(item[0]);
                console.log((itemObj.sequencia === item[0].sequencia && itemObj.numSeq === item[0].numSeq));
                return (itemObj.sequencia === item[0].sequencia && itemObj.numSeq === item[0].numSeq);
            });
            
            /*_.remove(listaItem, {
                sequencia: item.sequencia,
                numSeq: item.numSeq
            });*/
            console.log(listaItem);

            if (etiquetaArmazena.itens.length === 0) {
                return { 
                    ...state, 
                    batismo: '', 
                    qtTotal: '',
                    qtArmazenado: '',
                    codEAN: '',
                    codItem: '',
                    desItem: '',
                    unidMed: '',
                    codLocal: '',
                    codDepos: '',
                    qtItem: '',
                    lote: '',
                    listaItem: '',
                    etiquetaArmazena: ''
                };
            }

            const qtdArm = (_.toInteger(qtItem) + _.toInteger(qtArmazenado)); 

            return { 
                ...state, 
                qtArmazenado: _.toString(qtdArm),
                codEAN: '',
                codItem: '',
                desItem: '',
                unidMed: '',
                codLocal: '',
                codDepos: '',
                qtItem: '',
                lote: '',
                listaItem,
                etiquetaArmazena
            };
        }
        case 'modifica_batismo_arm':
            return { 
                ...state, 
                batismo: action.payload 
            };
        case 'modifica_qtTotal_arm':
            return { 
                ...state, 
                qtTotal: action.payload 
            };
        case 'modifica_qtArmazenado_arm':
            return { 
                ...state, 
                qtArmazenado: action.payload 
            };
        case 'modifica_codEAN_arm':
            return { 
                ...state, 
                codEAN: action.payload 
            };
        case 'modifica_codItem_arm':
            return { 
                ...state, 
                codItem: action.payload 
            };
        case 'modifica_desItem_arm':
            return { 
                ...state, 
                desItem: action.payload 
            };
        case 'modifica_unidMed_arm':
            return { 
                ...state, 
                unidMed: action.payload 
            };
        case 'modifica_codLocal_arm':
            return { 
                ...state, 
                codLocal: action.payload 
            };
        case 'modifica_codDepos_arm':
            return { 
                ...state, 
                codDepos: action.payload 
            };
        case 'modifica_qtItem_arm':
            return { 
                ...state, 
                qtItem: action.payload 
            };
        case 'modifica_lote_arm':
            return { 
                ...state, 
                lote: action.payload 
            };
        case 'modifica_info_item_arm':
            return {
                ...state
            };
        case 'modifica_listaItem_arm':
            return { 
                ...state, 
                listaItem: action.payload 
            };
        case 'modifica_itemArmazena_arm':
            return {
                ...state,
                itemArmazena: action.payload
            };
        case 'modifica_info_batismo_arm': {
            const { itens } = action.payload;
            
            return {
                ...state,
                etiquetaArmazena: action.payload,
                qtTotal: action.payload.qtdEtiqueta,
                qtArmazenado: action.payload.qtdArmazenada,
                listaItem: itens,
                codItem: itens[0].itCode,
                desItem: itens[0].itDescAbrev,
                unidMed: itens[0].un,
                codLocal: itens[0].codLocal,
                codDepos: itens[0].codDepos
            };
        }
        case 'inicia_tela_arm':
            return { 
                ...state, 
                batismo: '', 
                qtTotal: '',
                qtArmazenado: '',
                codEAN: '',
                codItem: '',
                desItem: '',
                unidMed: '',
                codLocal: '',
                codDepos: '',
                qtItem: '',
                lote: '',
                listaItem: '',
                etiquetaArmazena: ''
            };
        default:
            return state; 
    }
};
