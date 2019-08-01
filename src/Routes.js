import React from 'react';
import { StyleSheet } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import LoginApp from './components/login/LoginApp';
import Version from './components/login/Version';
import MenuApp from './components/menu/MenuApp';
import MenuEntrada from './components/menu/MenuEntrada';
import MenuSaida from './components/menu/MenuSaida';
import MenuConsulta from './components/menu/MenuConsulta';
import MenuInventario from './components/menu/MenuInventario';
import Armazena from './components/entrada/armazenamento/Armazenamento';
import Conferencia from './components/entrada/conferencia/Conferencia';
import WinInfoItemConf from './components/entrada/conferencia/WinInfoItemConf';
import Inventario from './components/inventario/Inventario';
import Transferencia from './components/entrada/transferencia/Transferencia';
import Estoque from './components/estoque/Estoque';
import ListaNotaFiscal from './components/entrada/conferencia/ListaNotaFiscal';
import FormConfLote from './components/entrada/conferencia/FormConfLote';
import ImpressaoEAN from './components/impressao/Impressao';
import ListaSeparacao from './components/saida/listaSeparacao/ListaSeparacao';
import ConferenciaSeparacao from './components/saida/conferencia/ConferenciaSeparacao';
import ConferenciaVolumeSaida from './components/saida/conferencia/ConferenciaVolume';
import ConsultaEtiqBatismoSaida from './components/saida/etiquetaBatismo/ConsultaEtiqBatismoSaida';
import Consolidacao from './components/saida/consolidacao/Consolidacao';
import Despacho from './components/saida/despacho/Despacho';
import RelacionaEan from './components/relacionaean/RelacionaEan';
import ConsultaEtiqBatismoEntrada from './components/entrada/consulta/ConsultaBatismoEntrada';
import ConsultaNF from './components/entrada/consulta/ConsultaNF';
import ConsultaNFPush from './components/entrada/consulta/ConsultaNFPush';
import ConsultaLocalizacao from './components/entrada/consulta/localizacao/ConsultaLocalizacao';
import ConsultaItemEan from './components/entrada/consulta/ConsultaItemEan';
import CorteCabos from './components/saida/corteCabos/CorteCabos';
import ListaCortes from './components/saida/corteCabos/ListaCortes';
import ConferenciaPlaca from './components/entrada/conferenciaPlaca/ConferenciaPlaca';
import FormSelecaoNF from './components/entrada/conferenciaPlaca/FormSelecaoNF';

export default () => (
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
                title="Menu - Entrada" 
                titleStyle={styles.title}
                leftButtonTextStyle={styles.btLeft}
                backButtonTintColor="white"
            />
            <Scene 
                key='menuSaida' 
                component={MenuSaida} 
                title="Menu - Saída"
                titleStyle={styles.title}
                leftButtonTextStyle={styles.btLeft}
                backButtonTintColor="white"
            />
            <Scene 
                key='menuConsulta' 
                component={MenuConsulta} 
                title="Menu - Consulta"
                titleStyle={styles.title}
                leftButtonTextStyle={styles.btLeft}
                backButtonTintColor="white"
            />
            <Scene 
                key='menuInventario' 
                component={MenuInventario} 
                title="Menu - Inventário"
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
                key='winInfoItemConf' 
                component={WinInfoItemConf} 
                title="Item Conferência" 
                titleStyle={styles.title}
                leftButtonTextStyle={styles.btLeft}
                backButtonTintColor="white"
                hideNavBar
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
                key='inventarioEst' 
                component={Inventario} 
                title="Inventário - Estorno" 
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
                title="Estoque" 
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
                key='corteCabos' 
                component={CorteCabos} 
                title="Corte de Cabos" 
                titleStyle={styles.title}
                leftButtonTextStyle={styles.btLeft}
                backButtonTintColor="white"
            />
            <Scene 
                key='listaCortes' 
                component={ListaCortes} 
                title="Corte de Cabos" 
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
            <Scene 
                key='conferenciaLote' 
                component={FormConfLote} 
                title="Conf Lote" 
                titleStyle={styles.title}
                leftButtonTextStyle={styles.btLeft}
                backButtonTintColor="white"
                //initial
            />
            <Scene 
                key='listaSeparacaoSaida' 
                component={ListaSeparacao} 
                title="Lista de Separação" 
                titleStyle={styles.title}
                leftButtonTextStyle={styles.btLeft}
                backButtonTintColor="white"
            />
            <Scene 
                key='conferenciaSeparacao' 
                component={ConferenciaSeparacao} 
                title="Conferência" 
                titleStyle={styles.title}
                leftButtonTextStyle={styles.btLeft}
                backButtonTintColor="white"
            />
            <Scene 
                key='conferenciaVolumeSaida' 
                component={ConferenciaVolumeSaida} 
                title="Conferência - Volumes" 
                titleStyle={styles.title}
                leftButtonTextStyle={styles.btLeft}
                backButtonTintColor="white"
            />
            <Scene 
                key='consultaEtiqBatismoSaida' 
                component={ConsultaEtiqBatismoSaida} 
                title="Etiqueta Batismo - Saída" 
                titleStyle={styles.title}
                leftButtonTextStyle={styles.btLeft}
                backButtonTintColor="white"
            />
            <Scene 
                key='consolidacaoSaida' 
                component={Consolidacao} 
                title="Consolidação" 
                titleStyle={styles.title}
                leftButtonTextStyle={styles.btLeft}
                backButtonTintColor="white"
            />
            <Scene 
                key='despachoSaida' 
                component={Despacho} 
                title="Despacho" 
                titleStyle={styles.title}
                leftButtonTextStyle={styles.btLeft}
                backButtonTintColor="white"
            />
            <Scene 
                key='relacionaEan' 
                component={RelacionaEan} 
                title="Relaciona EAN" 
                titleStyle={styles.title}
                leftButtonTextStyle={styles.btLeft}
                backButtonTintColor="white"
            />
            <Scene 
                key='consultaBatismoEntrada' 
                component={ConsultaEtiqBatismoEntrada} 
                title="Etiqueta Batismo - Entrada" 
                titleStyle={styles.title}
                leftButtonTextStyle={styles.btLeft}
                backButtonTintColor="white"
            />
            <Scene 
                key='consultaNF' 
                component={ConsultaNF} 
                title="Nota Fiscal" 
                titleStyle={styles.title}
                leftButtonTextStyle={styles.btLeft}
                backButtonTintColor="white"
            />
            <Scene 
                key='consultaNFPush' 
                component={ConsultaNFPush} 
                title="Notas Fiscais" 
                titleStyle={styles.title}
                leftButtonTextStyle={styles.btLeft}
                backButtonTintColor="white"
            />
            <Scene 
                key='consultaLocalizacao' 
                component={ConsultaLocalizacao} 
                title="Localização" 
                titleStyle={styles.title}
                leftButtonTextStyle={styles.btLeft}
                backButtonTintColor="white"
            />
            <Scene 
                key='consultaItemEan' 
                component={ConsultaItemEan} 
                title="EAN" 
                titleStyle={styles.title}
                leftButtonTextStyle={styles.btLeft}
                backButtonTintColor="white"
            />
            <Scene 
                key='conferenciaPlaca' 
                 
                component={ConferenciaPlaca} 
                title="Conferência Placa" 
                titleStyle={styles.title}
                leftButtonTextStyle={styles.btLeft}
                backButtonTintColor="white"
            />
            <Scene 
                key='formSelecaoNF'
                component={FormSelecaoNF} 
                title="Seleção NF" 
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
