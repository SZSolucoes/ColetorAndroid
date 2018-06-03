import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { 
    StyleSheet
} from 'react-native';

import LoginApp from './components/login/LoginApp';
import Version from './components/login/Version';
import MenuApp from './components/menu/MenuApp';
import MenuEntrada from './components/menu/MenuEntrada';
import MenuSaida from './components/menu/MenuSaida';
import Armazena from './components/entrada/armazenamento/Armazenamento';
import Conferencia from './components/entrada/conferencia/Conferencia';
import Inventario from './components/entrada/inventario/Inventario';
import Transferencia from './components/entrada/transferencia/Transferencia';
import Estoque from './components/estoque/Estoque';
import ListaNotaFiscal from './components/entrada/conferencia/ListaNotaFiscal';
import ImpressaoEAN from './components/impressao/Impressao';

export default props => (
    <Router>
        <Scene 
            key="root"
            navigationBarStyle={styles.header}
        >
            <Scene 
                key='loginApp' 
                component={LoginApp} 
                initial
                hideNavBar
            />
            <Scene 
                key='versionApp' 
                component={Version} 
                title="Informações App" 
                titleStyle={styles.title}
                leftButtonTextStyle={styles.btLeft}
                backButtonTintColor="white"
            />
            <Scene 
                key='menuApp' 
                component={MenuApp} 
                title="Menu" 
                hideNavBar
            />
            <Scene 
                key='menuEntrada' 
                component={MenuEntrada} 
                title="Entrada" 
                titleStyle={styles.title}
                leftButtonTextStyle={styles.btLeft}
                backButtonTintColor="white"
            />
            <Scene 
                key='menuSaida' 
                component={MenuSaida} 
                title="Saída"
                titleStyle={styles.title}
                leftButtonTextStyle={styles.btLeft}
                backButtonTintColor="white"
            />
            <Scene 
                key='armazena' 
                component={Armazena} 
                title="Armazenamento" 
                titleStyle={styles.title}
                leftButtonTextStyle={styles.btLeft}
                backButtonTintColor="white"
                //initial
            />
            <Scene 
                key='conferencia' 
                component={Conferencia} 
                title="Conferência" 
                titleStyle={styles.title}
                leftButtonTextStyle={styles.btLeft}
                backButtonTintColor="white"
                //initial
            />
            <Scene 
                key='inventario' 
                component={Inventario} 
                title="Inventário" 
                titleStyle={styles.title}
                leftButtonTextStyle={styles.btLeft}
                backButtonTintColor="white"
            />
            <Scene 
                key='transferencia' 
                component={Transferencia} 
                title="Transferência" 
                titleStyle={styles.title}
                leftButtonTextStyle={styles.btLeft}
                backButtonTintColor="white"
            />
            <Scene 
                key='estoque' 
                component={Estoque} 
                title="Consulta Estoque" 
                titleStyle={styles.title}
                leftButtonTextStyle={styles.btLeft}
                backButtonTintColor="white"
            />
            <Scene 
                key='impressao' 
                component={ImpressaoEAN} 
                title="Impressao EAN" 
                titleStyle={styles.title}
                leftButtonTextStyle={styles.btLeft}
                backButtonTintColor="white"
            />
            <Scene 
                key='listaNFConf' 
                component={ListaNotaFiscal} 
                title="Nota Fiscal" 
                titleStyle={styles.title}
                leftButtonTextStyle={styles.btLeft}
                backButtonTintColor="white"
            />
        </Scene>
    </Router>
);

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#63ace5'
    },
    title: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
    btLeft: {
        color: 'white'
    }
});
