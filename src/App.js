
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Axios from 'axios';

import Routes from './Routes';
import reducers from './reducers';
import { doChangeUrlService } from './components/utils/AxiosAux';

export const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

class App extends Component {
    componentDidMount() {
        // Url base padrão
        Axios.defaults.baseURL = 'http://192.168.50.219/cgi-bin/coletorCentelha.sh/WService=coletorCentelha';
        Axios.defaults.timeout = 10000; // Timeout 10s
        AsyncStorage.getItem('empresa')
            .then((empresa) => {
                if (empresa) {
                    AsyncStorage.getItem('ambiente')
                        .then((ambiente) => {
                            if (ambiente) {
                                // Atualiza a base URL com base na empresa e ambiente
                                doChangeUrlService(empresa, ambiente);
                            }
                        });
                }
            });
    }
    render() {
        return (
            <Provider store={store}>
                <Routes />
            </Provider>
        );
    }
}

export default App;
