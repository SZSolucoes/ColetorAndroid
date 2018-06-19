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
    DespachoReducer
});
