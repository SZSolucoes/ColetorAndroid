const INITIAL_STATE = {
    codEtiqBatismo: '',
    listaItens: [
        { itCode: '001', itDesc: 'plastico', nroDocto: 'NF00001', situacao: 'Conferência finalizada' },
        { itCode: '002', itDesc: 'cabo 2x2', nroDocto: 'NF00001', situacao: 'Conferência finalizada' },
        { itCode: '003', itDesc: 'rj-45', nroDocto: 'NF00001', situacao: 'Em Armazenamento' },
        { itCode: '004', itDesc: 'coaxial', nroDocto: 'NF00001', situacao: 'Em Armazenamento' },
        { itCode: '005', itDesc: 'parafuso 12p', nroDocto: 'NF00001', situacao: 'Em Armazenamento' },
        { itCode: '006', itDesc: 'rosca 5mm', nroDocto: 'NF00001', situacao: 'Em Armazenamento' }
    ]
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'modifica_batismo_consbatentrada':
            return { 
                ...state, 
                codEtiqBatismo: action.payload 
            };
        case 'modifica_listitem_consbatentrada':
            return { 
                ...state,
                listaItens: [...action.payload]
            };
        case 'modifica_clean_consbatentrada':
            return { 
                codEtiqBatismo: '',
                listaItens: []
            };
        default:
            return state;
    }
};
