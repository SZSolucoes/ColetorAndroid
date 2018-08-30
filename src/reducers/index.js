import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import ArmazenaReducer from './ArmazenaReducer';
import ConfereReducer from './ConfereReducer';
import VersionReducer from './VersionReducer';
import EstoqueReducer from './EstoqueReducer';
import TransfereReducer from './TransfereReducer';
import ImpressaoReducer from './ImpressaoReducer';
import InventarioReducer from './InventarioReducer';
import RelEanReducer from './RelEanReducer';
import ConsolidacaoReducer from './ConsolidacaoReducer';
import DespachoReducer from './DespachoReducer';
import ConsEtiqBatEntradaReducer from './ConsEtiqBatEntradaReducer';
import ConsultaNFReducer from './ConsultaNFReducer';
import ListaSeparacaoReducer from './ListaSeparacaoReducer';
import ConsultaLocalizacaoReducer from './ConsultaLocalizacaoReducer';
import LoadingSpinReducer from './LoadingSpinReducer';

export default combineReducers({
    LoginReducer,
    ArmazenaReducer,
    ConfereReducer,
    VersionReducer,
    EstoqueReducer,
    TransfereReducer,
    ImpressaoReducer,
    InventarioReducer,
    RelEanReducer,
    ConsolidacaoReducer,
    DespachoReducer,
    ConsEtiqBatEntradaReducer,
    ConsultaNFReducer,
    ListaSeparacaoReducer,
    ConsultaLocalizacaoReducer,
    LoadingSpinReducer
});
