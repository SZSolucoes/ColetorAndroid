
export const modificaRom = codRom => ({
    type: 'modifica_rom_despacho',
    payload: codRom    
});
export const modificaVol = codVol => ({
    type: 'modifica_vol_despacho',
    payload: codVol    
});
export const removeItem = newList => ({
    type: 'modifica_removeitem_despacho',
    payload: newList    
});
export const modificaClean = () => ({
    type: 'modifica_clean_despacho'  
});
