import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import ArmazenaReducer from './ArmazenaReducer';
import ConfereReducer from './ConfereReducer';
import VersionReducer from './VersionReducer';
import EstoqueReducer from './EstoqueReducer';
import TransfereReducer from './TransfereReducer';
import ImpressaoReducer from './ImpressaoReducer';

export default combineReducers({
    LoginReducer,
    ArmazenaReducer,
    ConfereReducer,
    VersionReducer,
    EstoqueReducer,
    TransfereReducer,
    ImpressaoReducer
});
