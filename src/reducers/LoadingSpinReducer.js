const INITIAL_STATE = {
    visible: false,
    text: 'Processando...',
    color: '#FFF'
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'modifica_visible_loadingspin':
            return { 
                ...state, 
                visible: action.payload 
            };
        case 'modifica_text_loadingspin':
            return { 
                ...state, 
                text: action.payload 
            };
        case 'modifica_color_loadingspin':
            return { 
                ...state, 
                color: action.payload
            };
        case 'modifica_clean_loadingspin':
            return { 
                ...state, 
                visible: false,
                text: 'Processando...',
                color: '#FFF'
            };
        default:
            return state;
    }
};
