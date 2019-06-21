const INITIAL_STATE = {
    itCode: '',
    un: '',
    itDesc: '',
    ean1: '',
    ean2: '',
    ean3: '',
    ean4: '',
    ean5: '',
    eanFetched: [1, 2, 3, 4, 5]
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'modifica_itcod_consultaitemean':
            return { 
                ...state, 
                itCode: action.payload 
            };
        case 'modifica_un_consultaitemean':
            return { 
                ...state, 
                un: action.payload 
            };
        case 'modifica_itdesc_consultaitemean':
            return { 
                ...state, 
                itDesc: action.payload 
            };
        case 'modifica_ean1_consultaitemean':
            return { 
                ...state, 
                ean1: action.payload 
            };
        case 'modifica_ean2_consultaitemean':
            return { 
                ...state, 
                ean2: action.payload 
            };
        case 'modifica_ean3_consultaitemean':
            return { 
                ...state, 
                ean3: action.payload 
            };
        case 'modifica_ean4_consultaitemean':
            return { 
                ...state, 
                ean4: action.payload 
            };
        case 'modifica_ean5_consultaitemean':
            return { 
                ...state, 
                ean5: action.payload 
            };
        case 'modifica_eanfetched_consultaitemean':
            return { 
                ...state, 
                eanFetched: [...action.payload]
            };
        case 'modifica_cleanerror_consultaitemean':
            return {
                ...state, 
                un: '',
                itDesc: '',
                ean1: '',
                ean2: '',
                ean3: '',
                ean4: '',
                ean5: '',
                eanFetched: [1, 2, 3, 4, 5]
            };
        case 'modifica_clean_consultaitemean':
            return {
                ...state, 
                itCode: '',
                un: '',
                itDesc: '',
                ean1: '',
                ean2: '',
                ean3: '',
                ean4: '',
                ean5: '',
                eanFetched: [1, 2, 3, 4, 5]
            };
        default:
            return state;
    }
};
