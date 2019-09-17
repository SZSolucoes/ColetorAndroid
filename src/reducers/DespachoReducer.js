const INITIAL_STATE = {
    codRom: '',
    codVol: '',
    listaItens: [
        { seq: '001', vol: '111111' },
        { seq: '002', vol: '222222' },
        { seq: '003', vol: '333333' },
        { seq: '004', vol: '444444' },
        { seq: '005', vol: '555555' },
        { seq: '006', vol: '666666' },
    ]
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'modifica_rom_despacho':
            return { 
                ...state, 
                codRom: action.payload 
            };
        case 'modifica_vol_despacho':
            return { 
                ...state, 
                codVol: action.payload
            };
        case 'modifica_removeitem_despacho':
            return { 
                ...state,
                listaItens: [...action.payload]
            };
        case 'modifica_clean_despacho':
            return { 
                codRom: '',
                codVol: '',
                listaItens: [
                    { seq: '001', vol: '111111' },
                    { seq: '002', vol: '222222' },
                    { seq: '003', vol: '333333' },
                    { seq: '004', vol: '444444' },
                    { seq: '005', vol: '555555' },
                    { seq: '006', vol: '666666' },
                ]
            };
        default:
            return state;
    }
};
