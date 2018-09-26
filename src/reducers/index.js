import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import ArmazenaReducer from './ArmazenaReducer';
import ConfereReducer from './ConfereReducer';
import ConfereSaidaReducer from './ConfereSaidaReducer';
import ConfereVolumeReducer from './ConfereVolumeReducer';
import VersionReducer from './VersionReducer';
import EstoqueReducer from './EstoqueReducer';
import TransfereReducer from './TransfereReducer';
import ImpressaoReducer from './ImpressaoReducer';
import InventarioReducer from './InventarioReducer';
import RelEanReducer from './RelEanReducer';
import ConsolidacaoReducer from './ConsolidacaoReducer';
import DespachoReducer from './DespachoReducer';
import ConsEtiqBatEntradaReducer from './ConsEtiqBatEntradaReducer';
import ConsEtiqBatSaidaReducer from './ConsEtiqBatSaidaReducer';
import ConsultaNFReducer from './ConsultaNFReducer';
import ListaSeparacaoReducer from './ListaSeparacaoReducer';
import ConsultaLocalizacaoReducer from './ConsultaLocalizacaoReducer';
import LoadingSpinReducer from './LoadingSpinReducer';
import ConsultaItemEanReducer from './ConsultaItemEanReducer';

export default combineReducers({
    LoginReducer,
    ArmazenaReducer,
    ConfereReducer,
    ConfereSaidaReducer,
    ConfereVolumeReducer,
    VersionReducer,
    EstoqueReducer,
    TransfereReducer,
    ImpressaoReducer,
    InventarioReducer,
    RelEanReducer,
    ConsolidacaoReducer,
    DespachoReducer,
    ConsEtiqBatEntradaReducer,
    ConsEtiqBatSaidaReducer,
    ConsultaNFReducer,
    ListaSeparacaoReducer,
    ConsultaLocalizacaoReducer,
    LoadingSpinReducer,
    ConsultaItemEanReducer
});
