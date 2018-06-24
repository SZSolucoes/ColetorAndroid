/*
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
*/

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Axios from 'axios';

import Routes from './Routes';
import reducers from './reducers';

class App extends Component {
    componentWillMount() {
        Axios.defaults.baseURL = 'http://192.168.50.219/cgi-bin/coletorCentelha.sh/WService=coletorCentelha';
    }
    render() {
        return (
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
                <Routes />
            </Provider>
        );
    }
}

export default App;
